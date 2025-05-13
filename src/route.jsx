import AuthLayout from "./pages/auth/auth-layout/auth-layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login/login";
import SignUp from "./pages/auth/sign-up/sign-up";
import AddEducation from "./pages/dashboard/add-education/add-education";
import AddExperience from "./pages/dashboard/add-experience/add-experience";
import ForgotPassword from "./pages/auth/forgot-password/forgot-password";
import ConfirmationCode from "./pages/auth/confirmation-code/confirmation-code";
import UserType from "./pages/auth/user-type/user-type";
import ProfileSetup from "./pages/dashboard/profile-setup/profile-setup";

function MainRoute() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={"/"} element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path={"/sign-up"} element={<SignUp />} />
            <Route path={"/forgot-password"} element={<ForgotPassword />} />
            <Route path={"/confirmation-code"} element={<ConfirmationCode />} />
            <Route path={"/add-education"} element={<AddEducation />} />
            <Route path={"/add-experience"} element={<AddExperience />} />
            <Route path={"/user-type"} element={<UserType />} />
            <Route path={"/profile-setup"} element={<ProfileSetup />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default MainRoute;
