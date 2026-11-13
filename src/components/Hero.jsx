import React from 'react';
import './Hero.css';

const Hero = () => (
  <section id="home" className="hero-section">
    <img
      src="/images/Fresh From Farms Marketplace Banner.png"
      alt="Fresh From Farms, Directly To You"
      className="hero-image"
    />
    <div className="hero-buttons">
      <button className="primary-btn" onClick={() => document.getElementById('featured').scrollIntoView({ behavior: 'smooth' })}>
        🛒 Shop Now
      </button>
      <button className="secondary-btn" onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>
        👨‍🌾 Explore Farmers
      </button>
    </div>
  </section>
);

export default Hero;
