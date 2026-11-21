import { useContext } from 'react';
import { AuthContext } from './authContextDefinition';

export function useAuthContext() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuthContext deve ser usado dentro de AuthProvider');
    }

    return context;
}