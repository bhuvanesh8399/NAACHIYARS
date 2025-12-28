import axios from 'axios';

// Create a pre-configured Axios instance for API calls.
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000'  // Base URL of the backend API
});

// Axios request interceptor to attach JWT token from localStorage (if present) to every request.
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
