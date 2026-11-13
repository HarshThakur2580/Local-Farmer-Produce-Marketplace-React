import React from 'react';
import './Category.css';

const categories = [
  { name: 'Fresh Vegetables', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSemXYqfVMDSoUOgCeUxX1oSarBBXUykuhvpOHc_3a7q5fm9zCkDzkAjHSk&s=10' },
  { name: 'Fresh Fruits', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNPQotei2nMaIRox_OJNVQ4aNRL0FHGtYbXXKzL_DinpH8q3wiVR0MNeE&s=10' },
  { name: 'Grains & Pulses', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOUcTm2hg-izr-13eJCs8qEI9Ht_R3SQMEqt3SVYwHx9MN9BZLx1inhglK&s=10' },
  { name: 'Dairy Products', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqImuy9i3J8wGvG1tpYiVX2IKHJvjDM2ZtQaGslEH5HLnJh3O6B2SrP-D9&s=10' },
  { name: 'Organic Products', img: 'https://organicexpress.co.in/cdn/shop/collections/Premium_Nuts_and_Dried_Fruits_Still_Life.png?v=1793446962&width=1500' },
];

const CategorySection = () => (
  <section id="categories" className="category-section">
    <h2>Categories</h2>
    <div className="category-grid">
      {categories.map((c) => (
        <div key={c.name} className="category-card">
          <img src={c.img} alt={c.name} />
          <h3>{c.name}</h3>
        </div>
      ))}
    </div>
  </section>
);

export default CategorySection;

