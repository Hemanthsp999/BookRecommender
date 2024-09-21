import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = () => {
  const { currentUser } = useAuth();

  // if user is verfified then return to home page otherwise to login page
  return currentUser ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoute;
