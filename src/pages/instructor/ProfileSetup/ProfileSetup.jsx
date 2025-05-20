import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import "react-phone-number-input/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { instructorUpdateProfileAPI } from "../../../redux/features/intructorSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ProfileSetup() {
  const today = new Date();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate =  useNavigate();

  const initialValues = {
    full_name: "",
    location: "",
    phone_number: "",
    date_of_birth: "",
  };

  const validationSchema = Yup.object({
    full_name: Yup.string().required("Name is required"),
    location: Yup.string()
      .min(2, "Location must be at least 2 characters")
      .max(100, "Location must be less than 100 characters")
      .required("Location is required"),
    phone_number: Yup.string()
      .required("Phone number is required")
      .min(10, "Too short")
      .max(15, "Too long"),
    date_of_birth: Yup.date().required("Date of Birth is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const payload = {
        userId: auth.user_id,
        ...values,
      };
      const res = await dispatch(
        instructorUpdateProfileAPI({ payload, token: auth.token })
      ).unwrap();

      if (res.success) {
        toast.success(res.message, {
          position: "top-center",
        });
        navigate("/instructor-add-education")
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong", {
        position: "top-center",
      });
    } finally {
      setSubmitting(false);
    }
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
        {({ values, setFieldValue, isSubmitting }) => (
          <Form
            action="#"
            className="bg-white auth-form-holder mx-auto px-20 px-sm-30 px-md-40 pt-40 pt-md-50 pb-30"
          >
            <div className="mb-12 mb-md-16">
              <label
                htmlFor="full_name"
                className="form-label black-100 fw-semibold mb-8 mb-xl-12"
              >
                Name
              </label>
              <Field
                name="full_name"
                type="text"
                className="form-control"
                placeholder="Name"
              />
              <ErrorMessage
                name="full_name"
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
                name={"location"}
                placeholder="Enter your location"
              />
              <ErrorMessage
                name={"location"}
                component="div"
                className="text-danger error"
              />
            </div>
            <div className="mb-12 mb-md-16">
              <label
                htmlFor="phone_number"
                className="form-label black-100 fw-semibold mb-8 mb-xl-12"
              >
                Phone Number
              </label>
              <div className="form-control pt-10">
                <PhoneInputWithCountrySelect
                  international
                  countryCallingCodeEditable={false}
                  defaultCountry="US"
                  value={initialValues.phone_number}
                  onChange={(value) => setFieldValue("phone_number", value)}
                  placeholder="Enter phone number"
                />
              </div>
              <ErrorMessage
                name="phone_number"
                component="div"
                className="text-danger error"
              />
            </div>
            <div className="mb-12 mb-md-16">
              <label
                htmlFor="date_of_birth"
                className="form-label black-100 fw-semibold mb-8 mb-xl-12"
              >
                Date of Birth
              </label>
              <DatePicker
                selected={values.date_of_birth}
                onChange={(date) => setFieldValue("date_of_birth", date)}
                maxDate={today}
                dateFormat="dd-MM-yyyy"
                placeholderText="Select a date"
                className="form-control"
              />
              <ErrorMessage
                name="date_of_birth"
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
    </div>
  );
}
