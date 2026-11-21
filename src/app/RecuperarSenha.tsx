import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { InputField } from '../components/Input';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { authService } from '../services/authService';
import { AUTH, ERROR_MESSAGES, TIMINGS } from '../config/constants';
import { useAuth } from '../hooks/useAuth';

export function RecuperarSenha() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');
    const isResetMode = Boolean(token);

    const [identifier, setIdentifier] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isEmailMode, setIsEmailMode] = useState(true);
    const [timeLeft, setTimeLeft] = useState(0);

    const { isLockedOut, getLockoutTimeRemaining } = useAuth();

    useEffect(() => {
        if (isResetMode) return;

        let timer: number | null = null;

        if (isLockedOut()) {
            const remaining = getLockoutTimeRemaining();
            setTimeLeft(Math.max(0, remaining));

            timer = window.setInterval(() => {
                const currentRemaining = getLockoutTimeRemaining();

                if (currentRemaining <= 0) {
                    if (timer !== null) clearInterval(timer);
                    setTimeLeft(0);
                } else {
                    setTimeLeft(Math.max(0, currentRemaining));
                }
            }, 1000);
        }

        return () => {
            if (timer !== null) clearInterval(timer);
        };
    }, [isResetMode, isLockedOut, getLockoutTimeRemaining]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!isResetMode && isLockedOut()) return;

        if (isResetMode) {
            let hasError = false;

            if (!newPassword) {
                setPasswordError('Nova senha é obrigatória');
                hasError = true;
            } else if (!authService.validatePasswordStrength(newPassword)) {
                setPasswordError(ERROR_MESSAGES.INVALID_PASSWORD_STRENGTH);
                hasError = true;
            } else {
                setPasswordError('');
            }

            if (!confirmPassword) {
                setConfirmPasswordError('Confirmação de senha é obrigatória');
                hasError = true;
            } else if (newPassword !== confirmPassword) {
                setConfirmPasswordError(ERROR_MESSAGES.PASSWORD_MISMATCH);
                hasError = true;
            } else {
                setConfirmPasswordError('');
            }

            if (hasError || !token) return;

            setLoading(true);

            try {
                const response = await authService.resetPassword(token, newPassword);
                toast.success(response.message || 'Senha redefinida com sucesso!');
                window.setTimeout(() => navigate('/'), TIMINGS.REDIRECT_DELAY);
            } catch (error: unknown) {
                toast.error(
                    error instanceof Error
                        ? error.message
                        : ERROR_MESSAGES.SERVER_ERROR
                );
            } finally {
                setLoading(false);
            }

            return;
        }

        setLoading(true);

        try {
            const response = await authService.forgotPassword(identifier);
            toast.success(
                response.message ||
                'Se os dados estiverem corretos, você receberá um link de recuperação.'
            );
            setIdentifier('');
        } catch (error: unknown) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : ERROR_MESSAGES.SERVER_ERROR
            );
        } finally {
            setLoading(false);
        }
    };

    const isLocked = !isResetMode && isLockedOut();

    const isButtonDisabled = loading || (
        isResetMode
            ? !newPassword || !confirmPassword
            : !identifier || isLocked
    );

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
                            {isResetMode ? 'Redefinir senha' : 'Recuperação de senha'}
                        </h2>

                        <p className="mb-5 text-sm leading-5 text-black">
                            {isResetMode
                                ? 'Defina sua nova senha de acesso ao SIAE.'
                                : 'As instruções de redefinição de senha serão enviadas para o e-mail associado à sua conta.'}
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col">
                            {isResetMode ? (
                                <>
                                    <div className="[&_input]:!border [&_input]:!border-[#999] [&_input]:!bg-white">
                                        <InputField
                                            id="newPassword"
                                            label="Nova senha"
                                            type="password"
                                            placeholder="Digite sua nova senha"
                                            value={newPassword}
                                            onChange={(e) => {
                                                setNewPassword(e.target.value);
                                                if (passwordError) setPasswordError('');
                                            }}
                                            required
                                            minLength={AUTH.MIN_PASSWORD_LENGTH}
                                            maxLength={AUTH.MAX_PASSWORD_LENGTH}
                                            error={passwordError}
                                            forceShowError={Boolean(passwordError)}
                                            showPasswordToggle
                                            labelClassName="!text-sm !font-normal !text-black"
                                        />
                                    </div>

                                    <p className="mt-2 text-xs leading-5 text-gray-700">
                                        A senha deve ter de 8 a 16 caracteres, incluindo letra maiúscula, letra minúscula, número e caractere especial.
                                    </p>

                                    <div className="mt-4 [&_input]:!border [&_input]:!border-[#999] [&_input]:!bg-white">
                                        <InputField
                                            id="confirmPassword"
                                            label="Confirmar nova senha"
                                            type="password"
                                            placeholder="Digite novamente sua nova senha"
                                            value={confirmPassword}
                                            onChange={(e) => {
                                                setConfirmPassword(e.target.value);
                                                if (confirmPasswordError) setConfirmPasswordError('');
                                            }}
                                            required
                                            minLength={AUTH.MIN_PASSWORD_LENGTH}
                                            maxLength={AUTH.MAX_PASSWORD_LENGTH}
                                            error={confirmPasswordError}
                                            forceShowError={Boolean(confirmPasswordError)}
                                            showPasswordToggle
                                            labelClassName="!text-sm !font-normal !text-black"
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="[&_input]:!border [&_input]:!border-[#999] [&_input]:!bg-white">
                                        <InputField
                                            id="identifier"
                                            label={isEmailMode ? 'E-mail institucional' : 'Matrícula ou SIAPE'}
                                            type={isEmailMode ? 'email' : 'number'}
                                            placeholder={isEmailMode ? 'ex: aluno@alu.ufc.br' : 'ex: 12345678'}
                                            value={identifier}
                                            onChange={(e) => setIdentifier(e.target.value)}
                                            required
                                            disabled={isLocked}
                                            labelClassName="!text-sm !font-normal !text-black"
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setIsEmailMode(!isEmailMode)}
                                        className="mt-2 self-start text-sm font-medium text-[#1058CC] underline disabled:cursor-not-allowed disabled:opacity-50"
                                        disabled={isLocked}
                                    >
                                        {isEmailMode ? 'Usar Matrícula/SIAPE' : 'Usar E-mail Institucional'}
                                    </button>
                                </>
                            )}

                            <button
                                type="submit"
                                disabled={isButtonDisabled}
                                className={`mt-5 w-full self-center rounded-md px-7 py-2 font-semibold text-white transition-colors duration-300 sm:w-auto sm:min-w-[182px] ${
                                    isButtonDisabled
                                        ? 'cursor-not-allowed bg-gray-400 opacity-50'
                                        : 'bg-[#1058CC] hover:bg-[#073989]'
                                }`}
                            >
                                {isLocked
                                    ? `Bloqueado (${minutesLeft}m ${secondsLeft}s)`
                                    : loading
                                        ? 'Processando...'
                                        : isResetMode
                                            ? 'Salvar nova senha'
                                            : 'Enviar link de recuperação'}
                            </button>

                            <div className="mt-3 flex justify-center">
                                <Link to="/" className="text-sm text-[#1058CC] hover:underline">
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
