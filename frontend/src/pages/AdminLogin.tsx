import React from 'react';
import LoginForm from '../components/LoginForm';

// Admin Login page – uses the generic LoginForm component with "Admin" context
const AdminLogin: React.FC = () => {
  return <LoginForm userType="Admin" />;
};

export default AdminLogin;
