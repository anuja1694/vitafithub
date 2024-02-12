import "../Home/FooterStyles.css";
import React from "react";
import { FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer bg-gray-800 text-white">
      <div className="footer-container flex justify-between py-8 px-4 md:px-16">
        <div className="left">
          <div className="faq">
            <p>
              <a href="/faq" className="footer-link">
                FAQ &amp; HELP
              </a>
            </p>
          </div>
          <div className="contact">
            <p>
              <a href="/contactus" className="footer-link">
                CONTACT
              </a>
            </p>
          </div>
          <div className="privacy">
            <p>
              <a href="/privacy-policy" className="footer-link">
                PRIVACY POLICY
              </a>
            </p>
          </div>
          <div className="terms">
            <p>
              <a href="/terms-and-conditions" className="footer-link">
                TERMS AND CONDITIONS
              </a>
            </p>
          </div>
        </div>
        <div className="right">
          <h4>About Us</h4>
          <p>Centralized platform for fitness and wellness</p>
          <div className="social mt-4 flex items-center">
            <FaFacebook className="mr-4" size={20} style={{ color: "#fff" }} />
            <FaLinkedin className="mr-4" size={20} style={{ color: "#fff" }} />
            <FaTwitter size={20} style={{ color: "#fff" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
