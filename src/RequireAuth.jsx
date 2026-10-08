import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './authContext';

export default function RequireAuth({ children, fallback = null }) {
    const { user, loading } = useAuth?.() || {};
    const location = useLocation();

    if (loading) return fallback ?? null; // or a small spinner if you have one

    if (!user) {
        return <Navigate to="/" replace state={{ from: location }} />;
    }

    // Works as a wrapper or a route element
    return children ? children : <Outlet />;
}