import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { getCartCount } = useCart();
  const count = getCartCount();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">🌱 FARMFRESH</Link>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/shop">Shop</Link></li>
        <li><a href="/#categories">Categories</a></li>
        <li><a href="/#about">About Us</a></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li>
          <Link to="/cart" className="cart-icon">
            🛒{count > 0 && <span className="cart-badge">{count}</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
