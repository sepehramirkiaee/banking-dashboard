import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import AuthRoutes from "./AuthRoutes";
import DashboardRoutes from "./DashboardRoutes";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Public Routes (For Unauthenticated Users) */}
        <Route path="auth/*" element={<PublicRoute />}>
          <Route path="*" element={<AuthRoutes />} />
        </Route>

        {/* Protected Routes (Requires Authentication) */}
        <Route path="dashboard/*" element={<ProtectedRoute />}>
          <Route path="*" element={<DashboardRoutes />} />
        </Route>

        {/* Not Found Route (For Everything Else) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;