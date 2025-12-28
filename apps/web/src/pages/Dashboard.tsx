import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { api } from '../apiClient';

interface UserInfo {
  id?: number;
  username?: string;
  email?: string;
  role: string;
  must_change_password: boolean;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const { data: user, error } = useQuery(['me'], async () => {
    const response = await api.get<UserInfo>('/auth/me');
    return response.data;
  });

  const handleLogout = async () => {
    localStorage.removeItem('token');
    navigate('/auth/user', { replace: true });
  };

  if (error) {
    console.error('Failed to fetch user info', error);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      {user ? (
        <p className="text-lg mb-8">
          Welcome, <span className="font-semibold">{user.username || user.email || 'User'}</span>! You are logged in as{' '}
          <strong>{user.role}</strong>.
        </p>
      ) : (
        <p className="text-lg mb-8">Loading user information...</p>
      )}
      <button
        onClick={handleLogout}
        className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
