import React from "react";
import ContactInfo from "../../components/common/ContactInfo";
import ContactForm from "../../components/common/ContactForm";

const AboutPage = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-4 md:grid-cols-4 p-15 space-x-5 flex items-center">
      <ContactInfo />
      <ContactForm />
    </div>
  );
};

export default AboutPage;
