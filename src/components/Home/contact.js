import React from "react";
import Navbar from "../../components/Home/Navrbar";
import Footer from "../../components/Home/Footer";

const ContactUs = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md px-6 py-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-black">Contact Us</h2>
          <div className="mb-4">
            <p className="text-gray-600">Address:</p>
            <p className="text-gray-800">123 Main Street, City, Country</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-600">Phone Number:</p>
            <p className="text-gray-800">+1 (123) 456-7890</p>
          </div>
          <div>
            <p className="text-gray-600">Email:</p>
            <p className="text-gray-800">contact@example.com</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
