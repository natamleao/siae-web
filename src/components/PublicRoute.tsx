import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export function PublicRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuthContext();

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}
