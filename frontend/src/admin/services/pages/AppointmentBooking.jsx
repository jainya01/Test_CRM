import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { authHeader } from "../../../utils/authHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBell,
  faEdit,
  faTrash,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function AppointmentBooking() {
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
    appointment_type: "",
    status: "",
    date: "",
    time: "",
  });

  const { applicant_name, passport_no, appointment_type, status, date, time } =
    formData;

  const [, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    if (!applicant_name.trim()) {
      newErrors.applicant_name = "Applicant Name is required";
    }

    if (!passport_no.trim()) {
      newErrors.passport_no = "Passport No is required";
    }

    if (!appointment_type.trim()) {
      newErrors.appointment_type = "Appointment Type is required";
    }

    if (!status.trim()) {
      newErrors.status = "Status is required";
    }

    if (!date.trim()) {
      newErrors.date = "Date is required";
    }

    if (!time.trim()) {
      newErrors.time = "Time is required";
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
          `${API_URL}/appointmentedit/${reschedule.id}`,
          formData,
        );
      } else {
        response = await axios.post(`${API_URL}/postbooking`, formData);
      }

      toast.success(
        response.data.message ||
          (reschedule.isEdit
            ? "Appointment updated successfully"
            : "Appointment created successfully"),
      );

      await bookingData();

      setTimeout(() => {
        setFormData({
          applicant_name: "",
          passport_no: "",
          appointment_type: "",
          status: "",
          date: "",
          time: "",
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

  const [booking, setBooking] = useState([]);

  const bookingData = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/allappointment`);
      setBooking(response.data.result || []);
    } catch (error) {
      console.error(error);
    }
  }, [API_URL]);

  useEffect(() => {
    bookingData();
  }, [bookingData]);

  const activeTableData = useMemo(() => {
    let filtered = booking;

    switch (activeCard) {
      case 2:
        filtered = filtered.filter(
          (item) => item.appointment_type === "NFS Appointment",
        );
        break;

      case 3:
        filtered = filtered.filter(
          (item) => item.appointment_type === "Takamul Appointment",
        );
        break;

      case 4:
        filtered = filtered.filter(
          (item) => item.appointment_type === "VFS Appointment",
        );
        break;

      case 5:
        filtered = filtered.filter(
          (item) => item.appointment_type === "TASHEER Appointment",
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
  }, [booking, activeCard, search]);

  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(activeTableData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return activeTableData.slice(start, start + itemsPerPage);
  }, [activeTableData, currentPage]);

  const allAttestations = booking;

  const nfs = booking.filter(
    (item) => item.appointment_type === "NFS Appointment",
  );

  const takamul = booking.filter(
    (item) => item.appointment_type === "Takamul Appointment",
  );

  const VFS = booking.filter(
    (item) => item.appointment_type === "VFS Appointment",
  );

  const tasheer = booking.filter(
    (item) => item.appointment_type === "TASHEER Appointment",
  );

  const deleteData = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/appointmentdelete/${id}`, {
        headers: authHeader(),
      });

      setBooking((prev) => prev.filter((item) => item.id !== id));
      toast.success("Service deleted successfully");
    } catch (error) {
      console.error("error", error);
      toast.error("Failed to delete service");
    }
  };

  const editAppointment = (item) => {
    setFormData({
      applicant_name: item.applicant_name,
      passport_no: item.passport_no,
      appointment_type: item.appointment_type,
      status: item.status,
      date: item.date,
      time: item.time,
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
                Appointment Booking
              </h5>
              <p className="text-muted overview-lead fw-bold">
                Book and track appointments by portal
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
                  isEdit: false,
                  id: null,
                }))
              }
            >
              + New Appointment
            </Link>
          </div>
        </div>

        {reschedule.open && (
          <>
            <div className="modal-overlay">
              <div
                className="reschedule-modal reschedule-modal1 text-dark"
                ref={scheduleRef}
              >
                <div className="d-flex justify-content-between">
                  <h5>
                    {reschedule.isEdit ? "Edit Appointment" : "New Appointment"}
                  </h5>
                  <div>
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
                </div>

                <form onSubmit={handleFormSubmit}>
                  <div className="row mt-3">
                    <div className="col-md-6 mb-1">
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

                    <div className="col-md-6 mb-1">
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

                    <div className="col-md-6 mb-1">
                      <label className="form-label">
                        Appointment Type{" "}
                        <span className="text-danger fw-bold">*</span>
                      </label>
                      <select
                        className="form-select sector-wise"
                        name="appointment_type"
                        value={appointment_type}
                        onChange={onInputChange}
                        required
                      >
                        <option value="" hidden>
                          Select Type
                        </option>
                        <option value="NFS Appointment">NFS Appointment</option>
                        <option value="Takamul Appointment">
                          Takamul Appointment
                        </option>
                        <option value="VFS Appointment">VFS Appointment</option>
                        <option value="TASHEER Appointment">
                          TASHEER Appointment
                        </option>
                      </select>
                    </div>

                    <div className="col-md-6 mb-1">
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
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Booked">Booked</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Rescheduled">Rescheduled</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>

                    <div className="col-md-6 mb-1">
                      <label className="form-label">
                        Date <span className="text-danger fw-bold">*</span>
                      </label>
                      <input
                        type="date"
                        className="form-control sector-wise"
                        name="date"
                        value={date}
                        onChange={onInputChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-1">
                      <label className="form-label">
                        Time <span className="text-danger fw-bold">*</span>
                      </label>
                      <input
                        type="time"
                        className="form-control sector-wise"
                        name="time"
                        value={time}
                        onChange={onInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="d-flex justify-content-end gap-2">
                    <button
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

                    <button className="btn btn-update" type="submit">
                      {reschedule.isEdit
                        ? "Update Appointment"
                        : "Create Appointment"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}

        <div className="row g-2 mb-2">
          <div className="col-lg-3 col-sm-6 col-md-6 col-12">
            <div
              className={`border pointer-cursor rounded-4 px-3 py-2 h-100 custom-otb ${
                activeCard === 1 ? "active" : ""
              }`}
              onClick={() => {
                setActiveCard(1);
                setTableTitle("All Appointments");
              }}
            >
              <div className="d-flex flex-column">
                <span className="locations-span">All Types</span>
                <span className="mt-2">{allAttestations.length}</span>
                <span className="requests-span">appointments</span>
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
                setTableTitle("NFS Appointment");
              }}
            >
              <div className="d-flex flex-column">
                <span className="locations-span">NFS Appointment</span>
                <span className="mt-2">{nfs.length}</span>
                <span className="requests-span">appointments</span>
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
                setTableTitle("Takamul Appointment");
              }}
            >
              <div className="d-flex flex-column">
                <span className="locations-span">Takamul Appointment</span>
                <span className="mt-2">{takamul.length}</span>
                <span className="requests-span">appointments</span>
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
                setTableTitle("VFS Appointment");
              }}
            >
              <div className="d-flex flex-column">
                <span className="locations-span">VFS Appointment</span>
                <span className="mt-2">{VFS.length}</span>
                <span className="requests-span">appointments</span>
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
                setTableTitle("TASHEER Appointment");
              }}
            >
              <div className="d-flex flex-column">
                <span className="locations-span">TASHEER Appointment</span>
                <span className="mt-2">{tasheer.length}</span>
                <span className="requests-span">appointments</span>
              </div>
            </div>
          </div>
        </div>

        <div className="table-wrapper border p-0">
          <div className="d-flex justify-content-between align-items-center">
            <div className="py-3 px-2 fw-medium">{tableTitle}</div>
            <div className="me-3 bg-counter border rounded-pill">
              {paginatedData.length}
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
                    <tr key={index}>
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
                        {item.appointment_type || "N/A"}
                      </td>
                      <td className="short-name">{item.date || "N/A"}</td>

                      <td
                        className={
                          ["Booked", "Completed", "Confirmed"].includes(
                            item.status,
                          )
                            ? "convert-no"
                            : "convert-call"
                        }
                      >
                        <div className="d-flex align-items-center">
                          <div
                            className={`status-dot me-1 ${
                              item.status === "Approved" ? "custom-success" : ""
                            }`}
                          />

                          <span className="status-span">
                            {item.status || "N/A"}
                          </span>
                        </div>
                      </td>

                      <td className="text-start">
                        <Link
                          title="Edit"
                          className="d-inline-flex align--center justify-content-center border-0 bg-transparent"
                        >
                          <FontAwesomeIcon
                            icon={faEdit}
                            className="p-1 icons-color"
                            onClick={() => editAppointment(item)}
                          />
                        </Link>

                        <span
                          type="button"
                          title="Delete"
                          onClick={() => deleteData(item.id)}
                          className="d-inline-flex align-items-center justify-content-center border-0 bg-transparent"
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="p-1 icons-color1"
                          />
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center text-muted">
                      No requests yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {activeTableData.length > itemsPerPage && (
              <div className="d-flex justify-content-center align-items-center flex-wrap mt-3 mb-3 gap-2">
                <button
                  className={`btn rounded-pill px-3 py-1 shadow-sm ${
                    currentPage <= 1
                      ? "btn-light border text-muted"
                      : "btn-success border-0"
                  }`}
                  disabled={currentPage <= 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                >
                  ← Prev
                </button>

                <span className="fw-semibold px-2">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  className={`btn rounded-pill px-3 py-1 shadow-sm ${
                    currentPage >= totalPages
                      ? "btn-light border text-muted"
                      : "btn-success border-0"
                  }`}
                  disabled={currentPage >= totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
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

export default AppointmentBooking;
