import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faPlane } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const CallerLogin = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });

  const { email, password } = admin;

  const handleCallerLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/callerlogin`, admin);
      const { token, role, id } = response.data;
      localStorage.setItem("callerToken", token);
      localStorage.setItem("role", role);
      localStorage.setItem("id", id);

      navigate("/caller/leads", { replace: true });
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  const handleChange = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const callerToken = localStorage.getItem("callerToken");

    if (callerToken) {
      navigate("/caller/leads", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="container-fluid">
      <div className="row min-vh-100 text-start">
        <div className="col-lg-6 col-sm-12 d-lg-flex flex-column justify-content-center convert-metric text-white px-2 px-lg-4 pt-5 pt-lg-0">
          <div className="position-absolute top-0 start-0 p-2 mt-4 ps-lg-3 d-flex align-items-center">
            <div className="custom-box mt-0">
              <FontAwesomeIcon icon={faPlane} />
            </div>

            <div className="d-flex flex-column ms-2">
              <span className="fw-bold text-white signal-crm">Safar CRM</span>
            </div>
          </div>

          <h1 className="fw-bold track-calls">Move faster. Convert more.</h1>

          <p className="mb-4 telecalls-admin">
            Action-driven CRM purpose-built for Hajj, Umrah, ticketing and
            medical travel teams.
          </p>

          <div className="copyright-travel">
            © {new Date().getFullYear()} Safar Travel Group
          </div>
        </div>

        <div className="col-lg-6 col-sm-12 d-flex align-items-center justify-content-center bg-light mt-lg-4 mt-0">
          <div className="w-100 px-0" style={{ maxWidth: "450px" }}>
            <h3 className="fw-bold mb-2">Caller Sign in to your account</h3>
            <p className="text-muted mb-4">
              Enter your credentials to continue.
            </p>

            <form onSubmit={handleCallerLogin}>
              <div className="mb-3">
                <label className="form-label">Email</label>

                <div className="input-group">
                  <input
                    type="email"
                    className="form-control sector-wise mb-0"
                    placeholder="you@company.com"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    autoComplete="email"
                    style={{ height: "42px" }}
                    required
                  />
                </div>
              </div>

              <div className="position-relative mb-4">
                <label className="form-label">Password</label>

                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control pe-5 sector-wise"
                  placeholder="********"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  style={{ height: "42px" }}
                  required
                />

                <span
                  className="eye-login"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </div>

              <button type="submit" className="btn sign-in-btn w-100 py-2 mb-2">
                Log In
              </button>

              <Link to="/" className="text-success">
                Back
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallerLogin;
