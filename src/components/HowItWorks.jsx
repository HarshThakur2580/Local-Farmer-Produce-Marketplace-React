import React from 'react';
import './HowItWorks.css';

const steps = [
  { title: 'Farmers list their products', icon: '🧑‍🌾' },
  { title: 'Customers explore the marketplace', icon: '🔎' },
  { title: 'Customers place orders', icon: '🛒' },
  { title: 'Farmers fulfill orders', icon: '🚚' },
];

const HowItWorks = () => (
  <section id="how-it-works" className="how-it-works-section">
    <h2>How It Works</h2>
    <div className="steps-grid">
      {steps.map((s, idx) => (
        <div key={idx} className="step-card">
          <div className="icon">{s.icon}</div>
          <h3>{s.title}</h3>
        </div>
      ))}
    </div>
  </section>
);

export default HowItWorks;

