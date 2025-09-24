// src/pages/Admin.jsx
import { Link } from 'react-router-dom';
import '../styles/common.css';
import '../styles/admin.css';

export default function Admin() {
    return (
        <div className="container">
            <h2>Admin Panel</h2>
            <div className="list">
                <div className="card"><div className="cardBody"><Link className="btn" to="/admin/posts">Manage Posts</Link></div></div>
                <div className="card"><div className="cardBody"><Link className="btn" to="/admin/team">Manage Team</Link></div></div>
                <div className="card"><div className="cardBody"><Link className="btn" to="/admin/gallery">Manage Gallery</Link></div></div>
                <div className="card"><div className="cardBody"><Link className="btn" to="/events">Manage Events</Link></div></div>
            </div>
        </div>
    );
}
