import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <footer className="footer-section">
    <div className="footer-top">
      <div className="footer-col brand-col">
        <Link to="/" className="footer-logo">🌱 FARMFRESH</Link>
        <p className="footer-tagline">
          India's authentic direct-from-farm marketplace. Empowering farmers with transparent demand pricing and bringing pure nutrition to your family.
        </p>
        <div className="footer-trust-pills">
          <span>🌿 100% Residue Free</span>
          <span>⚡ Same-Day Harvest</span>
          <span>📍 Hyperlocal Delivery</span>
        </div>
      </div>

      <div className="footer-col">
        <h4>Explore Marketplace</h4>
        <ul className="footer-menu">
          <li><Link to="/shop">Shop All Produce</Link></li>
          <li><a href="/#categories">Vegetables & Fruits</a></li>
          <li><a href="/#categories">Grains & Pulses</a></li>
          <li><a href="/#categories">Organic Dairy</a></li>
          <li><Link to="/cart">Your Shopping Cart</Link></li>
        </ul>
      </div>

      <div className="footer-col">
        <h4>Farmer & Admin</h4>
        <ul className="footer-menu">
          <li><Link to="/farmer">👨‍🌾 Farmer Dashboard</Link></li>
          <li><Link to="/farmer">Upload Fresh Harvest</Link></li>
          <li><Link to="/farmer">Demand Pricing Tool</Link></li>
          <li><Link to="/admin">🛡️ Admin Control Center</Link></li>
          <li><Link to="/login">Account Sign In</Link></li>
        </ul>
      </div>

      <div className="footer-col contact-col">
        <h4>Direct Connect</h4>
        <p><strong>📍 Central Mandi Hub:</strong> Sector 18, Agricultural Hub, New Delhi</p>
        <p><strong>📞 Kisan & Customer Helpline:</strong> +91 98765 43210</p>
        <p><strong>✉️ Email:</strong> officialharsh2581@gmail.com</p>
        <div className="footer-social-icons">
          <a href="https://facebook.com/farmfresh" target="_blank" rel="noopener noreferrer" title="Facebook">📘</a>
          <a href="https://instagram.com/farmfresh" target="_blank" rel="noopener noreferrer" title="Instagram">📸</a>
          <a href="https://twitter.com/farmfresh" target="_blank" rel="noopener noreferrer" title="Twitter">🐦</a>
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" title="WhatsApp">💬</a>
        </div>
      </div>
    </div>

    <div className="footer-bottom">
      <p>© 2026 FarmFresh Marketplace. All rights reserved. Made for Indian Agriculture & Healthy Living.</p>
      <div className="footer-legal">
        <span>Privacy Policy</span>
        <span>Terms of Service</span>
        <span>Farmer Welfare Charter</span>
      </div>
    </div>
  </footer>
);

export default Footer;
