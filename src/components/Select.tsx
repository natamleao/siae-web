import React, { useState } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  required?: boolean;
  disabled?: boolean;
  error?: string;
  hint?: string;
}

export const SelectField: React.FC<SelectProps> = ({
  id,
  label,
  value,
  onChange,
  options,
  required = false,
  disabled = false,
  error,
  hint,
}) => {
  const [touched, setTouched] = useState(false);

  const handleBlur = () => {
    setTouched(true);
  };

  const showError = touched && !!error;

  return (
    <div className="flex flex-col space-y-0.5 w-full">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        id={id}
        className={`border rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 transition-colors duration-200 ${
          showError
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
        }`}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        required={required}
        disabled={disabled}
        aria-invalid={showError}
        aria-describedby={showError ? `${id}-error` : hint ? `${id}-hint` : undefined}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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
