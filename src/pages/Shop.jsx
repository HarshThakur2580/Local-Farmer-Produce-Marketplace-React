import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import './Shop.css';

const categories = ['All', 'Vegetables', 'Fruits', 'Grains & Pulses', 'Dairy', 'Organic Products'];

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [cartMessage, setCartMessage] = useState('');
  const { addToCart, getCartCount } = useCart();
  const { products } = useProducts();

  const filtered = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category === activeCategory);

  const handleAddToCart = (product) => {
    addToCart(product);
    setCartMessage(`✅ ${product.name} added to cart!`);
    setTimeout(() => setCartMessage(''), 2000);
  };

  return (
    <div className="shop-page">
      <div className="shop-header">
        <h2>Shop Fresh Produce</h2>
        <p>Browse our selection of farm-fresh products direct from regional growers</p>
      </div>

      <div className="category-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {cartMessage && <div className="cart-toast">{cartMessage}</div>}

      <div className="shop-grid">
        {filtered.map((product) => (
          <div key={product.id} className="shop-card">
            <img src={product.img} alt={product.name} />
            <div className="shop-card-info">
              <h3>{product.name}</h3>
              <p className="shop-price">₹{product.price}/kg</p>
              <p className="shop-farmer">by <strong>{product.farmer}</strong></p>
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(product)}
              >
                🛒 Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="shop-cart-link">
        <Link to="/cart" className="view-cart-btn">
          View Cart ({getCartCount()} items) →
        </Link>
      </div>
    </div>
  );
};

export default Shop;
