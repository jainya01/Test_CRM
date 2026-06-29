import { useEffect } from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faPlane,
  faUserShield,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("myAdminToken");
    const role = localStorage.getItem("userRole");
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
    <>
      <title>CRM Login Portal</title>
      <meta name="description" content="Login as Admin, Staff or B2B Agent." />

      <main className="container-fluid">
        <div className="row min-vh-100 text-start">
          <div className="col-lg-6 col-sm-12 d-lg-flex flex-column justify-content-center convert-metric text-white px-2 px-lg-4 pt-5 pt-lg-0 position-relative">
            <div className="position-absolute top-0 start-0 p-2 mt-4 ps-lg-3 d-flex align-items-center">
              <div className="custom-box mt-0">
                <FontAwesomeIcon icon={faPlane} />
              </div>

              <div className="d-flex flex-column ms-2">
                <span className="fw-bold text-white signal-crm">
                  Laraib CRM
                </span>
              </div>
            </div>

            <h1 className="fw-bold track-calls">Move faster. Convert more.</h1>

            <h1 className="telecalls-admin mb-4">
              Action-driven CRM purpose-built for Hajj, Umrah, ticketing and
              medical travel teams.
            </h1>
            <div className="copyright-travel">
              © {new Date().getFullYear()} Laraib Travel Group
            </div>
          </div>

          <div className="col-lg-6 col-sm-12 d-flex align-items-center justify-content-center bg-light mt-lg-4 mt-0">
            <div className="w-100 px-0" style={{ maxWidth: "450px" }}>
              <h1 className="fw-bold mb-2 sign-in-text">Sign in</h1>
              <p className="text-muted mb-4">Choose a demo role to explore</p>

              <div className="role-wrapper">
                <div className="control-condition">
                  <Link
                    className="text-dark text-decoration-none"
                    to="/admin/login"
                  >
                    <div className="d-flex align-items-center">
                      <div className="phone-awesome me-2">
                        <FontAwesomeIcon icon={faUserShield} />
                      </div>

                      <div>
                        <h2 className="fw-bold mb-0 custom-admin-head">
                          Admin
                        </h2>
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
                        <FontAwesomeIcon icon={faUserTie} />
                      </div>

                      <div>
                        <h2 className="fw-bold mb-0 custom-admin-head">
                          Staff
                        </h2>
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
                        <h2 className="fw-bold mb-0 custom-admin-head">
                          B2B Agent
                        </h2>
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
      </main>
    </>
  );
};

export default Login;
