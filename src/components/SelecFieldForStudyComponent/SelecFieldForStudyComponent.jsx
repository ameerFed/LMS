import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field } from "formik";
import { fieldOfStudyAPI } from "../../redux/features/globalFuncSlice";

export default function SelecFieldForStudyComponent({ name }) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchFieldOfStudy = async () => {
      try {
        const res = await dispatch(fieldOfStudyAPI({ token: auth?.token })).unwrap();
        if (res?.success) {
          setData(res.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch field of study:", err);
      }
    };

    if (auth?.token) {
      fetchFieldOfStudy();
    }
  }, [auth?.token, dispatch]);

  return (
    <div className="mb-12 mb-md-16">
      <label
        htmlFor={name}
        className="form-label black-100 fw-semibold mb-8 mb-xl-12"
      >
        Field of Study
      </label>
      <Field
        as="select"
        name={name}
        id={name}
        className="form-control"
      >
        <option value="" label="Select a field of study" />
        {data.map((item) => (
          <option key={item.id} value={item.id} label={item.name}>
            {item.name}
          </option>
        ))}
      </Field>
    </div>
  );
}