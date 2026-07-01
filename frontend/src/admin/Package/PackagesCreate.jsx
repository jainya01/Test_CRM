import { useEffect, useState } from "react";
import "../../App.css";
import { authHeader } from "../../utils/authHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function PackagesCreate() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [search, setSearch] = useState("");
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  const [packages, setPackages] = useState({
    package_name: "",
    price: "",
    start_date: "",
    end_date: "",
    service: "",
    notes: "",
  });

  const { package_name, price, start_date, end_date, service, notes } =
    packages;

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    if (!package_name.trim()) {
      newErrors.package_name = "Package name is required";
    }

    if (!price.trim()) {
      newErrors.price = "Price is required";
    }

    if (!start_date.trim()) {
      newErrors.start_date = "Start Date is required";
    }

    if (!end_date.trim()) {
      newErrors.end_date = "End Date is required";
    }

    if (!service) {
      newErrors.service = "Service is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async () => {
    const isValid = validateForm();
    if (!isValid) return;

    try {
      await axios.post(`${API_URL}/`, packages, {
        headers: authHeader(),
      });

      toast.success("Package created successfully");

      setTimeout(() => {
        navigate("/admin/packages");
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add package");
    }
  };

  const onInputChange = (e) => {
    setPackages({
      ...packages,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const allData = async () => {
      try {
        const [serviceRes] = await Promise.allSettled([
          axios.get(`${API_URL}/allservices`, { headers: authHeader }),
        ]);

        if (serviceRes.status === "fulfilled") {
          setServices(serviceRes.value.data.result);
        }
      } catch (error) {
        console.error("error", error);
      }
    };
    allData();
  }, [API_URL]);

  return (
    <>
      <title>Create New Package | Travel CRM Portal</title>
      <meta
        name="description"
        content="Create and manage Hajj, Umrah, Ticket, and Medical Visa packages. Add details, pricing, duration, availability, inclusions, and booking info in the Travel CRM Portal."
      />

      <main className="content-wrapper">
        <div className="container-fluid border-bottom bg-light pb-2 pt-md-2 pb-lg-1 top-searchbar">
          <div className="row align-items-center">
            <div className="col-10 col-md-11">
              <div className="row align-items-center">
                <div className="col-9 col-md-8 col-lg-6">
                  <input
                    type="search"
                    className="form-control sector-wise"
                    placeholder="Search by package name"
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
                Create New Package
              </div>

              <div className="card-body">
                <form action={handleFormSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label" htmlFor="package_name">
                        Package Name{" "}
                        <span className="text-danger fw-bolder">*</span>
                      </label>
                      <input
                        type="text"
                        id="package_name"
                        className="form-control sector-wise mb-1"
                        placeholder="Enter package name"
                        name="package_name"
                        value={package_name}
                        onChange={onInputChange}
                        required
                      />
                      {errors.package_name && (
                        <small className="text-danger mt-1">
                          {errors.package_name}
                        </small>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label" htmlFor="price">
                        Price <span className="text-danger fw-bolder">*</span>
                      </label>
                      <input
                        type="tel"
                        id="price"
                        className="form-control sector-wise mb-1"
                        placeholder="Enter price (e.g. INR 1850k)"
                        name="price"
                        value={price}
                        onChange={onInputChange}
                        required
                      />
                      {errors.price && (
                        <small className="text-danger mt-1">
                          {errors.price}
                        </small>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label" htmlFor="start_date">
                        Start Date{" "}
                        <span className="text-danger fw-bolder">*</span>
                      </label>
                      <input
                        type="date"
                        id="start_date"
                        className="form-control sector-wise mb-1"
                        name="start_date"
                        value={start_date}
                        onChange={onInputChange}
                        required
                      />
                      {errors.start_date && (
                        <small className="text-danger mt-1">
                          {errors.start_date}
                        </small>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label" htmlFor="end_date">
                        End Date{" "}
                        <span className="text-danger fw-bolder">*</span>
                      </label>
                      <input
                        type="date"
                        id="end_date"
                        className="form-control sector-wise"
                        name="end_date"
                        value={end_date}
                        onChange={onInputChange}
                        required
                      />
                      {errors.end_date && (
                        <small className="text-danger mt-1">
                          {errors.end_date}
                        </small>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label" htmlFor="service">
                        Service <span className="text-danger fw-bolder">*</span>
                      </label>
                      <select
                        className="form-select sector-wise mb-1"
                        aria-label="Select service"
                      >
                        <option value="">All services</option>
                        {Array.isArray(services) && services.length > 0 ? (
                          services
                            .filter((item) => item.status === "Active")
                            .map((item) => (
                              <option key={item.id} value={item.service_name}>
                                {item.service_name}
                              </option>
                            ))
                        ) : (
                          <option value="">No services available</option>
                        )}
                      </select>

                      {errors.service && (
                        <small className="text-danger mt-1">
                          {errors.service}
                        </small>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label" htmlFor="package_name">
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

                  <div className="col-md-6 d-flex flex-column">
                    <div>
                      <button type="submit" className="btn btn-update mb-2">
                        Submit
                      </button>
                    </div>

                    <Link className="text-success" to="/admin/packages">
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
    </>
  );
}

export default PackagesCreate;
