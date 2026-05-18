import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTableColumns,
  faCube,
  faCartShopping,
  faPenToSquare,
  faFileLines,
  faGift,
  faUsers,
  faUserPlus,
  faUserGear,
  faGear,
  faXmark,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const NAV_LINKS = [
  {
    path: "/admin/dashboard",
    label: "Dashboard",
    exact: true,
    icon: faTableColumns,
  },
  { path: "/admin/stockmanagement", label: "Stock Management", icon: faCube },
  { path: "/admin/sales", label: "Sales", icon: faCartShopping },
  { path: "/admin/settings", label: "Settings", icon: faGear },
];

export default function Sidebar() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [isOpen, setIsOpen] = useState(false);
  const [logo, setLogo] = useState(null);
  const [otb, setOtb] = useState([]);
  const [blinkOTB, setBlinkOTB] = useState(false);
  const [blinkURASE, setBlinkURASE] = useState(false);
  const navigate = useNavigate();
  const role = resolveRole();
  const location = useLocation();

  const uploadsBase = API_URL
    ? API_URL.replace(/\/api\/?$/, "") + "/uploads"
    : "/uploads";

  const toggleSidebar = () => setIsOpen((s) => !s);
  const closeSidebar = () => setIsOpen(false);

  const [navLinks, setNavLinks] = useState(NAV_LINKS);

  return (
    <>
      <nav className="navbar navbar-light bg-light d-md-none mobile-navbar-toggle">
        <div className="container-fluid">
          <button
            className="btn btn-outline-success update-update1"
            onClick={toggleSidebar}
            aria-label="Open sidebar"
          >
            ☰
          </button>
          <Link to="/admin/dashboard" onClick={closeSidebar}>
            <img
              src={logo || Travels}
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
        <div className="p-0 d-flex flex-column h-100">
          <div className="d-flex justify-content-between align-items-center">
            <Link to="/admin/dashboard" onClick={closeSidebar}>
              <img
                src={logo || Travels}
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
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.exact}
                className={({ isActive }) =>
                  [
                    "list-group-item rounded-2 list-group-item-action mb-0 ms-2 border-0",
                    isActive ? "active" : "",
                  ].join(" ")
                }
                onClick={() => {
                  closeSidebar();
                  if (link.path === "/admin/OTB") handleOTBClick();
                }}
              >
                <FontAwesomeIcon icon={link.icon} />
                <span className="ms-2 label-span">{link.label}</span>

                {link.path === "/admin/OTB" && blinkOTB && (
                  <div className="blink-box blink-box1 ms-2"></div>
                )}

                {link.path === "/admin/urase" && blinkURASE && (
                  <div className="blink-box ms-2"></div>
                )}
              </NavLink>
            ))}
          </div>

          <div className="mt-auto pt-0 mb-2">
            <hr className="mb-0 text-danger" />
            <div
              className="text-start mt-2 d-flex align-items-center logout-color ps-3 py-2"
              onClick={handleLogout}
            >
              <FontAwesomeIcon
                icon={faRightFromBracket}
                className="logout-col1or fw-light me-2"
              />
              Logout
            </div>
          </div>
        </div>
      </div>

      <aside
        className="d-none d-md-block admin-sidebar"
        aria-label="Admin sidebar"
      >
        <div className="p-0 d-flex flex-column" style={{ minHeight: "100%" }}>
          <Link to="/admin/dashboard">
            <img
              src={logo || Travels}
              alt="logo"
              className="logo-image mb-2 mt-2"
              loading="eager"
              style={{ width: "206px", height: "70px" }}
            />
          </Link>

          <hr className="text-light mt-0 mb-2" />

          <div className="list-group rounded-0 me-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.exact}
                className={({ isActive }) =>
                  [
                    "list-group-item list-group-item-action mb-0 ms-2 border-0",
                    isActive ? "active" : "",
                  ].join(" ")
                }
                onClick={() => {
                  if (link.path === "/admin/OTB") handleOTBClick();
                }}
              >
                <FontAwesomeIcon icon={link.icon} />
                <span className="ms-2 label-span">{link.label}</span>
              </NavLink>
            ))}
          </div>

          <div className="mt-auto pt-0 mb-2">
            <hr className="mb-0 text-danger" />
            <div
              className="text-start mt-2 d-flex align-items-center logout-color ps-3 py-2"
              onClick={handleLogout}
            >
              <FontAwesomeIcon
                icon={faRightFromBracket}
                className="fw-light me-2"
              />
              Logout
            </div>
          </div>
        </div>
      </aside>

      <div className="content-wrapper"></div>
    </>
  );
}
