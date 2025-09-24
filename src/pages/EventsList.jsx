// src/pages/EventsList.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

export default function EventsList() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const eventsCol = useMemo(() => collection(db, "events"), []);

    useEffect(() => {
        const q = query(eventsCol, orderBy("date", "asc"));
        const unsub = onSnapshot(
            q,
            (snap) => {
                const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
                setEvents(rows);
                setLoading(false);
            },
            (err) => {
                console.error("Realtime error:", err);
                setError(err.message || String(err));
                setLoading(false);
            }
        );
        return () => unsub();
    }, [eventsCol]);

    if (loading) return <p>Loading events…</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

    return (
        <div className="container">
            <div className="page-header">
                <h2>Events (Realtime)</h2>
                <Link className="btn" to="/new">+ New Event</Link>
            </div>
            {events.length === 0 ? (
                <p>No events yet. Use "New Event" or the Seed button on the home page.</p>
            ) : (
                <ul className="list">
                    {events.map((ev) => (
                        <li key={ev.id} className="card">
                            <div className="card-body">
                                <div className="card-title">
                                    <strong>{ev.title || "Untitled"}</strong>
                                </div>
                                <div className="card-subtitle">
                                    {ev.date} {ev.time ? `• ${ev.time}` : ""}
                                </div>
                                {ev.description && (
                                    <p className="card-text">{ev.description}</p>
                                )}
                                <div className="card-meta">
                                    {ev.venue && <span>📍 {ev.venue}</span>}
                                    {ev.speaker && <span> • 🎤 {ev.speaker}</span>}
                                    {ev.type && <span> • 🏷️ {ev.type}</span>}
                                </div>
                                <div className="card-actions">
                                    <Link className="btn secondary" to={`/edit/${ev.id}`}>Edit</Link>
                                    {ev.registrationLink && (
                                        <a className="btn link" href={ev.registrationLink} target="_blank" rel="noreferrer">Register</a>
                                    )}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
