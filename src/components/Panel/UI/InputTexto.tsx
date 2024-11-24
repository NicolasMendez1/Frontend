const estilo_text_input = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50";
const estilo_label = "block text-sm font-medium text-gray-700";

interface InputTextProps {  
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export default function InputText({ label, value, onChange, required }: InputTextProps) {
  return (
    <div>
      <label htmlFor={label} className={estilo_label}>{label}</label>
      <input
        type="text"
        id={label} 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={estilo_text_input}
        required={required}
      />
    </div>
  );
}