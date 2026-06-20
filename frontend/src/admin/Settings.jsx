import { useEffect, useState } from "react";
import "../App.css";
import { authHeader } from "../utils/authHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faTrash,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Settings() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const { fullname, email, password } = formData;

  const validateForm = () => {
    let newErrors = {};

    if (!fullname.trim()) {
      newErrors.name = "Full Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleAdminEmailSubmit = async () => {
    if (!validateForm()) return;

    try {
      const res = await axios.post(`${API_URL}/adminpost`, formData, {
        headers: authHeader(),
      });

      const newAdmin = {
        id: res.data.insertedId,
        fullname: formData.fullname,
        email: formData.email,
      };

      setAdminEmail((prev) => [newAdmin, ...prev]);
      setFormData({
        fullname: "",
        email: "",
        password: "",
      });

      setErrors({});
      toast.success("Admin added successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add admin");
    }
  };

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [adminEmail, setAdminEmail] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  useEffect(() => {
    const allData = async () => {
      try {
        const response = await axios.get(`${API_URL}/alladmindata`, {
          headers: authHeader(),
        });

        setAdminEmail(response.data.result);
      } catch (error) {
        console.error("error", error);

        if (error.response?.status === 401) {
          toast.error("Unauthorized access. Please login again.");
        }
      }
    };

    allData();
  }, [API_URL]);

  const deleteData = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this admin?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/admindelete/${id}`, {
        headers: authHeader(),
      });
      setAdminEmail((prev) => prev.filter((item) => item.id !== id));
      toast.success("Admin deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete admin");
    }
  };

  const [selectedAdmin, setSelectedAdmin] = useState("");

  const [updateForm, setUpdateForm] = useState({
    email: "",
    password: "",
  });

  const handleSelectAdmin = (e) => {
    const id = e.target.value;
    setSelectedAdmin(id);

    const admin = adminEmail.find((item) => item.id == id);

    if (admin) {
      setUpdateForm({
        email: admin.email,
        password: "",
      });
    } else {
      setUpdateForm({
        email: "",
        password: "",
      });
    }
  };

  const handleAdminUpdate = async () => {
    try {
      await axios.put(`${API_URL}/adminupdate/${selectedAdmin}`, updateForm, {
        headers: authHeader(),
      });

      setAdminEmail((prev) =>
        prev.map((admin) =>
          admin.id == selectedAdmin
            ? {
                ...admin,
                email: updateForm.email,
              }
            : admin,
        ),
      );

      toast.success("Admin credentials updated successfully");
      setUpdateForm({
        email: "",
        password: "",
      });

      setSelectedAdmin("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  const handleUpdateChange = (e) => {
    setUpdateForm({
      ...updateForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancelled = (e) => {
    e.preventDefault();

    setFormData({
      fullname: "",
      email: "",
      password: "",
    });
  };

  const handleCancelled1 = (e) => {
    e.preventDefault();
    setSelectedAdmin("");
    setUpdateForm({
      email: "",
      password: "",
    });
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

      <div className="row mt-1 gx-2 ms-2 me-2 gy-2">
        <div className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex flex-column">
          <div className="card rounded-2 h-100">
            <div className="px-2 py-2 mt-2">Add New Admin</div>
            <div className="card-body p-2">
              <form action={handleAdminEmailSubmit}>
                <div className="mb-2">
                  <label
                    htmlFor="name-input"
                    className="form-label small fw-medium mb-1"
                  >
                    Admin Name
                  </label>
                  <input
                    type="text"
                    id="name-input"
                    className="form-control sector-wise"
                    placeholder="Full Name"
                    name="fullname"
                    value={formData.fullname}
                    autoComplete="name"
                    onChange={onInputChange}
                    required
                  />
                  {errors.fullname && (
                    <span className="text-danger error-font">
                      {errors.fullname}
                    </span>
                  )}
                </div>

                <div className="mb-0">
                  <label
                    htmlFor="email-input"
                    className="form-label small fw-medium mb-1"
                  >
                    Admin email
                  </label>
                  <input
                    id="email-input"
                    className="form-control sector-wise"
                    type="email"
                    placeholder="admin@company.com"
                    name="email"
                    value={formData.email}
                    autoComplete="email"
                    onChange={onInputChange}
                    required
                  />
                  {errors.email && (
                    <span className="text-danger error-font">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="mb-2" style={{ position: "relative" }}>
                  <label
                    htmlFor="password_input"
                    className="form-label small fw-medium mt-2 mb-1"
                  >
                    Password
                  </label>
                  <input
                    type={showPassword1 ? "text" : "password"}
                    id="password_input"
                    className="form-control sector-wise"
                    placeholder="Create Password"
                    name="password"
                    value={formData.password}
                    autoComplete="new-password"
                    onChange={onInputChange}
                    required
                  />
                  {errors.password && (
                    <span className="text-danger error-font">
                      {errors.password}
                    </span>
                  )}

                  <FontAwesomeIcon
                    icon={showPassword1 ? faEyeSlash : faEye}
                    className="eye-hover mt-3 pt-1"
                    onClick={() => setShowPassword1(!showPassword1)}
                  />
                </div>

                <div className="d-flex gap-2 justify-content-end">
                  <button
                    type="button"
                    className="btn btn-sm border text-dark"
                    onClick={handleCancelled}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn btn-sm btn-outline-success px-2"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex flex-column">
          <div className="card rounded-2 h-100">
            <div className="px-2 py-2 mt-2">Change Password</div>
            <div className="card-body p-2">
              <form action={handleAdminUpdate}>
                <div className="mb-2">
                  <select
                    className="form-select sector-wise"
                    aria-label="Select admin"
                    value={selectedAdmin}
                    onChange={handleSelectAdmin}
                  >
                    <option value="">Choose a Admin</option>
                    {Array.isArray(adminEmail) && adminEmail.length > 0 ? (
                      adminEmail.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.email}
                        </option>
                      ))
                    ) : (
                      <option disabled>No email admins found</option>
                    )}
                  </select>
                </div>

                <div className="mb-2">
                  <input
                    id="email"
                    type="email"
                    aria-label="New Email"
                    className="form-control sector-wise"
                    placeholder="New Email"
                    name="email"
                    value={updateForm.email}
                    onChange={handleUpdateChange}
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="mb-2" style={{ position: "relative" }}>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    aria-label="New Password"
                    className="form-control sector-wise"
                    placeholder="New Password"
                    name="password"
                    value={updateForm.password}
                    onChange={handleUpdateChange}
                    autoComplete="new-password"
                    required
                  />

                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    className="eye-hover"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </div>

                <div className="d-flex gap-2 mt-3 justify-content-start">
                  <button
                    type="submit"
                    className="btn btn-sm btn-outline-success px-2"
                  >
                    Update
                  </button>

                  <button
                    type="button"
                    className="btn btn-sm border text-dark"
                    onClick={handleCancelled1}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-1 gx-2 ms-2 me-2 gy-2">
        <div className="col-12 col-lg-6 mt-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="mb-0 fw-semibold">Admin Account</h6>
          </div>

          {Array.isArray(adminEmail) && adminEmail.length > 0 ? (
            adminEmail.map((data, index) => (
              <div key={index} className="card mb-2 border shadow-sm">
                <div className="card-body py-3 px-3 d-flex justify-content-between align-items-center">
                  <div className="text-truncate me-3">
                    <div className="fw-medium accounts-email">{data.email}</div>
                  </div>

                  <div
                    className="delete-trash"
                    title="Admin Delete"
                    onClick={() => deleteData(data.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} className="icons-color1" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="alert alert-light border text-center small mb-0">
              No admin available
            </div>
          )}
        </div>
      </div>

      <ToastContainer position="bottom-right" autoClose={1500} />
    </main>
  );
}

export default Settings;
