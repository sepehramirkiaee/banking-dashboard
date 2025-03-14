import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../layouts/dashboard";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";


const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;