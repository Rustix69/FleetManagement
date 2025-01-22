interface FormFieldProps {
    label: string;
    type?: string;
    placeholder?: string;
    options?: string[];
    value?: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  }
  
  function FormField({
    label,
    type = 'text',
    placeholder = '',
    options,
    value,
    name,
    onChange,
  }: FormFieldProps) {
    return (
      <div>
        <label className="block text-sm font-medium mb-2 dark:text-gray-300">{label}</label>
        {options ? (
          <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-4 py-2 rounded-lg dark:bg-gray-700 bg-white border dark:border-gray-600 border-gray-300 focus:ring-2 focus:ring-purple-500 dark:text-white"
          >
            <option value="">Select {label}</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            className="w-full px-4 py-2 rounded-lg dark:bg-gray-700 bg-white border dark:border-gray-600 border-gray-300 focus:ring-2 focus:ring-purple-500 dark:text-white"
          />
        )}
      </div>
    );
  }
  
  export default FormField;  