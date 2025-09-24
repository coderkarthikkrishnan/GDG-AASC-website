// src/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from './authContext';
import { site } from './siteConfig';

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();
    if (loading) return <p>Loading…</p>;
    if (!user || user.email !== site.adminEmail) return <Navigate to="/" replace />;
    return children;
}
