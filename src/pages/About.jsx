// src/pages/About.jsx
import { site } from "../siteConfig";
import "../styles/about.css";
import { useEffect, useMemo, useState } from "react";
import { isValidHttpUrl, normalizeImageUrl } from "../utils/url";
import { collection, onSnapshot, orderBy, query, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { isAdmin } from "../admin";
import { Link } from "react-router-dom";

export default function About() {
    const [team, setTeam] = useState(site.team || []);
    const teamCol = useMemo(() => collection(db, "team"), []);

    // Fetch team members
    useEffect(() => {
        const q = query(teamCol, orderBy("order", "asc"));
        const unsub = onSnapshot(q, (snap) => {
            const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
            setTeam(rows.length ? rows : (site.team || []));
        });
        return () => unsub();
    }, [teamCol]);

    // Delete team member
    const onDelete = async (id, name) => {
        if (!isAdmin()) {
            alert("You do not have permission to delete this member.");
            return;
        }
        const ok = window.confirm(`Are you sure you want to delete team member "${name}"?`);
        if (!ok) return;

        try {
            await deleteDoc(doc(db, "team", id));
            alert(`Team member "${name}" deleted successfully.`);
        } catch (err) {
            console.error("Error deleting team member:", err);
            alert("Error deleting member: " + (err.message || String(err)));
        }
    };

    return (
        <div className="container about">
            <h2>About Us</h2>
            <p>
                Developer Student Club is a campus-based community group for students to fine-tune their skills and build applications that solve various campus & local setbacks. By joining in Alpha Arts and Science College–Developer Student Club, students can nurture their knowledge in a peer-to-peer learning environment and build solutions for local businesses and their community.
                <br /><br />
                It is open to any student, ranging from novice developers who are just starting, to advanced developers who want to enhance their skills further. It is intended to be a platform for students to learn and collaborate as they solve problems in their neighborhood.
                <br /><br />
                <strong>Opportunities DSCs provide to students:</strong>
                <ul>
                    <li>Grow their knowledge of developer technologies through workshops and events.</li>
                    <li>Gain industry experience by solving problems for local organizations.</li>
                    <li>Showcase prototypes and solutions to their local community and leaders.</li>
                    <li>Network with tech leaders and other students.</li>
                    <li>Get inspiration to become world-class developers and change makers.</li>
                </ul>
            </p>

            <div className="pageHeader">
                <h3>The Team</h3>
                {isAdmin() && <Link className="btn" to="/admin/team">+ Add Member</Link>}
            </div>

            <div className="grid3">
                {team.map((m) => (
                    <div key={m.id || m.name} className="card">
                        <div className="cardBody">
                            {m.photoUrl && isValidHttpUrl(m.photoUrl) && (
                                <img className="cardImg" src={normalizeImageUrl(m.photoUrl)} alt={m.name} />
                            )}
                            <div className="cardTitle"><strong>{m.name}</strong></div>
                            <div className="cardSubtitle">{m.role}</div>
                            <div className="cardActions" style={{ marginTop: 8, display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                {m.linkedin && isValidHttpUrl(m.linkedin) && (
                                    <a className="btn link" href={m.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                                )}
                                {m.github && isValidHttpUrl(m.github) && (
                                    <a className="btn link" href={m.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                                )}
                                {isAdmin() && (
                                    <>
                                        <Link className="btn secondary" to={`/admin/team/${m.id}`}>Edit</Link>
                                        <button
                                            className="btn danger"
                                            type="button"
                                            onClick={() => onDelete(m.id, m.name)}
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
