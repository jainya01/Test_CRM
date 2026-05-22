import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { authHeader } from "../utils/authHeader";
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
  faArrowTrendUp,
  faCube,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const ADMIN_LINKS = [
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

const AGENT_LINKS = [
  {
    path: "/agent/overview",
    label: "Overview",
    exact: true,
    icon: faArrowTrendUp,
  },
  {
    path: "/agent/customers",
    label: "My Customers",
    exact: true,
    icon: faUserCircle,
  },
  {
    path: "/agent/packages",
    label: "Packages",
    exact: true,
    icon: faCube,
  },
  {
    path: "/agent/bookings",
    label: "Bookings",
    exact: true,
    icon: faBriefcase,
  },
];

const STAFF_LINKS = [
  {
    path: "/staff/leads",
    label: "My Leads",
    exact: true,
    icon: faPhone,
  },
  {
    path: "/staff/followups",
    label: "Follow-ups",
    exact: true,
    icon: faCalendar,
  },
  {
    path: "/staff/packages",
    label: "Packages",
    exact: true,
    icon: faCube,
  },
];

export default function Sidebar() {
  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const role = localStorage.getItem("role");
  const navLinks =
    role === "admin"
      ? ADMIN_LINKS
      : role === "agent"
        ? AGENT_LINKS
        : STAFF_LINKS;

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

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/");
  };

  const [admin, setAdmin] = useState([]);
  const [staff, setStaff] = useState([]);
  const [agent, setAgent] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    const allData = async () => {
      try {
        const [adminRes, staffRes, agentRes] = await Promise.allSettled([
          axios.get(`${API_URL}/alladmindata`, {
            headers: authHeader(),
          }),

          axios.get(`${API_URL}/allstaffs`, {
            headers: authHeader(),
          }),

          axios.get(`${API_URL}/allagents`, {
            headers: authHeader(),
          }),
        ]);

        if (adminRes.status === "fulfilled") {
          setAdmin(adminRes.value.data.result || []);
        }

        if (staffRes.status === "fulfilled") {
          setStaff(staffRes.value.data.result || []);
        }

        if (agentRes.status === "fulfilled") {
          setAgent(agentRes.value.data.result || []);
        }
      } catch (error) {
        console.error("error", error);
      }
    };

    allData();
  }, []);

  const handleLoggedUser = () => {
    const role = localStorage.getItem("role");
    const id = Number(localStorage.getItem("id"));

    if (role === "admin") {
      const findAdmin = admin.find((item) => Number(item.id) === id);

      if (findAdmin) {
        setLoggedUser({
          fullname: findAdmin.fullname,
          email: findAdmin.email,
        });
      }
    }

    if (role === "staff") {
      const findStaff = staff.find((item) => Number(item.id) === id);

      if (findStaff) {
        setLoggedUser({
          fullname: findStaff.fullname,
          email: findStaff.email,
        });
      }
    }

    if (role === "agent") {
      const findAgent = agent.find((item) => Number(item.id) === id);

      if (findAgent) {
        setLoggedUser({
          fullname: findAgent.fullname,
          email: findAgent.email,
        });
      }
    }
  };

  useEffect(() => {
    if (admin.length > 0 || staff.length > 0 || agent.length > 0) {
      handleLoggedUser();
    }
  }, [admin, staff, agent]);

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
            to={
              localStorage.getItem("role") === "admin"
                ? "/admin/dashboard"
                : localStorage.getItem("role") === "agent"
                  ? "/agent/overview"
                  : "/staff/leads"
            }
            className="text-decoration-none"
            onClick={closeSidebar}
          >
            <div className="d-flex align-items-center ms-2">
              <div className="custom-box mt-0">
                <FontAwesomeIcon icon={faPlane} />
              </div>

              <div className="d-flex flex-column ms-2 font-alfasseh">
                <span className="text-dark fw-bold">Jainya CRM</span>
                <span className="laundry-app text-dark">
                  {localStorage.getItem("role") === "admin"
                    ? "Admin Panel"
                    : localStorage.getItem("role") === "agent"
                      ? "Agent Panel"
                      : localStorage.getItem("role") === "staff"
                        ? "Staff Panel"
                        : "Panel"}
                </span>
              </div>
            </div>
          </Link>
        </div>
      </nav>

      {isOpen && <div className="mobile-overlay" onClick={closeSidebar}></div>}

      <div className={`mobile-sidebar d-md-none ${isOpen ? "open" : ""}`}>
        <div className="p-0 d-flex flex-column" style={{ minHeight: "100vh" }}>
          <div className="d-flex justify-content-between align-items-center">
            <Link
              to={
                localStorage.getItem("role") === "admin"
                  ? "/admin/dashboard"
                  : localStorage.getItem("role") === "agent"
                    ? "/agent/overview"
                    : "/staff/leads"
              }
              className="text-decoration-none"
              onClick={closeSidebar}
            >
              <div className="d-flex mt-2">
                <div className="custom-box mt-0">
                  <FontAwesomeIcon icon={faPlane} />
                </div>

                <div className="d-flex flex-column ms-2 font-alfasseh">
                  <span className="text-light fw-bold">CallTrack CRM</span>
                  <span className="laundry-app">Laraib Travels</span>
                </div>
              </div>
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

          <hr className="text-dark mt-0 mb-2" />

          <div className="list-group list-group-flush me-3">
            {navLinks.map((link, index) => (
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
                <div className="d-flex align-items-center justify-content-center rounded-circle me-2 short-sidebar text-white fw-bold custom-short">
                  {loggedUser?.fullname
                    ? loggedUser.fullname.charAt(0).toUpperCase()
                    : "U"}
                </div>

                <div className="d-flex flex-column overflow-hidden">
                  <span className="fw-semibold text-nowrap custom-shorts">
                    {loggedUser?.fullname ?? "N/A"}
                  </span>

                  <small className="custom-shorts1">
                    {loggedUser?.email ?? "N/A"}
                  </small>
                </div>
              </div>

              <div onClick={handleLogout}>
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
          <Link
            to={
              localStorage.getItem("role") === "admin"
                ? "/admin/dashboard"
                : localStorage.getItem("role") === "agent"
                  ? "/agent/overview"
                  : "/staff/leads"
            }
            className="text-decoration-none"
          >
            <div className="d-flex mt-3 align-items-center ms-2">
              <div className="custom-box mt-0">
                <FontAwesomeIcon icon={faPlane} />
              </div>

              <div className="d-flex flex-column ms-2 font-alfasseh">
                <span className="text-light fw-bold">Jainya CRM</span>
                <span className="laundry-app text-light">
                  {localStorage.getItem("role") === "admin"
                    ? "Admin Panel"
                    : localStorage.getItem("role") === "agent"
                      ? "Agent Panel"
                      : localStorage.getItem("role") === "staff"
                        ? "Staff Panel"
                        : "Panel"}
                </span>
              </div>
            </div>
          </Link>

          <div className="list-group me-3 mt-3">
            {navLinks.map((link, index) => (
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
                  {loggedUser?.fullname
                    ? loggedUser.fullname.charAt(0).toUpperCase()
                    : "U"}
                </div>

                <div className="d-flex flex-column overflow-hidden">
                  <span className="fw-semibold text-nowrap custom-shorts">
                    {loggedUser?.fullname ?? "N/A"}
                  </span>

                  <small className="custom-shorts1">
                    {loggedUser?.email ?? "N/A"}
                  </small>
                </div>
              </div>

              <div onClick={handleLogout}>
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
