import { useState } from "react";
import { InputField } from "../components/Input"; 
import React from 'react';
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function Login() {
    const [identifier, setIdentifier] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log({ identifier, password });
    };

    return (
        <main className="flex flex-col min-h-screen">
            <Header />
            <section className="bg-white flex-grow flex w-full justify-center items-center">
                <div className="w-1/2 flex flex-col items-center justify-center">
                    <img className="w-25 h-25" src="icone.png" alt="Ícone da Assistencia estudantil da UFC - Campus Russas" />
                    <h1 className="text-black text-3xl font-semibold max-w-8/12 text-center mt-8 mb-14">Sistema Integrado da Assistência Estudantil</h1>
                    <img className="w-40 h-10" src="brasao.png" alt="brasão da Universidade Federal do ceará" />
                </div>
                <div className="w-[0.5px] h-80 bg-gray-300"></div>
                <div className="text-black w-1/2 flex flex-col justify-center items-center">
                    <form onSubmit={handleSubmit} className="flex flex-col w-full items-center">
                        <h2 className="font-bold text-2xl">Entrar na conta</h2>
                        <div className="flex flex-col w-full items-center space-y-4 mt-6">
                            
                            <div className="w-2/4">
                                <InputField
                                    id="identifier"
                                    label="Matrícula ou SIAPE"
                                    type="number"
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                    required
                                />
                            </div>
                            
                            <div className="w-2/4">
                                <InputField
                                    id="password"
                                    label="Senha"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <a href="#" className="underline text-blue-800">Esqueceu a senha?</a>
                            </div>

                        </div>
                        <div className="w-2/4 flex justify-center my-7">
                            <button type="submit" className="bg-gray-400 w-2/4 rounded-md p-2 font-semibold hover:bg-blue-700 transition-all duration-300 hover:text-white">Entrar</button>
                        </div>
                        <div className="bg-gray-400 h-0.5 w-2/4 my-3"></div>
                        <div className="text-center">
                            <p>Não possui cadastro?</p>
                            <a href="#" className="underline text-blue-800">Cadastre-se aqui</a>
                        </div>
                    </form>
                </div>
            </section>
            <Footer />
        </main>
    );
}