import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { emailForForgotPasswordAPI } from "../../../redux/features/authSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import CustomButton from "../../../components/CustomButton/CustomButton";
export default function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await dispatch(
        emailForForgotPasswordAPI({ email: values.email })
      ).unwrap();
      if (res.success) {
        toast.success(res.message, {
          position: "top-center",
        });
        navigate("/forgot-confirmation-code");
      }
    } catch (error) {
      toast.error(error, {
        position: "top-center",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="d-flex flex-column flex-grow-1 justify-content-center px-15">
      <div className="text-center mb-20">
        <h1 className="ah-heading-02 fw-semibold mb-3">Forgot Your Password</h1>
        <p className="black-100 ah-text-base">
          Please enter your email address and we will send you a link to reset
          your password.
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
            <div class="mb-12 mb-md-16">
              <label
                for="email"
                class="form-label black-100 fw-semibold mb-8 mb-xl-12"
              >
                Enter email address
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                placeholder="Enter your Email Address"
                className="form-control"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger mt-1"
              />
            </div>
            <div className="pt-12 mb-18 mb-md-24">
              <button
                className="btn btn-primary w-100 mb-10"
                type="submit"
                disabled={isSubmitting}
              >
                Reset Password
              </button>
            </div>
            <div className="text-center text-base">
              Don't have an account?
              <Link to={"/user-type"} className="fw-semibold text-green ms-5">
                Sign up
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
