import React, { useState } from 'react';

interface InputProps {
    id: string;
    label: string;
    type: 'text' | 'number' | 'password' | 'email';
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    placeholder?: string;
    disabled?: boolean;
    error?: string;
    hint?: string;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    validatePassword?: boolean;
}

export const InputField: React.FC<InputProps> = ({
    id,
    label,
    type,
    value,
    onChange,
    required = false,
    placeholder,
    disabled,
    error,
    hint,
    minLength,
    maxLength,
    pattern,
    validatePassword = false,
}) => {
    const [touched, setTouched] = useState(false);

    const handleBlur = () => {
        setTouched(true);
    };

    const showError = touched && error;

    return (
        <div className="flex flex-col space-y-0.5 w-full">
            <label htmlFor={id} className="text-sm font-medium text-gray-700">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
                id={id}
                className={`border rounded-md px-3 py-1 text-gray-900 focus:outline-none focus:ring-2 transition-colors duration-200 ${
                    showError
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
                type={type}
                value={value}
                onChange={onChange}
                onBlur={handleBlur}
                required={required}
                placeholder={placeholder}
                disabled={disabled}
                minLength={minLength}
                maxLength={maxLength}
                pattern={pattern}
                aria-invalid={showError}
                aria-describedby={showError ? `${id}-error` : hint ? `${id}-hint` : undefined}
            />
            {showError && (
                <p id={`${id}-error`} className="text-xs text-red-500 mt-1">
                    {error}
                </p>
            )}
            {!showError && hint && (
                <p id={`${id}-hint`} className="text-xs text-gray-500 mt-1">
                    {hint}
                </p>
            )}
        </div>
    );
};
