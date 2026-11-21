import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/useAuthContext';

export function PublicRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, user } = useAuthContext();

    if (isAuthenticated) {
        if (user?.permissao === 'ALUNO') {
            return <Navigate to="/dashboard" replace />;
        }

        if (
            user?.permissao === 'TECNICO' ||
            user?.permissao === 'ASSISTENTE'
        ) {
            return <Navigate to="/paineladministrativo" replace />;
        }
    }

    return children;
}
