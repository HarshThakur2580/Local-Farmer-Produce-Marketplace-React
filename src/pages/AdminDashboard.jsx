import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();

  const [usersList, setUsersList] = useState([]);
  const [ordersList, setOrdersList] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [notice, setNotice] = useState('');

  // New product modal state with image file upload
  const [showAddModal, setShowAddModal] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [newProd, setNewProd] = useState({
    name: '',
    category: 'Vegetables',
    price: '',
    farmer: 'Direct Sourced',
    description: '',
  });

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('farmfresh_users') || '[]');
    setUsersList(storedUsers);
    const storedOrders = JSON.parse(localStorage.getItem('farmfresh_orders') || '[]');
    setOrdersList(storedOrders);
  }, []);

  const totalRevenue = ordersList.reduce((acc, order) => acc + (order.total || 0), 0);
  const totalProducts = products.length;
  const uniqueFarmers = Array.from(new Set(products.map((p) => p.farmer))).length;

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size exceeds 2MB limit.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePriceUpdate = (id, currentPrice) => {
    const newPrice = prompt(`Enter new price for product (Current: ₹${currentPrice}):`, currentPrice);
    if (newPrice !== null && !isNaN(newPrice) && Number(newPrice) > 0) {
      updateProduct(id, { price: Number(newPrice) });
      setNotice(`Updated price to ₹${newPrice}`);
      setTimeout(() => setNotice(''), 2500);
    }
  };

  const handleDeleteProduct = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from the store?`)) {
      deleteProduct(id);
      setNotice(`Deleted product: ${name}`);
      setTimeout(() => setNotice(''), 2500);
    }
  };

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!newProd.name || !newProd.price) {
      alert('Name and price are required.');
      return;
    }

    const finalImg =
      imagePreview ||
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&h=400&fit=crop';

    addProduct({
      ...newProd,
      price: Number(newProd.price),
      img: finalImg,
    });

    setShowAddModal(false);
    setNewProd({
      name: '',
      category: 'Vegetables',
      price: '',
      farmer: 'Direct Sourced',
      description: '',
    });
    setImagePreview('');
    setNotice('Product uploaded & added to live store!');
    setTimeout(() => setNotice(''), 2500);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.farmer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-page">
      <div className="admin-container">
        {/* Top Header */}
        <div className="admin-header">
          <div>
            <h2>🛡️ FarmFresh Control Center</h2>
            <p>Admin master control: manage farmers, marketplace inventory, live orders, and user access.</p>
          </div>
          <div className="admin-actions-top">
            <button className="add-btn-primary" onClick={() => setShowAddModal(true)}>
              ➕ Upload Product Photo
            </button>
            <Link to="/farmer" className="switch-farmer-link">
              Go to Farmer View 👨‍🌾
            </Link>
          </div>
        </div>

        {notice && <div className="admin-notice-bar">{notice}</div>}

        {/* Metric Cards */}
        <div className="admin-stats-grid">
          <div className="stat-card">
            <span className="stat-icon">💰</span>
            <div className="stat-info">
              <h4>Total Orders Value</h4>
              <p className="stat-val">₹{totalRevenue}</p>
              <span className="stat-sub">{ordersList.length} orders placed</span>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">🥬</span>
            <div className="stat-info">
              <h4>Active Products</h4>
              <p className="stat-val">{totalProducts}</p>
              <span className="stat-sub">Across 5 categories</span>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">👨‍🌾</span>
            <div className="stat-info">
              <h4>Registered Farmers</h4>
              <p className="stat-val">{uniqueFarmers}</p>
              <span className="stat-sub">Local producers</span>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">👥</span>
            <div className="stat-info">
              <h4>Total Accounts</h4>
              <p className="stat-val">{usersList.length}</p>
              <span className="stat-sub">Customers & Farmers</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📊 Products & Pricing Control
          </button>
          <button
            className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            📦 Recent Orders ({ordersList.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            👤 Users & Roles ({usersList.length})
          </button>
        </div>

        {/* Tab 1: Products and Pricing */}
        {activeTab === 'overview' && (
          <div className="tab-content-card">
            <div className="table-controls">
              <h3>Live Inventory Management</h3>
              <input
                type="text"
                placeholder="🔍 Search products, farmers or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Farmer</th>
                    <th>Price</th>
                    <th>Demand Adjustment</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((p) => (
                    <tr key={p.id}>
                      <td className="item-with-img">
                        <img src={p.img} alt={p.name} />
                        <div>
                          <strong>{p.name}</strong>
                          <small>{p.description?.slice(0, 45)}...</small>
                        </div>
                      </td>
                      <td><span className="badge category-badge">{p.category}</span></td>
                      <td><strong>{p.farmer}</strong></td>
                      <td className="price-col">₹{p.price}/kg</td>
                      <td>
                        <div className="demand-quick-btns">
                          <button
                            className="btn-tiny btn-surge"
                            title="Surge price by 15% due to high market demand"
                            onClick={() => {
                              const surge = Math.round(p.price * 1.15);
                              updateProduct(p.id, { price: surge });
                              setNotice(`Surged ${p.name} price to ₹${surge} (+15%)`);
                              setTimeout(() => setNotice(''), 2500);
                            }}
                          >
                            Surge (+15%)
                          </button>
                          <button
                            className="btn-tiny btn-drop"
                            title="Drop price by 10% to speed up liquidation"
                            onClick={() => {
                              const drop = Math.round(p.price * 0.9);
                              updateProduct(p.id, { price: drop });
                              setNotice(`Discounted ${p.name} price to ₹${drop} (-10%)`);
                              setTimeout(() => setNotice(''), 2500);
                            }}
                          >
                            Drop (-10%)
                          </button>
                        </div>
                      </td>
                      <td>
                        <div className="action-cell">
                          <button
                            className="action-btn edit"
                            onClick={() => handlePriceUpdate(p.id, p.price)}
                          >
                            ✏️ Edit Price
                          </button>
                          <button
                            className="action-btn delete"
                            onClick={() => handleDeleteProduct(p.id, p.name)}
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Orders */}
        {activeTab === 'orders' && (
          <div className="tab-content-card">
            <h3>Customer Orders Placed</h3>
            {ordersList.length === 0 ? (
              <p className="empty-state">No orders placed yet. Place an order via Checkout to view it here.</p>
            ) : (
              <div className="orders-list">
                {ordersList.map((ord, idx) => (
                  <div key={ord.orderId || idx} className="order-admin-card">
                    <div className="order-top">
                      <div>
                        <strong>Order #{ord.orderId}</strong>
                        <span className="order-date">{ord.date}</span>
                      </div>
                      <span className="order-amt">₹{ord.total}</span>
                    </div>

                    <div className="order-mid">
                      <p><strong>Customer:</strong> {ord.address?.fullName} ({ord.address?.phone})</p>
                      <p><strong>Address:</strong> {ord.address?.street}, {ord.address?.city}, {ord.address?.state} - {ord.address?.pincode}</p>
                      <p>
                        <strong>Delivery Distance:</strong> {ord.distanceKm ? `${ord.distanceKm} km` : '1.5 km'} 
                        ({ord.deliveryCharge === 0 ? 'FREE' : `₹${ord.deliveryCharge}`})
                      </p>
                      <p><strong>Payment:</strong> <span className="payment-tag">{ord.paymentMethod?.toUpperCase()}</span></p>
                    </div>

                    <div className="order-items-summary">
                      <strong>Items ({ord.items?.length}): </strong>
                      {ord.items?.map((it) => `${it.name} (x${it.quantity})`).join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Users */}
        {activeTab === 'users' && (
          <div className="tab-content-card">
            <h3>Registered Community Accounts</h3>
            <div className="table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Assigned Role</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList.map((u, i) => (
                    <tr key={i}>
                      <td><strong>{u.name}</strong></td>
                      <td>{u.email}</td>
                      <td>
                        <span className={`role-badge ${u.role === 'admin' ? 'admin' : u.role === 'farmer' ? 'farmer' : 'customer'}`}>
                          {u.role ? u.role.toUpperCase() : 'CUSTOMER'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add Product Modal with File Upload */}
        {showAddModal && (
          <div className="modal-backdrop">
            <div className="modal-box">
              <div className="modal-header">
                <h3>📸 Upload & Add Marketplace Product</h3>
                <button className="close-x" onClick={() => setShowAddModal(false)}>✕</button>
              </div>

              <form onSubmit={handleAddProductSubmit} className="modal-form">
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Green Capsicum, Basmati Rice"
                    value={newProd.name}
                    onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      value={newProd.category}
                      onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                    >
                      <option value="Vegetables">Vegetables</option>
                      <option value="Fruits">Fruits</option>
                      <option value="Grains & Pulses">Grains & Pulses</option>
                      <option value="Dairy">Dairy</option>
                      <option value="Organic Products">Organic Products</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Price (₹/kg)</label>
                    <input
                      type="number"
                      required
                      min="1"
                      placeholder="e.g. 50"
                      value={newProd.price}
                      onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Farmer / Origin</label>
                  <input
                    type="text"
                    placeholder="e.g. Ramesh Kumar (Nashik)"
                    value={newProd.farmer}
                    onChange={(e) => setNewProd({ ...newProd, farmer: e.target.value })}
                  />
                </div>

                {/* Direct File Upload in Admin */}
                <div className="form-group">
                  <label>📷 Upload Product Photo (From Device)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    style={{
                      padding: '0.4rem',
                      background: '#f8fafc',
                      border: '1.5px dashed #cbd5e1',
                      borderRadius: '8px',
                      width: '100%',
                      boxSizing: 'border-box'
                    }}
                  />
                  {imagePreview && (
                    <div style={{ marginTop: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <img src={imagePreview} alt="Preview" style={{ width: '50px', height: '50px', borderRadius: '6px', objectFit: 'cover' }} />
                      <button type="button" onClick={() => setImagePreview('')} style={{ fontSize: '0.75rem', color: '#b91c1c', background: 'none', border: 'none', cursor: 'pointer' }}>✕ Clear</button>
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    rows="2"
                    placeholder="Quality grade, harvest conditions..."
                    value={newProd.description}
                    onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                  ></textarea>
                </div>

                <div className="modal-btn-row">
                  <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Publish Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
