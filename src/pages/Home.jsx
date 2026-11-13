import React from 'react';
import Hero from '../components/Hero';
import CategorySection from '../components/CategorySection';
import FeaturedProducts from '../components/FeaturedProducts';
import WhyChoose from '../components/WhyChoose';
import HowItWorks from '../components/HowItWorks';
import About from '../components/About';

const Home = () => (
  <main>
    <Hero />
    <CategorySection />
    <FeaturedProducts />
    <WhyChoose />
    <HowItWorks />
    <About />
  </main>
);

export default Home;

