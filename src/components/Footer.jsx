import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer className="footer-section">
    <div className="footer-links">
      <a href="#home">Home | </a>
      <a href="#shop">Shop | </a>
      <a href="#categories">Categories | </a>
      <a href="#about">About Us | </a>
      <a href="#contact">Contact</a>
    </div>
    <div className="footer-contact">
      <p>© 2026 FarmFresh. All rights reserved.</p>
      <p>Email: officialharsh2581@gmail.com | Phone: +91 98765 43210</p>
    </div>
    <div className="footer-social">
      <a href="https://facebook.com/farmfresh" target="_blank" rel="noopener noreferrer">📘</a>
      <a href="https://instagram.com/farmfresh" target="_blank" rel="noopener noreferrer">📸</a>
      <a href="https://twitter.com/farmfresh" target="_blank" rel="noopener noreferrer">🐦</a>
    </div>
  </footer>
);

export default Footer;

