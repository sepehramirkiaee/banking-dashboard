import Input from "@/components/common/form/Input";
import Label from "@/components/common/form/Label";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("authToken", "dummy-token");
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="flex flex-col gap-4 w-full md:w-96 p-8">
      <h1 className="text-2xl font-bold text-center mb-4">Sign in to your account</h1>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" />
      </div>
      <button onClick={handleLogin} className="w-full text-sm font-medium bg-indigo-700 text-white p-2 rounded hover:bg-ingido-700 cursor-pointer hover:bg-indigo-800">
        Just Click to Login
      </button>
    </div>
  );
};

export default Login;