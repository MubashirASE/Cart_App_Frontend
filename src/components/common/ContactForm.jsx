import React from "react";

const ContactForm = () => {
    return (
        <div className="col-span-3 p-10 space-y-7">
            <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-8">
                <input
                    type="text"
                    placeholder="Name"
                    className="border bg-gray-100 border-none p-2 w-full mb-2"
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="border bg-gray-100 border-none p-2 w-full mb-2"
                />
                <input
                    type="text"
                    placeholder="Subject"
                    className="border bg-gray-100 border-none p-2 w-full mb-2"
                />
            </div>
            <textarea
                placeholder="Message"
                className="border bg-gray-100 border-none p-2 w-full mb-2 h-37"
            ></textarea>
            <button className="bg-blue-500 text-white p-2 w-full">
                Send Message
            </button>
        </div>
    );
};

export default ContactForm;
