import React from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import EGWB from "../../assets/images/EGWB-logo.svg";

export default function AuthHeader() {
  return (
    <div className="py-20 bg-gray auth-header">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
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
