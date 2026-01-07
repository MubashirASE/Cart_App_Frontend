import React from 'react';

const SkeletonLoader = () => {
    return (
        <div className="p-5 animate-pulse ">
            <div className="flex justify-center items-center flex-col pb-5">
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <div className="space-y-4">
                    <div className="h-10 bg-gray-200 rounded w-72"></div>
                    <div className="h-10 bg-gray-200 rounded  w-72"></div>
                    <div className="h-10 bg-gray-200 rounded  w-72"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                </div>
                <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-1"></div>
                    <div className="h-10 bg-gray-200 rounded mb-4"></div>
                    <div className="h-60 bg-gray-200 rounded"></div>
                </div>
            </div>
            <div className="flex justify-center mt-10">
                <div className="h-10 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
    );
};

export default SkeletonLoader;
