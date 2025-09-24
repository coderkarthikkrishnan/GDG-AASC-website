// src/pages/Gallery.jsx
import { useEffect, useMemo, useState } from 'react';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import '../styles/common.css';
import '../styles/gallery.css';
import { normalizeImageUrl } from '../utils/url';
import { isAdmin } from '../admin';
import { Link } from 'react-router-dom';

export default function Gallery() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const galCol = useMemo(() => collection(db, 'gallery'), []);

    useEffect(() => {
        const q = query(galCol, orderBy('uploadedAt', 'desc'));
        const unsub = onSnapshot(q, (snap) => {
            const rows = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            setItems(rows);
            setLoading(false);
        });
        return () => unsub();
    }, [galCol]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this image?")) {
            try {
                await deleteDoc(doc(db, "gallery", id));
            } catch (err) {
                console.error("Error deleting image:", err);
            }
        }
    };

    const fallback = [
        'https://picsum.photos/seed/gdg1/600/400',
        'https://picsum.photos/seed/gdg2/600/400',
        'https://picsum.photos/seed/gdg3/600/400',
    ];

    return (
        <div className="container">
            <div className="pageHeader">
                <h2>Gallery</h2>
                {isAdmin() && <Link className="btn" to="/admin/gallery">Upload Image</Link>}
            </div>
            {loading ? <p>Loading…</p> : (
                <div className="grid3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                    {(items.length ? items : fallback.map(u => ({ imageUrl: u, caption: '' }))).map((g, i) => (
                        <div key={g.id || g.imageUrl || i} style={{ position: 'relative' }}>
                            <img
                                src={normalizeImageUrl(g.imageUrl || g.url)}
                                alt={g.caption || 'event'}
                                style={{ width: '100%', borderRadius: 8 }}
                            />
                            {/* Delete overlay button */}
                            {isAdmin() && g.id && (
                                <button
                                    onClick={() => handleDelete(g.id)}
                                    style={{
                                        position: 'absolute',
                                        top: 8,
                                        right: 8,
                                        background: 'rgba(255,0,0,0.8)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: 24,
                                        height: 24,
                                        fontSize: 16,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        zIndex: 10
                                    }}
                                    title="Delete Image"
                                >
                                    ×
                                </button>
                            )}
                            {g.caption && <div style={{ marginTop: 4, color: '#5f6368', textAlign: 'center' }}>{g.caption}</div>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
