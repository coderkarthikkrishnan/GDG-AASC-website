import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
    addDoc,
    collection,
    doc,
    getDoc,
    serverTimestamp,
    updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import "../styles/common.css";
import "../styles/team-edit.css";
import { isValidHttpUrl, normalizeImageUrl } from '../utils/url';

const empty = { name: '', role: '', photoUrl: '', linkedin: '', github: '', bio: '', order: 0 };

export default function TeamEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const col = useMemo(() => collection(db, 'team'), []);
    const [form, setForm] = useState(empty);
    const [loading, setLoading] = useState(!!id);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [imgOk, setImgOk] = useState(true);

    useEffect(() => {
        if (!id) return setLoading(false);
        (async () => {
            try {
                const snap = await getDoc(doc(col, id));
                if (snap.exists()) {
                    const d = snap.data();
                    setForm({
                        name: d.name || '',
                        role: d.role || '',
                        photoUrl: d.photoUrl || '',
                        linkedin: d.linkedin || '',
                        github: d.github || '',
                        bio: d.bio || '',
                        order: d.order || 0,
                    });
                } else {
                    setError('Member not found');
                }
            } catch (e) {
                setError(e.message || String(e));
            } finally {
                setLoading(false);
            }
        })();
    }, [id, col]);

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        if (name === 'photoUrl') setImgOk(true);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError(null);

        const trimmed = {
            ...form,
            photoUrl: form.photoUrl?.trim() || '',
            linkedin: form.linkedin?.trim() || '',
            github: form.github?.trim() || '',
        };

        if (trimmed.photoUrl) trimmed.photoUrl = normalizeImageUrl(trimmed.photoUrl);

        const bad = [];
        if (trimmed.photoUrl && !isValidHttpUrl(trimmed.photoUrl)) bad.push('Photo URL');
        if (trimmed.linkedin && !isValidHttpUrl(trimmed.linkedin)) bad.push('LinkedIn URL');
        if (trimmed.github && !isValidHttpUrl(trimmed.github)) bad.push('GitHub URL');

        if (bad.length) {
            setSaving(false);
            return setError(`Please fix invalid field(s): ${bad.join(', ')}`);
        }

        const payload = {
            ...trimmed,
            order: Number(trimmed.order) || 0,
            updatedAt: serverTimestamp(),
        };

        try {
            if (id) {
                await updateDoc(doc(col, id), payload);
            } else {
                await addDoc(col, { ...payload, createdAt: serverTimestamp() });
            }
            navigate('/about');
        } catch (e2) {
            setError(e2.message || String(e2));
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <p>Loading…</p>;

    return (
        <div className="container">
            <div className="pageHeader">
                <h2>{id ? 'Edit Team Member' : 'New Team Member'}</h2>
                <Link className="btn" to="/about">Back</Link>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form className="form" onSubmit={onSubmit}>
                <label>
                    Name
                    <input className="input" name="name" value={form.name} onChange={onChange} required />
                </label>

                <label>
                    Role
                    <input className="input" name="role" value={form.role} onChange={onChange} required />
                </label>

                <label>
                    Photo URL
                    <input
                        className="input"
                        type="url"
                        pattern="https?://.*"
                        name="photoUrl"
                        value={form.photoUrl}
                        onChange={onChange}
                        placeholder="https://..."
                    />
                </label>
                <small style={{ color: '#5f6368' }}>
                    Tip: Google Drive share links are supported. Set the file to "Anyone with the link • Viewer". We’ll convert it automatically.
                </small>

                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                    {form.photoUrl && isValidHttpUrl(form.photoUrl) && imgOk && (
                        <img
                            src={form.photoUrl}
                            alt="member"
                            onError={() => setImgOk(false)}
                            style={{ maxWidth: 200, borderRadius: 8 }}
                        />
                    )}
                    {form.photoUrl && !isValidHttpUrl(form.photoUrl) && (
                        <small style={{ color: '#b00' }}>
                            Invalid URL. Please use a full link starting with https://
                        </small>
                    )}
                    {form.photoUrl && isValidHttpUrl(form.photoUrl) && !imgOk && (
                        <small style={{ color: '#b00' }}>
                            Could not load image. Ensure the link is public and direct.
                        </small>
                    )}
                </div>

                <div className="grid2">
                    <label>
                        LinkedIn
                        <input className="input" name="linkedin" value={form.linkedin} onChange={onChange} />
                    </label>
                    <label>
                        GitHub
                        <input className="input" name="github" value={form.github} onChange={onChange} />
                    </label>
                </div>

                <label>
                    Bio
                    <textarea
                        className="textarea"
                        name="bio"
                        value={form.bio}
                        onChange={onChange}
                        rows={4}
                        placeholder="Short bio"
                    />
                </label>

                <label>
                    Order
                    <input
                        className="input"
                        type="number"
                        name="order"
                        value={form.order}
                        onChange={onChange}
                    />
                </label>

                <button className="btn" type="submit" disabled={saving}>
                    {saving ? 'Saving…' : id ? 'Save Changes' : 'Create Member'}
                </button>
            </form>
        </div>
    );
}
