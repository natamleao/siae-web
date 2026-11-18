import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { InputField } from '../components/Input';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { authService } from '../services/authService';
import { ERROR_MESSAGES } from '../config/constants';
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

            <section className="flex w-full flex-grow items-center justify-center bg-white p-4 sm:p-6">
                <div className="grid w-full max-w-5xl overflow-hidden rounded-lg border border-[#073989] bg-white shadow-[0_8px_18px_rgba(0,0,0,0.25)] md:grid-cols-2">
                    <div className="order-2 flex flex-col justify-center bg-[#ECE8E8] p-6 text-left sm:p-8 lg:p-10 xl:p-12 md:order-1">
                        <h2 className="mb-3 text-2xl font-bold leading-tight text-black sm:text-3xl">
                            Recuperação de senha
                        </h2>

                        <p className="mb-5 text-sm leading-5 text-black">
                            As instruções de redefinição de senha serão enviadas para seu e-mail institucional.
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col">
                            <div className="[&_input]:!border [&_input]:!border-[#999] [&_input]:!bg-white">
                                <InputField
                                    id="identifier"
                                    label={isEmailMode ? "E-mail institucional" : "Matrícula ou SIAPE"}
                                    type={isEmailMode ? "email" : "number"}
                                    placeholder={isEmailMode ? "ex:aluno@alu.ufc.br" : "ex: 12345678"}
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                    required
                                    disabled={isLockedOut()}
                                    labelClassName="!text-sm !font-normal !text-black "
                                />
                            </div>

                            <button
                                type="button"
                                onClick={() => setIsEmailMode(!isEmailMode)}
                                className="mt-2 self-start text-sm font-medium text-[#1058CC] underline disabled:cursor-not-allowed disabled:opacity-50"
                                disabled={isLockedOut()}
                            >
                                {isEmailMode ? "Usar Matrícula/Siape" : "Usar E-mail Institucional"}
                            </button>

                            <button
                                type="submit"
                                disabled={isButtonDisabled}
                                className={`mt-5 w-full self-center rounded-md px-7 py-2 font-semibold text-white transition-colors duration-300 sm:w-auto sm:min-w-[182px] ${
                                    isButtonDisabled
                                        ? 'cursor-not-allowed bg-gray-400 opacity-50'
                                        : 'bg-[#1058CC] hover:bg-[#073989]'
                                }`}
                            >
                                {isLockedOut() 
                                    ? `Bloqueado (${minutesLeft}m ${secondsLeft}s)` 
                                    : loading 
                                        ? 'Processando...' 
                                        : 'Redefinir senha'
                                }
                            </button>

                            <div className="mt-3 flex justify-center">
                                <Link
                                    to="/"
                                    className="text-sm text-[#1058CC] hover:underline"
                                >
                                    Deseja voltar ao login?
                                </Link>
                            </div>
                        </form>
                    </div>

                    <div className="relative order-1 min-h-48 sm:min-h-64 md:order-2 md:min-h-[336px]">
                        <img
                            src="/campus-russas.png"
                            alt="Prédio do Campus Russas da UFC"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}