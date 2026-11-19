import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import './FeaturedProducts.css';

const FeaturedProducts = () => {
  const { addToCart } = useCart();
  const { products } = useProducts();
  const [message, setMessage] = useState('');

  // Show top 6 products from real product state
  const featuredList = products.slice(0, 6);

  const handleAdd = (product) => {
    addToCart(product);
    setMessage(`✅ ${product.name} added to cart!`);
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <section id="featured" className="featured-section">
      <h2>Featured Products</h2>
      {message && <div className="featured-toast">{message}</div>}
      <div className="product-grid">
        {featuredList.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.img} alt={p.name} />
            <h3>{p.name}</h3>
            <p className="price">₹{p.price}/kg</p>
            <p className="farmer">by <strong>{p.farmer}</strong></p>
            <button className="add-to-cart" onClick={() => handleAdd(p)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
