import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function AddEducation() {
  const initialValues = {
    education: [
      {
        institution: "",
        fieldOfStudy: "",
        location: "",
        startDate: "",
        endDate: "",
      },
    ],
    about: "",
  };

  const validationSchema = Yup.object({
    education: Yup.array().of(
      Yup.object().shape({
        institution: Yup.string().required("Required"),
        fieldOfStudy: Yup.string().required("Required"),
        location: Yup.string().required("Required"),
        startDate: Yup.string().required("Required"),
        endDate: Yup.string().required("Required"),
      })
    ),
    about: Yup.string().required("Required"),
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
        {({ values }) => (
          <Form className="bg-white auth-form-holder mx-auto px-20 px-sm-30 px-md-40 pt-40 pt-md-50 pb-30">
            <FieldArray name="education">
              {({ push }) => (
                <>
                  {values.education.map((edu, index) => (
                    <div key={index} className="education-block">
                      <div class="mb-12 mb-md-16">
                        <label className="form-label black-100 fw-semibold mb-8 mb-xl-12">
                          Institution name
                        </label>
                        <Field
                          className="form-control"
                          name={`education[${index}].institution`}
                          placeholder="Enter your institute name"
                        />
                        <ErrorMessage
                          name={`education[${index}].institution`}
                          component="div"
                          className="text-danger error"
                        />
                      </div>

                      <div class="mb-12 mb-md-16">
                        <label className="form-label black-100 fw-semibold mb-8 mb-xl-12">
                          Field of study
                        </label>
                        <Field
                          className="form-control"
                          name={`education[${index}].fieldOfStudy`}
                          placeholder="Enter your field of study"
                        />
                        <ErrorMessage
                          name={`education[${index}].fieldOfStudy`}
                          component="div"
                          className="text-danger error"
                        />
                      </div>

                      <div class="mb-12 mb-md-16">
                        <label className="form-label black-100 fw-semibold mb-8 mb-xl-12">
                          Location
                        </label>
                        <Field
                          className="form-control"
                          name={`education[${index}].location`}
                          placeholder="Enter your location"
                        />
                        <ErrorMessage
                          name={`education[${index}].location`}
                          component="div"
                          className="text-danger error"
                        />
                      </div>
                      <div className="row">
                        <div className="col-12 col-md-6">
                          <div class="mb-12 mb-md-16">
                            <label className="form-label black-100 fw-semibold mb-8 mb-xl-12">
                              Start Date
                            </label>
                            <Field
                              className="form-control"
                              name={`education[${index}].startDate`}
                              placeholder="DD/MM/YYYY"
                              type="date"
                            />
                            <ErrorMessage
                              name={`education[${index}].startDate`}
                              component="div"
                              className="text-danger error"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div class="mb-12 mb-md-16">
                            <label className="form-label black-100 fw-semibold mb-8 mb-xl-12">
                              End Date
                            </label>
                            <Field
                              className="form-control"
                              name={`education[${index}].endDate`}
                              placeholder="DD/MM/YYYY"
                              type="date"

                            />
                            <ErrorMessage
                              name={`education[${index}].endDate`}
                              component="div"
                              className="text-danger error"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="add-btn p-0 bg-transparent border-0 d-flex align-items-center gap-2 text-base"
                      onClick={() =>
                        push({
                          institution: "",
                          fieldOfStudy: "",
                          location: "",
                          startDate: "",
                          endDate: "",
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
                          fill-opacity="0.04"
                        />
                        <rect
                          x="0.75"
                          y="0.957947"
                          width="22.5"
                          height="22.5"
                          rx="5.25"
                          stroke="#F05203"
                          stroke-width="1.5"
                        />
                        <path
                          d="M6 12.2079L18 12.2079"
                          stroke="#F05203"
                          stroke-width="2.25"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12 6.20795L12 18.2079"
                          stroke="#F05203"
                          stroke-width="2.25"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      Add more Education
                    </button>
                  </div>
                </>
              )}
            </FieldArray>

            <div class="mb-12 mb-md-16 pt-20">
              <label className="form-label black-100 fw-semibold mb-8 mb-xl-12">
                About yourself
              </label>
              <Field
                className="form-control"
                as="textarea"
                name="about"
                placeholder="Write about yourself..."
                rows="5"
              />
              <ErrorMessage
                name="about"
                component="div"
                className="text-danger error"
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
