import React, { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomButton from "../CustomButton/CustomButton";
import { studentAddEducationAPI } from "../../redux/features/studentDetailSlice";
import { instructorAddEducationAPI } from "../../redux/features/intructorSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import SelecFieldForStudyComponent from "../SelecFieldForStudyComponent/SelecFieldForStudyComponent";
import { skipClickAPI } from "../../redux/features/intructorSlice";

export default function AddEducationComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState(null);
  const auth = useSelector((state) => state.auth);

  const initialValues = {
    education: [
      {
        id: null,
        institution_name: "",
        field_of_study: "",
        location: "",
        start_date: "",
        end_date: "",
      },
    ],
    about_yourself: "",
  };

  const validationSchema = Yup.object({
    education: Yup.array()
      .of(
        Yup.object().shape({
          institution_name: Yup.string()
            .min(2, "Institution name must be at least 2 characters")
            .max(100, "Institution name must be less than 100 characters")
            .required("Institution name is required"),
          field_of_study: Yup.string().required("Field of study is required"),
          location: Yup.string()
            .min(2, "Location must be at least 2 characters")
            .max(100, "Location must be less than 100 characters")
            .required("Location is required"),
          start_date: Yup.date()
            .required("Start date is required")
            .max(Yup.ref("end_date"), "Start date must be before end date")
            .nullable(),
          end_date: Yup.date()
            .required("End date is required")
            .min(Yup.ref("start_date"), "End date must be after start date")
            .nullable(),
        })
      )
      .min(1, "At least one education entry is required"),
    about_yourself: Yup.string()
      .min(10, "About must be at least 10 characters")
      .max(500, "About must be less than 500 characters")
      .required("About yourself is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setErrorMessage(null);
      const payload = {
        userId: auth.user_id,
        ...values,
        education: values.education.map((edu) => ({
          ...edu,
          start_date: new Date(edu.start_date).toISOString(),
          end_date: new Date(edu.end_date).toISOString(),
        })),
      };

      console.log(payload);
      try {
        if (location.pathname === "/add-education") {
          const res = await dispatch(
            studentAddEducationAPI({ payload, token: auth.token })
          ).unwrap();
          if (res.success) {
            toast.success(res.message, {
              position: "top-center",
            });
            navigate("/add-experience");
          }
        } else if (location.pathname === "/instructor-add-education") {
          const res = await dispatch(
            instructorAddEducationAPI({ payload, token: auth.token })
          ).unwrap();
          if (res.success) {
            toast.success(res.message, {
              position: "top-center",
            });
            navigate("/instructor-add-experience");
          }
        }
      } catch (error) {
        toast.error(error.message || "Something went wrong", {
          position: "top-center",
        });
      } finally {
        setSubmitting(false);
      }

      // resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage(
        error.message || "Failed to submit education details. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (index, education, remove, setSubmitting) => {
    try {
      setSubmitting(true);
      setErrorMessage(null);

      remove(index);
    } catch (error) {
      console.error("Error deleting education:", error);
      setErrorMessage(
        error.message || "Failed to delete education entry. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const skipNowHandler = async () => {
    const res = await dispatch(skipClickAPI({ auth })).unwrap();
    if (res.success) {
      if (location.pathname === "/add-education") {
        navigate("/add-experience");
      } else if (location.pathname === "/instructor-add-education") {
        navigate("/instructor-add-experience");
      }
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, setSubmitting }) => (
          <Form className="bg-white auth-form-holder mx-auto px-20 px-sm-30 px-md-40 pt-40 pt-md-50 pb-50">
            <FieldArray name="education">
              {({ push, remove }) => (
                <>
                  {values.education.map((edu, index) => (
                    <div key={index} className="education-block mb-20">
                      <div className="mb-12 mb-md-16">
                        <label className="form-label black-100 fw-semibold mb-8 mb-xl-12">
                          Institution name
                        </label>
                        <Field
                          className="form-control"
                          name={`education[${index}].institution_name`}
                          placeholder="Enter your institute name"
                        />
                        <ErrorMessage
                          name={`education[${index}].institution_name`}
                          component="div"
                          className="text-danger error"
                        />
                      </div>

                      <div className="mb-12 mb-md-16">
                        <SelecFieldForStudyComponent
                          name={`education[${index}].field_of_study`}
                        />
                        <ErrorMessage
                          name={`education[${index}].field_of_study`}
                          component="div"
                          className="text-danger error"
                        />
                      </div>

                      <div className="mb-12 mb-md-16">
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
                          <div className="mb-12 mb-md-16">
                            <label className="form-label black-100 fw-semibold mb-8 mb-xl-12">
                              Start Date
                            </label>
                            <Field
                              className="form-control"
                              name={`education[${index}].start_date`}
                              type="date"
                            />
                            <ErrorMessage
                              name={`education[${index}].start_date`}
                              component="div"
                              className="text-danger error"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="mb-12 mb-md-16">
                            <label className="form-label black-100 fw-semibold mb-8 mb-xl-12">
                              End Date
                            </label>
                            <Field
                              className="form-control"
                              name={`education[${index}].end_date`}
                              type="date"
                            />
                            <ErrorMessage
                              name={`education[${index}].end_date`}
                              component="div"
                              className="text-danger error"
                            />
                          </div>
                        </div>
                      </div>
                      {values.education.length > 1 && (
                        <div className="d-flex justify-content-end mb-12">
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              handleDelete(index, edu, remove, setSubmitting)
                            }
                            disabled={isSubmitting}
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="d-flex justify-content-end mb-20">
                    <button
                      type="button"
                      className="add-btn p-0 bg-transparent border-0 d-flex align-items-center gap-2 text-base"
                      onClick={() =>
                        push({
                          id: null,
                          institution_name: "",
                          field_of_study: "",
                          location: "",
                          start_date: "",
                          end_date: "",
                        })
                      }
                      disabled={isSubmitting}
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
                      Add more Education
                    </button>
                  </div>
                  <div className="d-flex jusify-content-center"></div>
                </>
              )}
            </FieldArray>

            <div className="mb-12 mb-md-16 pt-20">
              <label className="form-label black-100 fw-semibold mb-8 mb-xl-12">
                About yourself
              </label>
              <Field
                className="form-control"
                as="textarea"
                name="about_yourself"
                placeholder="Write about yourself..."
                rows="5"
              />
              <ErrorMessage
                name="about_yourself"
                component="div"
                className="text-danger error"
              />
            </div>

            <div className="pt-12 mb-18 mb-md-24">
              <CustomButton
                type="submit"
                label={"Next"}
                classes="btn btn-primary fw-bold w-100 mb-10"
                disabled={isSubmitting}
              />
            </div>
          </Form>
        )}
      </Formik>
      <div
        style={{ marginTop: "-50px" }}
        className="d-flex justify-content-center align-items-center gap-2 cursor-pointer mb-50"
        onClick={skipNowHandler}
      >
        <span className="text-lg fw-semibold text-gray-600">Skip for Now</span>
        <span
          style={{
            transform: "rotate(180deg)",
            display: "inline-block",
          }}
        >
          <svg
            width="16"
            height="14"
            viewBox="0 0 16 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 7L15 7M1 7L7 1M1 7L7 13"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </>
  );
}
