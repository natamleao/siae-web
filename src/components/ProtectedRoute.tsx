import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/useAuthContext';

export function ProtectedRoute() {
    const { isAuthenticated } = useAuthContext();

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}