// src/pages/EventEdit.jsx
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/common.css";
import "../styles/event-edit.css";

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
        if (!id || isNew) return;
        (async () => {
            try {
                const ref = doc(col, id);
                const snap = await getDoc(ref);
                if (snap.exists()) {
                    const data = snap.data();
                    setForm({
                        ...empty,
                        ...data,
                        // normalize Firestore Timestamp to string
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
        })();
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

    if (loading) return <p>Loading…</p>;
    return (
        <div className="container">
            <div className="pageHeader">
                <h2>{!isNew ? "Edit Event" : "New Event"}</h2>
                <Link className="btn" to="/">Back</Link>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form className="form" onSubmit={onSubmit}>
                <label>
                    Title
                    <input className="input" name="title" value={form.title} onChange={onChange} required />
                </label>
                <label>
                    Description
                    <textarea className="textarea" name="description" value={form.description} onChange={onChange} rows={3} />
                </label>
                <div className="grid2">
                    <label>
                        Date
                        <input
                            className="input"
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={onChange}
                            required
                        />
                    </label>
                    <label>
                        Time
                        <input
                            className="input"
                            type="text"
                            name="time"
                            value={form.time}
                            onChange={onChange}
                            placeholder="e.g., 10:00 AM"
                        />
                    </label>
                </div>
                <div className="grid2">
                    <label>
                        Venue
                        <input className="input" name="venue" value={form.venue} onChange={onChange} />
                    </label>
                    <label>
                        Speaker
                        <input className="input" name="speaker" value={form.speaker} onChange={onChange} />
                    </label>
                </div>
                <label>
                    Registration Link
                    <input className="input" name="registrationLink" value={form.registrationLink} onChange={onChange} />
                </label>
                <label>
                    Image URL
                    <input className="input" name="imageUrl" value={form.imageUrl} onChange={onChange} />
                </label>
                <label>
                    Type
                    <select className="select" name="type" value={form.type} onChange={onChange}>
                        <option value="upcoming">upcoming</option>
                        <option value="past">past</option>
                    </select>
                </label>
                <button className="btn" type="submit" disabled={saving}>
                    {saving ? "Saving…" : !isNew ? "Save Changes" : "Create Event"}
                </button>
            </form>
        </div>
    );
}
