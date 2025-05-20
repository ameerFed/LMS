import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import EGWB from "../../assets/images/EGWB-logo.svg";

export default function AuthHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="py-20 bg-gray auth-header">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 d-flex align-items-center gap-3 position-relative">
            {location.pathname === "/signup" || location.pathname === "/organization" || location.pathname === "/user-type" ? 
              <button
                className="bg-transparent border-0 p-0 back-button"
                onClick={() => navigate(-1)}
              >
                <svg
                  width="34"
                  height="26"
                  viewBox="0 0 34 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.75 13L32 13M1.75 13L12.25 2.5M1.75 13L12.25 23.5"
                    stroke="black"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            : ""}

            <Link to={"/"} className="logo d-flex align-items-center gap-3">
              <LazyLoadImage src={EGWB} alt={""} effect="blur" />
              <strong className="fw-semibold pNovaFamily">
                <span className="d-none d-lg-block">
                  Education Gaming Wellness Blockchain
                </span>
                <span className="d-lg-none">EGWB</span>
              </strong>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
