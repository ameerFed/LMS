import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function AddExperience() {
  const initialValues = {
    experiences: [
      {
        companyName: "",
        role: "",
        workType: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        skills: "",
      },
    ],
    about: "",
  };

  const validationSchema = Yup.object().shape({
    experiences: Yup.array().of(
      Yup.object().shape({
        companyName: Yup.string().required("Company name is required"),
        role: Yup.string().required("Role is required"),
        // workType: Yup.string().required("Work type is required"),
        // startDate: Yup.string().required("Start date is required"),
        // endDate: Yup.string().when("currentlyWorking", {
        //   is: false,
        //   then: Yup.string().required("End date is required"),
        // }),
        // skills: Yup.string().required("Skills are required"),
      })
    ),
  });

  const handleSubmit = (values) => {
    console.log("Submitted Data:", values);
  };

  return (
    <div className="d-flex flex-column flex-grow-1 justify-content-center px-15">
      <div className="text-center mb-20">
        <h1 className="ah-heading-02 fw-semibold mb-3">Add Education</h1>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="bg-white auth-form-holder mx-auto px-20 px-sm-30 px-md-40 pt-40 pt-md-50 pb-30">
            <FieldArray name="experiences">
              {({ push }) => (
                <>
                  {values.experiences.map((exp, index) => (
                    <div key={index} className="education-block">
                      <div className="mb-12 mb-md-16">
                        <label className="form-label black-100 fw-semibold mb-8 mb-xl-12">
                          Company Name
                        </label>
                        <Field
                          className="form-control"
                          name={`experiences[${index}].companyName`}
                          placeholder="Enter your company name:"
                        />
                        <ErrorMessage
                          name={`experiences[${index}].companyName`}
                          component="div"
                          className="text-danger error"
                        />
                      </div>

                      <div className="mb-12 mb-md-16">
                        <label className="form-label black-100 fw-semibold mb-8 mb-xl-12">
                          Role
                        </label>
                        <Field
                          className="form-control"
                          name={`experiences[${index}].role`}
                          placeholder="Enter your designation"
                        />
                        <ErrorMessage
                          name={`experiences[${index}].role`}
                          component="div"
                          className="text-danger error"
                        />
                      </div>
                      <div className="mb-12 mb-md-16">
                        <label className="form-label black-100 fw-semibold mb-8 mb-xl-12">
                          Select an Option
                        </label>
                        <Field
                          name={`experiences[${index}].workType`}
                          className="form-control"
                          placeholder="Hybrid, On-site, Remote"
                        />
                        <ErrorMessage
                          name={`experiences[${index}].workType`}
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="row">
                        <div className="col">
                          <div className="mb-12 mb-md-16">
                            <label className="form-label black-100 fw-semibold mb-8 mb-xl-12">
                              Start Date
                            </label>
                            <Field
                              name={`experiences[${index}].startDate`}
                              className="form-control"
                              placeholder="DD/MM/YYYY"
                              type="date"
                            />
                            <ErrorMessage
                              name={`experiences[${index}].startDate`}
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>
                        <div className="col">
                          <div className="mb-12 mb-md-16">
                            <label className="form-label black-100 fw-semibold mb-8 mb-xl-12">
                              End Date
                            </label>
                            <Field
                              name={`experiences[${index}].endDate`}
                              className="form-control"
                              placeholder="DD/MM/YYYY"
                              disabled={
                                values.experiences[index].currentlyWorking
                              }
                              type="date"
                            />
                            <ErrorMessage
                              name={`experiences[${index}].endDate`}
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className="form-check mb-12 mb-md-16"
                        style={{ marginTop: -10 }}
                      >
                        <Field
                          type="checkbox"
                          name={`experiences[${index}].currentlyWorking`}
                          className="form-check-input"
                          id={`currentlyWorking-${index}`}
                          onChange={(e) =>
                            setFieldValue(
                              `experiences[${index}].currentlyWorking`,
                              e.target.checked
                            )
                          }
                        />
                        <label
                          htmlFor={`currentlyWorking-${index}`}
                          className="form-check-label"
                        >
                          Currently Working
                        </label>
                      </div>
                      <div className="mb-12 mb-md-16">
                        <label className="form-label black-100 fw-semibold mb-8 mb-xl-12">
                          Add Skills
                        </label>
                        <Field
                          name={`experiences[${index}].skills`}
                          className="form-control"
                          placeholder="Enter your skills"
                        />
                        <ErrorMessage
                          name={`experiences[${index}].skills`}
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                  ))}
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="add-btn p-0 bg-transparent border-0 d-flex align-items-center gap-2 text-base"
                      onClick={() =>
                        push({
                          companyName: "",
                          role: "",
                          workType: "",
                          startDate: "",
                          endDate: "",
                          currentlyWorking: false,
                          skills: "",
                        })
                      }
                    >
                      <svg
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.75"
                          y="0.957947"
                          width="22.5"
                          height="22.5"
                          rx="5.25"
                          fill="#F05203"
                          fillOpacity="0.04"
                        />
                        <rect
                          x="0.75"
                          y="0.957947"
                          width="22.5"
                          height="22.5"
                          rx="5.25"
                          stroke="#F05203"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M6 12.2079L18 12.2079"
                          stroke="#F05203"
                          strokeWidth="2.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 6.20795L12 18.2079"
                          stroke="#F05203"
                          strokeWidth="2.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Add more Experience
                    </button>
                  </div>
                </>
              )}
            </FieldArray>
            <div className="pt-12 mb-18 mb-md-24">
              <button className="btn btn-primary w-100 mb-10" type="submit">
                Next
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
