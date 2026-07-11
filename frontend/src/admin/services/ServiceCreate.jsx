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
  const [errors, setErrors] = useState({});
  const [subCategory, setSubCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);

  const [services, setServices] = useState({
    service_name: "",
    sub_category: "",
    status: "",
    notes: "",
  });

  const { service_name, sub_category, status, notes } = services;

  const validateForm = () => {
    let newErrors = {};

    if (!service_name.trim()) {
      newErrors.service_name = "Service name is required";
    }

    if (!sub_category.trim()) {
      newErrors.sub_category = "Sub Category name is required";
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

  const addSubCategory = () => {
    const value = subCategory.trim();
    if (value && !subCategories.includes(value)) {
      const updated = [...subCategories, value];
      setSubCategories(updated);
      setServices((prev) => ({
        ...prev,
        sub_category: updated.join(","),
      }));
      setSubCategory("");
      console.log("After clearing");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSubCategory();
    }
  };

  const removeSubCategory = (index) => {
    const updatedSubCategories = subCategories.filter((_, i) => i !== index);
    setSubCategories(updatedSubCategories);
    setService((prev) => ({
      ...prev,
      sub_category: updatedSubCategories.join(","),
    }));
  };

  return (
    <>
      <title>Create Service | CRM Portal</title>
      <meta
        name="description"
        content="Create and manage services, configure details, organize categories, set status, and expand travel and business offerings in the CRM Portal."
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
                    placeholder="Search by service name"
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
                    <div className="col-md-6 mb-2">
                      <label htmlFor="service_name" className="form-label">
                        Service Name{" "}
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

                    <div className="col-md-6 mb-2">
                      <label className="form-label" htmlFor="sub_category">
                        Sub Category
                        <span className="text-danger fw-bold ms-1">*</span>
                      </label>

                      <div className="d-flex">
                        <input
                          type="text"
                          id="sub_category"
                          className="form-control sector-wise mb-1"
                          placeholder="Enter Sub Category"
                          value={subCategory}
                          onChange={(e) => setSubCategory(e.target.value)}
                          onKeyDown={handleKeyDown}
                        />
                      </div>
                      {errors.sub_category && (
                        <small className="text-danger mt-1">
                          {errors.sub_category}
                        </small>
                      )}

                      <div className="d-flex flex-row justify-content-between">
                        <div className="d-flex flex-row flex-wrap align-items-center">
                          {subCategories.map((item, index) => (
                            <div
                              key={index}
                              className="subcategory-crm border me-2 mb-2 px-2 py-1 rounded-pill d-inline-flex align-items-center"
                            >
                              <span>{item}</span>
                              <span
                                className="ms-2 subcategory-crm2"
                                onClick={() => removeSubCategory(index)}
                              >
                                ×
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="d-flex justify-content-end">
                          <button
                            type="button"
                            className="btn btn-success d-flex align-items-center rounded-5 ms-2"
                            style={{ height: "30px", fontSize: "14px" }}
                            onClick={addSubCategory}
                          >
                            Add
                          </button>
                        </div>
                      </div>
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
                        <option value="" hidden>
                          Select status
                        </option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>

                      {errors.status && (
                        <small className="text-danger mt-1">
                          {errors.status}
                        </small>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
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
    </>
  );
}

export default ServiceCreate;
