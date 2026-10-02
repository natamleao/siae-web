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
        return AUTH.INSTITUTIONAL_EMAIL_REGEX.test(email);
    };

    const validateMatricula = (matricula: string): boolean => {
        return AUTH.MATRICULA_REGEX.test(matricula);
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!matricula) {
            newErrors.matricula = 'Matrícula é obrigatória';
        } else if (!validateMatricula(matricula)) {
            newErrors.matricula = 'Matrícula deve conter 6 dígitos';
        }

        if (!nomeCompleto) {
            newErrors.nomeCompleto = 'Nome completo é obrigatório';
        }

        if (!email) {
            newErrors.email = 'Email é obrigatório';
        } else if (!validateEmail(email)) {
            newErrors.email = 'Informe um e-mail institucional @alu.ufc.br';
        }

        if (!senha) {
            newErrors.senha = 'Senha é obrigatória';
        } else if (senha.length < AUTH.MIN_PASSWORD_LENGTH) {
            newErrors.senha = 'Senha deve ter no mínimo 8 caracteres';
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
                        <div className="flex flex-col w-[500px] max-md:w-3/4 items-center gap-[25px]">
                            <h2 className="font-semibold text-[36px] text-center w-full">Crie sua conta</h2>

                            <div className="flex flex-col w-full items-start space-y-4">
                            <div className="w-full">
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
                                    size="lg"
                                    required
                                />
                            </div>

                            <div className="w-full">
                                <InputField
                                    id="matricula"
                                    label="Matrícula"
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={6}
                                    placeholder="Sua matrícula no SIGAA"
                                    value={matricula}
                                    onChange={(e) => {
                                        const onlyDigits = e.target.value.replace(/\D/g, '');
                                        setMatricula(onlyDigits);
                                        if (errors.matricula) {
                                            setErrors({ ...errors, matricula: '' });
                                        }
                                    }}
                                    error={errors.matricula}
                                    valid={validateMatricula(matricula)}
                                    size="lg"
                                    required
                                />
                            </div>

                            <div className="w-full">
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
                                    valid={validateEmail(email)}
                                    placeholder="seuemail@alu.ufc.br"
                                    size="lg"
                                    required
                                />
                            </div>

                            <div className="w-full">
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
                                    valid={authService.validatePasswordStrength(senha)}
                                    tooltip="A senha deve conter: entre 8 e 16 caracteres, letra minúscula, letra maiúscula, número e caractere especial (!, @, #, $, %, &, *, -, _)"
                                    required
                                    placeholder="Digite sua senha"
                                    maxLength={AUTH.MAX_PASSWORD_LENGTH}
                                    size="lg"
                                    showPasswordToggle
                                />
                            </div>

                            <div className="w-full">
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
                                    valid={Boolean(confirmacaoSenha) && confirmacaoSenha === senha}
                                    maxLength={AUTH.MAX_PASSWORD_LENGTH}
                                    size="lg"
                                    showPasswordToggle
                                    required
                                />
                            </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isDisabled}
                                className={`w-[220px] rounded-[8px] px-[20px] py-[12px] text-[20px] font-semibold transition-all duration-300 ${
                                    isDisabled
                                    ? 'bg-gray-400 cursor-not-allowed text-black'
                                    : 'bg-[#1058cc] text-white hover:bg-blue-700'
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