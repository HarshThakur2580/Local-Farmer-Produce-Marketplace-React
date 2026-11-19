import React from 'react';
import './About.css';

const About = () => (
  <section id="about" className="about-section">
    <div className="about-container">
      <div className="about-header">
        <span className="about-badge">🌱 Rooted In Trust</span>
        <h2>Connecting Indian Farmers Directly To Your Kitchen</h2>
        <p className="about-lead">
          FarmFresh is transforming India’s agricultural supply chain by eliminating unnecessary middlemen, ensuring honest wages for local growers, and delivering harvested produce to your doorstep within hours.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-card">
          <div className="about-icon">🚜</div>
          <h3>100% Direct From Local Growers</h3>
          <p>
            Every fruit, vegetable, and grain is sourced directly from verified regional farms. No multi-tier cold storages or artificial wax polish.
          </p>
        </div>

        <div className="about-card">
          <div className="about-icon">⚖️</div>
          <h3>Fair & Dynamic Pricing</h3>
          <p>
            Farmers set their own prices based on seasonal demand, harvest yield, and fair trade benchmarks, ensuring 35-40% more income than traditional mandis.
          </p>
        </div>

        <div className="about-card">
          <div className="about-icon">⚡</div>
          <h3>Zero-Waste Hyperlocal Delivery</h3>
          <p>
            Produce moves from field to fork via nearby micro-hubs. Free delivery within 2km, reducing transportation emissions and food miles.
          </p>
        </div>
      </div>

      <div className="about-mission-box">
        <div className="mission-content">
          <h3>Our Commitment to Quality & Community</h3>
          <p>
            Whether it’s naturally ripened Alphonso mangoes from Konkan, organic golden wheat from central plains, or daily fresh morning milk, FarmFresh guarantees unadulterated freshness with complete farm-to-fork traceability.
          </p>
        </div>
        <div className="mission-stats">
          <div className="m-stat">
            <strong>500+</strong>
            <span>Verified Farmers</span>
          </div>
          <div className="m-stat">
            <strong>10,000+</strong>
            <span>Happy Households</span>
          </div>
          <div className="m-stat">
            <strong>&lt; 12 hrs</strong>
            <span>Harvest to Home</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
