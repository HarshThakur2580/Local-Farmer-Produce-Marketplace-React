import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  const deliveryCharge = cartItems.length > 0 ? 40 : 0;
  const subtotal = getCartTotal();
  const total = subtotal + deliveryCharge;

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
          <div className="summary-row">
            <span>Delivery</span>
            <span>₹{deliveryCharge}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
          <button className="checkout-btn" onClick={() => alert('Checkout feature coming soon!')}>
            Proceed to Checkout
          </button>
          <Link to="/shop" className="continue-shopping">← Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
