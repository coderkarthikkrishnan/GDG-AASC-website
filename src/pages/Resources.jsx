import { useEffect, useMemo, useState } from 'react';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { useAuth } from '../authContext';
import { isAdmin as checkIsAdmin } from '../admin';
import { isValidHttpUrl } from '../utils/url';
import { ExternalLink, Database, Trash2, Edit, Plus, FolderOpen } from 'lucide-react';

export default function Resources() {
    const { user, isAdmin: isContextAdmin } = useAuth();
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const colRef = useMemo(() => collection(db, 'resources'), []);

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }
        
        const q = query(colRef, orderBy('eventName'));
        const unsub = onSnapshot(q, (snap) => {
            setRows(snap.docs.map(d => ({ id: d.id, ...d.data() })));
            setLoading(false);
        }, (error) => {
            console.error("Snapshot error:", error);
        });
        return () => unsub();
    }, [colRef, user]);

    // Check either auth context or original local admin function
    const isAdmin = isContextAdmin || checkIsAdmin();

    if (!user) {
        return (
            <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center bg-black">
                <div className="max-w-md w-full text-center p-8 rounded-3xl glass-card border border-slate-800 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#4285F4]/10 rounded-full blur-3xl pointer-events-none -z-10" />
                    <Database className="w-16 h-16 text-[#4285F4] mx-auto mb-6 opacity-80" />
                    <h2 className="text-3xl font-extrabold font-heading text-white mb-4">Restricted Access</h2>
                    <p className="text-slate-400 mb-8 leading-relaxed">Please sign in with your Google account to access community resources, presentation decks, and code repositories.</p>
                </div>
            </div>
        );
    }

    const onDelete = async (id) => {
        if (!isAdmin) return;
        if (!confirm('Are you sure you want to delete this resource?')) return;
        try {
            await deleteDoc(doc(db, 'resources', id));
        } catch (error) {
            console.error("Firebase Deletion Error:", error);
            alert("Error deleting resource: " + error.message);
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-black relative">
            {/* Background Glows */}
            <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-[#4285F4]/10 rounded-full blur-[100px] pointer-events-none -z-10" />
            <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-[#34A853]/10 rounded-full blur-[100px] pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <p className="text-[#34A853] font-bold text-sm tracking-widest uppercase mb-2">
                            // Exclusive Material
                        </p>
                        <h2 className="text-4xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
                            Community <span className="bg-gradient-to-r from-[#4285F4] to-[#34A853] bg-clip-text text-transparent">Resources</span>
                        </h2>
                    </div>
                    {isAdmin && (
                        <Link 
                            to="/resources/new"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white rounded-xl font-semibold transition-all shadow-lg hover:scale-105"
                        >
                            <Plus className="w-4 h-4" /> New Resource
                        </Link>
                    )}
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                        {[1, 2, 3].map(n => (
                            <div key={n} className="h-64 rounded-2xl bg-slate-800/50 border border-slate-700/50" />
                        ))}
                    </div>
                ) : rows.length === 0 ? (
                    <div className="text-center py-24 rounded-3xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-sm">
                        <FolderOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">No Resources Yet</h3>
                        <p className="text-slate-400">Check back later for presentation slides and code repositories.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {rows.map(r => (
                            <div key={r.id} className="group relative rounded-3xl p-6 md:p-8 bg-slate-900/60 hover:bg-slate-800/80 backdrop-blur-md border border-slate-700/50 hover:border-[#4285F4]/50 transition-all duration-300 flex flex-col h-full overflow-hidden">
                                
                                {/* Card Top */}
                                <div className="mb-6 flex-grow">
                                    <div className="w-12 h-12 rounded-2xl bg-[#4285F4]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <Database className="w-6 h-6 text-[#4285F4]" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-3 font-heading leading-tight">
                                        {r.eventName || 'Untitled Resource'}
                                    </h3>
                                    {r.notes && (
                                        <p className="text-sm text-slate-400 leading-relaxed">
                                            {String(r.notes)}
                                        </p>
                                    )}
                                </div>

                                {/* Links */}
                                {Array.isArray(r.links) && r.links.length > 0 && (
                                    <div className="flex flex-col gap-3 mt-auto">
                                        {r.links.map((lnk, idx) => {
                                            const isObj = typeof lnk === 'object' && lnk !== null;
                                            const label = isObj ? (lnk.label || `Resource Link ${idx + 1}`) : `Resource Link ${idx + 1}`;
                                            const url = isObj ? lnk.url : lnk;
                                            if (!url || !isValidHttpUrl(url)) return null;
                                            return (
                                                <a 
                                                    key={idx} 
                                                    href={url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-slate-800 hover:bg-[#4285F4]/20 text-slate-300 hover:text-white transition-colors border border-transparent hover:border-[#4285F4]/30"
                                                >
                                                    <span className="font-semibold text-sm truncate pr-4">{label}</span>
                                                    <ExternalLink className="w-4 h-4 shrink-0 text-[#4285F4]" />
                                                </a>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* Admin Actions */}
                                {isAdmin && (
                                    <div className="mt-6 pt-6 border-t border-slate-700/50 flex gap-3">
                                        <Link 
                                            to={`/resources/edit/${r.id}`}
                                            className="flex-1 flex justify-center items-center gap-2 py-2 rounded-lg text-xs font-bold bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                                        >
                                            <Edit className="w-3.5 h-3.5" /> Edit
                                        </Link>
                                        <button 
                                            onClick={() => onDelete(r.id)}
                                            className="flex-1 flex justify-center items-center gap-2 py-2 rounded-lg text-xs font-bold bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" /> Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}