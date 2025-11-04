import React from 'react';

interface InputProps {
    id: string;
    label: string;
    type: 'text' | 'number' | 'password' | 'email';
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

export const InputField: React.FC<InputProps> = ({
    id,
    label,
    type,
    value,
    onChange,
    required = false
}) => {
    return (
        <div className="flex flex-col space-y-0.5 w-full">
            <label htmlFor={id} className="text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                id={id}
                className="border-1 rounded-md px-3 py-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                type={type}
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    );
};