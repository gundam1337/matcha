import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthProvider"; // Adjust the import path as needed

const ProtectedRoute = ({ children }) => {
  //FIXME : I dont know why the isAuthenticated after refrech get to false 
  const { isAuthenticated } = useAuth();
  console.log("the application state ",isAuthenticated)
  if (!isAuthenticated) {
    // Redirect them to the login page if not authenticated
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;

// return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;