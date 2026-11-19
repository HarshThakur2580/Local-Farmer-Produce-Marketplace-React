import React from 'react';
import { useLocation } from '../context/LocationContext';
import './LocationBar.css';

const LocationBar = () => {
  const {
    distanceKm,
    locationName,
    deliveryCharge,
    detecting,
    locationError,
    detectLiveLocation,
    setManualDistance,
  } = useLocation();

  const isFree = deliveryCharge === 0;

  return (
    <div className="location-bar">
      <div className="location-bar-content">
        <div className="location-left">
          <span className="location-pin-icon">📍</span>
          <div className="location-details">
            <span className="location-title">
              Delivery to: <strong>{locationName}</strong>
            </span>
            <span className="location-distance">
              Distance: <strong>{distanceKm} km</strong> from local farm hub
            </span>
          </div>
        </div>

        <div className="location-center-badge">
          {isFree ? (
            <span className="badge-free">🎉 Free Delivery (Within 2 km)</span>
          ) : (
            <span className="badge-paid">🚚 Delivery Charge: ₹{deliveryCharge} ({distanceKm} km)</span>
          )}
        </div>

        <div className="location-actions">
          <button
            className="gps-btn"
            onClick={detectLiveLocation}
            disabled={detecting}
          >
            {detecting ? '📡 Locating...' : '🎯 Detect My GPS'}
          </button>

          {/* Quick distance switchers for testing */}
          <div className="quick-switchers">
            <button
              className={`chip-btn ${distanceKm <= 2 ? 'active' : ''}`}
              onClick={() => setManualDistance(1.2, 'Local Area (<2km)')}
              title="Within 2km radius - FREE delivery"
            >
              Nearby (1.2 km - FREE)
            </button>
            <button
              className={`chip-btn ${distanceKm > 2 && distanceKm <= 5 ? 'active' : ''}`}
              onClick={() => setManualDistance(4.5, 'Suburban Area (4.5km)')}
              title="Beyond 2km - Calculated delivery fee"
            >
              Mid (4.5 km)
            </button>
            <button
              className={`chip-btn ${distanceKm > 5 ? 'active' : ''}`}
              onClick={() => setManualDistance(8.0, 'Outer City (8km)')}
              title="Far location - Standard distance fee"
            >
              Far (8.0 km)
            </button>
          </div>
        </div>
      </div>

      {locationError && (
        <div className="location-warning-message">{locationError}</div>
      )}
    </div>
  );
};

export default LocationBar;
