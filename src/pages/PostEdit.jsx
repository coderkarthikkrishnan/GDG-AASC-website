// src/pages/PostEdit.jsx
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
// upload removed: URL-only images
import "../styles/common.css";
import "../styles/post-edit.css";
import { isValidHttpUrl, normalizeImageUrl } from '../utils/url';

const empty = { title: '', author: '', publishedAt: '', body: '', tags: '', imageUrl: '' };

// using shared helpers from utils/url

export default function PostEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const postsCol = useMemo(() => collection(db, 'posts'), []);
    const [form, setForm] = useState(empty);
    const [loading, setLoading] = useState(!!id);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [imgOk, setImgOk] = useState(true);

    useEffect(() => {
        if (!id) return setLoading(false);
        (async () => {
            try {
                const snap = await getDoc(doc(postsCol, id));
                if (snap.exists()) {
                    const data = snap.data();
                    const ts = data.publishedAt;
                    // Convert Firestore Timestamp/Date to input[type=datetime-local] value (YYYY-MM-DDTHH:mm)
                    const dtStr = ts?.toDate ? ts.toDate().toISOString().slice(0, 16) : (ts instanceof Date ? ts.toISOString().slice(0, 16) : '');
                    setForm({
                        title: data.title || '',
                        author: data.author || '',
                        publishedAt: dtStr,
                        body: data.body || '',
                        tags: Array.isArray(data.tags) ? data.tags.join(', ') : (data.tags || ''),
                        imageUrl: data.imageUrl || '',
                    });
                } else {
                    setError('Post not found');
                }
            } catch (e) {
                setError(e.message || String(e));
            } finally {
                setLoading(false);
            }
        })();
    }, [id, postsCol]);

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        if (name === 'imageUrl') setImgOk(true);
    };

    // no file upload; only URL via input

    const onSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError(null);
        let trimmedUrl = (form.imageUrl || '').trim();
        if (trimmedUrl) trimmedUrl = normalizeImageUrl(trimmedUrl);
        if (trimmedUrl && !isValidHttpUrl(trimmedUrl)) {
            setSaving(false);
            return setError('Please enter a valid Image URL starting with https://');
        }
        const payload = {
            title: form.title,
            author: form.author,
            publishedAt: form.publishedAt ? new Date(form.publishedAt) : serverTimestamp(),
            body: form.body,
            tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
            imageUrl: trimmedUrl,
            updatedAt: serverTimestamp(),
        };
        try {
            if (id) await updateDoc(doc(postsCol, id), payload);
            else await addDoc(postsCol, { ...payload, createdAt: serverTimestamp() });
            navigate('/blog');
        } catch (e2) {
            setError(e2.message || String(e2));
        } finally {
            setSaving(false);
        }
    };

    const onDelete = async () => {
        if (!id) return;
        if (!confirm('Delete this post?')) return;
        await deleteDoc(doc(postsCol, id));
        navigate('/blog');
    };

    if (loading) return <p>Loading…</p>;
    return (
        <div className="container">
            <div className="pageHeader">
                <h2>{id ? 'Edit Post' : 'New Post'}</h2>
                <Link className="btn" to="/blog">Back</Link>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form className="form" onSubmit={onSubmit}>
                <label>Title<input className="input" name="title" value={form.title} onChange={onChange} required /></label>
                <div className="grid2">
                    <label>Author UID<input className="input" name="author" value={form.author} onChange={onChange} required /></label>
                    <label>Published At<input className="input" type="datetime-local" name="publishedAt" value={form.publishedAt} onChange={onChange} required /></label>
                </div>
                <label>Tags (comma-separated)<input className="input" name="tags" value={form.tags} onChange={onChange} /></label>
                <label>Image URL<input className="input" type="url" pattern="https?://.*" name="imageUrl" value={form.imageUrl} onChange={onChange} placeholder="https://..." /></label>
                <small style={{ color: '#5f6368' }}>Tip: Google Drive share links are supported. Set to "Anyone with the link • Viewer".</small>
                {form.imageUrl && isValidHttpUrl(form.imageUrl) && imgOk && (
                    <img src={form.imageUrl} alt="cover" onError={() => setImgOk(false)} style={{ maxWidth: 200, borderRadius: 8 }} />
                )}
                {form.imageUrl && !isValidHttpUrl(form.imageUrl) && (
                    <small style={{ color: '#b00' }}>Invalid URL. Please use a full link starting with https://</small>
                )}
                {form.imageUrl && isValidHttpUrl(form.imageUrl) && !imgOk && (
                    <small style={{ color: '#b00' }}>Could not load image (server returned an error). Ensure the link is public and direct.</small>
                )}
                <label>Body (HTML/Markdown)<textarea className="textarea" name="body" value={form.body} onChange={onChange} rows={10} placeholder="Write your post body here (markdown or HTML)" /></label>
                <button className="btn" type="submit" disabled={saving}>{saving ? 'Saving…' : (id ? 'Save Changes' : 'Create Post')}</button>
                {id && <button className="btn link" type="button" onClick={onDelete}>Delete</button>}
            </form>
        </div>
    );
}
