import React from "react";

const SectionHeader = ({ title }) => {
    return (
        <div className="flex space-x-5">
            <div className="w-4 sm:w-4 h-10 bg-blue-600 sm:rounded-lg "></div>
            <div className="text-blue-600 flex items-center font-bold">
                {title}
            </div>
        </div>
    );
};

export default SectionHeader;
