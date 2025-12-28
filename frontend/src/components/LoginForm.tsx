import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { api } from '../apiClient';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

// Define a Zod schema for login form validation.
const LoginSchema = z.object({
  username: z.string().nonempty("Username is required")
              .refine(val => val.includes('.') && !val.startsWith('.') && !val.endsWith('.'), {
                message: "Username must contain a dot (.)"
              }),
  password: z.string().nonempty("Password is required")
});

// TypeScript types from the Zod schema
type LoginData = z.infer<typeof LoginSchema>;

interface LoginFormProps {
  userType: 'User' | 'Admin' | 'Supervisor';  // to display appropriate title/heading
}

const LoginForm: React.FC<LoginFormProps> = ({ userType }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginData>({ username: '', password: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginData, string>>>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  
  // Define the mutation for login API call using react-query
  const loginMutation = useMutation({
    mutationFn: async (data: LoginData) => {
      // POST request to login API
      const response = await api.post('/auth/login', data);
      return response.data;
    },
    onSuccess: (data) => {
      // On successful login, store the JWT token and redirect based on role or flags
      localStorage.setItem('token', data.access_token);
      const role: string = data.role;
      const mustChange: boolean = data.must_change_password;
      // If supervisor and must_change_password is true, redirect to force-change page
      if (role === 'supervisor' && mustChange) {
        navigate('/auth/force-change-password', { replace: true });
        toast.success('Login successful! Please change your password.');
      } else {
        // Otherwise, go to the dashboard (or relevant landing page)
        navigate('/dashboard', { replace: true });
        toast.success('Login successful!');
      }
    },
    onError: (error: any) => {
      // On error, show a toast with appropriate message
      console.error('Login error', error);
      // If backend provided an error message, use it; otherwise generic:
      const msg = error?.response?.data?.detail || 'Invalid username or password.';
      toast.error(msg);
    }
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); // reset previous errors
    // Validate form data with Zod
    const result = LoginSchema.safeParse(formData);
    if (!result.success) {
      // Extract validation issues and set error messages
      const fieldErrors: Partial<Record<keyof LoginData, string>> = {};
      for (const issue of result.error.issues) {
        const fieldName = issue.path[0] as keyof LoginData;
        fieldErrors[fieldName] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    // If validation passes, trigger the login API call
    loginMutation.mutate(formData);
  };

  // Google sign-in stub handler: just show a toast for now
  const handleGoogleSignIn = () => {
    toast.success('Google sign-in is not implemented in this demo.');
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* Form container/card */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {userType} Sign In
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Username field */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input 
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. john.doe"
            />
            {errors.username && (
              <p className="text-red-600 text-sm mt-1">{errors.username}</p>
            )}
          </div>
          {/* Password field */}
          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input 
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
            {/* Toggle password visibility */}
            <span 
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer select-none text-sm text-gray-600"
            >
              {showPassword ? 'Hide' : 'Show'}
            </span>
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          {/* Submit button */}
          <button 
            type="submit" 
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={loginMutation.isLoading}
          >
            {loginMutation.isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        {/* Divider or spacing */}
        <div className="my-4 text-center text-gray-500 text-sm">OR</div>
        {/* Google Sign-In button */}
        <button 
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center border border-gray-300 bg-white text-gray-700 py 2 px-4 rounded-md hover:bg-gray-50"
        >
          {/* Placeholder for Google icon or initial */}
          <span className="mr-2 text-lg">🌐</span>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
