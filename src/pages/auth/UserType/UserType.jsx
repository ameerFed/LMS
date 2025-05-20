import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function UserType() {
  const navigate = useNavigate();
  return (
    <div className="d-flex flex-column flex-grow-1 justify-content-center px-15">
      <div className="text-center mb-20">
        <h1 className="ah-heading-02 fw-semibold mb-3">Select User Type</h1>
      </div>
      <Formik
        initialValues={{ role: "" }}
        validationSchema={Yup.object({
          role: Yup.string().required("Please select a user type"),
        })}
        onSubmit={(values) => {
          if (values.role === "student") {
            navigate("/signup");
          } else if (values.role === "organization"){
            navigate("/organization");
          }
        }}
      >
        {({ errors, touched, handleSubmit, handleChange, values }) => (
          <Form className="bg-white auth-form-holder mx-auto px-20 px-sm-30 px-md-40 pt-40 pt-md-50 pb-30 mb-30">
            <div className="user-type-selection-card d-flex justify-content-center gap-3 mb-40">
              <div className="user-type-selection-card-item flex-grow-1">
                <input
                  type="radio"
                  id="student"
                  name="role"
                  value="student"
                  // onChange={handleRoleChange}
                  onChange={handleChange}
                  checked={values.role === "student"}
                />
                <label
                  htmlFor="student"
                  className="d-flex justify-content-center align-items-center"
                >
                  <div className="d-flex flex-column">
                    <span className="mb-15 icon icon-student"></span>
                    <span className="fw-semibold">As a Student</span>
                  </div>
                </label>
              </div>
              <div className="user-type-selection-card-item flex-grow-1">
                <input
                  type="radio"
                  id="organization"
                  name="role"
                  value="organization"
                  // onChange={handleRoleChange}
                  onChange={handleChange}
                  checked={values.role === "organization"}
                />
                <label
                  htmlFor="organization"
                  className="d-flex justify-content-center align-items-center"
                >
                  <div className="d-flex flex-column">
                    <span className="mb-15 icon icon-user-group"></span>
                    <span className="fw-semibold">As an Organization </span>
                  </div>
                </label>
              </div>
            </div>
            {touched.role && errors.role ? (
              <div className="text-danger text-center mb-3 text-sm">
                {errors.role}
              </div>
            ) : null}
            <button className="btn btn-primary w-100 mb-10" type="submit">
              Next
            </button>
          </Form>
        )}
      </Formik>
      <div className="auth-footer-area mx-auto">
        <p className="black-100 ah-text-base text-center px-10">
          *If you are representing an organization or university, please select
          the "Organization" user type and complete the signup process.
        </p>
      </div>
    </div>
  );
}
