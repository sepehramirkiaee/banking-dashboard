import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import DashboardRoutes from "./DashboardRoutes";
import { isAuthenticated } from "../utils/auth";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Handle authentication at the root */}
        <Route path="/" element={<Navigate to={isAuthenticated() ? "/app" : "/auth/login"} replace />} />

        {/* Public Routes (Accessible without authentication) */}
        <Route path="auth/*" element={<AuthRoutes />} />

        {/* Protected Routes (Accessible only after authentication) */}
        <Route path="app/*" element={<DashboardRoutes />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;