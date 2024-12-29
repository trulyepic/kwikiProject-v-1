import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="app_footer">
      {/* <div className="footer-text">
      <p>&copy; 2024 version 1-0. All rights reserved.</p>
      </div> */}
      <div className="footer-content">
        <div className="social-icons">
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>
        <p>
          &copy; 2024 version 1-0. All rights reserved. |{" "}
          <Link to="/privacy-policy" className="footer-links">
            Privacy Policy{" "}
          </Link>{" "}
          |{" "}
          <Link to="/contact" className="footer-links">
            Contact
          </Link>
        </p>
      </div>
      {/* <div className="footer-bottom">
        <p>Do Not Sell or Share My Personal Information</p>
      </div> */}
    </footer>
  );
};

export default Footer;
