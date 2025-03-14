import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("authToken", "dummy-token");
    navigate("/app", { replace: true });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">🔑 Login</h1>
      <button onClick={handleLogin} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Login
      </button>
    </div>
  );
};

export default Login;