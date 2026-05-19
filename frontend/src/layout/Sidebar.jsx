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
} from "@fortawesome/free-solid-svg-icons";

const NAV_LINKS = [
  {
    path: "/admin/dashboard",
    label: "Dashboard",
    exact: true,
    icon: faBorderAll,
  },
  { path: "/admin/leads", label: "Leads", icon: faUsers },
  { path: "/admin/packages", label: "Packages", icon: faBoxOpen },
  { path: "/admin/customers", label: "Customers", icon: faUserCircle },
  { path: "/admin/agents", label: "Agents", icon: faBriefcase },
  { path: "/admin/passports", label: "Passports", icon: faPassport },
  { path: "/admin/bulk-upload", label: "Bulk Upload", icon: faUpload },
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

          <Link to="/admin/dashboard" onClick={closeSidebar}>
            <img
              alt="logo"
              className="logo-image mb-2 mt-0"
              loading="eager"
              style={{ width: "108px", height: "50px" }}
            />
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

          <div className="list-group list-group-flush ms-2 me-2">
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
            <hr className="mb-0 text-danger" />

            <div className="text-start mt-2 d-flex align-items-center logout-color ps-3 py-2">
              <FontAwesomeIcon
                icon={faRightFromBracket}
                className="fw-light me-2"
              />
              Logout
            </div>
          </div>
        </div>
      </div>

      <div
        className="d-none d-md-block admin-sidebar"
        aria-label="Admin sidebar"
      >
        <div className="p-0 d-flex flex-column" style={{ minHeight: "100vh" }}>
          <Link to="/admin/dashboard">
            <img
              alt="logo"
              className="logo-image mb-2 mt-2"
              loading="eager"
              style={{ width: "206px", height: "70px" }}
            />
          </Link>

          <hr className="text-light mt-0 mb-2" />

          <div className="list-group me-3">
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
            <hr className="mb-0 text-danger" />

            <div className="text-start mt-2 d-flex align-items-center logout-color ps-3 py-2">
              <FontAwesomeIcon
                icon={faRightFromBracket}
                className="fw-light me-2"
              />
              Logout
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
