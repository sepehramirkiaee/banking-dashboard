import { Routes, Route } from "react-router-dom";
import AuthLayout from "../layouts/auth";
import Login from "../pages/auth/Login";
import NotFound from "../pages/NotFound";


const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AuthRoutes;