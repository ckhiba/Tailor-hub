import React from "react";
import "./Footer.css";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2>Tailoring Website</h2>
        <p>Custom tailoring made easy. Get your perfect fit effortlessly.</p>
        <div className="social-icons">
          <FaFacebook />
          <FaInstagram />
          <FaTwitter />
        </div>
      </div>
      <p className="footer-bottom">
        © {new Date().getFullYear()} Tailoring Website. Designed by You.
      </p>
    </footer>
  );
};

export default Footer;
