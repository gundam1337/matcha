import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider"; // Adjust the import path as needed

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated,isLoading } = useAuth();

  if (isLoading) {
    // Render loading indicator or return null while checking the auth state
    return null; // or return null;
  }
  if (!isAuthenticated) {
    // Redirect them to the login page if not authenticated
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;

// return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
