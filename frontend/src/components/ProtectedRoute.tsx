import React from 'react';
import { Navigate } from 'react-router-dom';

// A higher-order component for protecting routes. If no valid token is found, 
// it redirects to the user login page. Otherwise, it renders the child component.
interface ProtectedRouteProps {
  children: React.ReactElement;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    // Not logged in: redirect to login
    return <Navigate to="/auth/user" replace />;
  }
  return children;
};

export default ProtectedRoute;
