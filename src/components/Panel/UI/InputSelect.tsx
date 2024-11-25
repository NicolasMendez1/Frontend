import React from 'react';

interface Option {
    [key: string]: any;
}

interface InputSelectProps {
    label: string;
    value: any;
    onChange: any;
    options: any;
    required?: boolean;
    placeholder?: string;
    valueKey?: string;
    labelKey?: string;
}

export default function InputSelect({ 
    label, 
    value, 
    onChange, 
    options, 
    required = false,
    placeholder = "Seleccione una opción",
    valueKey = "value",
    labelKey = "label"
}: InputSelectProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <select
                value={value}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required={required}
            >
                <option value="">{placeholder}</option>
                {options.map((option: Option) => (
                    <option key={option[valueKey]} value={option[valueKey]}>
                        {option[labelKey]}
                    </option>
                ))}
            </select>
        </div>
    );
} 