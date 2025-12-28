import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { api } from '../apiClient';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

// Zod schema for the change password form
const PasswordChangeSchema = z.object({
  new_password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Password must include a lowercase letter")
    .regex(/[A-Z]/, "Password must include an uppercase letter")
    .regex(/\d/, "Password must include a number")
    .regex(/[^A-Za-z0-9]/, "Password must include a special character"),
  confirm_password: z.string()
}).refine(data => data.new_password === data.confirm_password, {
  message: "Passwords do not match",
  path: ["confirm_password"]
});

type PasswordChangeData = z.infer<typeof PasswordChangeSchema>;

const ForceChangePassword: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PasswordChangeData>({
    new_password: '',
    confirm_password: ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof PasswordChangeData, string>>>({});
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  // Define mutation for change-password API call
  const changePasswordMutation = useMutation({
    mutationFn: async (data: { new_password: string }) => {
      // Call the change-password endpoint (expects new_password and confirm_password)
      const response = await api.post('/auth/change-password', data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Password changed successfully!');
      // After successful password change, redirect to dashboard (or login if desired).
      navigate('/dashboard', { replace: true });
    },
    onError: (error: any) => {
      console.error('Change password error', error);
      const msg = error?.response?.data?.detail || 'Failed to change password.';
      toast.error(msg);
    }
  });

  // Input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const result = PasswordChangeSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof PasswordChangeData, string>> = {};
      for (const issue of result.error.issues) {
        const fieldName = issue.path[0] as keyof PasswordChangeData;
        fieldErrors[fieldName] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    // Only send new_password (and confirm on backend not needed if backend re-validates match)
    changePasswordMutation.mutate({ new_password: formData.new_password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Change Password
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Your account requires a password update. Please set a new password.
        </p>
        <form onSubmit={handleSubmit}>
          {/* New Password field */}
          <div className="mb-4 relative">
            <label htmlFor="new_password" className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input 
              type={showNewPassword ? "text" : "password"}
              id="new_password"
              name="new_password"
              value={formData.new_password}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter new password"
            />
            <span 
              onClick={() => setShowNewPassword(prev => !prev)}
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer select-none text-sm text-gray-600"
            >
              {showNewPassword ? 'Hide' : 'Show'}
            </span>
            {errors.new_password && (
              <p className="text-red-600 text-sm mt-1">{errors.new_password}</p>
            )}
          </div>
          {/* Confirm Password field */}
          <div className="mb-6 relative">
            <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input 
              type={showConfirmPassword ? "text" : "password"}
              id="confirm_password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Re-enter new password"
            />
            <span 
              onClick={() => setShowConfirmPassword(prev => !prev)}
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer select-none text-sm text-gray-600"
            >
              {showConfirmPassword ? 'Hide' : 'Show'}
            </span>
            {errors.confirm_password && (
              <p className="text-red-600 text-sm mt-1">{errors.confirm_password}</p>
            )}
          </div>
          <button 
            type="submit" 
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={changePasswordMutation.isLoading}
          >
            {changePasswordMutation.isLoading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForceChangePassword;
