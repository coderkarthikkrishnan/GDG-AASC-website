// src/pages/GalleryUpload.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import "../styles/common.css";
import "../styles/gallery-upload.css";
import { useAuth } from '../authContext';
import { isValidHttpUrl, normalizeImageUrl } from '../utils/url';

export default function GalleryUpload() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [imageUrl, setImageUrl] = useState('');
    const [caption, setCaption] = useState('');
    const [eventId, setEventId] = useState('');
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [imgOk, setImgOk] = useState(true);

    // shared helper is imported

    const onSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError(null);
        try {
            let trimmed = (imageUrl || '').trim();
            if (trimmed) trimmed = normalizeImageUrl(trimmed);
            if (!isValidHttpUrl(trimmed)) throw new Error('Please enter a valid Image URL starting with https://');
            if (!user) throw new Error('You must be signed in to upload to the gallery.');
            await addDoc(collection(db, 'gallery'), {
                imageUrl: trimmed,
                caption,
                eventId: eventId || null,
                uploadedBy: user.uid,
                uploadedAt: serverTimestamp(),
            });
            navigate('/gallery');
        } catch (err) {
            setError(err.message || String(err));
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="container">
            <div className="pageHeader">
                <h2>Add Gallery Image</h2>
                <Link className="btn" to="/gallery">Back</Link>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form className="form" onSubmit={onSubmit}>
                <label>Image URL<input className="input" type="url" pattern="https?://.*" value={imageUrl} onChange={(e) => { setImageUrl(e.target.value); setImgOk(true); }} placeholder="https://..." required /></label>
                <small style={{ color: '#5f6368' }}>Tip: Google Drive share links are supported. Set to "Anyone with the link • Viewer".</small>
                {imageUrl && isValidHttpUrl(imageUrl) && imgOk && (
                    <img src={imageUrl} alt="preview" onError={() => setImgOk(false)} style={{ maxWidth: 200, borderRadius: 8 }} />
                )}
                {imageUrl && !isValidHttpUrl(imageUrl) && (
                    <small style={{ color: '#b00' }}>Invalid URL. Please use a full link starting with https://</small>
                )}
                {imageUrl && isValidHttpUrl(imageUrl) && !imgOk && (
                    <small style={{ color: '#b00' }}>Could not load image (server returned an error). Ensure the link is public and direct.</small>
                )}
                <label>Caption<input className="input" value={caption} onChange={(e) => setCaption(e.target.value)} /></label>
                <label>Related Event ID (optional)<input className="input" value={eventId} onChange={(e) => setEventId(e.target.value)} /></label>
                <button className="btn" type="submit" disabled={saving || !imageUrl}>{saving ? 'Saving…' : 'Add to Gallery'}</button>
            </form>
        </div>
    );
}
