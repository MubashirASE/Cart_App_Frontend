import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white  py-8 px-10 ">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <h1 className="text-lg font-bold mb-3">GoCartify</h1>
          <h5 className=" mb-3">Subscribe</h5>

          <p className="text-sm">
            GoCartify is your one-stop shop for all your needs. We provide
            quality products at best prices.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-blue-500 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-blue-500 transition">
                About
              </a>
            </li>
            <li>
              <a href="/contant" className="hover:text-blue-500 transition">
                Contant
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3">Contact</h3>
          <p className="text-sm">Email: support@gocartify.com</p>
          <p className="text-sm">Phone: +123 456 7890</p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-3">Download App</h3>
          <ul className="space-y-2 flex space-x-3">
            <li>
              <a href="/" className="hover:text-blue-500 transition">
                <img src="/Icon-Facebook.png" className="w-4" />
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-blue-500 transition">
                <img src="/Icon-Linkedin.png" className="w-4" />
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-blue-500 transition">
                <img src="/icon-instagram.png" className="w-4" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} GoCartify. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
