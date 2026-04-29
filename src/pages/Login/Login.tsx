import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext/useAuth";

const Login = () => {
  const { dispatch } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  const handleLogin = () => {
    dispatch({ type: "LOGIN" });
    navigate(from, { replace: true });
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Log in</button>
    </div>
  );
};

export default Login;
