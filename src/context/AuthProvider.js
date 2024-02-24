import React, { createContext, useState, useEffect } from 'react';

// Create a context for authentication data
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const accessToken = localStorage.getItem('accessToken');
  const isAuthenticated = accessToken ? true : false;

  const [authState, setAuthState] = useState({
    accessToken,
    isAuthenticated,
  });
  
  // Function to update authentication state and local storage when the user logs in
  const login = (accessToken) => {
    localStorage.setItem('accessToken', accessToken);
    setAuthState({
      accessToken,
      isAuthenticated: true,
    });
  };

  // Function to clear authentication state and local storage when the user logs out
  const logout = () => {
    localStorage.removeItem('accessToken');
    setAuthState({
      accessToken: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for accessing the authentication context
export const useAuth = () => React.useContext(AuthContext);
