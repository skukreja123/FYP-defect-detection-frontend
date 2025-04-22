import React from "react";
import "./Footer.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-social">
          <h3 className="footer-logo">FDD</h3>
          <p>Designing the future, one pixel at a time.</p>
          <div className="social-icons">
            <FaFacebookF />
            <FaInstagram />
            <FaTwitter />
            <FaLinkedin />
          </div>
        </div>
        <div className="footer-links">
          <div className="column">
            <h4>Use Cases</h4>
            <ul>
              <li>UI Design</li>
              <li>UX Design</li>
              <li>Wireframing</li>
              <li>Diagramming</li>
              <li>Brainstorming</li>
              <li>Online Whiteboard</li>
              <li>Team Collaboration</li>
            </ul>
          </div>
          <div className="column">
            <h4>Explore</h4>
            <ul>
              <li>Design</li>
              <li>Prototyping</li>
              <li>Dev Features</li>
              <li>Design Systems</li>
              <li>Collaboration</li>
              <li>Process</li>
              <li>FigJam</li>
            </ul>
          </div>
          <div className="column">
            <h4>Resources</h4>
            <ul>
              <li>Blog</li>
              <li>Best Practices</li>
              <li>Colors</li>
              <li>Color Wheel</li>
              <li>Support</li>
              <li>Developers</li>
              <li>Library</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 MyCompany. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
