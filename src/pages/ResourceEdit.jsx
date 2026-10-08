import { useEffect, useMemo, useState } from 'react';
import { addDoc, collection, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../firebase';
import { isValidHttpUrl } from '../utils/url';

export default function ResourceEdit() {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();
    const colRef = useMemo(() => collection(db, 'resources'), []);
    const [form, setForm] = useState({ eventName: '', notes: '', linksText: '' });
    const [loading, setLoading] = useState(isEdit);
    const [error, setError] = useState(null);

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

    if (loading) return <div className="min-h-screen pt-32 pb-20 px-4 text-center text-white">Loading…</div>;

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-black relative">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#4285F4]/10 rounded-full blur-[100px] pointer-events-none -z-10" />
            
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-extrabold font-heading text-white">
                        {isEdit ? 'Edit Resource' : 'New Resource'}
                    </h2>
                </div>
                
                {error && <p className="text-red-500 mb-4 font-bold">{error}</p>}
                
                <form className="bg-slate-900/60 backdrop-blur-md border border-slate-700/50 p-6 md:p-8 rounded-3xl" onSubmit={onSubmit}>
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-slate-300 mb-2">Event name</label>
                        <input
                            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                            type="text"
                            value={form.eventName}
                            onChange={(e) => setForm(f => ({ ...f, eventName: e.target.value }))}
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-bold text-slate-300 mb-2">Notes</label>
                        <textarea
                            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                            rows={4}
                            value={form.notes}
                            onChange={(e) => setForm(f => ({ ...f, notes: e.target.value }))}
                            placeholder="Any notes for attendees…"
                        />
                    </div>

                    <div className="mb-8">
                        <label className="block text-sm font-bold text-slate-300 mb-2">Links (one per line; or ‘label | https://url’)</label>
                        <textarea
                            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                            rows={4}
                            value={form.linksText}
                            onChange={(e) => setForm(f => ({ ...f, linksText: e.target.value }))}
                            placeholder={`https://example.com\nSlides | https://slides.example.com/my-talk`}
                        />
                    </div>

                    <div className="flex gap-4 border-t border-slate-800 pt-6">
                        <button type="submit" className="flex-1 py-3 bg-[#4285F4] hover:bg-blue-600 text-white font-bold rounded-xl transition-colors">
                            {isEdit ? 'Save changes' : 'Create resource'}
                        </button>
                        <button type="button" className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition-colors" onClick={() => navigate('/resources')}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}