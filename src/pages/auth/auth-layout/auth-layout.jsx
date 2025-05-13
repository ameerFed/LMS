import React from "react";
import AuthHeader from "../../../components/auth-header/auth-header";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="bg-gray h-screen min-vh-100 d-flex flex-column">
      <AuthHeader />
      <div className="d-flex flex-grow-1 justify-content-center align-items-center py-30">
        <Outlet />
      </div>
    </div>
  );
}
