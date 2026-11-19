import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { LocationProvider } from './context/LocationContext';
import Navbar from './components/Navbar';
import LocationBar from './components/LocationBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import FarmerDashboard from './pages/FarmerDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <LocationProvider>
        <ProductProvider>
          <CartProvider>
            <BrowserRouter>
              <Navbar />
              <LocationBar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/farmer" element={<FarmerDashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
              <Footer />
            </BrowserRouter>
          </CartProvider>
        </ProductProvider>
      </LocationProvider>
    </AuthProvider>
  );
}

export default App;
