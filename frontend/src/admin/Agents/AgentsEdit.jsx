import { useEffect, useState } from "react";
import "../../App.css";
import { authHeader } from "../../utils/authHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function AgentsEdit() {
  const API_URL = import.meta.env.VITE_API_URL;

  const { id } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [agent, SetAgent] = useState({
    fullname: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    status: "",
    notes: "",
  });

  const { fullname, phone, email, password, confirmPassword, status, notes } =
    agent;

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    if (!fullname.trim()) {
      newErrors.fullname = "Full name is required";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!status) {
      newErrors.status = "Status is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (password && password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) return;

    try {
      const payload = { ...agent };

      if (!payload.password) {
        delete payload.password;
        delete payload.confirmPassword;
      }

      await axios.put(`${API_URL}/agentsedit/${id}`, payload, {
        headers: authHeader(),
      });

      toast.success("Agent updated successfully");

      setTimeout(() => {
        navigate("/admin/agents");
      }, 1000);
    } catch (error) {
      toast.error(error.response?.result?.message || "Failed to update agent");
    }
  };

  const onInputChange = (e) => {
    SetAgent({
      ...agent,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await axios.get(`${API_URL}/someagents/${id}`, {
          headers: authHeader(),
        });
        const data = res.data?.result?.[0];

        SetAgent({
          fullname: data?.fullname || "",
          phone: data?.phone || "",
          email: data?.email || "",
          password: "",
          confirmPassword: "",
          status: data?.status || "",
          notes: data?.notes || "",
        });
      } catch (error) {
        console.error("error", error);
      }
    };

    if (id) {
      fetchAgents();
    }
  }, [API_URL, id]);

  return (
    <main className="content-wrapper">
      <div className="container-fluid border-bottom bg-light pb-2 pt-md-2 pb-lg-1 top-searchbar">
        <div className="row align-items-center">
          <div className="col-10 col-md-11">
            <div className="row align-items-center">
              <div className="col-9 col-md-8 col-lg-6">
                <input
                  type="search"
                  className="form-control sector-wise"
                  placeholder="Search passport, name, phone, PNR..."
                />
              </div>
            </div>
          </div>

          <div className="col-2 col-md-1 d-flex justify-content-end align-items-center">
            <button className="btn border-0 position-relative">
              <FontAwesomeIcon icon={faBell} />
              <span className="notification-corner bg-danger">0</span>
            </button>

            <span className="text-nowrap ms-2 date-days">
              {new Date()
                .toLocaleDateString("en-GB", {
                  weekday: "short",
                  day: "2-digit",
                  month: "short",
                })
                .replace(",", "")}
            </span>
          </div>
        </div>
      </div>

      <div className="p-2 p-lg-3 mt-2">
        <div className="col-12">
          <div className="card shadow border-0">
            <div className="card-header profile-header">
              Edit Agent: {agent.fullname}
            </div>

            <div className="card-body">
              <form onSubmit={handleFormSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="fullname" className="form-label">
                      Full Name <span className="text-danger fw-bolder">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullname"
                      className="form-control sector-wise mb-1"
                      placeholder="Enter Full Name"
                      name="fullname"
                      value={fullname}
                      onChange={onInputChange}
                      required
                    />
                    {errors.fullname && (
                      <small className="text-danger mt-1">
                        {errors.fullname}
                      </small>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="phone" className="form-label">
                      Phone <span className="text-danger fw-bolder">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="form-control sector-wise mb-1"
                      placeholder="Enter Phone Number (e.g. 9876543210)"
                      name="phone"
                      value={phone}
                      onChange={onInputChange}
                      required
                    />
                    {errors.phone && (
                      <small className="text-danger mt-1">{errors.phone}</small>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label">
                      Email <span className="text-danger fw-bolder">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control sector-wise mb-1"
                      placeholder="Enter Email (e.g. user@gmail.com)"
                      name="email"
                      value={email}
                      onChange={onInputChange}
                      required
                    />
                    {errors.email && (
                      <small className="text-danger mt-1">{errors.email}</small>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="status" className="form-label">
                      Status <span className="text-danger fw-bolder">*</span>
                    </label>
                    <select
                      aria-label="Select status"
                      id="status"
                      className="form-select sector-wise mb-1"
                      name="status"
                      value={status}
                      onChange={onInputChange}
                      required
                    >
                      <option value="">Select status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>

                    {errors.status && (
                      <small className="text-danger mt-1">
                        {errors.status}
                      </small>
                    )}
                  </div>

                  <div className="position-relative col-md-6 mt-2">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>

                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="form-control sector-wise pe-5"
                      placeholder="Enter Password"
                      name="password"
                      value={password}
                      onChange={onInputChange}
                      autoComplete="new-password"
                    />

                    {errors.password && (
                      <small className="text-danger mt-1">
                        {errors.password}
                      </small>
                    )}

                    <span
                      className="eye-login1"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        className="me-2"
                      />
                    </span>
                  </div>

                  <div className="position-relative col-md-6 mt-2">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm Password
                    </label>

                    <input
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                      className="form-control sector-wise pe-5"
                      placeholder="Enter Confirm Password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={onInputChange}
                      autoComplete="new-password"
                    />

                    {errors.confirmPassword && (
                      <div className="text-danger confirm-password mt-0">
                        {errors.confirmPassword}
                      </div>
                    )}

                    <span
                      className="eye-login1"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        className="me-2"
                      />
                    </span>
                  </div>

                  <div className="col-12 mt-2">
                    <label htmlFor="notes" className="form-label">
                      Notes (optional)
                    </label>
                    <textarea
                      id="notes"
                      className="form-control py-2 sector-wise"
                      placeholder="Add a short note..."
                      name="notes"
                      value={notes}
                      onChange={onInputChange}
                      style={{ height: "60px" }}
                    ></textarea>
                  </div>
                </div>

                <div className="col-md-6 mt-3 d-flex flex-column">
                  <div>
                    <button type="submit" className="btn btn-update mb-2">
                      Update
                    </button>
                  </div>

                  <Link className="text-success" to="/admin/agents">
                    Back
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="bottom-right" autoClose={1500} />
    </main>
  );
}

export default AgentsEdit;
