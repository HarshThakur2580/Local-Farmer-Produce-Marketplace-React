import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return (
      <div className="login-page">
        <div className="login-container">
          <div className="login-header">
            <h2>Welcome, {user.name}!</h2>
            <p>You are logged in as <strong>{user.role}</strong>.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {user.role === 'admin' && (
              <Link to="/admin" className="login-btn" style={{ textAlign: 'center', textDecoration: 'none' }}>
                🛡️ Open Admin Dashboard
              </Link>
            )}
            {user.role === 'farmer' && (
              <Link to="/farmer" className="login-btn" style={{ textAlign: 'center', textDecoration: 'none' }}>
                👨‍🌾 Open Farmer Dashboard
              </Link>
            )}
            <Link to="/shop" className="login-btn" style={{ textAlign: 'center', textDecoration: 'none', background: 'var(--primary-green)' }}>
              Browse Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const result = login(email, password);
    if (result.success) {
      setSuccess(result.message);
      setTimeout(() => {
        if (result.role === 'admin') navigate('/admin');
        else if (result.role === 'farmer') navigate('/farmer');
        else navigate('/');
      }, 1000);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Log in to your FarmFresh account</p>
        </div>

        {error && <div className="form-error">{error}</div>}
        {success && <div className="form-success">{success}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">Log In</button>
          
          <div className="demo-credentials-box" style={{ marginTop: '1.2rem', padding: '0.8rem', background: '#f5faf6', borderRadius: '8px', fontSize: '0.82rem', color: '#2d6a4f' }}>
            <strong>Quick Demo Logins:</strong>
            <div style={{ marginTop: '0.3rem' }}>
              • <strong>Admin:</strong> admin@farmfresh.com / admin<br />
              • <strong>Farmer:</strong> farmer@farmfresh.com / farmer
            </div>
          </div>

          <p className="switch-text">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
