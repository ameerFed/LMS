import React from "react";
import AddEducationComponent from "../../../components/AddEducationComponent/AddEducationComponent";

export default function InstructorAddEducation() {
  return (
    <div className="d-flex flex-column flex-grow-1 justify-content-center px-15">
      <div className="text-center mb-20">
        <h1 className="ah-heading-02 fw-semibold mb-3">Add Education</h1>
      </div>
      <AddEducationComponent />
    </div>
  );
}
