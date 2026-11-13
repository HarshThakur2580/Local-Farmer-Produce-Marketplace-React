import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Shop.css';

const allProducts = [
  { id: 1, name: 'Tomatoes', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSCi5l1ykkV5ypDajXSUgFWy5ECluV0irDRcWDCBm2OgMdf_gWNC2fiig&s=10', price: 40, farmer: 'Raju', category: 'Vegetables' },
  { id: 2, name: 'Potatoes', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCLCds9R1g_KuPRGJCTxy9HpE83wvSjkTYj8AF01GqCQ&s=10', price: 30, farmer: 'Sita', category: 'Vegetables' },
  { id: 3, name: 'Onions', img: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&h=300&fit=crop', price: 35, farmer: 'Mohit', category: 'Vegetables' },
  { id: 4, name: 'Mangoes', img: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=300&fit=crop', price: 120, farmer: 'Anita', category: 'Fruits' },
  { id: 5, name: 'Bananas', img: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop', price: 50, farmer: 'Suresh', category: 'Fruits' },
  { id: 6, name: 'Rice (1 kg)', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop', price: 80, farmer: 'Vikram', category: 'Grains & Pulses' },
  { id: 7, name: 'Wheat (1 kg)', img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop', price: 70, farmer: 'Geeta', category: 'Grains & Pulses' },
  { id: 8, name: 'Fresh Milk (1 L)', img: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=300&fit=crop', price: 60, farmer: 'Kamla', category: 'Dairy' },
  { id: 9, name: 'Spinach', img: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop', price: 25, farmer: 'Raju', category: 'Vegetables' },
  { id: 10, name: 'Capsicum', img: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=300&fit=crop', price: 80, farmer: 'Sita', category: 'Vegetables' },
  { id: 11, name: 'Apples', img: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop', price: 180, farmer: 'Mohit', category: 'Fruits' },
  { id: 12, name: 'Moong Dal (1 kg)', img: 'https://daivikorganic.com/cdn/shop/products/3_542f8f5b-d16b-41d7-8f56-dbbcc50e151f.png?v=1670567336', price: 130, farmer: 'Anita', category: 'Grains & Pulses' },
];

const categories = ['All', 'Vegetables', 'Fruits', 'Grains & Pulses', 'Dairy'];

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [cartMessage, setCartMessage] = useState('');
  const { addToCart, getCartCount } = useCart();

  const filtered = activeCategory === 'All'
    ? allProducts
    : allProducts.filter((p) => p.category === activeCategory);

  const handleAddToCart = (product) => {
    addToCart(product);
    setCartMessage(`✅ ${product.name} added to cart!`);
    setTimeout(() => setCartMessage(''), 2000);
  };

  return (
    <div className="shop-page">
      <div className="shop-header">
        <h2>Shop Fresh Produce</h2>
        <p>Browse our selection of farm-fresh products</p>
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
              <p className="shop-farmer">by {product.farmer}</p>
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
