import DashboardSidebar from "../../../components/DashboardSidebar/DashboardSidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="student-dashboard">
      <DashboardSidebar />
      <div className="content-wrapper">
        <Outlet />
      </div>
    </div>
  );
}
