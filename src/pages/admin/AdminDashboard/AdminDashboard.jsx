import React from "react";
import globalFunction from "../../../utils/globalFunction";

export default function AdminDashboard() {
  return (
    <div className="d-flex align-items-center justify-content-center h-full w-full">
      <div className="d-flex flex-column gap-4">
        <h2 className="ah-heading-02 fw-semibold">Admin Dashboard</h2>

        <button className="btn btn-primary" onClick={() => globalFunction.logoutFunction()}>Logout</button>
      </div>
    </div>
  );
}
