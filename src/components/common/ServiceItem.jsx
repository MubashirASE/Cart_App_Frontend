import React from "react";

const ServiceItem = ({ icon, title, description }) => {
    return (
        <div className="flex justify-center items-center flex-col sm:p-20 p-12">
            <img src={icon} className="w-20" alt={title} />
            <span className="font-bold pt-5 uppercase text-sm">{title}</span>
            <span>{description}</span>
        </div>
    );
};

export default ServiceItem;
