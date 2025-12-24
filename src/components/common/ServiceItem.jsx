import React from "react";

const ServiceItem = ({ icon, title, description }) => {
    return (
        <div className="flex justify-center items-center flex-col p-20">
            <img src={icon} className="w-20" alt={title} />
            <h2 className="font-bold pt-5 uppercase">{title}</h2>
            <h5>{description}</h5>
        </div>
    );
};

export default ServiceItem;
