import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { Link } from 'react-router-dom';
import './FarmerDashboard.css';

const FarmerDashboard = () => {
  const { user } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();

  const farmerName = user ? user.name : 'Raju';
  const myProducts = products.filter(
    (p) => p.farmer && p.farmer.toLowerCase().includes(farmerName.split(' ')[0].toLowerCase())
  );

  const [editingId, setEditingId] = useState(null);
  const [editPrice, setEditPrice] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [message, setMessage] = useState('');

  // Form for adding product
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Vegetables',
    price: '',
    description: '',
  });

  // Handle direct file upload and convert to DataURL Base64
  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size is larger than 2MB. Please choose a smaller photo.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStartEdit = (prod) => {
    setEditingId(prod.id);
    setEditPrice(prod.price);
  };

  const handleSavePrice = (id) => {
    if (!editPrice || isNaN(editPrice) || Number(editPrice) <= 0) {
      alert('Please enter a valid price');
      return;
    }
    updateProduct(id, { price: Number(editPrice) });
    setEditingId(null);
    setMessage('Price updated according to market demand! 📈');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleQuickDemandAdjustment = (id, currentPrice, multiplier, label) => {
    const updated = Math.round(currentPrice * multiplier);
    updateProduct(id, { price: updated });
    setMessage(`Demand adjusted (${label}): New price set to ₹${updated}/kg`);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      alert('Please provide product name and price');
      return;
    }

    // Use uploaded photo preview or fall back to high quality farm produce default
    const finalImg =
      imagePreview ||
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&h=400&fit=crop';

    addProduct({
      name: newProduct.name,
      category: newProduct.category,
      price: Number(newProduct.price),
      img: finalImg,
      farmer: user ? user.name : 'Local Farmer',
      description: newProduct.description || 'Fresh produce directly harvested from farm.',
    });

    setNewProduct({
      name: '',
      category: 'Vegetables',
      price: '',
      description: '',
    });
    setImagePreview('');

    setMessage('🎉 Product successfully uploaded & listed on marketplace!');
    setTimeout(() => setMessage(''), 3500);
  };

  return (
    <div className="farmer-dashboard-page">
      <div className="farmer-container">
        <header className="farmer-header">
          <div className="header-titles">
            <h2>👨‍🌾 Farmer Dashboard & Harvest Listing</h2>
            <p>Welcome back, <strong>{user?.name || 'Farmer'}</strong>. Upload your harvests, manage real-time inventory, and change prices based on market demand.</p>
          </div>
          <div className="market-demand-badge">
            <span className="live-dot"></span> Live Market: <strong>High Seasonal Demand</strong>
          </div>
        </header>

        {message && <div className="farmer-alert">{message}</div>}

        {/* Dynamic Demand Pricing Assistant Box */}
        <section className="demand-advice-card">
          <div className="demand-icon">💡</div>
          <div className="demand-text">
            <h4>Dynamic Demand Price Optimization</h4>
            <p>
              Demand varies with weather and market arrivals. Increase prices during high festive demand, or discount surplus perishables to clear harvest instantly with zero wastage!
            </p>
          </div>
        </section>

        <div className="farmer-grid-layout">
          {/* Add Product Form with File Upload */}
          <div className="farmer-card add-product-card">
            <h3>📸 Upload & List Farm Product</h3>
            <form onSubmit={handleAddSubmit} className="add-form">
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  placeholder="e.g. Desi Carrots, Organic Cauliflower"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  >
                    <option value="Vegetables">Vegetables</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Grains & Pulses">Grains & Pulses</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Organic Products">Organic Products</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Price (₹/kg or unit)</label>
                  <input
                    type="number"
                    placeholder="e.g. 45"
                    min="1"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Direct File Upload Option */}
              <div className="form-group">
                <label>📷 Upload Product Photo (From Device/Gallery)</label>
                <div className="file-upload-box">
                  <input
                    type="file"
                    id="farmer-file-upload"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="file-input-hidden"
                  />
                  <label htmlFor="farmer-file-upload" className="file-upload-label">
                    📁 Choose Photo from Device
                  </label>
                  {imagePreview && (
                    <div className="uploaded-preview-wrap">
                      <img src={imagePreview} alt="Upload preview" className="uploaded-preview-img" />
                      <button
                        type="button"
                        className="remove-img-btn"
                        onClick={() => setImagePreview('')}
                      >
                        ✕ Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Product Description / Harvest Date</label>
                <textarea
                  rows="2"
                  placeholder="e.g. Freshly picked today morning without chemical sprays"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="submit-listing-btn">
                🌱 Publish Produce to Marketplace
              </button>
            </form>
          </div>

          {/* Manage Products & Change Price by Demand */}
          <div className="farmer-card manage-product-card">
            <div className="card-header-flex">
              <h3>📦 Your Listed Produce ({myProducts.length})</h3>
              <Link to="/shop" className="view-shop-link">Browse in Shop ↗</Link>
            </div>

            {myProducts.length === 0 ? (
              <div className="no-items">
                <p>No products listed under your name yet.</p>
                <small>Upload your first crop photo and details using the form on the left!</small>
              </div>
            ) : (
              <div className="farmer-item-list">
                {myProducts.map((prod) => (
                  <div key={prod.id} className="farmer-prod-item">
                    <img src={prod.img} alt={prod.name} className="farmer-prod-thumb" />
                    <div className="farmer-prod-info">
                      <div className="prod-name-cat">
                        <h4>{prod.name}</h4>
                        <span className="cat-tag">{prod.category}</span>
                      </div>

                      {/* Pricing Section */}
                      <div className="pricing-box">
                        {editingId === prod.id ? (
                          <div className="inline-edit-price">
                            <label>₹</label>
                            <input
                              type="number"
                              value={editPrice}
                              onChange={(e) => setEditPrice(e.target.value)}
                              className="price-input"
                              autoFocus
                            />
                            <button className="save-btn" onClick={() => handleSavePrice(prod.id)}>Save</button>
                            <button className="cancel-btn" onClick={() => setEditingId(null)}>✕</button>
                          </div>
                        ) : (
                          <div className="display-price-row">
                            <span className="price-tag">₹{prod.price}/kg</span>
                            <button className="edit-price-btn" onClick={() => handleStartEdit(prod)}>
                              ✏️ Change Price
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Demand Surge / Discount buttons */}
                      <div className="demand-triggers">
                        <span className="demand-label">Quick Demand Shift:</span>
                        <button
                          title="Increase 10% for high demand festival/weekend"
                          onClick={() => handleQuickDemandAdjustment(prod.id, prod.price, 1.1, '+10% High Demand')}
                          className="demand-btn surge"
                        >
                          📈 +10% High Demand
                        </button>
                        <button
                          title="Discount 10% to clear perishable stock faster"
                          onClick={() => handleQuickDemandAdjustment(prod.id, prod.price, 0.9, '-10% Fast Clearance')}
                          className="demand-btn discount"
                        >
                          📉 -10% Surplus Sale
                        </button>
                      </div>
                    </div>

                    <button
                      className="delete-prod-btn"
                      onClick={() => {
                        if (window.confirm(`Delete ${prod.name} from marketplace?`)) {
                          deleteProduct(prod.id);
                        }
                      }}
                      title="Remove product"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Global Marketplace Overview Table */}
        <section className="farmer-card full-width-card">
          <h3>🌍 Live Regional Mandi Price Benchmarks</h3>
          <p className="subtitle">Real-time marketplace price comparison across regional growers.</p>
          <div className="table-responsive">
            <table className="farmer-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Farmer</th>
                  <th>Current Price</th>
                  <th>Demand Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td className="item-cell">
                      <img src={p.img} alt={p.name} />
                      <span>{p.name}</span>
                    </td>
                    <td>{p.category}</td>
                    <td>{p.farmer}</td>
                    <td className="price-bold">₹{p.price}/kg</td>
                    <td>
                      <button
                        className="quick-adjust-btn"
                        onClick={() => {
                          const newP = prompt(`Change price for ${p.name} (Current: ₹${p.price}):`, p.price);
                          if (newP && !isNaN(newP)) {
                            updateProduct(p.id, { price: Number(newP) });
                            setMessage(`Updated price for ${p.name} to ₹${newP}`);
                            setTimeout(() => setMessage(''), 2500);
                          }
                        }}
                      >
                        Adjust Price
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FarmerDashboard;
