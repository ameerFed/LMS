import React from "react";
import StudentDashboard from "../pages/student/StudentDashboard/StudentDashboard";
import InstructureDashboard from "../pages/instructor/InstructureDashboard/InstructureDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard/AdminDashboard";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RoleBasedDashboard = () => {
  const { token, role } = useSelector((state) => state.auth);

  const isAuthenticated = !!token;

  console.log(role);
  switch (role) {
    case "Student":
      return <StudentDashboard />;
    case "Instructor":
      return <InstructureDashboard />;
    case "Admin":
      return <AdminDashboard />;
    default:
      return <Navigate to="/" replace />;
  }
};

export default RoleBasedDashboard;
