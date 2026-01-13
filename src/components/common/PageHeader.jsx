import React from "react";

const PageHeader = ({ title, subtitle, action }) => {
    return (
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
            <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-blue-600">
                    {title}
                </h1>
                {subtitle && (
                    <p className="mt-1 md:mt-2 text-sm text-gray-600">
                        {subtitle}
                    </p>
                )}
            </div>
            {action && (
                <div className="flex flex-wrap gap-2">
                    {action}
                </div>
            )}
        </div>

    );
};

export default PageHeader;
