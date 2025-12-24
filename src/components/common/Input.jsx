import React from "react";

const Input = ({
    label,
    type = "text",
    value,
    onChange,
    placeholder = "",
    className = "",
    name,
    error,
    ...props
}) => {
    return (
        <div className={`flex flex-col space-y-1 ${className}`}>
            {label && (
                <label className="text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${error ? "border-red-500" : "border-gray-300"
                    }`}
                {...props}
            />
            {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
    );
};

export default Input;
