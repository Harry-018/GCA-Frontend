import { Navigate } from "react-router-dom";
import authStore from "./stores/authStore";

const protectedRoutes = ({ children, allowedRole }) => {
  const token = authStore((state) => state.token);
  const user = authStore((state) => state.user);

  if (!token) {
    return <Navigate to="/login" />;
  }
  if (!user || user.role !== allowedRole) {
    return <Navigate to="/notauth" />;
  }

  return children;
};

export default protectedRoutes;
