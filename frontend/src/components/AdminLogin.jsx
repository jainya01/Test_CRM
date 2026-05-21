import { useEffect, useState } from "react";
import axios from "axios";
import { authHeader } from "../utils/authHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faPlane } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const AdminLogin = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });

  const { email, password } = admin;

  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
    const passwordRegex = /^[A-Za-z0-9@#$%^&*!._-]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return false;
    }

    if (!passwordRegex.test(password)) {
      toast.warn("Invalid password format");
      return false;
    }

    const blockedPatterns =
      /('|--|;|=|\/\*|\*\/|xp_|drop|select|insert|delete|update)/i;

    if (blockedPatterns.test(email) || blockedPatterns.test(password)) {
      toast.error("Invalid characters detected");
      return false;
    }

    return true;
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setErrorMessage("");

    try {
      const response = await axios.post(`${API_URL}/adminlogin`, admin, {
        headers: authHeader(),
      });

      const { token, role, id } = response.data;

      if (!token) {
        toast.error("Invalid credentials");
        return;
      }

      localStorage.setItem("adminToken", token);
      localStorage.setItem("role", role);
      localStorage.setItem("id", id);

      navigate("/admin/dashboard", { replace: true });
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login failed");
    }
  };

  const handleChange = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, []);

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
            <h3 className="fw-bold mb-2">Admin Sign in to your account</h3>
            <p className="text-muted mb-4">
              Enter your credentials to continue.
            </p>

            <form onSubmit={handleAdminLogin}>
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
                    autoComplete="username"
                    style={{ height: "42px" }}
                    required
                  />
                </div>
              </div>

              <div className="position-relative">
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

              {errorMessage && (
                <>
                  <div className="text-danger mt-0 mb-3 invalid-message">
                    {errorMessage}
                  </div>
                </>
              )}

              <button
                type="submit"
                className="btn sign-in-btn w-100 py-2 mb-2 mt-auto"
              >
                Log In
              </button>

              <Link to="/" className="text-success">
                Back
              </Link>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer position="bottom-right" autoClose={1500} />
    </div>
  );
};

export default AdminLogin;
