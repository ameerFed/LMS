import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const { token, role } = useSelector((state) => state.auth);

  const isAuthenticated = !!token;
  //   const hasRequiredRole = allowedRoles.includes(role);
  //   console.log(hasRequiredRole)
  const hasRequiredRole = allowedRoles.some(
    (allowedRole) => allowedRole?.toLowerCase() === role?.toLowerCase()
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!hasRequiredRole) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
