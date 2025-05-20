import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  signupConfirmationCodeAPI,
  resendOTPAPI,
} from "../../redux/features/authSlice";
import toast from "react-hot-toast";
import CustomButton from "../CustomButton/CustomButton";

export default function ConfirmationCodeForm() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  const validationSchema = Yup.object({
    otp: Yup.array()
      .of(
        Yup.string()
          .matches(/^[0-9]$/, "Must be a single digit")
          .required("Required")
      )
      .min(6, "OTP must be 6 digits")
      .max(6, "OTP must be 6 digits"),
  });

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

  const handleChange = (index, e, setFieldValue) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setFieldValue("otp", newOtp);
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const obj = {
      email: auth.email,
      otp: values.otp.join(""),
    };

    try {
      const res = await dispatch(signupConfirmationCodeAPI(obj)).unwrap();
      if (res.success) {
        toast.success(res?.message, {
          position: "top-center",
        });
        
        if (
          res?.data?.user?.status === "pending" && res?.data?.user?.role?.name === "Student"
        ) {
          navigate("/add-education");
        } else if (
          res?.data?.user?.status === "pending" &&
          res?.data?.user?.role?.name === "Instructor"
        ) {
          navigate("/instructor-add-education");
        } else {
          if (res?.data?.user?.role?.name === "Instructor") {
            navigate("/instructor-reset-password");
          } else if (res?.data?.user?.role?.name === "Student") {
            navigate("/student-reset-password");
          } else if (res?.data?.user?.role?.name === "Admin") {
            navigate("/admin-reset-password");
          }
        }
      }
    } catch (error) {
      toast.error(error?.message || "Invalid OTP", {
        position: "top-center",
      });
      setOtp(["", "", "", "", "", ""]);
      values.otp = ["", "", "", "", "", ""];
    } finally {
      setSubmitting(false);
    }
  };

  const resendHandler = async () => {
    try {
      const res = await dispatch(resendOTPAPI({ email: auth.email })).unwrap();
      toast.success(res.message, {
        position: "top-center",
      });
      setCanResend(false);
      setResendTimer(30);
      setOtp(["", "", "", "", "", ""]);
    } catch (error) {
      toast.error(error?.message || "Failed to resend OTP", {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <Formik
        initialValues={{ otp }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className="bg-white auth-form-holder mx-auto px-20 px-sm-30 px-md-40 pt-40 pt-md-50 pb-30">
            <div className="mb-12 mb-md-16">
              <label
                htmlFor="otp[0]"
                className="form-label black-100 fw-semibold mb-8 mb-xl-12"
              >
                Enter OTP
              </label>
              <div className="d-flex justify-content-between gap-3">
                {values.otp.map((digit, index) => (
                  <Field
                    key={index}
                    name={`otp[${index}]`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(index, e, setFieldValue)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    innerRef={(el) => (inputRefs.current[index] = el)}
                    className="text-center form-control-otp"
                  />
                ))}
              </div>
            </div>
            <CustomButton
              type="submit"
              label={isSubmitting ? "Verifying..." : "Verify"}
              classes="btn btn-primary fw-bold w-100 mb-10"
              isSubmitting={isSubmitting}
            />
            <div className="text-center text-md pt-20">
              {canResend ? (
                <span
                  className="cursor-pointer fw-semibold theme-color"
                  onClick={resendHandler}
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
          </Form>
        )}
      </Formik>
    </>
  );
}
