import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../layouts/dashboard";
import Dashboard from "../pages/Dashboard";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;