// src/pages/Events.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { collection, onSnapshot, orderBy, query, doc, deleteDoc } from "firebase/firestore";
import { isAdmin } from "../admin";
import "../styles/common.css";
import "../styles/events.css";
import { db } from "../firebase";

export default function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const eventsCol = useMemo(() => collection(db, "events"), []);

    useEffect(() => {
        const q = query(eventsCol, orderBy("date", "desc"));
        const unsub = onSnapshot(q, (snap) => {
            const rows = snap.docs.map((d) => {
                const data = d.data();
                return {
                    id: d.id,
                    ...data,
                    // normalize Firestore Timestamp or leave as string
                    date: data.date?.toDate ? data.date.toDate().toISOString().slice(0, 10) : data.date,
                };
            });
            setEvents(rows);
            setLoading(false);
        });
        return () => unsub();
    }, [eventsCol]);

    const today = new Date().toISOString().slice(0, 10);
    const upcoming = events.filter((e) => e.date >= today).sort((a, b) => a.date.localeCompare(b.date));
    const past = events.filter((e) => e.date < today).sort((a, b) => b.date.localeCompare(a.date));

    const onDelete = async (id) => {
        if (!confirm("Delete this event?")) return;
        await deleteDoc(doc(eventsCol, id));
    };

    return (
        <div className="container">
            <div className="pageHeader">
                <h2>Events</h2>
                {isAdmin() && <Link className="btn" to="/edit/new">+ New Event</Link>}
            </div>
            {loading ? (
                <p>Loading…</p>
            ) : (
                <>
                    <section>
                        <h3>Upcoming Events</h3>
                        {upcoming.length === 0 ? (
                            <p>No upcoming events.</p>
                        ) : (
                            <ul className="list">
                                {upcoming.map((ev) => (
                                    <li key={ev.id} className="card">
                                        <div className="cardBody">
                                            <div className="cardTitle"><strong>{ev.title}</strong></div>
                                            <div className="cardSubtitle">
                                                {ev.date} {ev.time ? `• ${ev.time}` : ""}
                                            </div>
                                            <p className="card-text">{ev.description}</p>
                                            <div className="cardActions">
                                                {isAdmin() && (
                                                    <>
                                                        <Link className="btn secondary" to={`/edit/${ev.id}`}>Edit</Link>
                                                        <button className="btn link" onClick={() => onDelete(ev.id)}>Delete</button>
                                                    </>
                                                )}
                                                {ev.registrationLink && (
                                                    <a className="btn" href={ev.registrationLink} target="_blank" rel="noreferrer">Register</a>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                    <section>
                        <h3>Past Events</h3>
                        {past.length === 0 ? (
                            <p>No past events yet.</p>
                        ) : (
                            <ul className="list">
                                {past.map((ev) => (
                                    <li key={ev.id} className="card">
                                        <div className="cardBody">
                                            <div className="cardTitle"><strong>{ev.title}</strong></div>
                                            <div className="cardSubtitle">
                                                {ev.date} {ev.time ? `• ${ev.time}` : ""}
                                            </div>
                                            {ev.description && <p className="card-text">{ev.description}</p>}
                                            <div className="cardActions">
                                                {isAdmin() && (
                                                    <>
                                                        <Link className="btn secondary" to={`/edit/${ev.id}`}>Edit</Link>
                                                        <button className="btn link" onClick={() => onDelete(ev.id)}>Delete</button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                </>
            )}
        </div>
    );
}
