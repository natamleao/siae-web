import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useAuthContext } from '../context/AuthContext';
import type { User } from '../types/auth';

export function Dashboard() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { user, logout } = useAuthContext();

    useEffect(() => {
        const getUserData = async () => {
            try {
                
                setLoading(false);
            } catch (error) {
                console.error('Erro ao carregar dados do usuário:', error);
                logout();
                navigate('/');
            }
        };

        getUserData();
    }, [logout, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <main className="flex flex-col min-h-screen">
            <Header />

            <section className="bg-white flex-grow flex flex-col items-center justify-center p-8">
                <div className="max-w-md w-full border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center bg-gray-50">
                    <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Painel de Acesso</h1>
                    <p className="text-gray-600 mb-8">Login realizado com sucesso!</p>
                    
                    {user && (
                        <div className="bg-white p-4 rounded-lg border border-gray-200 mb-8 text-left">
                            <p className="text-xs text-gray-400 uppercase font-bold mb-1">Usuário Autenticado</p>
                            <p className="text-gray-700 font-medium truncate">{user.email}</p>
                        </div>
                    )}

                    <button 
                        onClick={handleLogout}
                        className="w-full bg-gray-800 hover:bg-black text-white font-semibold py-3 rounded-lg transition-colors"
                    >
                        Encerrar Sessão
                    </button>
                </div>
            </section>

            <Footer />
        </main>
    );
}