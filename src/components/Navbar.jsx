import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { getCartCount } = useCart();
  const { user, logout } = useAuth();
  const count = getCartCount();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">🌱 FARMFRESH</Link>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/shop">Shop</Link></li>

        {/* Dynamic portal buttons for logged in roles */}
        {user?.role === 'admin' && (
          <li><Link to="/admin" className="portal-badge-link admin-nav-pill">🛡️ Admin</Link></li>
        )}
        {user?.role === 'farmer' && (
          <li><Link to="/farmer" className="portal-badge-link farmer-nav-pill">👨‍🌾 Farmer Portal</Link></li>
        )}

        {/* Visible quick links for easy access even without logging in */}
        {!user && (
          <>
            <li><Link to="/farmer" className="nav-quick-link">Farmer Portal</Link></li>
            <li><Link to="/admin" className="nav-quick-link">Admin</Link></li>
          </>
        )}

        <li><a href="/#categories">Categories</a></li>
        <li><a href="/#about">About Us</a></li>

        {user ? (
          <>
            <li className="user-greeting">
              <span>Hi, {user.name.split(' ')[0]}</span>
              {user.role && <span className="user-role-tag">({user.role})</span>}
            </li>
            <li><button className="nav-logout-btn" onClick={logout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}

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
