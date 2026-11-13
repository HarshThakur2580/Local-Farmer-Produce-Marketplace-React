import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './FeaturedProducts.css';

const products = [
  { id: 1, name: 'Tomatoes', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSCi5l1ykkV5ypDajXSUgFWy5ECluV0irDRcWDCBm2OgMdf_gWNC2fiig&s=10', price: 40, farmer: 'Raju' },
  { id: 2, name: 'Potatoes', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCLCds9R1g_KuPRGJCTxy9HpE83wvSjkTYj8AF01GqCQ&s=10', price: 30, farmer: 'Sita' },
  { id: 3, name: 'Onions', img: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&h=300&fit=crop', price: 35, farmer: 'Mohit' },
  { id: 4, name: 'Mangoes', img: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=300&fit=crop', price: 120, farmer: 'Anita' },
  { id: 5, name: 'Rice', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop', price: 80, farmer: 'Vikram' },
  { id: 6, name: 'Wheat', img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop', price: 70, farmer: 'Geeta' },
];

const FeaturedProducts = () => {
  const { addToCart } = useCart();
  const [message, setMessage] = useState('');

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
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.img} alt={p.name} />
            <h3>{p.name}</h3>
            <p>₹{p.price}/kg</p>
            <p className="farmer">by {p.farmer}</p>
            <button className="add-to-cart" onClick={() => handleAdd(p)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
