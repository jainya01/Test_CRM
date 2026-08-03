import { useEffect, useState } from "react";
import "../../App.css";
import { authHeader } from "../../utils/authHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faEye,
  faEyeSlash,
  faArrowUpFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function AgentsEdit() {
  const API_URL = import.meta.env.VITE_API_URL;

  const { id } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [, setFileErrors] = useState({});

  const [agent, setAgent] = useState({
    fullname: "",
    phone: "",
    alternate_mobile_number: "",
    whatsapp_number: "",
    email: "",
    password: "",
    confirmPassword: "",
    status: "",
    notes: "",
    current_house_no: "",
    current_street: "",
    current_area: "",
    current_landmark: "",
    current_city: "",
    current_district: "",
    current_state: "",
    current_country: "",
    current_pincode: "",
    same_as_current_address: false,
    permanent_house_no: "",
    permanent_street: "",
    permanent_area: "",
    permanent_landmark: "",
    permanent_city: "",
    permanent_district: "",
    permanent_state: "",
    permanent_country: "",
    permanent_pincode: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    aadhaar_number: "",
    pan_number: "",
    passport_number: "",
    aadhaar_card: null,
    pan_card: null,
    passport_file: null,
    account_holder_name: "",
    bank_name: "",
    account_number: "",
    confirm_account_number: "",
    ifsc_code: "",
    branch_name: "",
    upi_id: "",
  });

  const {
    fullname,
    phone,
    alternate_mobile_number,
    whatsapp_number,
    email,
    password,
    confirmPassword,
    status,
    notes,
    current_house_no,
    current_street,
    current_area,
    current_landmark,
    current_city,
    current_district,
    current_state,
    current_country,
    current_pincode,
    same_as_current_address,
    permanent_house_no,
    permanent_street,
    permanent_area,
    permanent_landmark,
    permanent_city,
    permanent_district,
    permanent_state,
    permanent_country,
    permanent_pincode,
    facebook,
    instagram,
    linkedin,
    aadhaar_number,
    pan_number,
    passport_number,
    account_holder_name,
    bank_name,
    account_number,
    confirm_account_number,
    ifsc_code,
    branch_name,
    upi_id,
  } = agent;

  const [errors, setErrors] = useState({});

  const FILE_LIMITS = {
    aadhaar_card: 2 * 1024 * 1024,
    pan_card: 2 * 1024 * 1024,
    passport_file: 2 * 1024 * 1024,
  };

  const onFileChange = (e) => {
    const { name, files } = e.target;
    if (!files.length) return;
    const file = files[0];
    const maxSize = FILE_LIMITS[name] || 2 * 1024 * 1024;

    if (file.size > maxSize) {
      setFileErrors((prev) => ({
        ...prev,
        [name]: `Maximum file size is ${maxSize / (1024 * 1024)} MB.`,
      }));

      e.target.value = "";
      return;
    }

    setFileErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setAgent((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!fullname.trim()) {
      newErrors.fullname = "Full name is required";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!status) {
      newErrors.status = "Status is required";
    }

    if (!aadhaar_number.trim()) {
      newErrors.aadhaar_number = "Aadhaar number is required";
    }

    if (!pan_number.trim()) {
      newErrors.pan_number = "PAN number is required";
    }

    if (!account_holder_name.trim()) {
      newErrors.account_holder_name = "Account holder name is required";
    }

    if (!bank_name.trim()) {
      newErrors.bank_name = "Bank name is required";
    }

    if (!account_number.trim()) {
      newErrors.account_number = "Account number is required";
    }

    if (!confirm_account_number.trim()) {
      newErrors.confirm_account_number = "Confirm account number is required";
    }

    if (
      account_number &&
      confirm_account_number &&
      account_number !== confirm_account_number
    ) {
      newErrors.confirm_account_number =
        "Account number and confirm account number must be same";
    }

    if (!ifsc_code.trim()) {
      newErrors.ifsc_code = "IFSC code is required";
    }

    if (!branch_name.trim()) {
      newErrors.branch_name = "Branch name is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) return;
    const formData = new FormData();
    Object.keys(agent).forEach((key) => {
      if (
        key !== "aadhaar_card" &&
        key !== "pan_card" &&
        key !== "passport_file"
      ) {
        if (key === "password" && !agent.password) return;
        if (key === "confirmPassword") return;

        formData.append(key, agent[key]);
      }
    });

    if (agent.aadhaar_card instanceof File) {
      formData.append("aadhaar_card", agent.aadhaar_card);
    }

    if (agent.pan_card instanceof File) {
      formData.append("pan_card", agent.pan_card);
    }

    if (agent.passport_file instanceof File) {
      formData.append("passport_file", agent.passport_file);
    }

    try {
      await axios.put(`${API_URL}/agentsedit/${id}`, formData, {
        headers: {
          ...authHeader(),
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Agent updated successfully");
      setTimeout(() => {
        navigate("/admin/agents");
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update agent");
    }
  };

  const onInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAgent((prev) => {
      const updated = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      if (name === "account_number") {
        updated.confirm_account_number = "";
      }

      return updated;
    });

    if (name === "account_number" || name === "confirm_account_number") {
      setErrors((prev) => ({
        ...prev,
        confirm_account_number: "",
      }));
    }
  };

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await axios.get(`${API_URL}/someagents/${id}`, {
          headers: authHeader(),
        });

        const data = res.data?.result?.[0];
        setAgent({
          fullname: data?.fullname || "",
          phone: data?.phone || "",
          email: data?.email || "",
          password: "",
          confirmPassword: "",
          status: data?.status || "",
          notes: data?.notes || "",
          alternate_mobile_number: data?.alternate_mobile_number || "",
          whatsapp_number: data?.whatsapp_number || "",
          current_house_no: data?.current_house_no || "",
          current_street: data?.current_street || "",
          current_area: data?.current_area || "",
          current_landmark: data?.current_landmark || "",
          current_city: data?.current_city || "",
          current_district: data?.current_district || "",
          current_state: data?.current_state || "",
          current_country: data?.current_country || "",
          current_pincode: data?.current_pincode || "",
          same_as_current_address: Boolean(data?.same_as_current_address),
          permanent_house_no: data?.permanent_house_no || "",
          permanent_street: data?.permanent_street || "",
          permanent_area: data?.permanent_area || "",
          permanent_landmark: data?.permanent_landmark || "",
          permanent_city: data?.permanent_city || "",
          permanent_district: data?.permanent_district || "",
          permanent_state: data?.permanent_state || "",
          permanent_country: data?.permanent_country || "",
          facebook: data?.facebook || "",
          instagram: data?.instagram || "",
          linkedin: data?.linkedin || "",
          aadhaar_number: data?.aadhaar_number || "",
          pan_number: data?.pan_number || "",
          passport_number: data?.passport_number || "",
          account_holder_name: data?.account_holder_name || "",
          bank_name: data?.bank_name || "",
          account_number: data?.account_number || "",
          confirm_account_number: data?.account_number || "",
          ifsc_code: data?.ifsc_code || "",
          branch_name: data?.branch_name || "",
          upi_id: data?.upi_id || "",
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
    <>
      <title>Edit Agent | CRM Agent Portal</title>
      <meta
        name="description"
        content="Update agent profiles, manage accounts, modify contact details, change status, and maintain records in the CRM Agent Management Portal."
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
                    placeholder="Search by name & email"
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
                    <div className="stepper d-flex justify-content-evenly py-1 rounded mb-3">
                      <button
                        type="button"
                        className={`btn step-btn ${activeTab === "basic" ? "active" : ""}`}
                        onClick={() => setActiveTab("basic")}
                      >
                        Basic Info
                      </button>

                      <button
                        type="button"
                        className={`btn step-btn ${activeTab === "identity" ? "active" : ""}`}
                        onClick={() => setActiveTab("identity")}
                      >
                        Identity
                      </button>

                      <button
                        type="button"
                        className={`btn step-btn ${activeTab === "documents" ? "active" : ""}`}
                        onClick={() => setActiveTab("documents")}
                      >
                        Documents
                      </button>

                      <button
                        type="button"
                        className={`btn step-btn ${activeTab === "bank" ? "active" : ""}`}
                        onClick={() => setActiveTab("bank")}
                      >
                        Bank
                      </button>
                    </div>

                    {activeTab === "basic" && (
                      <>
                        <div className="col-md-6 mb-3">
                          <label className="form-label" htmlFor="fullname">
                            Full Name{" "}
                            <span className="text-danger fw-bold">*</span>
                          </label>

                          <input
                            type="text"
                            id="fullname"
                            className="form-control sector-wise mb-1"
                            placeholder="Enter full name"
                            name="fullname"
                            value={fullname || ""}
                            onChange={onInputChange}
                            autoComplete="name"
                            required
                          />

                          {errors.fullname && (
                            <small className="text-danger mt-1">
                              {errors.fullname}
                            </small>
                          )}
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label" htmlFor="mobile_number">
                            Mobile Number{" "}
                            <span className="text-danger fw-bold">*</span>
                          </label>

                          <input
                            type="tel"
                            id="mobile_number"
                            className="form-control sector-wise mb-1"
                            placeholder="Enter mobile number (e.g. 9876543210)"
                            name="phone"
                            value={phone ?? ""}
                            onChange={onInputChange}
                            autoComplete="tel"
                            required
                          />

                          {errors.phone && (
                            <small className="text-danger mt-1">
                              {errors.phone}
                            </small>
                          )}
                        </div>

                        <div className="col-md-6 mb-3">
                          <label
                            className="form-label"
                            htmlFor="alternate_number"
                          >
                            Alternate Mobile Number{" "}
                          </label>

                          <input
                            type="tel"
                            id="alternate_number"
                            className="form-control sector-wise mb-1"
                            placeholder="Enter alternate number (e.g. 9123456789)"
                            name="alternate_mobile_number"
                            value={alternate_mobile_number}
                            onChange={onInputChange}
                            required
                          />

                          {errors.phone && (
                            <small className="text-danger mt-1">
                              {errors.phone}
                            </small>
                          )}
                        </div>

                        <div className="col-md-6 mb-3">
                          <label
                            className="form-label"
                            htmlFor="whatsapp_number"
                          >
                            Whatsapp Number{" "}
                          </label>

                          <input
                            type="tel"
                            id="whatsapp_number"
                            className="form-control sector-wise mb-1"
                            placeholder="Enter whatsapp number (e.g. 9988776655)"
                            name="whatsapp_number"
                            value={whatsapp_number}
                            onChange={onInputChange}
                            required
                          />

                          {errors.phone && (
                            <small className="text-danger mt-1">
                              {errors.phone}
                            </small>
                          )}
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label" htmlFor="email">
                            Email <span className="text-danger fw-bold">*</span>
                          </label>

                          <input
                            type="email"
                            id="email"
                            className="form-control sector-wise mb-1"
                            placeholder="Enter email (e.g. user121@gmail.com)"
                            name="email"
                            value={email}
                            onChange={onInputChange}
                            required
                          />

                          {errors.email && (
                            <small className="text-danger mt-1">
                              {errors.email}
                            </small>
                          )}
                        </div>

                        <div
                          className="col-md-6 mb-3"
                          style={{ position: "relative" }}
                        >
                          <label className="form-label" htmlFor="password">
                            Password{" "}
                          </label>

                          <input
                            id="password"
                            type={showPassword ? "text" : "password"}
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

                        <div className="position-relative col-md-6">
                          <label
                            htmlFor="confirmPassword"
                            className="form-label"
                          >
                            Confirm Password
                          </label>

                          <input
                            type={showConfirmPassword ? "text" : "password"}
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
                            onClick={() =>
                              setShowConfirmPassword((prev) => !prev)
                            }
                          >
                            <FontAwesomeIcon
                              icon={showConfirmPassword ? faEyeSlash : faEye}
                              className="me-2"
                            />
                          </span>
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label" htmlFor="status">
                            Status{" "}
                            <span className="text-danger fw-bold">*</span>
                          </label>

                          <select
                            id="status"
                            className="form-select sector-wise mb-1"
                            name="status"
                            value={status}
                            onChange={onInputChange}
                            required
                          >
                            <option value="" hidden>
                              Select Status
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

                        <div className="col-12 mb-3">
                          <label className="form-label" htmlFor="notes">
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

                        <div className="col-12">
                          <h5 className="fw-bold">
                            Address Details (Optional)
                          </h5>
                          <hr />
                        </div>

                        <div className="col-12 mb-2">
                          <h6 className="fw-semibold text-dark">
                            Current Address
                          </h6>
                        </div>

                        <div className="col-md-4 mb-2">
                          <label
                            className="form-label"
                            htmlFor="current_house_no"
                          >
                            House No.
                          </label>
                          <input
                            type="text"
                            id="current_house_no"
                            className="form-control sector-wise"
                            placeholder="Enter house number"
                            name="current_house_no"
                            value={current_house_no}
                            onChange={onInputChange}
                          />
                        </div>

                        <div className="col-md-4 mb-2">
                          <label
                            className="form-label"
                            htmlFor="current_street"
                          >
                            Street
                          </label>
                          <input
                            type="text"
                            id="current_street"
                            className="form-control sector-wise"
                            placeholder="Enter street name"
                            name="current_street"
                            value={current_street}
                            onChange={onInputChange}
                          />
                        </div>

                        <div className="col-md-4 mb-2">
                          <label className="form-label" htmlFor="current_area">
                            Area
                          </label>
                          <input
                            type="text"
                            id="current_area"
                            className="form-control sector-wise"
                            placeholder="Enter area"
                            name="current_area"
                            value={current_area}
                            onChange={onInputChange}
                          />
                        </div>

                        <div className="col-md-4 mb-2">
                          <label
                            className="form-label"
                            htmlFor="current_landmark"
                          >
                            Landmark
                          </label>
                          <input
                            type="text"
                            id="current_landmark"
                            className="form-control sector-wise"
                            placeholder="Enter nearby landmark"
                            name="current_landmark"
                            value={current_landmark}
                            onChange={onInputChange}
                          />
                        </div>

                        <div className="col-md-4 mb-2">
                          <label className="form-label" htmlFor="current_city">
                            City
                          </label>
                          <input
                            type="text"
                            id="current_city"
                            className="form-control sector-wise"
                            placeholder="Enter city"
                            name="current_city"
                            value={current_city}
                            onChange={onInputChange}
                          />
                        </div>

                        <div className="col-md-4 mb-2">
                          <label
                            className="form-label"
                            htmlFor="current_district"
                          >
                            District
                          </label>
                          <input
                            type="text"
                            id="current_district"
                            className="form-control sector-wise"
                            placeholder="Enter district"
                            name="current_district"
                            value={current_district}
                            onChange={onInputChange}
                          />
                        </div>

                        <div className="col-md-4 mb-2">
                          <label className="form-label" htmlFor="current_state">
                            State
                          </label>
                          <input
                            type="text"
                            id="current_state"
                            className="form-control sector-wise"
                            placeholder="Enter state"
                            name="current_state"
                            value={current_state}
                            onChange={onInputChange}
                          />
                        </div>

                        <div className="col-md-4 mb-2">
                          <label
                            className="form-label"
                            htmlFor="current_country"
                          >
                            Country
                          </label>
                          <input
                            type="text"
                            id="current_country"
                            className="form-control sector-wise"
                            placeholder="Enter country"
                            name="current_country"
                            value={current_country}
                            onChange={onInputChange}
                          />
                        </div>

                        <div className="col-md-4 mb-2">
                          <label
                            className="form-label"
                            htmlFor="current_pincode"
                          >
                            Pincode
                          </label>
                          <input
                            type="text"
                            id="current_pincode"
                            className="form-control sector-wise"
                            placeholder="Enter pincode"
                            name="current_pincode"
                            value={current_pincode}
                            onChange={onInputChange}
                            maxLength={6}
                          />
                        </div>

                        <div className="col-12">
                          <h6 className="fw-semibold text-dark">
                            Permanent Address
                          </h6>
                        </div>

                        <div className="col-12 mb-2">
                          <div className="form-check">
                            <input
                              className="form-check-input custom-input"
                              type="checkbox"
                              id="same_as_current_address"
                              name="same_as_current_address"
                              checked={same_as_current_address}
                              onChange={onInputChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="same_as_current_address"
                            >
                              Same as Current Address
                            </label>
                          </div>
                        </div>

                        <div className="col-md-4 mb-2">
                          <label
                            className="form-label"
                            htmlFor="permanent_house_no"
                          >
                            House No.
                          </label>
                          <input
                            type="text"
                            id="permanentHouseNo"
                            className="form-control sector-wise"
                            placeholder="Enter house number"
                            name="permanent_house_no"
                            value={permanent_house_no}
                            onChange={onInputChange}
                            disabled={same_as_current_address}
                          />
                        </div>

                        <div className="col-md-4 mb-2">
                          <label
                            className="form-label"
                            htmlFor="permanent_street"
                          >
                            Street
                          </label>
                          <input
                            type="text"
                            id="permanentStreet"
                            className="form-control sector-wise"
                            placeholder="Enter street name"
                            name="permanent_street"
                            value={permanent_street}
                            onChange={onInputChange}
                            disabled={same_as_current_address}
                          />
                        </div>

                        <div className="col-md-4 mb-2">
                          <label
                            className="form-label"
                            htmlFor="permanent_area"
                          >
                            Area
                          </label>
                          <input
                            type="text"
                            id="permanent_area"
                            className="form-control sector-wise"
                            placeholder="Enter area"
                            name="permanent_area"
                            value={permanent_area}
                            onChange={onInputChange}
                            disabled={same_as_current_address}
                          />
                        </div>

                        <div className="col-md-4 mb-2">
                          <label
                            className="form-label"
                            htmlFor="permanent_landmark"
                          >
                            Landmark
                          </label>
                          <input
                            type="text"
                            id="permanentLandmark"
                            className="form-control sector-wise"
                            placeholder="Enter nearby landmark"
                            name="permanent_landmark"
                            value={permanent_landmark}
                            onChange={onInputChange}
                            disabled={same_as_current_address}
                          />
                        </div>

                        <div className="col-md-4 mb-2">
                          <label
                            className="form-label"
                            htmlFor="permanent_city"
                          >
                            City
                          </label>
                          <input
                            type="text"
                            id="permanent_city"
                            className="form-control sector-wise"
                            placeholder="Enter city"
                            name="permanent_city"
                            value={permanent_city}
                            onChange={onInputChange}
                            disabled={same_as_current_address}
                          />
                        </div>

                        <div className="col-md-4 mb-2">
                          <label
                            className="form-label"
                            htmlFor="permanent_district"
                          >
                            District
                          </label>
                          <input
                            type="text"
                            id="permanent_district"
                            className="form-control sector-wise"
                            placeholder="Enter district"
                            name="permanent_district"
                            value={permanent_district}
                            onChange={onInputChange}
                            disabled={same_as_current_address}
                          />
                        </div>

                        <div className="col-md-4 mb-2">
                          <label
                            className="form-label"
                            htmlFor="permanent_state"
                          >
                            State
                          </label>
                          <input
                            type="text"
                            id="permanent_state"
                            className="form-control sector-wise"
                            placeholder="Enter state"
                            name="permanent_state"
                            value={permanent_state}
                            onChange={onInputChange}
                            disabled={same_as_current_address}
                          />
                        </div>

                        <div className="col-md-4 mb-2">
                          <label
                            className="form-label"
                            htmlFor="permanent_country"
                          >
                            Country
                          </label>
                          <input
                            type="text"
                            id="permanent_country"
                            className="form-control sector-wise"
                            placeholder="Enter country"
                            name="permanent_country"
                            value={permanent_country}
                            onChange={onInputChange}
                            disabled={same_as_current_address}
                          />
                        </div>

                        <div className="col-md-4 mb-2">
                          <label
                            className="form-label"
                            htmlFor="permanent_pincode"
                          >
                            Pincode
                          </label>
                          <input
                            type="text"
                            id="permanent_pincode"
                            className="form-control sector-wise"
                            placeholder="Enter pincode"
                            name="permanent_pincode"
                            value={permanent_pincode ?? ""}
                            onChange={onInputChange}
                            maxLength={6}
                            autoComplete="postal-code"
                            disabled={same_as_current_address}
                          />
                        </div>

                        <div className="col-12 mt-3">
                          <h5 className="fw-bold">
                            Social Profiles (Optional)
                          </h5>
                          <hr />
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label" htmlFor="facebook">
                            Facebook
                          </label>

                          <input
                            type="url"
                            id="facebook"
                            className="form-control sector-wise"
                            placeholder="https://facebook.com/johndoe"
                            name="facebook"
                            value={facebook}
                            onChange={onInputChange}
                          />
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label" htmlFor="instagram">
                            Instagram
                          </label>

                          <input
                            type="url"
                            id="instagram"
                            className="form-control sector-wise"
                            placeholder="https://instagram.com/johndoe"
                            name="instagram"
                            value={instagram}
                            onChange={onInputChange}
                          />
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label" htmlFor="linkedin">
                            LinkedIn
                          </label>

                          <input
                            type="url"
                            id="linkedin"
                            className="form-control sector-wise"
                            placeholder="https://linkedin.com/in/johndoe"
                            name="linkedin"
                            value={linkedin}
                            onChange={onInputChange}
                          />
                        </div>
                      </>
                    )}

                    {activeTab === "identity" && (
                      <>
                        {/* Aadhaar Number */}
                        <div className="col-md-6 mb-3">
                          <label
                            className="form-label"
                            htmlFor="aadhaar_number"
                          >
                            Aadhaar Number{" "}
                            <span className="text-danger fw-bold">*</span>
                          </label>

                          <input
                            type="text"
                            id="aadhaar_number"
                            className="form-control sector-wise mb-1"
                            placeholder="XXXX XXXX XXXX"
                            name="aadhaar_number"
                            value={aadhaar_number}
                            onChange={onInputChange}
                            maxLength={12}
                            required
                          />

                          {errors.aadhaar_number && (
                            <small className="text-danger">
                              {errors.aadhaar_number}
                            </small>
                          )}
                        </div>

                        {/* PAN Number */}
                        <div className="col-md-6 mb-3">
                          <label className="form-label" htmlFor="pan_number">
                            PAN Card Number{" "}
                            <span className="text-danger fw-bold">*</span>
                          </label>

                          <input
                            type="text"
                            id="pan_number"
                            className="form-control sector-wise mb-1 text-uppercase"
                            placeholder="ABCDE1234F"
                            name="pan_number"
                            value={pan_number}
                            onChange={onInputChange}
                            maxLength={10}
                            required
                          />

                          {errors.pan_number && (
                            <small className="text-danger">
                              {errors.pan_number}
                            </small>
                          )}
                        </div>

                        {/* Passport Number */}
                        <div className="col-md-6 mb-3">
                          <label
                            className="form-label"
                            htmlFor="passport_number"
                          >
                            Passport Number
                          </label>

                          <input
                            type="text"
                            id="passport_number"
                            className="form-control sector-wise mb-1 text-uppercase"
                            placeholder="E.g. A1234567"
                            name="passport_number"
                            value={passport_number}
                            onChange={onInputChange}
                            maxLength={8}
                          />

                          {errors.passport_number && (
                            <small className="text-danger">
                              {errors.passport_number}
                            </small>
                          )}
                        </div>
                      </>
                    )}

                    {activeTab === "documents" && (
                      <>
                        <h6 className="fw-bold mb-3">Identity Proofs</h6>

                        <div className="col-md-6 mb-3">
                          <label className="form-label">Aadhaar Card</label>

                          <div className="position-relative">
                            <input
                              type="file"
                              className="form-control sector-wise dotted-border pe-5"
                              name="aadhaar_card"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={onFileChange}
                            />

                            <FontAwesomeIcon
                              icon={faArrowUpFromBracket}
                              className="upload-icon"
                            />
                          </div>

                          <small className="text-muted d-block mt-1">
                            Maximum file size: <strong>2 MB</strong>. Allowed
                            formats: PDF, JPG, JPEG, PNG.
                          </small>
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label">PAN Card</label>

                          <div className="position-relative">
                            <input
                              type="file"
                              className="form-control sector-wise dotted-border pe-5"
                              name="pan_card"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={onFileChange}
                            />

                            <FontAwesomeIcon
                              icon={faArrowUpFromBracket}
                              className="upload-icon"
                            />
                          </div>

                          <small className="text-muted d-block mt-1">
                            Maximum file size: <strong>2 MB</strong>. Allowed
                            formats: PDF, JPG, JPEG, PNG.
                          </small>
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label">Passport</label>

                          <div className="position-relative">
                            <input
                              type="file"
                              className="form-control sector-wise dotted-border pe-5"
                              name="passport_file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={onFileChange}
                            />

                            <FontAwesomeIcon
                              icon={faArrowUpFromBracket}
                              className="upload-icon"
                            />
                          </div>

                          <small className="text-muted d-block mt-1">
                            Maximum file size: <strong>2 MB</strong>. Allowed
                            formats: PDF, JPG, JPEG, PNG.
                          </small>
                        </div>
                      </>
                    )}

                    {activeTab === "bank" && (
                      <>
                        <div className="col-md-6 mb-3">
                          <label
                            className="form-label"
                            htmlFor="account_holder_name"
                          >
                            Account Holder Name{" "}
                            <span className="text-danger fw-bold">*</span>
                          </label>

                          <input
                            type="text"
                            id="account_holder_name"
                            className="form-control sector-wise mb-1"
                            placeholder="Enter account holder name"
                            name="account_holder_name"
                            value={account_holder_name}
                            onChange={onInputChange}
                            required
                          />
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label" htmlFor="bank_name">
                            Bank Name{" "}
                            <span className="text-danger fw-bold">*</span>
                          </label>

                          <input
                            type="text"
                            id="bank_name"
                            className="form-control sector-wise mb-1"
                            placeholder="Enter bank name"
                            name="bank_name"
                            value={bank_name}
                            onChange={onInputChange}
                            required
                          />
                        </div>

                        <div className="col-md-6 mb-3">
                          <label
                            className="form-label"
                            htmlFor="account_number"
                          >
                            Account Number{" "}
                            <span className="text-danger fw-bold">*</span>
                          </label>

                          <input
                            type="text"
                            id="account_number"
                            className="form-control sector-wise mb-1"
                            placeholder="Enter account number"
                            name="account_number"
                            value={account_number}
                            onChange={onInputChange}
                            required
                          />
                        </div>

                        <div className="col-md-6 mb-3">
                          <label
                            className="form-label"
                            htmlFor="confirm_account_number"
                          >
                            Confirm Account Number{" "}
                            <span className="text-danger fw-bold">*</span>
                          </label>

                          <input
                            type="text"
                            id="confirm_account_number"
                            className="form-control sector-wise mb-1"
                            placeholder="Re-enter account number"
                            name="confirm_account_number"
                            value={confirm_account_number}
                            onChange={onInputChange}
                            required
                          />
                          {errors.confirm_account_number && (
                            <small className="text-danger mt-1">
                              {errors.confirm_account_number}
                            </small>
                          )}
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label" htmlFor="ifsc_code">
                            IFSC Code{" "}
                            <span className="text-danger fw-bold">*</span>
                          </label>

                          <input
                            type="text"
                            id="ifsc_code"
                            className="form-control sector-wise mb-1 text-uppercase"
                            placeholder="Enter IFSC code (e.g. SBIN0001234)"
                            name="ifsc_code"
                            value={ifsc_code}
                            onChange={onInputChange}
                            required
                          />
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label" htmlFor="branch_name">
                            Branch Name{" "}
                            <span className="text-danger fw-bold">*</span>
                          </label>

                          <input
                            type="text"
                            id="branch_name"
                            className="form-control sector-wise mb-1"
                            placeholder="Enter branch name"
                            name="branch_name"
                            value={branch_name}
                            onChange={onInputChange}
                            required
                          />
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label" htmlFor="upi_id">
                            UPI ID{" "}
                            <small className="text-muted">(Optional)</small>
                          </label>

                          <input
                            type="text"
                            id="upi_id"
                            className="form-control sector-wise mb-1"
                            placeholder="Enter UPI ID (e.g. amit@okhdfcbank)"
                            name="upi_id"
                            value={upi_id}
                            onChange={onInputChange}
                          />
                        </div>
                      </>
                    )}
                  </div>

                  <div className="col-md-6 d-flex flex-column">
                    <div>
                      <button
                        type="submit"
                        className="btn btn-success submit-btn mb-2"
                      >
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

        <ToastContainer position="bottom-right" autoClose={1000} />
      </main>
    </>
  );
}

export default AgentsEdit;
