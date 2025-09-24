import { useEffect, useMemo, useState } from 'react';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import '../styles/common.css';
import '../styles/resources.css';
import { useAuth } from '../authContext';
import { isAdmin } from '../admin';
import { isValidHttpUrl } from '../utils/url';

export default function Resources() {
    const { user } = useAuth();
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const colRef = useMemo(() => collection(db, 'resources'), []);

    useEffect(() => {
        const q = query(colRef, orderBy('eventName'));
        const unsub = onSnapshot(q, (snap) => {
            setRows(snap.docs.map(d => ({ id: d.id, ...d.data() })));
            setLoading(false);
        });
        return () => unsub();
    }, [colRef]);

    if (!user) {
        return (
            <div className="container">
                <div className="pageHeader"><h2>Resources</h2></div>
                <p>Please sign in to view resources.</p>
            </div>
        );
    }

    const onDelete = async (id) => {
        if (!isAdmin()) return;
        if (!confirm('Delete this resource?')) return;
        await deleteDoc(doc(db, 'resources', id));
    };

    return (
        <div className="container">
            <div className="pageHeader">
                <h2>Resources</h2>
                {isAdmin() && <Link className="btn" to="/resources/new">+ New Resource</Link>}
            </div>

            {loading ? <p>Loading…</p> : rows.length === 0 ? (
                <p>No resources yet.</p>
            ) : (
                <ul className="list">
                    {rows.map(r => (
                        <li key={r.id} className="card">
                            <div className="cardBody">
                                <div className="cardTitle"><strong>{r.eventName || 'Untitled event'}</strong></div>
                                {r.notes && <p className="notes">{String(r.notes)}</p>}
                                {Array.isArray(r.links) && r.links.length > 0 && (
                                    <div className="cardActions links">
                                        {r.links.map((lnk, idx) => {
                                            const isObj = typeof lnk === 'object' && lnk !== null;
                                            const label = isObj ? (lnk.label || `Link ${idx + 1}`) : `Link ${idx + 1}`;
                                            const url = isObj ? lnk.url : lnk;
                                            if (!url || !isValidHttpUrl(url)) return null;
                                            return (
                                                <a key={idx} className="btn link" href={url} target="_blank" rel="noopener noreferrer">
                                                    {label}
                                                </a>
                                            );
                                        })}
                                    </div>
                                )}
                                {isAdmin() && (
                                    <div className="cardActions" style={{ marginTop: 8 }}>
                                        <Link className="btn secondary" to={`/resources/edit/${r.id}`}>Edit</Link>
                                        <button className="btn danger" onClick={() => onDelete(r.id)}>Delete</button>
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}