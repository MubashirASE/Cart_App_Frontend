import React from "react";
import { FaEnvelope } from "react-icons/fa";
import { HiPhone } from "react-icons/hi";

const AboutPage= () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-4 md:grid-cols-4 p-15 space-x-5 flex items-center">
      <div className="border bg-white border-none shadow-lg  h-auto p-6 space-y-6">
        <div className="border-b pb-5 border-gray-400 space-y-4">
          <div className="flex gap-3 items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <HiPhone className="text-white" />
            </div>
            <div className='font-bold text-lg'>Call To Us</div>
          </div>
          <div className="text-sm">we are available 24/7 ,7 days a week</div>
          <div className="text-sm">Phone Number : +91 123456789</div>
        </div>
        <div className="space-y-4">
          <div className="flex gap-3 items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <FaEnvelope className="text-white" />
            </div>
            <div className='font-bold text-lg'>Write to Us</div>
          </div>
          <div className="text-sm">Fill out our form and we will contact you within 24 hours.</div>
          <div className="text-sm">
            Emails: support@exclusive.com
          </div>
          <div className="text-sm">Emails: support@exclusive.com</div>
        </div>
      </div>
      <div className="border bg-white border-none shadow-lg col-span-3 p-10 space-y-7">
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
    </div>
  );
};

export default AboutPage;
