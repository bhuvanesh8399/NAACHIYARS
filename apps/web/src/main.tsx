import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './index.css';

const queryClient = new QueryClient();

// Render the React application, wrapping with QueryClientProvider (for react-query),
// BrowserRouter (for routing), and including the Toaster for toast notifications.
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      {/* Toast container */}
      <Toaster position="top-center" />
    </QueryClientProvider>
  </React.StrictMode>
);
