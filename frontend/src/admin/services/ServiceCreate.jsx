import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { authHeader } from "../../utils/authHeader";

function ServiceCreate() {
  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [errors, setErrors] = useState({});

  const [services, setServices] = useState({
    service_name: "",
    status: "",
    notes: "",
  });

  const { service_name, status, notes } = services;

  const validateForm = () => {
    let newErrors = {};

    if (!service_name.trim()) {
      newErrors.service_name = "Service name is required";
    }

    if (!status) {
      newErrors.status = "Status is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async () => {
    const isValid = validateForm();
    if (!isValid) return;

    try {
      await axios.post(`${API_URL}/servicepost`, services, {
        headers: authHeader(),
      });

      toast.success("service created successfully");

      setTimeout(() => {
        navigate("/admin/services");
      }, 1000);
    } catch (error) {
      console.error("error", error);
      toast.error("service post failed");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setServices((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
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
              Create New Services
            </div>

            <div className="card-body">
              <form action={handleFormSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="service_name" className="form-label">
                      Service Name
                      <span className="text-danger fw-bolder">*</span>
                    </label>
                    <input
                      type="text"
                      id="service_name"
                      className="form-control sector-wise mb-1"
                      placeholder="Enter service name"
                      name="service_name"
                      value={service_name}
                      onChange={handleChange}
                      required
                    />
                    {errors.service_name && (
                      <small className="text-danger mt-1">
                        {errors.service_name}
                      </small>
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
                      onChange={handleChange}
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

                  <div className="col-12 mb-3">
                    <label htmlFor="notes" className="form-label">
                      Notes (optional)
                    </label>
                    <textarea
                      id="notes"
                      className="form-control py-2 sector-wise"
                      placeholder="Add a short note..."
                      name="notes"
                      value={notes}
                      onChange={handleChange}
                      style={{ height: "60px" }}
                    ></textarea>
                  </div>
                </div>

                <div className="col-md-6 d-flex flex-column">
                  <div>
                    <button type="submit" className="btn btn-update mb-2">
                      Submit
                    </button>
                  </div>

                  <Link className="text-success" to="/admin/services">
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

export default ServiceCreate;
