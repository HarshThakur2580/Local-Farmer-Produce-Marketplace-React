import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLocation } from '../context/LocationContext';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { distanceKm, deliveryCharge, locationName, detectLiveLocation, detecting, setManualDistance } = useLocation();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: user ? user.name : '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const subtotal = getCartTotal();
  const total = subtotal + deliveryCharge;

  // If cart is empty and no order was just placed
  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <h2>Checkout</h2>
          <div className="checkout-empty">
            <p>Your cart is empty. Add some products before checkout.</p>
            <Link to="/shop" className="back-to-shop-btn">Go to Shop</Link>
          </div>
        </div>
      </div>
    );
  }

  // Order success screen
  if (orderPlaced) {
    return (
      <div className="checkout-page">
        <div className="checkout-container order-success">
          <span className="success-icon">✅</span>
          <h2>Order Placed Successfully!</h2>
          <p className="order-id">Order ID: <strong>{orderId}</strong></p>
          <p>Thank you for supporting local farmers! Your farm-fresh harvest is being prepared.</p>
          <div className="order-details-box">
            <p><strong>Delivery to:</strong> {address.fullName} ({address.phone})</p>
            <p><strong>Address:</strong> {address.street}, {address.city}, {address.state} - {address.pincode}</p>
            <p><strong>Distance from Farm Hub:</strong> {distanceKm} km ({deliveryCharge === 0 ? 'FREE Delivery' : `₹${deliveryCharge} Delivery`})</p>
            <p><strong>Payment:</strong> {paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'upi' ? 'UPI Payment' : 'Card Payment'}</p>
            <p><strong>Final Amount:</strong> ₹{total}</p>
          </div>
          <Link to="/" className="back-home-btn">Back to Home</Link>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const id = 'FF' + Date.now().toString().slice(-8);
    setOrderId(id);

    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem('farmfresh_orders') || '[]');
    orders.push({
      orderId: id,
      items: cartItems,
      address,
      distanceKm,
      deliveryCharge,
      paymentMethod,
      total,
      date: new Date().toLocaleString(),
      userEmail: user ? user.email : 'guest',
    });
    localStorage.setItem('farmfresh_orders', JSON.stringify(orders));

    clearCart();
    setOrderPlaced(true);
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h2>Checkout & Delivery</h2>

        {/* Dynamic Location & Delivery Charge Banner */}
        <div className="checkout-delivery-banner">
          <div className="del-banner-left">
            <span className="del-pin">📍</span>
            <div>
              <strong>Delivery Zone: {distanceKm} km from Local Farm Hub</strong>
              <p>{locationName}</p>
            </div>
          </div>
          <div className="del-banner-right">
            {deliveryCharge === 0 ? (
              <span className="del-free-pill">🎉 FREE Delivery (&lt;2 km)</span>
            ) : (
              <span className="del-paid-pill">🚚 Delivery Fee: ₹{deliveryCharge}</span>
            )}
            <button type="button" className="del-gps-btn" onClick={detectLiveLocation} disabled={detecting}>
              {detecting ? 'Detecting...' : '🎯 Detect GPS'}
            </button>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder}>
          {/* Delivery Address */}
          <div className="checkout-section">
            <h3>📦 Delivery Address & Recipient</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="fullName" value={address.fullName} onChange={handleChange} placeholder="Full name" required />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" name="phone" value={address.phone} onChange={handleChange} placeholder="10-digit mobile number" pattern="[0-9]{10}" required />
              </div>
            </div>
            <div className="form-group">
              <label>Street Address / Flat / Landmark</label>
              <input type="text" name="street" value={address.street} onChange={handleChange} placeholder="House/Flat No, Apartment, Street name" required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input type="text" name="city" value={address.city} onChange={handleChange} placeholder="City / Town" required />
              </div>
              <div className="form-group">
                <label>State</label>
                <input type="text" name="state" value={address.state} onChange={handleChange} placeholder="State" required />
              </div>
              <div className="form-group">
                <label>Pincode</label>
                <input type="text" name="pincode" value={address.pincode} onChange={handleChange} placeholder="6-digit pincode" pattern="[0-9]{6}" required />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="checkout-section">
            <h3>🛒 Order Summary ({cartItems.length} items)</h3>
            <div className="checkout-items">
              {cartItems.map((item) => (
                <div key={item.id} className="checkout-item">
                  <img src={item.img} alt={item.name} />
                  <div className="checkout-item-info">
                    <span className="checkout-item-name">{item.name}</span>
                    <span className="checkout-item-qty">x{item.quantity} kg/unit</span>
                  </div>
                  <span className="checkout-item-price">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="checkout-totals">
              <div className="checkout-total-row">
                <span>Items Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="checkout-total-row">
                <span>
                  Delivery Charge ({distanceKm} km)
                  {deliveryCharge === 0 && <small className="free-mention"> (Free under 2km)</small>}
                </span>
                <span className={deliveryCharge === 0 ? 'free-tag-bold' : ''}>
                  {deliveryCharge === 0 ? 'FREE (₹0)' : `₹${deliveryCharge}`}
                </span>
              </div>
              <div className="checkout-total-row grand-total">
                <span>Total Amount</span>
                <span>₹{total}</span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="checkout-section">
            <h3>💳 Payment Method</h3>
            <div className="payment-options">
              <label className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={(e) => setPaymentMethod(e.target.value)} />
                <span>💵 Cash on Delivery (Pay at your doorstep)</span>
              </label>
              <label className={`payment-option ${paymentMethod === 'upi' ? 'selected' : ''}`}>
                <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={(e) => setPaymentMethod(e.target.value)} />
                <span>📱 UPI (GPay, PhonePe, Paytm, QR)</span>
              </label>
              <label className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
                <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={(e) => setPaymentMethod(e.target.value)} />
                <span>💳 Debit / Credit Card / NetBanking</span>
              </label>
            </div>
          </div>

          <button type="submit" className="place-order-btn">
            Confirm & Place Order — ₹{total}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
