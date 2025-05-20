import React from "react";
import ConfirmationCodeForm from "../../../components/ConfirmationCodeForm/ConfirmationCodeForm";

export default function ConfirmationCode() {

  return (
    <div className="d-flex flex-column flex-grow-1 justify-content-center px-15">
      <div className="text-center mb-20">
        <h1 className="ah-heading-02 fw-semibold mb-3">
          Enter the Confirmation Code
        </h1>
        <p className="black-100 ah-text-base">
          To verify your account simply enter the 6-digits code we’ve sent to
          your email address
        </p>
      </div>
      <ConfirmationCodeForm />
    </div>
  );
}
