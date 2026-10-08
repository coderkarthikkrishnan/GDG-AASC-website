import { Navigate } from 'react-router-dom';
import { useAuth } from './authContext';

export default function ProtectedRoute({ children }) {
    const { user, isAdmin, loading } = useAuth();
    if (loading) return <p>Loading…</p>;
    if (!user || !isAdmin) return <Navigate to="/" replace />;
    return children;
}
