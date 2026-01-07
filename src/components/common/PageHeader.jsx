import React from "react";

const PageHeader = ({ title, subtitle, action }) => {
    return (
        <div className="flex justify-between items-center mb-6">
            <div>
                <h1 className="text-3xl font-extrabold text-blue-600">
                    {title}
                </h1>
                {subtitle && (
                    <p className="mt-2 text-sm text-gray-600">
                        {subtitle}
                    </p>
                )}
            </div>
            {action && (
                <div>
                    {action}
                </div>
            )}
        </div>
    );
};

export default PageHeader;
