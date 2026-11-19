import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Initialize demo accounts if not existing
  useEffect(() => {
    const existingUsers = JSON.parse(localStorage.getItem('farmfresh_users') || '[]');
    let modified = false;

    // Default admin account
    if (!existingUsers.find((u) => u.email === 'admin@farmfresh.com')) {
      existingUsers.push({
        name: 'Master Admin',
        email: 'admin@farmfresh.com',
        password: 'admin',
        role: 'admin',
      });
      modified = true;
    }

    // Default farmer account
    if (!existingUsers.find((u) => u.email === 'farmer@farmfresh.com')) {
      existingUsers.push({
        name: 'Raju Farmer',
        email: 'farmer@farmfresh.com',
        password: 'farmer',
        role: 'farmer',
      });
      modified = true;
    }

    if (modified) {
      localStorage.setItem('farmfresh_users', JSON.stringify(existingUsers));
    }

    const savedUser = localStorage.getItem('farmfresh_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {}
    }
  }, []);

  const register = (name, email, password, role = 'customer') => {
    const users = JSON.parse(localStorage.getItem('farmfresh_users') || '[]');

    const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    const newUser = { name, email, password, role };
    users.push(newUser);
    localStorage.setItem('farmfresh_users', JSON.stringify(users));

    return { success: true, message: `Account created successfully as ${role}! Please log in.` };
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('farmfresh_users') || '[]');
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!found) {
      return { success: false, message: 'Invalid email or password. Please try again.' };
    }

    const loggedInUser = { name: found.name, email: found.email, role: found.role || 'customer' };
    setUser(loggedInUser);
    localStorage.setItem('farmfresh_user', JSON.stringify(loggedInUser));
    return { success: true, message: `Welcome back, ${found.name}!`, role: found.role };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('farmfresh_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
