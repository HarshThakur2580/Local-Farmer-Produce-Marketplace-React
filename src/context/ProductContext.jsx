import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

// High-quality, reliable, farm-fresh produce images
const defaultProducts = [
  { 
    id: 1, 
    name: 'Tomatoes', 
    img: 'https://images.unsplash.com/photo-1546470427-0d4db154ceb8?w=500&h=400&fit=crop', 
    price: 40, 
    farmer: 'Raju', 
    category: 'Vegetables', 
    description: 'Fresh organically grown farm tomatoes rich in lycopene.' 
  },
  { 
    id: 2, 
    name: 'Potatoes', 
    img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba7b0?w=500&h=400&fit=crop', 
    price: 30, 
    farmer: 'Sita', 
    category: 'Vegetables', 
    description: 'Naturally harvested, earthy farm-fresh organic potatoes.' 
  },
  { 
    id: 3, 
    name: 'Onions', 
    img: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500&h=400&fit=crop', 
    price: 35, 
    farmer: 'Mohit', 
    category: 'Vegetables', 
    description: 'Crisp red onions freshly gathered directly from Nashik farms.' 
  },
  { 
    id: 4, 
    name: 'Mangoes', 
    img: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&h=400&fit=crop', 
    price: 120, 
    farmer: 'Anita', 
    category: 'Fruits', 
    description: 'Sweet, aromatic Alphonso mangoes from Konkan orchards.' 
  },
  { 
    id: 5, 
    name: 'Bananas', 
    img: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&h=400&fit=crop', 
    price: 50, 
    farmer: 'Suresh', 
    category: 'Fruits', 
    description: 'Naturally tree-ripened fresh robusta banana bunches.' 
  },
  { 
    id: 6, 
    name: 'Rice (1 kg)', 
    img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=400&fit=crop', 
    price: 80, 
    farmer: 'Vikram', 
    category: 'Grains & Pulses', 
    description: 'Long grain, aromatic aged basmati rice.' 
  },
  { 
    id: 7, 
    name: 'Wheat (1 kg)', 
    img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&h=400&fit=crop', 
    price: 70, 
    farmer: 'Geeta', 
    category: 'Grains & Pulses', 
    description: 'Golden Sharbati wheat grains, high in dietary fiber.' 
  },
  { 
    id: 8, 
    name: 'Fresh Milk (1 L)', 
    img: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&h=400&fit=crop', 
    price: 60, 
    farmer: 'Kamla', 
    category: 'Dairy', 
    description: 'Pure, chemical-free and unprocessed whole A2 cow milk.' 
  },
  { 
    id: 9, 
    name: 'Spinach', 
    img: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&h=400&fit=crop', 
    price: 25, 
    farmer: 'Raju', 
    category: 'Vegetables', 
    description: 'Crisp, leafy green spinach harvested this morning.' 
  },
  { 
    id: 10, 
    name: 'Capsicum', 
    img: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=500&h=400&fit=crop', 
    price: 80, 
    farmer: 'Sita', 
    category: 'Vegetables', 
    description: 'Crunchy greenhouse bell peppers rich in Vitamin C.' 
  },
  { 
    id: 11, 
    name: 'Apples', 
    img: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&h=400&fit=crop', 
    price: 180, 
    farmer: 'Mohit', 
    category: 'Fruits', 
    description: 'Fresh crisp Kinnaur Shimla royal delicious red apples.' 
  },
  { 
    id: 12, 
    name: 'Moong Dal (1 kg)', 
    img: 'https://images.unsplash.com/photo-1585994192701-f1a505c817ea?w=500&h=400&fit=crop', 
    price: 130, 
    farmer: 'Anita', 
    category: 'Grains & Pulses', 
    description: 'Unpolished, naturally grown green moong split dal packed with protein.' 
  },
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('farmfresh_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Fix any missing/broken legacy images for Potatoes and Moong Dal automatically
        return parsed.map((item) => {
          if (item.name.toLowerCase().includes('potato') && (!item.img || item.img.includes('futurecdn') || item.img.includes('wikimedia') || item.img.includes('b53f82ber633'))) {
            return { ...item, img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba7b0?w=500&h=400&fit=crop' };
          }
          if (item.name.toLowerCase().includes('moong') && (!item.img || item.img.includes('daivikorganic') || item.img.includes('wikimedia') || item.img.includes('ee7a6c5b16eb'))) {
            return { ...item, img: 'https://images.unsplash.com/photo-1585994192701-f1a505c817ea?w=500&h=400&fit=crop' };
          }
          return item;
        });
      } catch (e) {
        return defaultProducts;
      }
    }
    return defaultProducts;
  });

  useEffect(() => {
    localStorage.setItem('farmfresh_products', JSON.stringify(products));
  }, [products]);

  // Add new product (Farmer or Admin)
  const addProduct = (newProd) => {
    const productWithId = {
      ...newProd,
      id: Date.now(),
      price: Number(newProd.price),
    };
    setProducts((prev) => [productWithId, ...prev]);
    return productWithId;
  };

  // Update product price or details (Farmer or Admin)
  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...updatedFields, price: Number(updatedFields.price !== undefined ? updatedFields.price : item.price) } : item
      )
    );
  };

  // Delete product (Admin or Farmer who created it)
  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
