import React from 'react';
import LoginForm from '../components/LoginForm';

// User Login page – uses the generic LoginForm component with "User" context
const UserLogin: React.FC = () => {
  return <LoginForm userType="User" />;
};

export default UserLogin;
