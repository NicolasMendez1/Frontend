import React from 'react';

export default function InputCheckBox({ label, checked, onChange, required = false }) {
    return (
        <div className="flex space-x-2 items-center">
            <label className="block text-sm font-medium text-gray-700">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="w-4 h-4"
                required={required}
            />
        </div>
    );
} 