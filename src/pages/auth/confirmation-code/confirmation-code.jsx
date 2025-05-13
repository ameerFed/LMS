import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

export default function ConfirmationCode() {
  const initialValues = {
    d1: "",
    d2: "",
    d3: "",
    d4: "",
    d5: "",
    d6: "",
  };

  const validationSchema = Yup.object({
    d1: Yup.string()
      .required("Required")
      .matches(/^[0-9]$/, "Must be a digit"),
    d2: Yup.string()
      .required("Required")
      .matches(/^[0-9]$/, "Must be a digit"),
    d3: Yup.string()
      .required("Required")
      .matches(/^[0-9]$/, "Must be a digit"),
    d4: Yup.string()
      .required("Required")
      .matches(/^[0-9]$/, "Must be a digit"),
    d5: Yup.string()
      .required("Required")
      .matches(/^[0-9]$/, "Must be a digit"),
    d6: Yup.string()
      .required("Required")
      .matches(/^[0-9]$/, "Must be a digit"),
  });

  // State for resend OTP timer
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // Effect to handle countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleSubmit = (values) => {
    console.log("Form Data", values);
  };

  //   const handleResend = () => {
  //     if (canResend) {
  //       console.log("Resending OTP...");
  //       setResendTimer(30);
  //       setCanResend(false);
  //     }
  //   };

  const handleKeyDown = (e, nextInput) => {
    if (e.key === "Backspace" && !e.target.value) {
      const prevInput = e.target.previousElementSibling;
      if (prevInput) prevInput.focus();
    } else if (e.target.value && nextInput) {
      nextInput.focus();
    }
  };

  return (
    <div className="d-flex flex-column flex-grow-1 justify-content-center px-15">
      <div className="text-center mb-20">
        <h1 className="ah-heading-02 fw-semibold mb-3">
          Enter the Confirmation Code
        </h1>
        <p className="black-100 ah-text-base">
          To verify your account simply enter the 6-digits code we’ve sent to
          your email address
        </p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, errors, touched, values }) => (
          <Form className="bg-white auth-form-holder mx-auto px-20 px-sm-30 px-md-40 pt-40 pt-md-50 pb-30">
            <div className="mb-12 mb-md-16">
              <label
                htmlFor="d1"
                className="form-label black-100 fw-semibold mb-8 mb-xl-12"
              >
                Enter OTP
              </label>
              <div className="d-flex justify-content-between gap-3">
                {["d1", "d2", "d3", "d4", "d5", "d6"].map((name, index) => (
                  <input
                    key={name}
                    type="text"
                    value={values[name]}
                    className="form-control-otp mb-5"
                    name={name}
                    maxLength={1}
                    onChange={(e) => {
                      setFieldValue(name, e.target.value);
                      if (e.target.value && index < 5) {
                        document.getElementsByName(`d${index + 2}`)[0].focus();
                      }
                    }}
                    onKeyDown={(e) =>
                      handleKeyDown(
                        e,
                        index < 5
                          ? document.getElementsByName(`d${index + 2}`)[0]
                          : null
                      )
                    }
                  />
                ))}
              </div>
              {(errors.d1 ||
                errors.d2 ||
                errors.d3 ||
                errors.d4 ||
                errors.d5 ||
                errors.d6) &&
                (touched.d1 ||
                  touched.d2 ||
                  touched.d3 ||
                  touched.d4 ||
                  touched.d5 ||
                  touched.d6) && (
                  <div className="text-danger">
                    Please enter all digits
                  </div>
                )}
            </div>
            <div className="pt-12 mb-18 mb-md-24">
              <button
                className="btn btn-primary w-100 mb-10"
                type="submit"
                disabled={isSubmitting}
              >
                Reset Password
              </button>
              <div className="text-center text-md pt-20">
                {canResend ? (
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      setCanResend(!canResend);
                      setResendTimer(30)
                    }}
                  >
                    Resend OTP
                  </span>
                ) : (
                  <>
                    Resend OTP in{" "}
                    <span className="fw-semibold">{resendTimer}s</span>
                  </>
                )}
              </div>
            </div>
            <div className="text-center text-base">
              Don't have an account?
              <Link to={"/sign-up"} className="fw-semibold text-green ms-5">
                Sign up
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
