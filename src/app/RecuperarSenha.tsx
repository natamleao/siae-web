import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { InputField } from '../components/Input';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { authService } from '../services/authService';
import { AUTH, ERROR_MESSAGES, TIMINGS } from '../config/constants';
import { useAuth } from '../hooks/useAuth';

export function RecuperarSenha() {
    const [identifier, setIdentifier] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [isEmailMode, setIsEmailMode] = useState(true);
    const [timeLeft, setTimeLeft] = useState<number>(0);
    
    const { isLockedOut, getLockoutTimeRemaining } = useAuth();

    useEffect(() => {
        let timer: number | null = null;
        
        if (isLockedOut()) {
            const remaining = getLockoutTimeRemaining();
            setTimeLeft(Math.max(0, remaining));

            timer = window.setInterval(() => {
                const currentRemaining = getLockoutTimeRemaining();
                if (currentRemaining <= 0) {
                    if (timer) clearInterval(timer);
                    setTimeLeft(0);
                } else {
                    setTimeLeft(Math.max(0, currentRemaining));
                }
            }, 1000);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isLockedOut, getLockoutTimeRemaining]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isLockedOut()) return; 

        setLoading(true);

        try {
            const response = await authService.forgotPassword(identifier);
            toast.success(response.message || 'Email de recuperação enviado!');
            setIdentifier('');

        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error(ERROR_MESSAGES.SERVER_ERROR);
            }
        } finally {
            setLoading(false);
        }
    };

    const isButtonDisabled = !identifier || loading || isLockedOut();
    
    const secondsLeft = Math.ceil(timeLeft / 1000) % 60;
    const minutesLeft = Math.floor(timeLeft / 60000);

    return (
        <main className="flex flex-col min-h-screen">
            <Header />
            <ToastContainer />

            <section className="bg-white flex-grow flex w-full justify-center items-center p-6">
                <div className="max-w-6xl w-full rounded-lg shadow-2xl overflow-hidden flex flex-row border-2 border-gray-400">
                    
                    <div className="w-1/2 p-10 flex flex-col justify-center bg-gray-50">
                        
                        <h2 className="text-black text-2xl font-bold mb-4">Recuperação de senha</h2>
                        
                        <p className="text-gray-600 mb-6">
                            As instruções de redefinição de senha serão enviadas para seu e-mail institucional.
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                            
                            <InputField
                                id="identifier"
                                label={isEmailMode ? "E-mail institucional" : "Matrícula ou SIAPE"}
                                type={isEmailMode ? "email" : "number"}
                                placeholder={isEmailMode ? "ex:aluno@alu.ufc.br" : "ex: 12345678"}
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                required
                                disabled={isLockedOut()}
                            />
                            
                            <button
                                type="button"
                                onClick={() => setIsEmailMode(!isEmailMode)}
                                className="text-sm text-blue-700 underline self-start mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isLockedOut()}
                            >
                                {isEmailMode ? "Usar Matrícula/Siape" : "Usar E-mail Institucional"}
                            </button>
                            
                            <button
                                type="submit"
                                disabled={isButtonDisabled}
                                className={`
                                    mt-6 p-3 rounded-md font-semibold transition-all duration-300 w-full text-white 
                                    ${isButtonDisabled 
                                        ? 'bg-gray-400 cursor-not-allowed opacity-50' 
                                        : 'bg-blue-600 hover:bg-blue-700'
                                    } 
                                `}
                            >
                                {isLockedOut() 
                                    ? `Bloqueado (${minutesLeft}m ${secondsLeft}s)` 
                                    : loading 
                                        ? 'Processando...' 
                                        : 'Redefinir senha'
                                }
                            </button>
                            
                            <div className="flex justify-center mt-4">
                                <Link 
                                    to="/" 
                                    className="text-blue-700 hover:underline"
                                >
                                    Deseja voltar ao login?
                                </Link>
                            </div>

                        </form>
                    </div>

                    <div className="w-1/2">
                        <img 
                            src="/campus-russas.png"
                            alt="Prédio do Campus Russas da UFC"
                            className="w-full h-full object-cover"
                        />
                    </div>

                </div>
            </section>
            <Footer />
        </main>
    );
}