import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLocation } from '../context/LocationContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { distanceKm, deliveryCharge, locationName, setManualDistance, detectLiveLocation, detecting } = useLocation();

  const subtotal = getCartTotal();
  const total = subtotal + (cartItems.length > 0 ? deliveryCharge : 0);

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <h2>Your Cart</h2>
          <div className="cart-empty">
            <span className="cart-empty-icon">🛒</span>
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added any products yet. Start shopping to fill your cart with farm-fresh produce!</p>
            <Link to="/shop" className="shop-now-link">Browse Products</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-title-row">
          <h2>Your Cart</h2>
          <button className="clear-cart-btn" onClick={clearCart}>Clear Cart</button>
        </div>

        {/* Location & Delivery Information in Cart */}
        <div className="cart-location-box">
          <div className="cart-loc-header">
            <span>📍 <strong>Delivery Address Distance:</strong> {locationName} ({distanceKm} km)</span>
            <button className="cart-gps-btn" onClick={detectLiveLocation} disabled={detecting}>
              {detecting ? 'Locating...' : '🎯 Update GPS'}
            </button>
          </div>
          <div className="cart-distance-chips">
            <span className="chip-label">Quick Distance:</span>
            <button
              className={`cart-dist-chip ${distanceKm <= 2 ? 'active' : ''}`}
              onClick={() => setManualDistance(1.2, 'Local Area (<2km)')}
            >
              Nearby (&lt;2 km) - FREE Delivery
            </button>
            <button
              className={`cart-dist-chip ${distanceKm > 2 && distanceKm <= 5 ? 'active' : ''}`}
              onClick={() => setManualDistance(4.5, 'Suburban Area (4.5km)')}
            >
              4.5 km (₹45)
            </button>
            <button
              className={`cart-dist-chip ${distanceKm > 5 ? 'active' : ''}`}
              onClick={() => setManualDistance(8.0, 'Outer City (8km)')}
            >
              8.0 km (₹80)
            </button>
          </div>
        </div>

        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.img} alt={item.name} className="cart-item-img" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p className="cart-item-farmer">by {item.farmer}</p>
                <p className="cart-item-price">₹{item.price}/kg</p>
              </div>
              <div className="cart-item-actions">
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <p className="cart-item-total">₹{item.price * item.quantity}</p>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>✕ Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="summary-row delivery-row">
            <span>
              Delivery Charge ({distanceKm} km from Hub)
              {deliveryCharge === 0 && <span className="free-tag"> (FREE &lt;2km)</span>}
            </span>
            <span className={deliveryCharge === 0 ? 'free-text' : ''}>
              {deliveryCharge === 0 ? 'FREE (₹0)' : `₹${deliveryCharge}`}
            </span>
          </div>
          <div className="summary-row total">
            <span>Total Payable</span>
            <span>₹{total}</span>
          </div>
          <Link to="/checkout" className="checkout-btn-link">
            Proceed to Checkout →
          </Link>
          <Link to="/shop" className="continue-shopping">← Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
