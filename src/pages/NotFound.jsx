// src/pages/NotFound.jsx
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="container" style={{ textAlign: 'center' }}>
            <h2>404 — Page Not Found</h2>
            <p>The page you’re looking for doesn’t exist.</p>
            <Link className="btn" to="/">Back to Home</Link>
        </div>
    );
}
