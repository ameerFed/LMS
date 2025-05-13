import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function ProfileSetup() {
  const initialValues = {
    fullName: "",
    email: "",
    phone: "",
    dob: "",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
      .required("Phone number is required"),
    dob: Yup.date().required("Date of Birth is required"),
  });

  const handleSubmit = (values) => {
    console.log("Submitted Data:", values);
  };

  return (
    <div className="d-flex flex-column flex-grow-1 justify-content-center px-15">
      <div className="text-center mb-20">
        <h1 className="ah-heading-02 fw-semibold mb-3">Setup Your Profile</h1>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form
            action="#"
            className="bg-white auth-form-holder mx-auto px-20 px-sm-30 px-md-40 pt-40 pt-md-50 pb-30"
          >
            <div className="mb-12 mb-md-16">
              <label
                htmlFor="fullName"
                className="form-label black-100 fw-semibold mb-8 mb-xl-12"
              >
                Name
              </label>
              <Field
                name="fullName"
                type="text"
                className="form-control"
                placeholder="Name"
              />
              <ErrorMessage
                name="fullName"
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
              <ErrorMessage
                className="text-danger error"
                name="email"
                component="div"
              />
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
              <ErrorMessage
                className="text-danger error"
                name="phone"
                component="div"
              />
            </div>
            <div class="mb-12 mb-md-16">
              <label
                htmlFor="dob"
                className="form-label black-100 fw-semibold mb-8 mb-xl-12"
              >
                Date of Birth
              </label>
              <Field name="dob" class="form-control" type="date" />
              <ErrorMessage
                className="text-danger error"
                name="dob"
                component="div"
              />
            </div>
            <div className="pt-12 mb-18 mb-md-24">
              <button class="btn btn-primary w-100 mb-10" type="submit">
                Next
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
