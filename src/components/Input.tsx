import React, { useState } from 'react';
import { FaCircleCheck, FaCircleXmark, FaEye, FaEyeSlash } from 'react-icons/fa6';

// Ícone "Ajuda tooltip" exportado do Figma (node 336:2434), fill #073989.
const HelpTooltipIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} width="22" height="23" viewBox="0 0 22 22.6316" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M11 0C17.0753 0 22 4.9247 22 11C22 17.0753 17.0753 22 11 22C4.9247 22 0 17.0753 0 11C0 4.9247 4.9247 0 11 0ZM11 15.4C10.7083 15.4 10.4285 15.5159 10.2222 15.7222C10.0159 15.9285 9.9 16.2083 9.9 16.5C9.9 16.7917 10.0159 17.0715 10.2222 17.2778C10.4285 17.4841 10.7083 17.6 11 17.6C11.2917 17.6 11.5715 17.4841 11.7778 17.2778C11.9841 17.0715 12.1 16.7917 12.1 16.5C12.1 16.2083 11.9841 15.9285 11.7778 15.7222C11.5715 15.5159 11.2917 15.4 11 15.4ZM11 4.95C9.94245 4.95 8.92821 5.37011 8.18041 6.11791C7.43261 6.86571 7.0125 7.87995 7.0125 8.9375C7.0125 9.22924 7.12839 9.50903 7.33468 9.71532C7.54097 9.92161 7.82076 10.0375 8.1125 10.0375C8.40424 10.0375 8.68403 9.92161 8.89032 9.71532C9.09661 9.50903 9.2125 9.22924 9.2125 8.9375C9.21286 8.61304 9.30153 8.2948 9.469 8.0169C9.63647 7.739 9.87642 7.51192 10.1631 7.36001C10.4498 7.20811 10.7725 7.1371 11.0965 7.15461C11.4204 7.17212 11.7336 7.27748 12.0022 7.4594C12.2709 7.64132 12.485 7.89294 12.6215 8.18727C12.7581 8.4816 12.8119 8.80754 12.7773 9.13015C12.7427 9.45276 12.6209 9.75987 12.4251 10.0185C12.2292 10.2772 11.9666 10.4777 11.6655 10.5985C10.9219 10.8955 9.9 11.6567 9.9 12.925V13.2C9.9 13.4917 10.0159 13.7715 10.2222 13.9778C10.4285 14.1841 10.7083 14.3 11 14.3C11.2917 14.3 11.5715 14.1841 11.7778 13.9778C11.9841 13.7715 12.1 13.4917 12.1 13.2C12.1 12.9316 12.155 12.7974 12.3871 12.683L12.4828 12.639C13.3417 12.2935 14.0536 11.6599 14.4966 10.847C14.9396 10.0341 15.0859 9.09236 14.9106 8.18332C14.7353 7.27428 14.2493 6.45454 13.5358 5.86462C12.8223 5.2747 11.9258 4.95135 11 4.95Z"
            fill="#073989"
        />
    </svg>
);

interface InputProps {
    id: string;
    label: string;
    labelClassName?: string;
    type: 'text' | 'number' | 'password' | 'email' | 'date';
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    placeholder?: string;
    disabled?: boolean;
    error?: string;
    hint?: string;
    tooltip?: string;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    forceShowError?: boolean;
    valid?: boolean;
    /** 'md' (padrão, usado em Login/Recuperar Senha/formulários) ou 'lg' (spec exata do Figma da tela de Cadastro). */
    size?: 'md' | 'lg';
    /** Exibe o botão de mostrar/ocultar senha. Opt-in para não afetar campos de senha já existentes (ex: Login). */
    showPasswordToggle?: boolean;
    inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
}

export const InputField: React.FC<InputProps> = ({
    id,
    label,
    labelClassName,
    type,
    value,
    onChange,
    required = false,
    placeholder,
    disabled,
    error,
    hint,
    tooltip,
    minLength,
    maxLength,
    pattern,
    forceShowError = false,
    valid = false,
    size = 'md',
    inputMode,
    showPasswordToggle = false,
}) => {
    const [touched, setTouched] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleBlur = () => {
        setTouched(true);
    };

    const showError = Boolean(error) && (touched || forceShowError);
    const showValid = valid && !showError;
    const isPassword = type === 'password' && showPasswordToggle;
    const inputType = isPassword && showPassword ? 'text' : type;
    const isLg = size === 'lg';

    return (
        <div
            className={`flex flex-col space-y-2 w-full [&_label]:!text-black ${
                isLg ? '[&_label]:!text-[20px] [&_label]:!font-normal' : '[&_label]:!text-[16px] [&_label]:!font-semibold'
            }`}
        >
            <label htmlFor={id} className={`flex items-center ${isLg ? 'gap-2' : 'gap-1.5'} text-sm font-medium text-gray-700 ${labelClassName ?? ''}`}>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
                {tooltip && (
                    <span className="relative inline-flex group">
                        <HelpTooltipIcon className="cursor-help" />
                        <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-1 w-56 -translate-x-1/2 rounded-md bg-gray-800 p-2 text-xs font-normal text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                            {tooltip}
                        </span>
                    </span>
                )}
            </label>
            <div className="relative w-full">
                <input
                    id={id}
                    className={`border px-3 w-full text-gray-900 focus:outline-none focus:ring-2 transition-colors duration-200 ${
                        isLg ? 'rounded-[8px] h-[38px] text-[16px] placeholder:text-black/70' : 'rounded-md py-1'
                    } ${isPassword || showError || showValid ? 'pr-9' : ''} ${
                        showError
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                            : showValid
                            ? 'border-green-500 focus:ring-green-500 focus:border-green-500'
                            : isLg
                            ? 'border-black/50 focus:ring-blue-500 focus:border-blue-500'
                            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    type={inputType}
                    inputMode={inputMode}
                    value={value}
                    onChange={onChange}
                    onBlur={handleBlur}
                    required={required}
                    placeholder={placeholder}
                    disabled={disabled}
                    minLength={minLength}
                    maxLength={maxLength}
                    pattern={pattern}
                    aria-invalid={showError ? 'true' : 'false'}
                    aria-describedby={hint ? `${id}-hint${showError ? ` ${id}-error` : ''}` : showError ? `${id}-error` : undefined}
                />
                {isPassword ? (
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                        tabIndex={-1}
                    >
                        {showPassword ? <FaEye size={16} /> : <FaEyeSlash size={16} />}
                    </button>
                ) : showError ? (
                    <FaCircleXmark className="absolute right-2 top-1/2 -translate-y-1/2 !text-red-500" size={18} />
                ) : showValid ? (
                    <FaCircleCheck className="absolute right-2 top-1/2 -translate-y-1/2 !text-green-500" size={18} />
                ) : null}
            </div>
            {hint && (
                <p id={`${id}-hint`} className="text-xs text-gray-500 mt-1">
                    {hint}
                </p>
            )}
            {showError && (
                <p id={`${id}-error`} className="text-xs text-red-500 mt-1">
                    {error}
                </p>
            )}
        </div>
    );
};