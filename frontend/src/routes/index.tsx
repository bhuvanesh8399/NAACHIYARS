import { Routes, Route, Navigate } from "react-router-dom";
import SupervisorLogin from "../pages/auth/SupervisorLogin";
import AdminLoginStub from "../pages/auth/AdminLoginStub";
import UserLoginStub from "../pages/auth/UserLoginStub";
import ForceChangePasswordStub from "../pages/auth/ForceChangePasswordStub";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth/supervisor" replace />} />
      <Route path="/auth/supervisor" element={<SupervisorLogin />} />
      <Route path="/auth/admin" element={<AdminLoginStub />} />
      <Route path="/auth/user" element={<UserLoginStub />} />
      <Route path="/auth/force-change-password" element={<ForceChangePasswordStub />} />
    </Routes>
  );
}
