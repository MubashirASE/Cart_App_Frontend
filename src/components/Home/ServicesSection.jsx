import ServiceItem from "../common/ServiceItem";

const ServicesSection = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:py-10 ">
    <ServiceItem icon="/Services.png" title="Fast Delivery" description="We deliver within 5 days" />
    <ServiceItem icon="/Services1.png" title="24/7 CUSTOMER SERVICE" description="24/7 support" />
    <ServiceItem icon="/Services2.png" title="MONEY BACK GUARANTEE" description="30 days return" />
  </div>
);

export default ServicesSection;
