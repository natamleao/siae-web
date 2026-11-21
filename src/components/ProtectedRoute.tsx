import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/useAuthContext';
import type { Permissao } from '../types/auth';

interface ProtectedRouteProps {
    permissoesPermitidas?: Permissao[];
}

export function ProtectedRoute({
    permissoesPermitidas
}: ProtectedRouteProps) {
    const { isAuthenticated, user } = useAuthContext();

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (
        permissoesPermitidas &&
        (!user || !permissoesPermitidas.includes(user.permissao))
    ) {
        const destino = user?.permissao === 'ALUNO'
            ? '/dashboard'
            : user?.permissao === 'TECNICO' ||
              user?.permissao === 'ASSISTENTE'
                ? '/paineladministrativo'
                : '/';

        return <Navigate to={destino} replace />;
    }

    return <Outlet />;
}