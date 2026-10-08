import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Calendar, Clock, MapPin, User, Link as LinkIcon, Image as ImageIcon } from "lucide-react";

const empty = {
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    speaker: "",
    registrationLink: "",
    imageUrl: "",
    type: "upcoming",
};

export default function EventEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isNew = id === "new";
    const [form, setForm] = useState(empty);
    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    const col = useMemo(() => collection(db, "events"), []);

    useEffect(() => {
        if (isNew) {
            setLoading(false);
            return;
        }
        
        const fetchEvent = async () => {
            try {
                const ref = doc(col, id);
                const snap = await getDoc(ref);
                if (snap.exists()) {
                    const data = snap.data();
                    setForm({
                        ...empty,
                        ...data,
                        date: data.date?.toDate ? data.date.toDate().toISOString().slice(0, 10) : data.date || "",
                    });
                } else {
                    setError("Event not found");
                }
            } catch (e) {
                setError(e.message || String(e));
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id, isNew, col]);

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError(null);
        try {
            if (!isNew) {
                const ref = doc(col, id);
                await updateDoc(ref, {
                    ...form,
                    updatedAt: serverTimestamp(),
                });
            } else {
                await addDoc(col, {
                    ...form,
                    createdAt: serverTimestamp(),
                });
            }
            navigate("/");
        } catch (e) {
            setError(e.message || String(e));
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="min-h-screen pt-32 pb-20 px-4 text-center text-white">Loading event...</div>;

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-black relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#4285F4]/10 rounded-full blur-[100px] pointer-events-none -z-10" />
            
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-extrabold font-heading text-white">
                        {!isNew ? "Edit Event" : "New Event"}
                    </h2>
                </div>
                
                {error && <p className="text-red-500 mb-4 font-bold">{error}</p>}
                
                <form className="bg-slate-900/60 backdrop-blur-md border border-slate-700/50 p-6 md:p-8 rounded-3xl" onSubmit={onSubmit}>
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-slate-300 mb-2">Title</label>
                        <input
                            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                            name="title" 
                            value={form.title} 
                            onChange={onChange} 
                            required 
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-bold text-slate-300 mb-2">Description</label>
                        <textarea
                            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                            name="description" 
                            value={form.description} 
                            onChange={onChange} 
                            rows={3} 
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-300 mb-2">
                                <Calendar className="w-4 h-4 text-[#4285F4]" /> Date
                            </label>
                            <input
                                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-300 mb-2">
                                <Clock className="w-4 h-4 text-[#FBBC04]" /> Time
                            </label>
                            <input
                                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                                type="text"
                                name="time"
                                value={form.time}
                                onChange={onChange}
                                placeholder="e.g., 10:00 AM"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-300 mb-2">
                                <MapPin className="w-4 h-4 text-[#EA4335]" /> Venue
                            </label>
                            <input
                                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                                name="venue" 
                                value={form.venue} 
                                onChange={onChange} 
                            />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-300 mb-2">
                                <User className="w-4 h-4 text-[#34A853]" /> Speaker
                            </label>
                            <input
                                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                                name="speaker" 
                                value={form.speaker} 
                                onChange={onChange} 
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="flex items-center gap-2 text-sm font-bold text-slate-300 mb-2">
                            <LinkIcon className="w-4 h-4 text-[#4285F4]" /> Registration Link
                        </label>
                        <input
                            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                            name="registrationLink" 
                            value={form.registrationLink} 
                            onChange={onChange} 
                            placeholder="https://gdg.community.dev/..."
                        />
                    </div>

                    <div className="mb-6">
                        <label className="flex items-center gap-2 text-sm font-bold text-slate-300 mb-2">
                            <ImageIcon className="w-4 h-4 text-[#EA4335]" /> GitHub Raw Image URL
                        </label>
                        <input
                            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                            name="imageUrl" 
                            value={form.imageUrl} 
                            onChange={onChange} 
                            placeholder="https://github.com/..."
                        />
                    </div>

                    <div className="flex gap-4 border-t border-slate-800 pt-6">
                        <button type="submit" className="flex-1 py-3 bg-[#4285F4] hover:bg-blue-600 text-white font-bold rounded-xl transition-colors" disabled={saving}>
                            {saving ? "Saving…" : !isNew ? "Save Changes" : "Create Event"}
                        </button>
                        <Link to="/admin" className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-center text-slate-300 font-bold rounded-xl transition-colors">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
