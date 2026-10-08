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
import { isValidHttpUrl, normalizeImageUrl } from '../utils/url';
import { User, Briefcase, Link as LinkIcon, Image as ImageIcon, CheckCircle, AlertCircle } from 'lucide-react';
import { LinkedInIcon as Linkedin, GithubIcon as Github } from '../components/SocialIcons';

const empty = { name: '', role: '', category: 'all', photoUrl: '', linkedin: '', github: '', bio: '', order: 0 };

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
                        category: d.category || 'all',
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
            navigate('/#team');
        } catch (e2) {
            setError(e2.message || String(e2));
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="min-h-screen pt-32 pb-20 px-4 text-center text-white font-bold">Loading team member...</div>;

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-black relative">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#34A853]/10 rounded-full blur-[100px] pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4285F4]/10 rounded-full blur-[100px] pointer-events-none -z-10" />
            
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <p className="text-[#34A853] font-bold text-sm tracking-widest uppercase mb-2">
                            // TEAM MANAGEMENT
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
                            {id ? 'Edit Team Member' : 'Add New Member'}
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
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-300 mb-2">
                                <User className="w-4 h-4 text-[#4285F4]" /> Full Name
                            </label>
                            <input
                                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                                name="name" 
                                value={form.name} 
                                onChange={onChange} 
                                required 
                                placeholder="e.g. John Doe"
                            />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-300 mb-2">
                                <Briefcase className="w-4 h-4 text-[#FBBC04]" /> Role
                            </label>
                            <input
                                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                                name="role" 
                                value={form.role} 
                                onChange={onChange} 
                                required
                                placeholder="e.g. Web Lead"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-300 mb-2">
                                <LinkIcon className="w-4 h-4 text-[#EA4335]" /> Category Group
                            </label>
                            <select
                                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                                name="category" 
                                value={form.category} 
                                onChange={onChange} 
                            >
                                <option value="all">All Leads (General)</option>
                                <option value="organizer">Organizer</option>
                                <option value="tech">Engineering Leads</option>
                                <option value="creative">Creative & Media</option>
                                <option value="operations">Operations & Outreach</option>
                            </select>
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-300 mb-2">
                                <span className="text-[#34A853]">#</span> Display Order
                            </label>
                            <input
                                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                                type="number"
                                name="order" 
                                value={form.order} 
                                onChange={onChange} 
                                placeholder="Lower number appears first"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="flex items-center gap-2 text-sm font-bold text-slate-300 mb-2">
                            <ImageIcon className="w-4 h-4 text-[#34A853]" /> Profile Photo URL
                        </label>
                        <input
                            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                            type="url"
                            name="photoUrl"
                            value={form.photoUrl}
                            onChange={onChange}
                            placeholder="https://..."
                        />
                        <p className="text-xs text-slate-500 mt-2">
                            Tip: You can use a direct image link or a public Google Drive link (we'll convert it).
                        </p>
                        
                        {/* Image Preview Block */}
                        <div className="mt-4 flex items-center gap-4">
                            {form.photoUrl && isValidHttpUrl(form.photoUrl) && imgOk && (
                                <div className="flex items-center gap-4 p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                                    <img
                                        src={form.photoUrl}
                                        alt="Preview"
                                        onError={() => setImgOk(false)}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-[#4285F4]"
                                    />
                                    <div className="text-sm font-bold text-[#34A853] flex items-center gap-1.5">
                                        <CheckCircle className="w-4 h-4" /> Image valid
                                    </div>
                                </div>
                            )}
                            {form.photoUrl && !isValidHttpUrl(form.photoUrl) && (
                                <p className="text-xs text-red-400 font-bold">Invalid URL. Must start with https://</p>
                            )}
                            {form.photoUrl && isValidHttpUrl(form.photoUrl) && !imgOk && (
                                <p className="text-xs text-red-400 font-bold">Could not load image. Link must be public and direct.</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-300 mb-2">
                                <Linkedin className="w-4 h-4 text-[#4285F4]" /> LinkedIn Profile
                            </label>
                            <input
                                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                                type="url"
                                name="linkedin" 
                                value={form.linkedin} 
                                onChange={onChange} 
                                placeholder="https://linkedin.com/in/..."
                            />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-300 mb-2">
                                <Github className="w-4 h-4 text-white" /> GitHub Profile
                            </label>
                            <input
                                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                                type="url"
                                name="github" 
                                value={form.github} 
                                onChange={onChange} 
                                placeholder="https://github.com/..."
                            />
                        </div>
                    </div>

                    <div className="mb-8">
                        <label className="block text-sm font-bold text-slate-300 mb-2">Bio / Description</label>
                        <textarea
                            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                            name="bio" 
                            value={form.bio} 
                            onChange={onChange} 
                            rows={3} 
                            placeholder="A short description about the team member..."
                        />
                    </div>

                    <div className="flex gap-4 border-t border-slate-800 pt-6">
                        <button type="submit" className="flex-1 py-3 bg-[#4285F4] hover:bg-blue-600 text-white font-bold rounded-xl transition-colors" disabled={saving}>
                            {saving ? "Saving…" : id ? "Save Changes" : "Create Member"}
                        </button>
                        <button type="button" className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition-colors" onClick={() => navigate('/#team')}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
