import React, { useState } from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Field, ErrorMessage, useFormikContext } from "formik";
import toast from "react-hot-toast";
import { createOrganizationAPI } from "../../../redux/features/authSlice";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import "react-phone-number-input/style.css";

const validationSchemas = [
  Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    contact_number: Yup.string()
          .required("Phone number is required")
          .min(10, "Too short")
          .max(15, "Too long"),
    designation: Yup.string().required("Name is required"),
    message: Yup.string()
      .min(10, "Message must be at least 10 characters")
      .required("Message is required"),
  }),
  Yup.object({
    organization_name: Yup.string().required("Organization is required"),
    industry_type: Yup.string().required("Industry Type is required"),
    number_of_students: Yup.string()
      .min(1, "Number of students must be at least 1")
      .max(1000000, "Number of students must be at most 1,000,000")
      .required("Number of students is required"),
    website_url: Yup.string()
      .url("Must be a valid URL (e.g., https://example.com)")
      .max(2048, "URL must be at most 2048 characters")
      .required("Website URL is required"),
  }),
  Yup.object({
    country: Yup.string().required("Country is required"),
    state_province: Yup.string().required("State/Province is required"),
    city: Yup.string().required("City is required"),
    postal_code: Yup.string().required("Postal Code is required"),
  }),
];

const initialValues = {
  name: "",
  email: "",
  contact_number: "",
  designation: "",
  message: "",

  organization_name: "",
  industry_type: "",
  number_of_students: "",
  website_url: "",

  country: "",
  state_province: "",
  city: "",
  postal_code: "",
};

// Submit button component to trigger form submission
const SubmitButton = ({ step, isSubmitting }) => {
  const { submitForm } = useFormikContext();
  return (
    <button
      type="button"
      className="btn btn-primary w-100"
      onClick={submitForm}
      disabled={isSubmitting}
    >
      {step === 3 ? "Submit" : "Next"}
    </button>
  );
};

const Organization = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const handleSubmit = async (values, { setSubmitting, setTouched }) => {
    try {
      if (step < 3) {
        setStep(step + 1);
        setTouched({});
      } else {
        try {
          dispatch(createOrganizationAPI(values)).then((res) => {
            if (res.payload.success) {
              toast.success(res.payload.message);
              navigate("/login")
            }
          });
        } catch (error) {
          toast.error(error);
        }
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="d-flex flex-column flex-grow-1 justify-content-center px-15">
      {step === 1 && (
        <div className="text-center mb-20">
          <h1 className="ah-heading-02 fw-semibold mb-20">Get In Touch</h1>
          <p className="ah-text-base">
            Kindly fill out the form. Our team will reach out to you soon.
          </p>
        </div>
      )}
      {step === 2 && (
        <div className="text-center mb-20">
          <h1 className="ah-heading-02 fw-semibold mb-20">Basic Information</h1>
        </div>
      )}
      {step === 3 && (
        <div className="text-center mb-20">
          <h1 className="ah-heading-02 fw-semibold mb-20">
            Address &amp; Location
          </h1>
        </div>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchemas[step - 1]}
        onSubmit={handleSubmit}
        validateOnBlur
        validateOnChange
      >
        {({ isSubmitting, setFieldValue }) => (
          <div className="bg-white auth-form-holder text-left mx-auto px-20 px-sm-30 px-md-40 pt-40 pt-md-50 pb-30">
            {step === 1 && (
              <>
                <div className="mb-12 mb-md-16">
                  <label
                    htmlFor="name"
                    className="form-label black-100 fw-semibold mb-8 mb-xl-12"
                  >
                    Name
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="Enter Your Name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger mt-2"
                  />
                </div>
                <div className="mb-12 mb-md-16">
                  <label
                    htmlFor="email"
                    className="form-label black-100 fw-semibold mb-8 mb-xl-12"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter Your Email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger mt-2"
                  />
                </div>
                <div className="mb-12 mb-md-16">
                  <label
                    htmlFor="contact_number"
                    className="form-label black-100 fw-semibold mb-8 mb-xl-12"
                  >
                    Contact Number
                  </label>
                  <div className="form-control pt-10">
                    <PhoneInputWithCountrySelect
                      international
                      countryCallingCodeEditable={false}
                      defaultCountry="US"
                      value={initialValues.contact_number}
                      onChange={(value) => setFieldValue("contact_number", value)}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <ErrorMessage
                    name="contact_number"
                    component="div"
                    className="text-danger mt-2"
                  />
                </div>
                <div className="mb-12 mb-md-16">
                  <label
                    htmlFor="designation"
                    className="form-label black-100 fw-semibold mb-8 mb-xl-12"
                  >
                    Your Designation
                  </label>
                  <Field
                    type="text"
                    id="designation"
                    name="designation"
                    className="form-control"
                    placeholder="Enter your designation"
                  />
                  <ErrorMessage
                    name="designation"
                    component="div"
                    className="text-danger mt-2"
                  />
                </div>
                <div className="mb-12 mb-md-16">
                  <label
                    htmlFor="message"
                    className="form-label black-100 fw-semibold mb-8 mb-xl-12"
                  >
                    Message
                  </label>
                  <Field
                    as="textarea"
                    id="message"
                    name="message"
                    rows="4"
                    className="form-control h-auto"
                    placeholder="Write message here"
                  />
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="text-danger mt-2"
                  />
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <div className="mb-12 mb-md-16">
                  <label
                    htmlFor="name"
                    className="form-label black-100 fw-semibold mb-8 mb-xl-12"
                  >
                    Organization Name
                  </label>
                  <Field
                    type="text"
                    id="organization_name"
                    name="organization_name"
                    className="form-control"
                    placeholder="Enter organization name"
                  />
                  <ErrorMessage
                    name="organization_name"
                    component="div"
                    className="text-danger mt-2"
                  />
                </div>
                <div className="mb-12 mb-md-16">
                  <label
                    htmlFor="industry_type"
                    className="form-label black-100 fw-semibold mb-8 mb-xl-12"
                  >
                    Industry Type
                  </label>
                  <Field
                    type="text"
                    id="industry_type"
                    name="industry_type"
                    className="form-control"
                    placeholder="Enter your industry type"
                  />
                  <ErrorMessage
                    name="industry_type"
                    component="div"
                    className="text-danger mt-2"
                  />
                </div>
                <div className="mb-12 mb-md-16">
                  <label
                    htmlFor="number_of_students"
                    className="form-label black-100 fw-semibold mb-8 mb-xl-12"
                  >
                    Number of Students
                  </label>
                  <Field
                    type="number"
                    id="number_of_students"
                    name="number_of_students"
                    className="form-control"
                    placeholder="Enter number of students"
                  />
                  <ErrorMessage
                    name="number_of_students"
                    component="div"
                    className="text-danger mt-2"
                  />
                </div>
                <div className="mb-12 mb-md-16">
                  <label
                    htmlFor="website_url"
                    className="form-label black-100 fw-semibold mb-8 mb-xl-12"
                  >
                    Website URL
                  </label>
                  <Field
                    type="text"
                    id="website_url"
                    name="website_url"
                    className="form-control"
                    placeholder="Enter website URL"
                  />
                  <ErrorMessage
                    name="website_url"
                    component="div"
                    className="text-danger mt-2"
                  />
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <div className="mb-12 mb-md-16">
                  <label
                    htmlFor="country"
                    className="form-label black-100 fw-semibold mb-8 mb-xl-12"
                  >
                    Country
                  </label>
                  <Field
                    type="country"
                    id="country"
                    name="country"
                    className="form-control"
                    placeholder="Enter your country name"
                  />
                  <ErrorMessage
                    name="country"
                    component="div"
                    className="text-danger mt-2"
                  />
                </div>
                <div className="mb-12 mb-md-16">
                  <label
                    htmlFor="state_province"
                    className="form-label black-100 fw-semibold mb-8 mb-xl-12"
                  >
                    State/Province
                  </label>
                  <Field
                    type="text"
                    id="state_province"
                    name="state_province"
                    className="form-control"
                    placeholder="Enter your state/province"
                  />
                  <ErrorMessage
                    name="state_province"
                    component="div"
                    className="text-danger mt-2"
                  />
                </div>
                <div className="mb-12 mb-md-16">
                  <label
                    htmlFor="city"
                    className="form-label black-100 fw-semibold mb-8 mb-xl-12"
                  >
                    City
                  </label>
                  <Field
                    type="text"
                    id="city"
                    name="city"
                    className="form-control"
                    placeholder="Enter your city"
                  />
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="text-danger mt-2"
                  />
                </div>
                <div className="mb-12 mb-md-16">
                  <label
                    htmlFor="postal_code"
                    className="form-label black-100 fw-semibold mb-8 mb-xl-12"
                  >
                    Postal Code
                  </label>
                  <Field
                    type="text"
                    id="postal_code"
                    name="postal_code"
                    className="form-control"
                    placeholder="Enter your postal code"
                  />
                  <ErrorMessage
                    name="postal_code"
                    component="div"
                    className="text-danger mt-2"
                  />
                </div>
              </>
            )}
            <div className="pt-12 mb-18 mb-md-24 d-flex gap-3">
              {step > 1 && (
                <button
                  type="button"
                  className="btn btn-secondary w-100"
                  onClick={handlePrevious}
                >
                  Back
                </button>
              )}
              <SubmitButton step={step} isSubmitting={isSubmitting} />
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Organization;
