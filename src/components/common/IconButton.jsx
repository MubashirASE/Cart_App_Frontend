import React from "react";

const IconButton = ({ icon: Icon, onClick, variant = "primary", title, className = "" }) => {
    const variants = {
        primary: "text-blue-600 bg-blue-100 hover:bg-blue-200",
        danger: "text-red-500 bg-red-100 hover:bg-red-200",
        success: "text-green-600 bg-green-100 hover:bg-green-200",
        warning: "text-yellow-600 bg-yellow-100 hover:bg-yellow-200",
    };

    return (
        <button
            onClick={onClick}
            title={title}
            className={`inline-flex items-center px-2 py-2 text-sm font-medium rounded-lg transition-colors ${variants[variant]} ${className}`}
        >
            <Icon />
        </button>
    );
};

export default IconButton;
