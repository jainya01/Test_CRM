import { useRef, useState, useCallback, useEffect, useMemo } from "react";
import { authHeader } from "../../../utils/authHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBell,
  faTrash,
  faEdit,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Attestation() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [search, setSearch] = useState("");
  const [activeCard, setActiveCard] = useState(1);
  const [tableTitle, setTableTitle] = useState("All Appointments");
  const scheduleRef = useRef();

  const [reschedule, setReschedule] = useState({
    open: false,
    isEdit: false,
    id: null,
  });

  const [formData, setFormData] = useState({
    applicant_name: "",
    passport_no: "",
    attestation_type: "",
    submitted_date: "",
    status: "",
  });

  const {
    applicant_name,
    passport_no,
    attestation_type,
    submitted_date,
    status,
  } = formData;

  const [, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    if (!applicant_name.trim()) {
      newErrors.applicant_name = "Applicant Name is required";
    }

    if (!passport_no.trim()) {
      newErrors.passport_no = "Passport No is required";
    }

    if (!attestation_type.trim()) {
      newErrors.attestation_type = "Attestation Type is required";
    }

    if (!submitted_date.trim()) {
      newErrors.submitted_date = "Submitted Date is required";
    }

    if (!status.trim()) {
      newErrors.status = "Status is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) return;

    try {
      let response;

      if (reschedule.isEdit) {
        response = await axios.put(
          `${API_URL}/attestationedit/${reschedule.id}`,
          formData,
        );
      } else {
        response = await axios.post(`${API_URL}/postattestation`, formData);
      }

      toast.success(
        response.data.message ||
          (reschedule.isEdit
            ? "Attestation updated successfully"
            : "Attestation created successfully"),
      );

      await attestationData();

      setTimeout(() => {
        setFormData({
          applicant_name: "",
          passport_no: "",
          attestation_type: "",
          submitted_date: "",
          status: "",
        });

        setReschedule({
          open: false,
          isEdit: false,
          id: null,
        });
      }, 500);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [attestation, setAttestation] = useState([]);

  const attestationData = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/allattestation`);
      setAttestation(response.data.result || []);
    } catch (error) {
      console.error(error);
    }
  }, [API_URL]);

  useEffect(() => {
    attestationData();
  }, [attestationData]);

  const activeTableData = useMemo(() => {
    let filtered = attestation;

    switch (activeCard) {
      case 2:
        filtered = filtered.filter(
          (item) => item.attestation_type === "Degree Certificate",
        );
        break;

      case 3:
        filtered = filtered.filter(
          (item) => item.attestation_type === "Marriage Certificate",
        );
        break;

      case 4:
        filtered = filtered.filter(
          (item) => item.attestation_type === "Nikahnama",
        );
        break;

      case 5:
        filtered = filtered.filter(
          (item) => item.attestation_type === "Power of Attorney",
        );
        break;

      case 6:
        filtered = filtered.filter(
          (item) => item.attestation_type === "Birth Certificate",
        );
        break;

      case 7:
        filtered = filtered.filter(
          (item) => item.attestation_type === "Commercial Document",
        );
        break;

      default:
        break;
    }

    if (search.trim()) {
      filtered = filtered.filter(
        (item) =>
          item.applicant_name?.toLowerCase().includes(search.toLowerCase()) ||
          item.passport_no?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return filtered;
  }, [attestation, activeCard, search]);

  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(activeTableData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return activeTableData.slice(start, start + itemsPerPage);
  }, [activeTableData, currentPage]);

  const allAttestations = attestation;

  const degreeCertificate = attestation.filter(
    (item) => item.attestation_type === "Degree Certificate",
  );

  const marriageCertificate = attestation.filter(
    (item) => item.attestation_type === "Marriage Certificate",
  );

  const nikahnama = attestation.filter(
    (item) => item.attestation_type === "Nikahnama",
  );

  const powerOfAttorney = attestation.filter(
    (item) => item.attestation_type === "Power of Attorney",
  );

  const birthCertificate = attestation.filter(
    (item) => item.attestation_type === "Birth Certificate",
  );

  const commercialDocument = attestation.filter(
    (item) => item.attestation_type === "Commercial Document",
  );

  const deleteData = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this attestation?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/attestationdelete/${id}`, {
        headers: authHeader(),
      });

      setAttestation((prev) => prev.filter((item) => item.id !== id));
      toast.success("Attestation deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete attestation");
    }
  };

  const editAttestation = (item) => {
    setFormData({
      applicant_name: item.applicant_name,
      passport_no: item.passport_no,
      attestation_type: item.attestation_type,
      submitted_date: item.submitted_date,
      status: item.status,
    });

    setReschedule({
      open: true,
      isEdit: true,
      id: item.id,
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
                  placeholder="Search by applicant name & passport"
                  value={search}
                  onChange={(e) => setSearch(e.target.value.trim())}
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

      <div className="p-2 p-lg-3">
        <div className="d-flex justify-content-between flex-wrap">
          <div className="d-flex justify-content-between">
            <div className="mt-2 me-3">
              <Link className="text-dark" to="/admin/services">
                <FontAwesomeIcon icon={faArrowLeft} className="arrow-left" />
              </Link>
            </div>

            <div>
              <h5 className="fw-bold overview-dashboard mb-1">
                Document Attestation
              </h5>
              <p className="text-muted overview-lead fw-bold">
                Track attestation cases by document type
              </p>
            </div>
          </div>

          <div className="mb-4">
            <Link
              className="text-decoration-none btn new-leader text-nowrap"
              onClick={() =>
                setReschedule((prev) => ({
                  ...prev,
                  open: true,
                }))
              }
            >
              + New Attestation
            </Link>
          </div>
        </div>

        {reschedule.open && (
          <div className="modal-overlay">
            <div
              className="reschedule-modal reschedule-modal1 text-dark"
              ref={scheduleRef}
            >
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="fw-bold">
                  {reschedule.isEdit
                    ? "Edit Attestation Case"
                    : "New Attestation Case"}
                </h5>

                <FontAwesomeIcon
                  icon={faX}
                  className="pointer-cursor"
                  onClick={() =>
                    setReschedule((prev) => ({
                      ...prev,
                      open: false,
                    }))
                  }
                />
              </div>

              <form onSubmit={handleFormSubmit}>
                <div className="row mt-3">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Applicant Name{" "}
                      <span className="text-danger fw-bold">*</span>
                    </label>

                    <input
                      type="text"
                      className="form-control sector-wise"
                      placeholder="e.g. John Doe"
                      name="applicant_name"
                      value={applicant_name}
                      onChange={onInputChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Passport No.{" "}
                      <span className="text-danger fw-bold">*</span>
                    </label>

                    <input
                      type="text"
                      className="form-control sector-wise"
                      placeholder="e.g. A12345678"
                      name="passport_no"
                      value={passport_no}
                      onChange={onInputChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Attestation Type{" "}
                      <span className="text-danger fw-bold">*</span>
                    </label>

                    <select
                      className="form-select sector-wise"
                      name="attestation_type"
                      value={attestation_type}
                      onChange={onInputChange}
                      required
                    >
                      <option value="" hidden>
                        Select Type
                      </option>

                      <option value="Degree Certificate">
                        Degree Certificate
                      </option>

                      <option value="Marriage Certificate">
                        Marriage Certificate
                      </option>

                      <option value="Nikahnama">Nikahnama</option>

                      <option value="Power of Attorney">
                        Power of Attorney
                      </option>

                      <option value="Birth Certificate">
                        Birth Certificate
                      </option>

                      <option value="Commercial Document">
                        Commercial Document
                      </option>
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Submitted Date{" "}
                      <span className="text-danger fw-bold">*</span>
                    </label>

                    <input
                      type="date"
                      className="form-control sector-wise"
                      name="submitted_date"
                      value={submitted_date}
                      onChange={onInputChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Status <span className="text-danger fw-bold">*</span>
                    </label>

                    <select
                      className="form-select sector-wise"
                      name="status"
                      value={status}
                      onChange={onInputChange}
                      required
                    >
                      <option value="" hidden>
                        Select Status
                      </option>

                      <option value="Received">Received</option>
                      <option value="In Process">In Process</option>
                      <option value="Completed">Completed</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-transparent text-dark border rounded-3 cancel-schedule"
                    onClick={() =>
                      setReschedule((prev) => ({
                        ...prev,
                        open: false,
                      }))
                    }
                  >
                    Cancel
                  </button>

                  <button type="submit" className="btn btn-update">
                    {reschedule.isEdit ? "Update Case" : "Create Case"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="row g-2 mb-2">
          <div className="col-lg-3 col-sm-6 col-md-6 col-12">
            <div
              className={`border pointer-cursor rounded-4 px-3 py-2 h-100 custom-otb ${
                activeCard === 1 ? "active" : ""
              }`}
              onClick={() => {
                setActiveCard(1);
                setTableTitle("All Requests");
              }}
            >
              <div className="d-flex flex-column">
                <span className="locations-span">All Types</span>
                <span className="mt-2">{allAttestations.length}</span>
                <span className="requests-span">cases</span>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6 col-md-6 col-12">
            <div
              className={`border pointer-cursor rounded-4 px-3 py-2 h-100 custom-otb ${
                activeCard === 2 ? "active" : ""
              }`}
              onClick={() => {
                setActiveCard(2);
                setTableTitle("Degree Certificate Attestation");
              }}
            >
              <div className="d-flex flex-column">
                <span className="locations-span">Degree Certificate</span>
                <span className="mt-2">{degreeCertificate.length}</span>
                <span className="requests-span">cases</span>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6 col-md-6 col-12">
            <div
              className={`border pointer-cursor rounded-4 px-3 py-2 h-100 custom-otb ${
                activeCard === 3 ? "active" : ""
              }`}
              onClick={() => {
                setActiveCard(3);
                setTableTitle("Marriage Certificate Attestation");
              }}
            >
              <div className="d-flex flex-column">
                <span className="locations-span">Marriage Certificate</span>
                <span className="mt-2">{marriageCertificate.length}</span>
                <span className="requests-span">cases</span>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6 col-md-6 col-12">
            <div
              className={`border pointer-cursor rounded-4 px-3 py-2 h-100 custom-otb ${
                activeCard === 4 ? "active" : ""
              }`}
              onClick={() => {
                setActiveCard(4);
                setTableTitle("Nikahnama Attestation");
              }}
            >
              <div className="d-flex flex-column">
                <span className="locations-span">Nikahnama</span>
                <span className="mt-2">{nikahnama.length}</span>
                <span className="requests-span">cases</span>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6 col-md-6 col-12">
            <div
              className={`border pointer-cursor rounded-4 px-3 py-2 h-100 custom-otb ${
                activeCard === 5 ? "active" : ""
              }`}
              onClick={() => {
                setActiveCard(5);
                setTableTitle("Power of Attorney Attestation");
              }}
            >
              <div className="d-flex flex-column">
                <span className="locations-span">Power of Attorney</span>
                <span className="mt-2">{powerOfAttorney.length}</span>
                <span className="requests-span">cases</span>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6 col-md-6 col-12">
            <div
              className={`border pointer-cursor rounded-4 px-3 py-2 h-100 custom-otb ${
                activeCard === 6 ? "active" : ""
              }`}
              onClick={() => {
                setActiveCard(6);
                setTableTitle("Birth Certificate Attestation");
              }}
            >
              <div className="d-flex flex-column">
                <span className="locations-span">Birth Certificate</span>
                <span className="mt-2">{birthCertificate.length}</span>
                <span className="requests-span">cases</span>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6 col-md-6 col-12">
            <div
              className={`border pointer-cursor rounded-4 px-3 py-2 h-100 custom-otb ${
                activeCard === 7 ? "active" : ""
              }`}
              onClick={() => {
                setActiveCard(7);
                setTableTitle("Commercial Document Attestation");
              }}
            >
              <div className="d-flex flex-column">
                <span className="locations-span">Commercial Document</span>
                <span className="mt-2">{commercialDocument.length}</span>
                <span className="requests-span">cases</span>
              </div>
            </div>
          </div>
        </div>

        <div className="table-wrapper border p-0">
          <div className="d-flex justify-content-between align-items-center">
            <div className="py-3 px-2 fw-medium">{tableTitle}</div>
            <div className="me-3 bg-counter border rounded-pill">
              {activeTableData.length}
            </div>
          </div>

          <div className="table-responsive custom-scrollbar">
            <table className="table table-hover mb-0">
              <thead className="table-success header-table text-nowrap">
                <tr>
                  <th>#</th>
                  <th>Applicant</th>
                  <th>Passport</th>
                  <th>Type</th>
                  <th>Submitted</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((item, index) => (
                    <tr key={item.id}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>

                      <td>
                        <span className="short-name">
                          {item.applicant_name || "N/A"}
                        </span>
                      </td>

                      <td>
                        <span className="short-name">
                          {item.passport_no || "N/A"}
                        </span>
                      </td>

                      <td className="short-name">
                        {item.attestation_type || "N/A"}
                      </td>

                      <td className="short-name">
                        {item.submitted_date || "N/A"}
                      </td>

                      <td
                        className={
                          [
                            "Received",
                            "In Process",
                            "Completed",
                            "Delivered",
                          ].includes(item.status)
                            ? "convert-no"
                            : "convert-call"
                        }
                      >
                        <div className="d-flex align-items-center">
                          <div
                            className={`status-dot me-1 ${
                              item.status === "Completed" ||
                              item.status === "Delivered"
                                ? "custom-success"
                                : ""
                            }`}
                          />

                          <span className="status-span">
                            {item.status || "N/A"}
                          </span>
                        </div>
                      </td>

                      <td className="text-start">
                        <button
                          type="button"
                          title="Edit"
                          onClick={() => editAttestation(item)}
                          className="d-inline-flex align-items-center justify-content-center border-0 bg-transparent"
                        >
                          <FontAwesomeIcon
                            icon={faEdit}
                            className="p-1 icons-color"
                          />
                        </button>

                        <button
                          type="button"
                          title="Delete"
                          onClick={() => deleteData(item.id)}
                          className="d-inline-flex align-items-center justify-content-center border-0 bg-transparent"
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="p-1 icons-color1"
                          />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center text-muted">
                      No cases yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {activeTableData.length > itemsPerPage && (
              <div className="d-flex justify-content-center align-items-center gap-2 flex-wrap mt-3 mb-3">
                <button
                  className={`btn rounded-pill px-3 py-1 ${
                    currentPage === 1
                      ? "btn-light border text-muted"
                      : "btn-success border-0"
                  }`}
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  ← Prev
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    className={`btn rounded-circle ${
                      currentPage === index + 1
                        ? "btn-success"
                        : "btn-outline-secondary"
                    }`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  className={`btn rounded-pill px-3 py-1 ${
                    currentPage === totalPages
                      ? "btn-light border text-muted"
                      : "btn-success border-0"
                  }`}
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <ToastContainer position="bottom-right" autoClose={1000} />
    </main>
  );
}

export default Attestation;
