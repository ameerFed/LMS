import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function SignUp() {
  const initialValues = {
    full_name: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    full_name: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
      .required("Phone number is required"),
    dob: Yup.date().required("Date of Birth is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = (values) => {
    console.log("Form values:", values);
    // Redirect or API call here
  };

  return (
    <div className="d-flex flex-column flex-grow-1 justify-content-center px-15">
      <div className="text-center mb-20">
        <h1 className="ah-heading-02 fw-semibold mb-3">Create an Account</h1>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form
            action="#"
            className="bg-white auth-form-holder mx-auto px-20 px-sm-30 px-md-40 pt-40 pt-md-50 pb-30"
          >
            <div className="mb-12 mb-md-16">
              <label
                htmlFor="full_name"
                className="form-label black-100 fw-semibold mb-8 mb-xl-12"
              >
                Name
              </label>
              <Field
                name="full_name"
                type="text"
                className="form-control"
                placeholder="Name"
              />
              <ErrorMessage
                name="full_name"
                component="div"
                className="text-danger error"
              />
            </div>
            <div class="mb-12 mb-md-16">
              <label
                htmlFor="email"
                className="form-label black-100 fw-semibold mb-8 mb-xl-12"
              >
                Email
              </label>
              <Field
                name="email"
                type="email"
                class="form-control"
                placeholder="Enter Your Email"
              />
              <ErrorMessage className="text-danger error" name="email" component="div" />
            </div>
            <div class="mb-12 mb-md-16">
              <label
                htmlFor="phone"
                className="form-label black-100 fw-semibold mb-8 mb-xl-12"
              >
                Phone Number
              </label>
              <Field
                name="phone"
                type="text"
                placeholder="Phone Number"
                class="form-control"
              />
              <ErrorMessage className="text-danger error" name="phone" component="div" />
            </div>
            <div class="mb-12 mb-md-16">
              <label
                htmlFor="dob"
                className="form-label black-100 fw-semibold mb-8 mb-xl-12"
              >
                Date of Birth
              </label>
              <Field name="dob" class="form-control" type="date" />
              <ErrorMessage className="text-danger error" name="dob" component="div" />
            </div>
            <div class="mb-12 mb-md-16">
              <label
                htmlFor="password"
                className="form-label black-100 fw-semibold mb-8 mb-xl-12"
              >
                Password
              </label>
              <Field
                name="password"
                class="form-control"
                type="password"
                placeholder="Enter your Password"
              />
              <ErrorMessage className="text-danger error" name="password" component="div" />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="form-label black-100 fw-semibold mb-8 mb-xl-12"
              >
                Confirm Password
              </label>
              <Field
                name="confirmPassword"
                class="form-control"
                type="password"
                placeholder="Re-enter your Password"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-danger error"
              />
            </div>
            <div className="pt-12 mb-18 mb-md-24">
              <button class="btn btn-primary w-100 mb-10" type="submit">
                Next
              </button>
            </div>
            <div className="text-center text-base">
              Already have an account? 
              <Link to={'/'} className="fw-semibold text-green ms-5">
                Login
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
