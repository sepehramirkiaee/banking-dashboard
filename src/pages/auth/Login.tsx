import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("authToken", "dummy-token");
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="flex flex-col gap-4 w-96">
      <h1 className="text-2xl font-bold text-center mb-4">Sign in to your account</h1>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="block text-gray-800 text-sm font-medium">Email</label>
        <input type="email" id="email" className="w-full p-2 border rounded border-gray-300 text-sm" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="block text-gray-800 text-sm font-medium">Password</label>
        <input type="password" id="password" className="w-full p-2 border rounded border-gray-300 text-sm" />
      </div>
      <button onClick={handleLogin} className="w-full text-sm font-medium bg-indigo-700 text-white p-2 rounded hover:bg-ingido-700 cursor-pointer hover:bg-indigo-800">
        Just Click to Login
      </button>
    </div>
  );
};

export default Login;