type SelectOption = {
  value: string;
  label: string;
};

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  error?: string;
  forceShowError?: boolean;
  hint?: string;
}

export function SelectField({ id, label, value, onChange, options, error, forceShowError = false, hint }: SelectFieldProps) {
  const showError = Boolean(error) && forceShowError;
  const showBorderError = forceShowError && !value;

  return (
    <div className="flex flex-col gap-2  [&_label]:!text-[16px] [&_label]:!font-semibold [&_label]:!text-black">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={`rounded-md border px-3 py-[4.8px] text-[16px]  focus:outline-none focus:ring-1 ${
          showBorderError
            ? "border-red-500 text-[#636363] focus:border-red-500 focus:ring-red-500"
            : value
              ? "border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              : "border-gray-300 text-[#636363] focus:border-blue-500 focus:ring-blue-500"
        }`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hint && <p id={`${id}-hint`} className="text-xs text-gray-500 mt-1">{hint}</p>}
      {showError && <p id={`${id}-error`} className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
