import React, { createContext, useContext, useState, useEffect } from 'react';

const LocationContext = createContext();

export const useLocation = () => useContext(LocationContext);

// FarmFresh Hub Central Warehouse Coordinates (Simulated regional farm distribution center)
export const HUB_COORDINATES = {
  lat: 28.6139, // New Delhi center standard reference point
  lng: 77.2090,
  name: 'FarmFresh Central Mandi & Hub (Sector 18)',
};

// Haversine formula to compute geodesic distance between two GPS points in Kilometers
export const calculateDistanceKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return Number(distance.toFixed(1));
};

export const LocationProvider = ({ children }) => {
  // Default to 1.5 km (within 2km radius = FREE delivery by default)
  const [distanceKm, setDistanceKm] = useState(() => {
    const saved = localStorage.getItem('farmfresh_user_distance');
    return saved ? Number(saved) : 1.5;
  });

  const [locationName, setLocationName] = useState(() => {
    return localStorage.getItem('farmfresh_user_loc_name') || 'Near Farm Hub (1.5 km away)';
  });

  const [coordinates, setCoordinates] = useState(null);
  const [detecting, setDetecting] = useState(false);
  const [locationError, setLocationError] = useState('');

  // Persist distance
  useEffect(() => {
    localStorage.setItem('farmfresh_user_distance', distanceKm.toString());
    localStorage.setItem('farmfresh_user_loc_name', locationName);
  }, [distanceKm, locationName]);

  // Delivery Pricing Logic:
  // <= 2km: FREE Delivery (₹0)
  // > 2km: Base ₹20 + ₹10 per km beyond 2km
  const calculateDeliveryCharge = (km) => {
    if (km <= 2.0) {
      return 0; // FREE!
    }
    const extraKm = Math.ceil(km - 2.0);
    return 20 + extraKm * 10;
  };

  const deliveryCharge = calculateDeliveryCharge(distanceKm);

  // HTML5 Browser Geolocation API
  const detectLiveLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }

    setDetecting(true);
    setLocationError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        setCoordinates({ lat: userLat, lng: userLng });

        // Calculate distance from Farm Hub
        const dist = calculateDistanceKm(
          userLat,
          userLng,
          HUB_COORDINATES.lat,
          HUB_COORDINATES.lng
        );

        setDistanceKm(dist);
        setLocationName(`GPS Detected (${userLat.toFixed(2)}, ${userLng.toFixed(2)})`);
        setDetecting(false);
      },
      (error) => {
        setDetecting(false);
        setLocationError(
          'Location access was denied or timed out. You can manually set your distance below!'
        );
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Set preset or manual distance (e.g. 1.2km nearby vs 5.5km far)
  const setManualDistance = (km, name = '') => {
    const val = Number(km);
    setDistanceKm(val);
    if (name) {
      setLocationName(name);
    } else {
      setLocationName(val <= 2 ? `Local Neighborhood (${val} km)` : `Outstation Delivery (${val} km)`);
    }
  };

  return (
    <LocationContext.Provider
      value={{
        distanceKm,
        locationName,
        deliveryCharge,
        detecting,
        locationError,
        detectLiveLocation,
        setManualDistance,
        calculateDeliveryCharge,
        HUB_COORDINATES,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContext;
