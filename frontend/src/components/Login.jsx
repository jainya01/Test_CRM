import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faCircleNotch,
  faPhone,
  faPlane,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const role = localStorage.getItem("role");
    const agentToken = localStorage.getItem("agentToken");
    const staffToken = localStorage.getItem("staffToken");

    if (token && role === "admin") {
      navigate("/admin/dashboard", { replace: true });
    }

    if (agentToken && role === "agent") {
      navigate("/agent/overview", { replace: true });
    }

    if (staffToken && role === "staff") {
      navigate("/staff/leads", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="container-fluid">
      <div className="row min-vh-100 text-start">
        <div className="col-lg-6 col-sm-12 d-lg-flex flex-column justify-content-center convert-metric text-white px-2 px-lg-4 pt-5 pt-lg-0 position-relative">
          <div className="position-absolute top-0 start-0 p-2 mt-4 ps-lg-3 d-flex align-items-center">
            <div className="custom-box mt-0">
              <FontAwesomeIcon icon={faPlane} />
            </div>

            <div className="d-flex flex-column ms-2">
              <span className="fw-bold text-white signal-crm">Jainya CRM</span>
            </div>
          </div>

          <h1 className="fw-bold track-calls">Move faster. Convert more.</h1>

          <p className="mb-4 telecalls-admin">
            Action-driven CRM purpose-built for Hajj, Umrah, ticketing and
            medical travel teams.
          </p>

          <div className="copyright-travel">
            © {new Date().getFullYear()} Jainya Travel Group
          </div>
        </div>

        <div className="col-lg-6 col-sm-12 d-flex align-items-center justify-content-center bg-light mt-lg-4 mt-0">
          <div className="w-100 px-0" style={{ maxWidth: "450px" }}>
            <h3 className="fw-bold mb-2">Sign in</h3>
            <p className="text-muted mb-4">Choose a demo role to explore</p>

            <div className="role-wrapper">
              <div className="control-condition">
                <Link
                  className="text-dark text-decoration-none"
                  to="/admin/login"
                >
                  <div className="d-flex align-items-center">
                    <div className="phone-awesome me-2">
                      <FontAwesomeIcon icon={faCircleNotch} />
                    </div>

                    <div>
                      <h6 className="fw-bold mb-0">Admin</h6>
                      <span className="text-muted full-control">
                        Full control & analytics
                      </span>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="control-condition">
                <Link
                  className="text-dark text-decoration-none"
                  to="/staff/login"
                >
                  <div className="d-flex align-items-center">
                    <div className="phone-awesome me-2">
                      <FontAwesomeIcon icon={faPhone} />
                    </div>

                    <div>
                      <h6 className="fw-bold mb-0">Calling Staff</h6>
                      <span className="text-muted full-control">
                        Convert assigned leads
                      </span>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="control-condition">
                <Link
                  className="text-dark text-decoration-none"
                  to="/agent/login"
                >
                  <div className="d-flex align-items-center">
                    <div className="phone-awesome me-2">
                      <FontAwesomeIcon icon={faBriefcase} />
                    </div>

                    <div>
                      <h6 className="fw-bold mb-0">B2B Agent</h6>
                      <span className="text-muted full-control">
                        Manage own customers
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
