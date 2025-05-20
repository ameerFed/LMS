import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loginAPI } from "../../../redux/features/authSlice";
import toast from "react-hot-toast";
import CustomButton from "../../../components/CustomButton/CustomButton";

export default function Login() {
  const [passwordShow, setPasswordShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
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
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const result = await dispatch(loginAPI(values)).unwrap();
      if (result.success) {
        toast.success(result.message, {
          position: "top-center",
        });
        
        if (result.data.role === "Instructor" && result.data.status === "pending") {
          navigate("/profile-setup");
        } else if (result.data.role === "Instructor" && result.data.status === "complete"){
          navigate("/instructor-dashboard");
        }
         else if (result.data.role === "Student") {
          navigate("/student-dashboard"); // Add appropriate route
        } else if (result.data.role === "Admin") {
          navigate("/admin-dashboard");
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.message || "Login failed. Please try again.", {
        position: "top-center",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="d-flex flex-column flex-grow-1 justify-content-center px-15">
      <div className="text-center mb-20">
        <h1 className="ah-heading-02 fw-semibold mb-3">Welcome!</h1>
        <p className="black-100 ah-text-base">
          Log in with your University Credentials
        </p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form
            action="#"
            className="bg-white auth-form-holder mx-auto px-20 px-sm-30 px-md-40 pt-40 pt-md-50 pb-30"
          >
            <div className="mb-12 mb-md-16">
              <label
                htmlFor="email"
                className="form-label black-100 fw-semibold mb-8 mb-xl-12"
              >
                Email
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="form-control"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger mt-1"
              />
            </div>
            <div className="mb-12 mb-md-16">
              <label
                htmlFor="password"
                className="form-label black-100 fw-semibold mb-8 mb-xl-12"
              >
                Password
              </label>
              <div className="position-relative">
                <Field
                  type={passwordShow ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  className="form-control"
                />
                {!passwordShow ? (
                  <svg
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)",
                      width: "20px",
                    }}
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="eye-slash"
                    className="cursor-pointer"
                    onClick={() => setPasswordShow(!passwordShow)}
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                  >
                    <path
                      fill="currentColor"
                      d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)",
                      width: "20px",
                    }}
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="eye"
                    className="cursor-pointer"
                    onClick={() => setPasswordShow(!passwordShow)}
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="currentColor"
                      d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
                    ></path>
                  </svg>
                )}
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger mt-1"
              />
              <div className="text-end pt-4 pt-md-10">
                <Link
                  to={"/forgot-password"}
                  className="ah-text-sm black-100-78 fw-semibold"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
            <div className="pt-12 mb-18 mb-md-24">
              <CustomButton
                type={"submit"}
                label="Login"
                classes={"btn btn-primary w-100 mb-10"}
                isSubmitting={isSubmitting}
              />
            </div>
            <div className="text-center text-base">
              Don’t have an account?{" "}
              <Link to={"/user-type"} className="fw-semibold text-green">
                Sign up
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}