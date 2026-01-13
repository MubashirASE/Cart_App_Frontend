import React from "react";
import { FaEnvelope } from "react-icons/fa";
import { HiPhone } from "react-icons/hi";

const ContactInfo = () => {
    return (
        <div className=" h-auto p-6 space-y-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="hidden:border-b sm:border-b pb-5 border-gray-400 space-y-4 p-3">
                <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <HiPhone className="text-white" />
                    </div>
                    <div className="font-bold text-lg">Call To Us</div>
                </div>
                <div className="text-sm">we are available 24/7 ,7 days a week</div>
                <div className="text-sm">Phone Number : +91 123456789</div>
            </div>
            <div className="space-y-4  p-3">
                <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <FaEnvelope className="text-white" />
                    </div>
                    <div className="font-bold text-lg">Write to Us</div>
                </div>
                <div className="text-sm">
                    Fill out our form and we will contact you within 24 hours.
                </div>
                <div className="text-sm">Emails: support@exclusive.com</div>
                <div className="text-sm">Emails: support@exclusive.com</div>
            </div>
        </div>
    );
};

export default ContactInfo;
