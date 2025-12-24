import React from "react";

const SectionHeader = ({ title }) => {
    return (
        <div className="flex space-x-5">
            <div className="w-6 h-10 bg-blue-600 rounded-lg"></div>
            <div className="text-blue-600 flex items-center font-bold">
                {title}
            </div>
        </div>
    );
};

export default SectionHeader;
