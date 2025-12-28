import { Routes, Route, Navigate } from 'react-router-dom';
import UserLogin from './pages/UserLogin';
import AdminLogin from './pages/AdminLogin';
import SupervisorLogin from './pages/SupervisorLogin';
import ForceChangePassword from './pages/ForceChangePassword';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

// Define the application routes. There are separate login pages for user, admin, and supervisor roles,
// plus a Force Change Password page and a protected Dashboard page as an example post-login route.
function App() {
  return (
    <Routes>
      {/* Default route redirects to User login */}
      <Route path="/" element={<Navigate to="/auth/user" replace />} />
      
      {/* Authentication routes for each role */}
      <Route path="/auth/user" element={<UserLogin />} />
      <Route path="/auth/admin" element={<AdminLogin />} />
      <Route path="/auth/supervisor" element={<SupervisorLogin />} />
      <Route path="/auth/force-change-password" element={<ForceChangePassword />} />
      
      {/* A sample protected route (Dashboard) that requires login */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Catch-all: redirect any unknown route to user login (or could show 404) */}
      <Route path="*" element={<Navigate to="/auth/user" replace />} />
    </Routes>
  );
}

export default App;
