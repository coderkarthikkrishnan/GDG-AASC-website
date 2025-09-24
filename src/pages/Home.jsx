import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/common.css";
import "../styles/home.css";
import { isAdmin } from "../admin";
import devimg from '../assets/img1.png';

export default function Home() {
    const [nextEvent, setNextEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const eventsCol = useMemo(() => collection(db, "events"), []);

    useEffect(() => {
        const today = new Date().toISOString().slice(0, 10);
        const q = query(
            eventsCol,
            where("date", ">=", today),
            orderBy("date", "asc")
        );
        const unsub = onSnapshot(q, (snap) => {
            const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
            setNextEvent(rows[0] || null);
            setLoading(false);
        });
        return () => unsub();
    }, [eventsCol]);

    return (
        <div className="homeWrapper">
            {/* Hero Section */}
            <section className="heroGrid">
                <div className="heroText">
                    <h1>Connecting Student Developers Through Talks, Workshops, And Projects.</h1>
                    <Link className="btn" to="/events">see events</Link>
                </div>

                <img className="heroArt" src={devimg} alt="Developer illustration" />
            </section>

            {/* Next Event Section */}
            <section className="events">
                <h3>Next Event</h3>
                {loading ? (
                    <p>Loading…</p>
                ) : nextEvent ? (
                    <div className="card">
                        <div className="cardBody">
                            <div className="cardTitle"><strong>{nextEvent.title}</strong></div>
                            <div className="cardSubtitle">
                                {nextEvent.date} {nextEvent.time ? `• ${nextEvent.time}` : ""}
                            </div>
                            <p>{nextEvent.description}</p>
                            <div className="cardActions">
                                {isAdmin() ? (
                                    <>
                                        <Link className="btn" to={`/edit/${nextEvent.id}`}>Edit</Link>

                                    </>
                                ) : (
                                    nextEvent.registrationLink && (
                                        <a
                                            className="btn"
                                            href={nextEvent.registrationLink}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Register
                                        </a>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>No upcoming events. <Link to="/new">Create one</Link>.</p>
                )}
            </section>
        </div>
    );
}
