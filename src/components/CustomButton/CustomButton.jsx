import React from "react";
import DottedLoading from "../DottedLoading/DottedLoading";

const CustomButton = ({
  label = "",
  classes = "",
  type = "button",
  disabled = false,
  isSubmitting = false,
}) => {
  return (
    <>
      <button
        className={`${classes}`}
        type={type}
        disabled={disabled}
      >
        {!isSubmitting ? label : <DottedLoading />}
      </button>
    </>
  );
};

export default CustomButton;
