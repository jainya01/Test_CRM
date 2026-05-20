import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faRightFromBracket,
  faUsers,
  faUpload,
  faBoxOpen,
  faBriefcase,
  faPassport,
  faUserCircle,
  faBorderAll,
  faPhone,
  faPlane,
  faCog,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";

const NAV_LINKS = [
  {
    path: "/admin/dashboard",
    label: "Dashboard",
    exact: true,
    icon: faBorderAll,
  },
  { path: "/admin/leads", label: "Leads", icon: faUsers },
  { path: "/admin/callers", label: "Caller Executive", icon: faHeadset },
  { path: "/admin/packages", label: "Packages", icon: faBoxOpen },
  { path: "/admin/customers", label: "Customers", icon: faUserCircle },
  { path: "/admin/agents", label: "Agents", icon: faBriefcase },
  { path: "/admin/passports", label: "Passports", icon: faPassport },
  { path: "/admin/bulk-upload", label: "Bulk Upload", icon: faUpload },
  { path: "/admin/settings", label: "Settings", icon: faCog },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen((prev) => {
      const next = !prev;

      if (next) {
        document.body.classList.add("sidebar-open");
      } else {
        document.body.classList.remove("sidebar-open");
      }

      return next;
    });
  };

  const closeSidebar = () => {
    setIsOpen(false);
    document.body.classList.remove("sidebar-open");
  };

  return (
    <>
      <nav className="navbar navbar-light bg-light d-md-none mobile-navbar-toggle fixed-top border rounded">
        <div className="container-fluid">
          <button
            className="btn update-update"
            onClick={toggleSidebar}
            aria-label="Open sidebar"
          >
            ☰
          </button>

          <Link
            to="/admin/dashboard"
            className="text-decoration-none"
            onClick={closeSidebar}
          >
            <div className="d-flex align-items-center ms-2">
              <div className="custom-box mt-0">
                <FontAwesomeIcon icon={faPlane} />
              </div>

              <div className="d-flex flex-column ms-2 font-alfasseh">
                <span className="text-dark fw-bold">Safar CRM</span>
                <span className="laundry-app text-dark">Admin Panel</span>
              </div>
            </div>
          </Link>
        </div>
      </nav>

      {isOpen && <div className="mobile-overlay" onClick={closeSidebar}></div>}

      <div className={`mobile-sidebar d-md-none ${isOpen ? "open" : ""}`}>
        <div className="p-0 d-flex flex-column" style={{ minHeight: "100vh" }}>
          <div className="d-flex justify-content-between align-items-center">
            <Link to="/admin/dashboard" onClick={closeSidebar}>
              <img
                alt="logo"
                className="logo-image mb-2 mt-2"
                loading="eager"
                style={{ width: "106px", height: "50px" }}
              />
            </Link>

            <button
              title="Close"
              className="btn-closed"
              onClick={closeSidebar}
              aria-label="Close sidebar"
            >
              <FontAwesomeIcon icon={faXmark} className="text-light" />
            </button>
          </div>

          <hr className="text-light mt-0 mb-2" />

          <div className="list-group list-group-flush me-3">
            {NAV_LINKS.map((link, index) => (
              <NavLink
                key={link.path || index}
                to={link.path}
                end={link.exact}
                className={({ isActive }) =>
                  `list-group-item list-group-item-action mb-0 ms-2 border-0 ${
                    isActive ? "active" : ""
                  }`
                }
                onClick={closeSidebar}
              >
                <FontAwesomeIcon icon={link.icon} />
                <span className="ms-2 label-span">{link.label}</span>
              </NavLink>
            ))}
          </div>

          <div className="mt-auto pt-0 mb-2">
            <hr className="mt-auto text-danger mb-0" />

            <div className="d-block d-flex align-items-center flex-row flex-nowrap justify-content-between rounded p-1 mt-2 w-100">
              <div className="d-flex align-items-center">
                <div className="d-flex align-items-center justify-content-center rounded-circle me-2 short-sidebar text-light fw-bold custom-short">
                  A
                </div>

                <div className="d-flex flex-column">
                  <span className="fw-semibold text-nowrap custom-shorts">
                    Amir Khan
                  </span>

                  <small className="custom-shorts1">admin@travel.com</small>
                </div>
              </div>

              <div>
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  className="logout-color"
                  role="button"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="d-none d-md-block admin-sidebar"
        aria-label="Admin sidebar"
      >
        <div className="p-0 d-flex flex-column" style={{ minHeight: "100vh" }}>
          <Link to="/admin/dashboard" className="text-decoration-none">
            <div className="d-flex mt-3 align-items-center ms-2">
              <div className="custom-box mt-0">
                <FontAwesomeIcon icon={faPlane} />
              </div>

              <div className="d-flex flex-column ms-2 font-alfasseh">
                <span className="text-light fw-bold">Safar CRM</span>
                <span className="laundry-app">Admin Panel</span>
              </div>
            </div>
          </Link>

          <div className="list-group me-3 mt-3">
            {NAV_LINKS.map((link, index) => (
              <NavLink
                key={link.path || index}
                to={link.path}
                end={link.exact}
                className={({ isActive }) =>
                  `list-group-item list-group-item-action mb-0 ms-2 border-0 ${
                    isActive ? "active" : ""
                  }`
                }
              >
                <FontAwesomeIcon icon={link.icon} />
                <span className="ms-2 label-span">{link.label}</span>
              </NavLink>
            ))}
          </div>

          <div className="mt-auto pt-0 mb-2">
            <hr className="mt-auto text-danger mb-0" />

            <div className="d-none d-md-flex align-items-center rounded p-1 mt-2 w-100 justify-content-between">
              <div className="d-flex align-items-center overflow-hidden">
                <div className="d-flex align-items-center justify-content-center rounded-circle me-2 text-light fw-bold custom-short">
                  A
                </div>

                <div className="d-flex flex-column overflow-hidden">
                  <span className="fw-semibold text-nowrap custom-shorts">
                    Amir Khan
                  </span>

                  <small className="custom-shorts1">admin@travel.com</small>
                </div>
              </div>

              <div>
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  className="logout-color"
                  role="button"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
