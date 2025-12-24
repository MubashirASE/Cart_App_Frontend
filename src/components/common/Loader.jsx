import React from "react";

const Loader = ({ size = "md", color = "blue-600", text }) => {
    const sizes = {
        sm: "w-5 h-5 border-2",
        md: "w-8 h-8 border-4",
        lg: "w-12 h-12 border-4",
    };

    return (
        <div className="flex flex-col justify-center items-center space-y-3">
            <div
                className={`${sizes[size]} border-t-transparent border-${color} rounded-full animate-spin`}
            ></div>
            {text && <p className="text-gray-600 text-sm font-medium">{text}</p>}
        </div>
    );
};

export default Loader;
