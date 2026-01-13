import React from "react";
import ContactInfo from "../../components/common/ContactInfo";
import ContactForm from "../../components/common/ContactForm";

const ContantPage = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-1 p-4 sm:p-12 space-x-5 flex items-center justify-center space-y-5">
      <ContactInfo />
      <ContactForm />
    </div>
  );
};

export default ContantPage;
