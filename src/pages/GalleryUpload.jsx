import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../authContext';
import { isValidHttpUrl, normalizeImageUrl } from '../utils/url';
import { Image as ImageIcon, Link as LinkIcon, Type, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

export default function GalleryUpload() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [imageUrl, setImageUrl] = useState('');
    const [caption, setCaption] = useState('');
    const [eventId, setEventId] = useState('');
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [imgOk, setImgOk] = useState(true);

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
        <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-black relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#4285F4]/10 rounded-full blur-[100px] pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#EA4335]/10 rounded-full blur-[100px] pointer-events-none -z-10" />
            
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <p className="text-[#EA4335] font-bold text-sm tracking-widest uppercase mb-2">
                            // GALLERY MANAGEMENT
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
                            Upload Photo
                        </h2>
                    </div>
                </div>
                
                {error && (
                    <div className="flex items-center gap-2 p-4 mb-6 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-bold">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <p>{error}</p>
                    </div>
                )}
                
                <form className="bg-slate-900/60 backdrop-blur-md border border-slate-700/50 p-6 md:p-8 rounded-3xl" onSubmit={onSubmit}>
                    <div className="mb-6">
                        <label className="flex items-center gap-2 text-sm font-bold text-slate-300 mb-2">
                            <LinkIcon className="w-4 h-4 text-[#4285F4]" /> Image URL
                        </label>
                        <input
                            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                            type="url"
                            pattern="https?://.*"
                            value={imageUrl}
                            onChange={(e) => { setImageUrl(e.target.value); setImgOk(true); }}
                            placeholder="https://..."
                            required
                        />
                        <p className="text-xs text-slate-500 mt-2">
                            Tip: Google Drive share links are supported. Set to "Anyone with the link • Viewer".
                        </p>
                        
                        {imageUrl && isValidHttpUrl(imageUrl) && imgOk && (
                            <div className="mt-4 p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 inline-block">
                                <img
                                    src={imageUrl}
                                    alt="Preview"
                                    onError={() => setImgOk(false)}
                                    className="max-w-full h-auto max-h-48 rounded-lg border border-[#4285F4]/30 shadow-md"
                                />
                                <div className="mt-2 text-sm font-bold text-[#34A853] flex items-center gap-1.5">
                                    <CheckCircle className="w-4 h-4" /> Image preview successful
                                </div>
                            </div>
                        )}
                        {imageUrl && !isValidHttpUrl(imageUrl) && (
                            <p className="text-xs text-red-400 font-bold mt-2">Invalid URL. Must start with https://</p>
                        )}
                        {imageUrl && isValidHttpUrl(imageUrl) && !imgOk && (
                            <p className="text-xs text-red-400 font-bold mt-2">Could not load image. Ensure the link is public and direct.</p>
                        )}
                    </div>

                    <div className="mb-6">
                        <label className="flex items-center gap-2 text-sm font-bold text-slate-300 mb-2">
                            <Type className="w-4 h-4 text-[#FBBC04]" /> Caption
                        </label>
                        <input
                            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="A brief description of this photo..."
                        />
                    </div>

                    <div className="mb-8">
                        <label className="flex items-center gap-2 text-sm font-bold text-slate-300 mb-2">
                            <Calendar className="w-4 h-4 text-[#34A853]" /> Related Event ID (Optional)
                        </label>
                        <input
                            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                            value={eventId}
                            onChange={(e) => setEventId(e.target.value)}
                            placeholder="e.g. hackathon-2026"
                        />
                    </div>

                    <div className="flex gap-4 border-t border-slate-800 pt-6">
                        <button type="submit" className="flex-1 py-3 bg-[#4285F4] hover:bg-blue-600 text-white font-bold rounded-xl transition-colors" disabled={saving || !imageUrl}>
                            {saving ? "Uploading…" : "Add to Gallery"}
                        </button>
                        <button type="button" className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition-colors" onClick={() => navigate('/gallery')}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
