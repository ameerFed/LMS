import React from "react";
import { Modal, Button } from "react-bootstrap";
import CustomButton from "../CustomButton/CustomButton";

const SuccessModal = ({ show, handleClose, handleContinue }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header className="border-0">
        <Modal.Title className="w-100 text-center">Account Created</Modal.Title>
        <button
          type="button"
          className="btn-close position-absolute end-0 top-0 m-3"
          aria-label="Close"
          onClick={handleClose}
        />
      </Modal.Header>

      <Modal.Body className="text-center">
        <img
          src="/path-to-your-confetti-image.png"
          alt="Celebration Icon"
          style={{ width: "80px", height: "80px", marginBottom: "1rem" }}
        />
        <p className="text-muted">Your account has been successfully set up!</p>
      </Modal.Body>

      <Modal.Footer className="justify-content-center border-0">
        <Button classes={"btn btn-primary w-100 mb-10"} type={"button"}>
          Continue
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SuccessModal;
