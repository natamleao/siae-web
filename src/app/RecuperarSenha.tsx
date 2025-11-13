import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { InputField } from '../components/Input';
import { Link } from 'react-router-dom';

const MAX_ATTEMPTS = 3;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutos

function FeedbackModal({ message, type }: { message: string | null, type: 'success' | 'error' | 'loading' | null }) {
    if (!message) return null;
    
    const baseStyle = "absolute top-4 w-1/2 p-3 text-center rounded shadow-lg z-10";
    let style = baseStyle;
    
    if (type === 'success') style += ' bg-green-100 text-green-800';
    if (type === 'error') style += ' bg-red-100 text-red-800';
    if (type === 'loading') style += ' bg-blue-100 text-blue-800';
    
    return (
        <div className="flex justify-center w-full">
            <div className={style}>
                {type === 'loading' ? "Processando solicitação..." : message}
            </div>
        </div>
    );
}

export function RecuperarSenha() {
    const [identifier, setIdentifier] = useState<string>('');
    const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
    const [feedbackType, setFeedbackType] = useState<'success' | 'error' | 'loading' | null>(null);
    const [isEmailMode, setIsEmailMode] = useState(true);

    const [lockoutEnd, setLockoutEnd] = useState<number>(() => {
        const storedTime = localStorage.getItem('siae_lockout_end');
        return storedTime ? parseInt(storedTime, 10) : 0;
    });
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const isLockedOut = lockoutEnd > Date.now();

    useEffect(() => {
        let timer: number | null = null;
        
        if (isLockedOut) {
            const remaining = lockoutEnd - Date.now();
            setTimeLeft(Math.max(0, remaining));

            timer = setInterval(() => {
                const currentRemaining = lockoutEnd - Date.now();
                if (currentRemaining <= 0) {
                    localStorage.removeItem('siae_lockout_end');
                    localStorage.removeItem('siae_fail_count');
                    clearInterval(timer!);
                    setLockoutEnd(0);
                }
                setTimeLeft(Math.max(0, currentRemaining));
            }, 1000);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [lockoutEnd, isLockedOut]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isLockedOut) return; 

        setFeedbackMessage(null); 
        setFeedbackType('loading');

        setTimeout(() => {
            const userExists = identifier.toLowerCase().includes('sucesso') || identifier.toLowerCase().includes('alu.ufc.br');
            const systemFailed = Math.random() < 0.1;
            
            if (lockoutEnd > Date.now()) {
                setFeedbackMessage(`Muitas tentativas falhas. Tente novamente em 15 minutos.`);
                setFeedbackType('error');
                return;
            }

            if (systemFailed) {
                setFeedbackMessage("Não foi possível enviar o link. Tente novamente mais tarde.");
                setFeedbackType('error');
                return;
            }
            
            if (!userExists) {
                let failCount = parseInt(localStorage.getItem('siae_fail_count') || '0', 10) + 1;
                localStorage.setItem('siae_fail_count', failCount.toString());

                if (failCount >= MAX_ATTEMPTS) {
                    const newLockoutEnd = Date.now() + LOCKOUT_DURATION_MS;
                    localStorage.setItem('siae_lockout_end', newLockoutEnd.toString());
                    setLockoutEnd(newLockoutEnd);
                    setFeedbackMessage(`Você excedeu o limite de ${MAX_ATTEMPTS} tentativas. Tente novamente em 15 minutos.`);
                    setFeedbackType('error');
                } else {
                    setFeedbackMessage("Usuário não encontrado. Verifique os dados informados.");
                    setFeedbackType('error');
                }
            } else {
                localStorage.removeItem('siae_fail_count');
                setFeedbackMessage("Enviamos instruções de redefinição de senha para seu e-mail institucional.");
                setFeedbackType('success');
            }
        }, 2000);
    };

    const isButtonDisabled = !identifier || feedbackType === 'loading' || isLockedOut;
    
    const secondsLeft = Math.ceil(timeLeft / 1000) % 60;
    const minutesLeft = Math.ceil(timeLeft / 60000);

    return (
        <main className="flex flex-col min-h-screen">
            <Header />
            
            <FeedbackModal message={feedbackMessage} type={feedbackType} /> 

            <section className="bg-white flex-grow flex w-full justify-center items-center p-8">
                <div className="max-w-4xl w-full rounded-lg shadow-2xl overflow-hidden flex flex-row border-2 border-gray-400">
                    
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
                                placeholder="ex:aluno@alu.ufc.br"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                required
                                disabled={isLockedOut}
                            />
                            
                            <button
                                type="button"
                                onClick={() => setIsEmailMode(!isEmailMode)}
                                className="text-sm text-blue-700 underline self-start mt-1"
                                disabled={isLockedOut}
                            >
                                {isEmailMode ? "Usar Matrícula/Siape" : "Usar E-mail Institucional"}
                            </button>
                            
                            <button
                                type="submit"
                                disabled={isButtonDisabled}
                                className={`
                                    mt-6 p-3 rounded-md font-semibold transition-all duration-300 w-full text-white 
                                    bg-blue-600 hover:bg-blue-700 cursor-pointer
                                    ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''} 
                                `}
                            >
                                {isLockedOut 
                                    ? `Bloqueado (${minutesLeft}m ${secondsLeft}s)` 
                                    : feedbackType === 'loading' 
                                        ? 'Processando solicitação...' 
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
