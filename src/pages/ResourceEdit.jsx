import { useEffect, useMemo, useState } from 'react';
import { addDoc, collection, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../firebase';
import '../styles/common.css';
import '../styles/resources.css';
import { isValidHttpUrl } from '../utils/url';

export default function ResourceEdit() {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();
    const colRef = useMemo(() => collection(db, 'resources'), []);
    const [form, setForm] = useState({ eventName: '', notes: '', linksText: '' });
    const [loading, setLoading] = useState(isEdit);

    useEffect(() => {
        if (!isEdit) return;
        (async () => {
            const snap = await getDoc(doc(db, 'resources', id));
            const data = snap.data() || {};
            const linksText = Array.isArray(data.links)
                ? data.links.map((lnk) => {
                    if (typeof lnk === 'string') return lnk;
                    if (lnk && typeof lnk === 'object') return `${lnk.label || ''} | ${lnk.url || ''}`.trim();
                    return '';
                }).join('\n')
                : '';
            setForm({ eventName: data.eventName || '', notes: data.notes || '', linksText });
            setLoading(false);
        })();
    }, [id, isEdit]);

    const parseLinks = () => {
        const lines = form.linksText.split('\n').map(s => s.trim()).filter(Boolean);
        return lines.map(line => {
            const parts = line.split('|').map(p => p.trim());
            if (parts.length === 1) {
                const url = parts[0];
                return isValidHttpUrl(url) ? url : null;
            }
            const [label, url] = [parts[0], parts[1]];
            if (!isValidHttpUrl(url)) return null;
            return { label: label || 'Link', url };
        }).filter(Boolean);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!form.eventName.trim()) {
            alert('Event name is required.');
            return;
        }
        const links = parseLinks();
        const payload = {
            eventName: form.eventName.trim(),
            notes: form.notes || '',
            links,
            updatedAt: serverTimestamp(),
        };
        if (isEdit) {
            await setDoc(doc(db, 'resources', id), payload, { merge: true });
        } else {
            await addDoc(colRef, { ...payload, createdAt: serverTimestamp() });
        }
        navigate('/resources');
    };

    if (loading) return <div className="container"><p>Loading…</p></div>;

    return (
        <div className="container">
            <div className="pageHeader">
                <h2>{isEdit ? 'Edit Resource' : 'New Resource'}</h2>
            </div>
            <form className="form" onSubmit={onSubmit}>
                <label className="label">Event name</label>
                <input
                    className="input"
                    type="text"
                    value={form.eventName}
                    onChange={(e) => setForm(f => ({ ...f, eventName: e.target.value }))}
                    required
                />

                <label className="label">Notes</label>
                <textarea
                    className="textarea"
                    rows={6}
                    value={form.notes}
                    onChange={(e) => setForm(f => ({ ...f, notes: e.target.value }))}
                    placeholder="Any notes for attendees…"
                />

                <label className="label">Links (one per line; or ‘label | https://url’)</label>
                <textarea
                    className="textarea"
                    rows={6}
                    value={form.linksText}
                    onChange={(e) => setForm(f => ({ ...f, linksText: e.target.value }))}
                    placeholder={`https://example.com\nSlides | https://slides.example.com/my-talk`}
                />

                <div className="cardActions" style={{ marginTop: 8 }}>
                    <button type="submit" className="btn">{isEdit ? 'Save changes' : 'Create resource'}</button>
                    <button type="button" className="btn secondary" onClick={() => history.back()}>Cancel</button>
                </div>
            </form>
        </div>
    );
}