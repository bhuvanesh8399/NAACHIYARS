import React from 'react';
import LoginForm from '../components/LoginForm';

// Supervisor Login page – uses the generic LoginForm component with "Supervisor" context
const SupervisorLogin: React.FC = () => {
  return <LoginForm userType="Supervisor" />;
};

export default SupervisorLogin;
