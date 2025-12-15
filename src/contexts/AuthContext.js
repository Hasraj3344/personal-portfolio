import React, { createContext, useState, useEffect } from 'react';
import { verifyAdminPassword } from '../services/api';

export const AuthContext = createContext();

const AUTH_KEY = 'portfolio_admin_auth';

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem(AUTH_KEY);
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (password) => {
    try {
      const isValid = await verifyAdminPassword(password);
      if (isValid) {
        setIsAuthenticated(true);
        localStorage.setItem(AUTH_KEY, 'true');
        return { success: true };
      } else {
        return { success: false, error: 'Invalid password' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_KEY);
  };

  const value = {
    isAuthenticated,
    loading,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
