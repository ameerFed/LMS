import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AuthLayout from "../pages/auth/AuthLayout/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
// import ProtectedRoute from "../components/ProtectedRoute";
// import PublicRoute from "../components/PublicRoute"; // New import
import Login from "../pages/auth/Login/Login";
import SignUp from "../pages/auth/Signup/Signup";
import ForgotPassword from "../pages/auth/ForgotPassword/ForgotPassword";
import ConfirmationCode from "../pages/auth/ConfirmationCode/ConfirmationCode";
import ForgotConfirmationCode from "../pages/auth/ForgotConfirmationCode/ForgotConfirmationCode";
import ResetPassword from "../pages/auth/ResetPassword/ResetPassword";
import UserType from "../pages/auth/UserType/UserType";
import ProfileSetup from "../pages/instructor/ProfileSetup/ProfileSetup";
import Organization from "../pages/auth/OrganizationSignup/OrganizationSignup";
// import Unauthorized from "../pages/Unauthorized/Unauthorized";

// Student
import StudentDashboard from "../pages/student/StudentDashboard/StudentDashboard";
import AddEducation from "../pages/student/AddEducation/AddEducation";
import AddExperience from "../pages/student/AddExperience/AddExperience";
import DashboardLayout from "../pages/student/DashboardLayout/DashboardLayout";

// Instructor
import InstructorAddEducation from "../pages/instructor/InstructorAddEducation/InstructorAddEducation";
import InstructorAddExperience from "../pages/instructor/InstructorAddExperience/InstructorAddExperience";
import InstructureDashboard from "../pages/instructor/InstructureDashboard/InstructureDashboard";

// Admin
import AdminDashboard from "../pages/admin/AdminDashboard/AdminDashboard";

function MainRoute() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="confirmation-code" element={<ConfirmationCode />} />
            <Route path="forgot-confirmation-code" element={<ForgotConfirmationCode />} />
            <Route path="user-type" element={<UserType />} />
            <Route path="organization" element={<Organization />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["instructor"]} />}>
          <Route path="/" element={<AuthLayout />}>
            <Route path="instructor-dashboard" element={<InstructureDashboard />} />
            <Route path="profile-setup" element={<ProfileSetup />} />
            <Route
              path="instructor-add-education"
              element={<InstructorAddEducation />}
            />
            <Route
              path="instructor-add-experience"
              element={<InstructorAddExperience />}
            />
            <Route path="instructor-reset-password" element={<ResetPassword />} />
          </Route>
        </Route>

        {/* Protected Routes for Students */}
        <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
          <Route path="/" element={<AuthLayout />}>
            <Route path="add-education" element={<AddEducation />} />
            <Route path="add-experience" element={<AddExperience />} />
            <Route path="student-reset-password" element={<ResetPassword />} />
          </Route>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Navigate to="student-dashboard" replace />} />
            <Route path="student-dashboard" element={<StudentDashboard />} />
          </Route>
        </Route>

        {/* Protected Routes for Admins */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/" element={<AuthLayout />}>
            <Route path="admin-dashboard" element={<AdminDashboard />} />
            <Route path="admin-reset-password" element={<ResetPassword />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default MainRoute;
