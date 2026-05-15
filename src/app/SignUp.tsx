import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { InputField } from "../components/Input";
import { authService } from "../services/authService";
import { ERROR_MESSAGES, TIMINGS, AUTH } from "../config/constants";

export function SignUp() {
    const [matricula, setMatricula] = useState("");
    const [nomeCompleto, setNomeCompleto] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmacaoSenha, setConfirmacaoSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const navigate = useNavigate();

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!matricula) {
            newErrors.matricula = 'Matrícula é obrigatória';
        } else if (!/^\d+$/.test(matricula)) {
            newErrors.matricula = 'Matrícula deve conter apenas números';
        }

        if (!nomeCompleto) {
            newErrors.nomeCompleto = 'Nome completo é obrigatório';
        }

        if (!email) {
            newErrors.email = 'Email é obrigatório';
        } else if (!validateEmail(email)) {
            newErrors.email = 'Email inválido';
        }

        if (!senha) {
            newErrors.senha = 'Senha é obrigatória';
        } else if (!authService.validatePasswordStrength(senha)) {
            newErrors.senha = ERROR_MESSAGES.INVALID_PASSWORD_STRENGTH;
        }

        if (!confirmacaoSenha) {
            newErrors.confirmacaoSenha = 'Confirmação de senha é obrigatória';
        } else if (senha !== confirmacaoSenha) {
            newErrors.confirmacaoSenha = ERROR_MESSAGES.PASSWORD_MISMATCH;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const response = await authService.register(email, senha, matricula);
            toast.success(response.message || 'Cadastro realizado com sucesso!');

            setTimeout(() => navigate("/"), TIMINGS.REDIRECT_DELAY);

        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error(ERROR_MESSAGES.SERVER_ERROR);
            }
        } finally {
            setLoading(false);
        }
    }

    const hasErrors = Object.values(errors).some(Boolean);
    const isDisabled = loading || !email || !senha || !matricula || !confirmacaoSenha || hasErrors;

    return (
        <main className="flex flex-col min-h-screen max-lg:h-screen">
            <Header />
            <ToastContainer />
            <section className="bg-white grow flex w-full justify-center items-center py-12">
                <div className="text-black w-full flex flex-col justify-center items-center">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col w-full items-center"
                    >
                        <h2 className="font-bold text-2xl mb-6">Crie sua conta</h2>

                        {/* <div className="w-2/4 max-md:w-3/4 mb-6">
                            <div className="bg-gray-200 rounded p-1">
                                <div className="bg-blue-600 text-white text-sm font-medium text-center py-2 rounded">
                                    Estudante
                                </div>
                            </div>
                        </div> */}

                        <div className="flex flex-col w-full items-center space-y-4">
                            <div className="w-1/3 max-md:w-3/4">
                                <InputField
                                    id="nomeCompleto"
                                    label="Nome Completo"
                                    type="text"
                                    placeholder="Seu nome completo"
                                    value={nomeCompleto}
                                    onChange={(e) => {
                                        setNomeCompleto(e.target.value);
                                        if (errors.nomeCompleto) {
                                            setErrors({ ...errors, nomeCompleto: '' });
                                        }
                                    }}
                                    error={errors.nomeCompleto}
                                    required
                                />
                            </div>

                            <div className="w-1/3 max-md:w-3/4">
                                <InputField
                                    id="matricula"
                                    label="Matrícula"
                                    type="number"
                                    placeholder="Sua matrícula no SIGAA"
                                    value={matricula}
                                    onChange={(e) => {
                                        setMatricula(e.target.value);
                                        if (errors.matricula) {
                                            setErrors({ ...errors, matricula: '' });
                                        }
                                    }}
                                    error={errors.matricula}
                                    required
                                />
                            </div>

                            <div className="w-1/3 max-md:w-3/4">
                                <InputField
                                    id="email"
                                    label="E-mail institucional"
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (errors.email) {
                                            setErrors({ ...errors, email: '' });
                                        }
                                    }}
                                    error={errors.email}
                                    placeholder="seuemail@alu.ufc.br"
                                    required
                                />
                            </div>

                            <div className="w-1/3 max-md:w-3/4">
                                <InputField
                                    id="password"
                                    label="Senha"
                                    type="password"
                                    value={senha}
                                    onChange={(e) => {
                                        setSenha(e.target.value);
                                        if (errors.senha) {
                                            setErrors({ ...errors, senha: '' });
                                        }
                                    }}
                                    error={errors.senha}
                                    hint="Mínimo 8 caracteres, uma letra maiúscula e um número"
                                    required
                                    placeholder="Digite sua senha"
                                />
                            </div>

                            <div className="w-1/3 max-md:w-3/4">
                                <InputField
                                    id="confirmPassword"
                                    label="Confirme sua senha"
                                    type="password"
                                    value={confirmacaoSenha}
                                    onChange={(e) => {
                                        setConfirmacaoSenha(e.target.value);
                                        if (errors.confirmacaoSenha) {
                                            setErrors({ ...errors, confirmacaoSenha: '' });
                                        }
                                    }}
                                    error={errors.confirmacaoSenha}
                                    required
                                />
                            </div>
                        </div>

                        <div className="w-1/3 max-md:w-3/4 flex justify-center mt-8">
                            <button
                                type="submit"
                                disabled={isDisabled}
                                className={`w-1/2 mx-auto rounded-md p-2 font-semibold transition-all duration-300 ${
                                    isDisabled 
                                    ? 'bg-gray-400 cursor-not-allowed text-black' 
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                            >
                                {loading ? "Cadastrando..." : "Cadastrar"}
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            <Footer />
        </main>
    );
}