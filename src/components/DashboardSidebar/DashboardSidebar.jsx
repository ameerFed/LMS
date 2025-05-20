import React, { useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import userProfileImage from "../../assets/images/user.png";
import EGWB from "../../assets/images/EGWB-logo.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import globalFunction from "../../utils/globalFunction";

// const studentMenuItems = [
//   {
//     path: "/",
//     icon: "icon-dashboard",
//     label: "Dashboard",
//   },
//   {
//     path: "/CertifyMe",
//     icon: "icon-openai",
//     label: "CertifyMe.Ai",
//   },
//   {
//     path: "/AssessMe",
//     icon: "icon-openai",
//     label: "AssessMe.Ai",
//   },
//   {
//     path: "/growth-coordinator",
//     icon: "icon-openai",
//     label: "Growth Coordinator",
//   },
//   {
//     path: "/courses",
//     icon: "icon-courses",
//     label: "Courses",
//   },
// ];

const superAdminMenuItems = [
  {
    path: "/",
    icon: "icon-dashboard",
    label: "Dashboard",
  },
  {
    path: "/students",
    icon: "icon-openai",
    label: "Students",
  },
  {
    path: "/instructor",
    icon: "icon-openai",
    label: "Instructors",
  },
  {
    path: "/courses",
    icon: "icon-courses",
    label: "Courses",
  },
  {
    path: "/add-new-course",
    icon: "bi bi-plus",
    label: "Add New Courses",
  },
];

const bottomMenuItems = [
  {
    path: "/settings",
    icon: "icon-setting",
    label: "Setting",
  },
  {
    path: "/help-center",
    icon: "icon-help",
    label: "Help Center",
  },
  {
    path: "/profile",
    icon: "icon-user",
    label: "Fiora John",
    isDivider: true,
  },
  // {
  //   path: "/logout",
  //   icon: "icon-logout",
  //   label: "Logout",
  // },
];

const DashboardSidebar = () => {
  const [burgerSidebarActive, setBurgerSidebarActive] = useState(false);
  const location = useLocation();

  const toggleSidebar = useCallback(() => {
    setBurgerSidebarActive((prev) => !prev);
  }, []);

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  const renderMenuItems = (items) => (
    <ul className="menu list-unstyled">
      {items.map((item) => (
        <React.Fragment key={item.path}>
          <li className="mb-10">
            <Link
              to={item.path}
              className={`menu-item d-flex align-items-center fw-semibold ${isActive(
                item.path
              )}`}
            >
              <span className="icon">
                {item.path === "/profile" ? (
                  <img
                    src={userProfileImage}
                    alt="Profile"
                    className="rounded-circle object-fit-cover"
                  />
                ) : (
                  <i className={item.icon}></i>
                )}
              </span>
              <span>{item.label}</span>
            </Link>
          </li>
          {item.isDivider && <div className="sidebar-devider" />}
        </React.Fragment>
      ))}
    </ul>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="sidebar d-none d-lg-flex flex-column">
        <div className="py-50 d-flex justify-content-center">
          {/* <Link to="/" className="text-decoration-none black-900">
            <div className="d-flex align-items-center justify-content-center">
              <img src={EGWB} className="img-fluid" alt="Logo" loading="lazy" />
              <h3 className="ad-heading-04 ms-15 fw-semibold">EGWB</h3>
            </div>
          </Link> */}
          <Link to={"/"} className="logo align-items-center d-flex gap-3">
            <LazyLoadImage src={EGWB} alt={""} effect="blur" />
            <strong className="fw-semibold pNovaFamily">
              <span>EGWB</span>
            </strong>
          </Link>
        </div>
        <div className="scrollable-sidebar d-flex flex-column justify-content-between ">
          <div>{renderMenuItems(superAdminMenuItems)}</div>
          <div className="bottom-section">
            {renderMenuItems(bottomMenuItems)}
            <div className="menu">
              <button
                type="button"
                onClick={() => globalFunction.logoutFunction()}
                style={{marginTop: "-20px"}}
                className={`menu-item d-flex align-items-center fw-semibold border-0 bg-transparent p-0 mb-20`}
              >
                <span className="icon">
                  <i className="icon-logout"></i>
                </span>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="py-20 px-15 d-flex align-items-center justify-content-between d-lg-none">
        <Link to="/" className="text-decoration-none black-900">
          <div className="d-flex align-items-center justify-content-center">
            <img src={EGWB} className="img-fluid" alt="Logo" loading="lazy" />
            <h3 className="ad-heading-04 ms-15 fw-semibold">EGWB</h3>
          </div>
        </Link>
        <div className="d-flex gap-3 gap-sm-4 align-items-center">
          <div className="search-wrapper d-none d-md-flex">
            <div className="position-relative">
              <input
                type="text"
                placeholder="Search from courses..."
                className="form-control pe-35 search-input"
              />
              <span className="icon-search search-icon position-absolute text-base"></span>
            </div>
          </div>
          <span className="cursor-pointer">
            <i className="bi bi-bell-fill notification-bell theme-color text-lg"></i>
          </span>
          <button
            className="cursor-pointer bg-transparent border-0 p-0"
            onClick={toggleSidebar}
            aria-label="Toggle menu"
          >
            <svg
              width="20"
              height="16"
              viewBox="0 0 14 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1H13M1 5H13M1 9H13"
                stroke="#f05203"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`mobile-dashboard-sidebar d-lg-none ${
          burgerSidebarActive ? "active" : ""
        }`}
      >
        <button
          className="close cursor-pointer p-0"
          onClick={toggleSidebar}
          aria-label="Close menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="19"
            viewBox="0 0 20 19"
            fill="none"
          >
            <path
              d="M9.99934 17.8331V9.49977M9.99934 9.49977V1.16644M9.99934 9.49977H18.3327M9.99934 9.49977H1.66602"
              stroke="#fff"
              strokeWidth="2.08333"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <div className="scrollable-sidebar d-flex flex-column justify-content-between ">
          <div>{renderMenuItems(superAdminMenuItems)}</div>
          <div className="bottom-section">
            {renderMenuItems(bottomMenuItems)}
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(DashboardSidebar);
