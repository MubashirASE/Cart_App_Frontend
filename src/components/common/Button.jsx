import React from "react";

const Button = ({
    children,
    onClick,
    className = "",
    variant = "primary",
    disabled = false,
    type = "button",
    ...props
}) => {
    const baseStyles = "py-2 px-6 rounded-lg transition-colors font-medium focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-blue-500 hover:bg-blue-600 text-white",
        secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800",
        outline: "border border-blue-500 text-blue-500 hover:bg-blue-50",
        danger: "bg-red-500 hover:bg-red-600 text-white",
    };

    const variantStyles = variants[variant] || variants.primary;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variantStyles} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
