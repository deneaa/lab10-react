import { Navigate, useLocation } from "react-router";
import { useAuth } from "../../context/AuthContext/useAuth";
import type { ReactNode } from "react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { state } = useAuth();
  const location = useLocation();

  if (!state.isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
};

export default PrivateRoute;