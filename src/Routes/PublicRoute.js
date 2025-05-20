// src/components/PublicRoute.js
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { token, role } = useSelector((state) => state.auth);

  const isAuthenticated = !!token;

  if (isAuthenticated) {
    // Force redirect based on user role
    switch (role) {
      case "student":
        return <Navigate to="/student-dashboard" replace />;
      case "instructor":
        return <Navigate to="/instructor-dashboard" replace />;
      case "admin":
        return <Navigate to="/admin-dashboard" replace />;
      default:

        if (role?.toLowerCase().includes("instructor")) {
          return <Navigate to="/instructor-dashboard" replace />;
        } else if (role?.toLowerCase().includes("admin")) {
          return <Navigate to="/admin-dashboard" replace />;
        } else if (role?.toLowerCase().includes("student")) {
          return <Navigate to="/student-dashboard" replace />;
        } else{
          return <Navigate to="/" replace />;
        }
    }
  }

  // Allow access to public route if not authenticated
  return <Outlet />;
};

export default PublicRoute;
