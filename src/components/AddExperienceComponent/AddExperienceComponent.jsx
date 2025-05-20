import React, { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { studentAddExperienceAPI } from "../../redux/features/studentDetailSlice";
import { instructorAddExperienceAPI } from "../../redux/features/intructorSlice";
import CustomButton from "../CustomButton/CustomButton";
import { skipClickAPI } from "../../redux/features/intructorSlice";

const workTypeOptions = ["Hybrid", "On-site", "Remote"];

const validationSchema = Yup.object({
  experience: Yup.array()
    .of(
      Yup.object().shape({
        company_name: Yup.string()
          .min(2, "Company name must be at least 2 characters")
          .required("Company name is required"),
        role: Yup.string()
          .min(2, "Role must be at least 2 characters")
          .required("Role is required"),
        work_type: Yup.string()
          .oneOf(workTypeOptions, "Invalid work type")
          .required("Work type is required"),
        start_date: Yup.date()
          .required("Start date is required")
          .max(new Date(), "Start date cannot be in the future")
          .nullable(),
        end_date: Yup.date().when("currently_working", {
          is: false,
          then: (schema) =>
            schema
              .required("End date is required")
              .min(Yup.ref("start_date"), "End date must be after start date"),

          otherwise: (schema) => schema.nullable(),
        }),

        currently_working: Yup.boolean(),
        skills: Yup.string()
          .min(3, "Skills must be at least 3 characters")
          .required("Skills are required"),
      })
    )
    .min(1, "At least one experience entry is required"),
});

export default function AddExperienceComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState(null);
  const auth = useSelector((state) => state.auth);

  const initialValues = {
    experience: [
      {
        id: null,
        company_name: "",
        role: "",
        work_type: "",
        start_date: "",
        end_date: "",
        currently_working: false,
        skills: "",
      },
    ],
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setErrorMessage(null);
      const payload = {
        userId: auth.user_id,
        experience: values.experience.map((exp) => ({
          ...exp,
          start_date: new Date(exp.start_date).toISOString(),
          end_date: exp.currently_working
            ? null
            : new Date(exp.end_date).toISOString(),
        })),
      };

      if (location.pathname === "/add-experience") {
        const res = await dispatch(
          studentAddExperienceAPI({ payload, token: auth.token })
        ).unwrap();

        if (res.success) {
          toast.success(res.message, { position: "top-center" });
          navigate("/student-dashboard");
        }
      } else if (location.pathname === "/instructor-add-experience") {
        const res = await dispatch(
          instructorAddExperienceAPI({ payload, token: auth.token })
        ).unwrap();
        if (res.success) {
          toast.success(res.message, {
            position: "top-center",
          });
          navigate("/instructor-dashboard");
        }
      }
    } catch (error) {
      const errorMsg = error.message || "Failed to submit experience details";
      toast.error(errorMsg, { position: "top-center" });
      setErrorMessage(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (index, remove, setSubmitting) => {
    try {
      setSubmitting(true);
      setErrorMessage(null);
      remove(index);
    } catch (error) {
      const errorMsg = error.message || "Failed to delete experience entry";
      setErrorMessage(errorMsg);
      toast.error(errorMsg, { position: "top-center" });
    } finally {
      setSubmitting(false);
    }
  };

  const skipNowHandler = async () => {
    const res = await dispatch(skipClickAPI({ auth })).unwrap();
    if (res.success) {
      if (location.pathname === "/add-experience") {
        navigate("/student-dashboard");
      }
      else if (location.pathname === "/instructor-add-experience"){
        navigate("/instructor-dashboard");
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
        {({ isSubmitting, values, setFieldValue, setSubmitting }) => (
          <Form className="bg-white auth-form-holder mx-auto px-20 px-sm-30 px-md-40 pt-40 pt-md-50 pb-50">
            <FieldArray name="experience">
              {({ push, remove }) => (
                <>
                  {values.experience.map((exp, index) => (
                    <div key={index} className="education-block mb-20">
                      <div className="mb-12 mb-md-16">
                        <label className="form-label black-100 fw-semibold mb-8 mb-xl-12">
                          Company Name
                        </label>
                        <Field
                          name={`experience[${index}].company_name`}
                          className="form-control"
                          placeholder="Enter company name"
                        />
                        <ErrorMessage
                          name={`experience[${index}].company_name`}
                          component="div"
                          className="text-danger error"
                        />
                      </div>

                      <div className="mb-12 mb-md-16">
                        <label className="form-label black-100 fw-semibold mb-8 mb-xl-12">
                          Role
                        </label>
                        <Field
                          name={`experience[${index}].role`}
                          className="form-control"
                          placeholder="Enter your role"
                        />
                        <ErrorMessage
                          name={`experience[${index}].role`}
                          component="div"
                          className="text-danger error"
                        />
                      </div>

                      <div className="mb-12 mb-md-16">
                        <label className="form-label black-100 fw-semibold mb-8 mb-xl-12">
                          Work Type
                        </label>
                        <Field
                          as="select"
                          name={`experience[${index}].work_type`}
                          className="form-control"
                        >
                          <option value="">Select work type</option>
                          {workTypeOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name={`experience[${index}].work_type`}
                          component="div"
                          className="text-danger error"
                        />
                      </div>
                      <div className="row">
                        <div className="col-12 col-md-6 mb-12 mb-md-16">
                          <label className="form-label black-100 fw-semibold mb-8 mb-xl-12">
                            Start Date
                          </label>
                          <Field
                            type="date"
                            name={`experience[${index}].start_date`}
                            className="form-control"
                          />
                          <ErrorMessage
                            name={`experience[${index}].start_date`}
                            component="div"
                            className="text-danger error"
                          />
                        </div>
                        <div className="col-12 col-md-6 mb-12 mb-md-16">
                          <label className="form-label black-100 fw-semibold mb-8 mb-xl-12">
                            End Date
                          </label>
                          <Field
                            type="date"
                            name={`experience[${index}].end_date`}
                            className="form-control"
                            disabled={exp.currently_working}
                          />
                          <ErrorMessage
                            name={`experience[${index}].end_date`}
                            component="div"
                            className="text-danger error"
                          />
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <Field
                          type="checkbox"
                          id={`experience[${index}].currently_working`}
                          name={`experience[${index}].currently_working`}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          onChange={(e) => {
                            setFieldValue(
                              `experience[${index}].currently_working`,
                              e.target.checked
                            );
                            if (e.target.checked) {
                              setFieldValue(
                                `experience[${index}].end_date`,
                                ""
                              );
                            }
                          }}
                        />
                        <label
                          htmlFor={`experience[${index}].currently_working`}
                          className="ml-2 text-md text-gray-700"
                        >
                          Currently Working
                        </label>
                      </div>

                      <div className="mb-12 mb-md-16">
                        <label className="form-label black-100 fw-semibold mb-8 mb-xl-12">
                          Skills
                        </label>
                        <Field
                          name={`experience[${index}].skills`}
                          className="form-control"
                          placeholder="Enter skills (e.g., JavaScript, Python)"
                        />
                        <ErrorMessage
                          name={`experience[${index}].skills`}
                          component="div"
                          className="text-danger error"
                        />
                      </div>

                      {values.experience.length > 1 && (
                        <div className="d-flex justify-content-end mb-12">
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              handleDelete(index, remove, setSubmitting)
                            }
                            disabled={isSubmitting}
                          >
                            Remove Experience
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
                          company_name: "",
                          role: "",
                          work_type: "",
                          start_date: "",
                          end_date: "",
                          currently_working: false,
                          skills: "",
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
                      Add Another Experience
                    </button>
                  </div>
                </>
              )}
            </FieldArray>

            {/* {errorMessage && (
            <div className="text-red-500 text-sm">{errorMessage}</div>
          )} */}

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
