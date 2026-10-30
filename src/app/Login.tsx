import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputField } from "../components/Input"; 
import React from 'react';
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ToastContainer, toast } from 'react-toastify';
import { ERROR_MESSAGES } from "../config/constants";
import { useAuthContext } from "../context/AuthContext";


export function Login() {
    const [identifier, setIdentifier] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [identifierError, setIdentifierError] = useState<string>('');
    const navigate = useNavigate();
    const { login } = useAuthContext();

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setIdentifier(value);
        
        if (value && !validateEmail(value)) {
            setIdentifierError(ERROR_MESSAGES.INVALID_CREDENTIALS);
        } else {
            setIdentifierError('');
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (!validateEmail(identifier)) {
            setIdentifierError(ERROR_MESSAGES.INVALID_CREDENTIALS);
            return;
        }

        setLoading(true);

        try {
            await login(identifier, password);
            toast.success('Login realizado com sucesso!');
            console.log('Login bem-sucedido');
            setTimeout(() => {
                navigate('/dashboard');
            }, 1000);

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

    return (
        <main className="flex flex-col min-h-screen max-lg:h-screen">
            <Header />
            <ToastContainer />
            <section className="bg-white grow flex w-full justify-center items-center">
                <div className="w-1/2 flex flex-col items-center justify-center max-md:hidden">
                    <img className="w-25 h-25" src="icone.png" alt="Ícone da Assistencia estudantil da UFC - Campus Russas" />
                    <h2 className="text-black text-3xl font-semibold max-w-8/12 text-center mt-8 mb-14">Sistema Integrado da Assistência Estudantil</h2>
                    <img className="w-40 h-10" src="brasao.png" alt="brasão da Universidade Federal do ceará" />
                </div>
                <div className="w-[0.5px] h-80 bg-gray-300 max-md:hidden"></div>
                <div className="text-black w-1/2 flex flex-col justify-center items-center max-md:w-full">
                    <form onSubmit={handleSubmit} className="flex flex-col w-full items-center">
                        <h2 className="font-bold text-2xl">Entrar na conta</h2>
                        <div className="flex flex-col w-full items-center space-y-4 mt-6">
                            
                            <div className="w-2/4 max-md:w-3/4">
                                <InputField
                                    id="identifier"
                                    label="Email"
                                    type="email"
                                    value={identifier}
                                    onChange={handleIdentifierChange}
                                    error={identifierError}
                                    required
                                />
                            </div>
                            
                            <div className="w-2/4 max-md:w-3/4">
                                <InputField
                                    id="password"
                                    label="Senha"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                
                                <Link to="/recuperar-senha" className="underline text-blue-800">
                                    Esqueceu a senha?
                                </Link>
                            </div>

                        </div>
                        <div className="w-2/4 flex justify-center my-7">
                            <button 
                                type="submit" 
                                disabled={loading || !!identifierError}
                                className={`w-2/4 rounded-md p-2 font-semibold transition-all duration-300 ${
                                    loading || identifierError
                                    ? 'bg-gray-300 cursor-not-allowed' 
                                    : 'bg-gray-400 hover:bg-blue-700 hover:text-white'
                                }`}
                            >
                                {loading ? 'Entrando...' : 'Entrar'}
                            </button>
                        </div>
                        <div className="bg-gray-400 h-0.5 w-2/4 my-3"></div>
                        <div className="text-center">
                            <p>Não possui cadastro?</p>
                            <Link to="/cadastro" className="underline text-blue-800">Cadastre-se aqui</Link>
                        </div>
                    </form>
                </div>
            </section>
            <Footer />
        </main>
    );
}