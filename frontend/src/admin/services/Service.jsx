import { useEffect, useMemo, useRef, useState } from "react";
import "../../App.css";
import { authHeader } from "../../utils/authHeader";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBell,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Service() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [search, setSearch] = useState("");
  const [services, setServices] = useState([]);

  useEffect(() => {
    const allData = async () => {
      try {
        const [serviceRes] = await Promise.allSettled([
          axios.get(`${API_URL}/allservices`, { headers: authHeader() }),
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

  const filteredServices = useMemo(() => {
    const keyword = search.toLowerCase().trim();
    return services.filter((item) =>
      item.service_name?.toLowerCase().includes(keyword),
    );
  }, [services, search]);

  const itemsPerPage = 14;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredServices.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const deleteData = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/servicedelete/${id}`, {
        headers: authHeader(),
      });

      setServices((prev) => prev.filter((item) => item.id !== id));
      toast.success("Service deleted successfully");
    } catch (error) {
      console.error("error", error);
      toast.error("Failed to delete service");
    }
  };

  const [selectedFilter, setSelectedFilter] = useState("halfYearly");
  const [months, setMonths] = useState("");
  const monthPillRef = useRef(null);
  const popoverRef = useRef(null);
  const [month, setMonth] = useState(false);
  const [popoverStyle, setPopoverStyle] = useState(null);
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");

  useEffect(() => {
    const updateMonth = () => {
      const now = new Date();
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      setMonths(monthNames[now.getMonth()]);
    };

    updateMonth();
    const interval = setInterval(updateMonth, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (monthPillRef.current?.contains(event.target)) return;
      if (popoverRef.current?.contains(event.target)) return;
      setMonth(false);
    }

    if (month) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [month]);

  function applyCustomRange() {
    if (!customFrom.trim() || !customTo.trim()) {
      alert("Please pick both From and To dates.");
      return;
    }

    const s = new Date(customFrom);
    const e = new Date(customTo);
    if (isNaN(s) || isNaN(e) || s > e) {
      alert("Invalid date range.");
      return;
    }
    setSelectedFilter("custom");
    setMonth(false);
    setPopoverStyle(null);
  }

  function toggleMonthPopover() {
    if (!month) {
      const pill = monthPillRef.current;
      if (pill) {
        const rect = pill.getBoundingClientRect();
        const desiredWidth = 300;
        const margin = 0;

        let left = rect.left;
        if (left + desiredWidth > window.innerWidth - margin) {
          left = window.innerWidth - desiredWidth - margin;
        }
        if (left < margin) left = margin;

        const top = rect.bottom + 8;
        setPopoverStyle({
          position: "fixed",
          left: `${left}px`,
          top: `${top}px`,
          width: `${desiredWidth}px`,
          maxHeight: "70vh",
          overflow: "auto",
          zIndex: 9999,
          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
          borderRadius: 6,
          background: "#00372c",
          color: "#fff",
          padding: "12px",
        });
      } else {
        setPopoverStyle({
          position: "fixed",
          right: 0,
          top: 120,
          width: "320px",
          maxHeight: "70vh",
          overflow: "auto",
          zIndex: 9999,
          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
          borderRadius: 6,
          background: "#fff",
          padding: "12px",
        });
      }
      setMonth(true);
    } else {
      setPopoverStyle(null);
      setMonth(false);
    }
  }

  function applyPresetFilter(filter) {
    setSelectedFilter(filter);
    setMonth(false);
    setPopoverStyle(null);
  }

  return (
    <>
      <title>Services Management | CRM Portal</title>
      <meta
        name="description"
        content="Manage CRM services, update offerings, monitor service status, organize categories, and streamline Hajj, Umrah, Ticket, and Medical services."
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
            <div>
              <h5 className="fw-bold overview-dashboard mb-1">Services</h5>
              <p className="text-muted overview-lead fw-bold">
                {paginatedData.length} services
              </p>
            </div>

            <div className="d-flex justify-content-end">
              <div className="d-flex justify-content-start me-2">
                <div
                  ref={monthPillRef}
                  className="month-pill d-flex align-items-center"
                  onClick={toggleMonthPopover}
                  style={{ cursor: "pointer" }}
                >
                  {months}
                </div>

                {month && (
                  <div
                    ref={popoverRef}
                    className="spending-card container"
                    style={popoverStyle}
                    aria-modal="true"
                    role="dialog"
                  >
                    <h5 className="leads-show fw-bold">Show Leads</h5>
                    <form
                      className="spending-form"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="performance"
                          id="halfYearly"
                          checked={selectedFilter === "halfYearly"}
                          aria-label="Half yearly"
                          onChange={() => applyPresetFilter("halfYearly")}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="halfYearly"
                        >
                          Half-yearly
                        </label>
                      </div>

                      <div className="form-check mt-1">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="performance"
                          id="yearly"
                          checked={selectedFilter === "yearly"}
                          aria-label="Yearly"
                          onChange={() => applyPresetFilter("yearly")}
                        />
                        <label className="form-check-label" htmlFor="yearly">
                          Yearly
                        </label>
                      </div>

                      <div className="form-check mt-1">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="performance"
                          id="custom"
                          checked={selectedFilter === "custom"}
                          aria-label="Custom range"
                          onChange={() => setSelectedFilter("custom")}
                        />
                        <label className="form-check-label" htmlFor="custom">
                          Custom range
                        </label>
                      </div>

                      {selectedFilter === "custom" && (
                        <div
                          className="custom-range-row"
                          style={{ marginTop: 8 }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 6,
                              alignItems: "start",
                            }}
                          >
                            <label>From</label>

                            <input
                              type="date"
                              className="form-control sector-wise"
                              value={customFrom}
                              onChange={(e) => setCustomFrom(e.target.value)}
                              aria-label="From date"
                            />
                            <label>To</label>
                            <input
                              type="date"
                              className="form-control sector-wise"
                              value={customTo}
                              onChange={(e) => setCustomTo(e.target.value)}
                              aria-label="To date"
                            />
                          </div>

                          <div className="mt-2">
                            <button
                              type="button"
                              className="btn btn-success rounded-4 apply-btn"
                              onClick={applyCustomRange}
                            >
                              Apply
                            </button>

                            <button
                              type="button"
                              className="btn btn-secondary rounded-4 mt-0 ms-2 apply-btn"
                              onClick={() => {
                                setMonth(false);
                                setPopoverStyle(null);
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}

                      {selectedFilter !== "custom" && (
                        <div
                          className="d-flex justify-content-end"
                          style={{ marginTop: 12 }}
                        >
                          <button
                            type="button"
                            className="cancel-btn ms-2"
                            onClick={() => {
                              setMonth(false);
                              setPopoverStyle(null);
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </form>
                  </div>
                )}
              </div>

              <div>
                <Link
                  className="text-decoration-none btn new-leader text-nowrap"
                  to="/admin/services/create"
                >
                  + New Services
                </Link>
              </div>
            </div>
          </div>

          <div className="table-wrapper border p-0">
            <div className="table-responsive custom-scrollbar">
              <table className="table table-hover mb-0">
                <thead className="table-success header-table text-nowrap">
                  <tr>
                    <th className="py-2">#</th>
                    <th>Service Name</th>
                    <th>Pending</th>
                    <th>Booking</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(paginatedData) && paginatedData.length > 0 ? (
                    paginatedData
                      .sort((a, b) =>
                        a.service_name.localeCompare(b.service_name),
                      )
                      .map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>

                          <td>
                            <Link
                              to={`/admin/services/${item.service_key}`}
                              className="short-name text-decoration-none text-dark"
                            >
                              {item.service_name}
                              <FontAwesomeIcon
                                icon={faArrowRight}
                                className="ms-2"
                              />
                            </Link>
                          </td>

                          <td className="short-name">120</td>
                          <td className="short-name">20</td>

                          <td
                            className={
                              item.status === "Active"
                                ? "convert-no"
                                : "convert-call"
                            }
                          >
                            <div className="d-flex align-items-center">
                              <div
                                className={`status-dot me-1 ${
                                  item.status === "Active"
                                    ? "custom-success"
                                    : "custom-active"
                                }`}
                              />
                              <span className="status-span">
                                {item.status || "N/A"}
                              </span>
                            </div>
                          </td>

                          <td className="text-start">
                            <div className="d-flex align-items-center">
                              <Link
                                title="Edit"
                                to={`/admin/services/edit/${item.id}`}
                                className="p-1 d-inline-flex align-items-center justify-content-center"
                              >
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  className="icons-color"
                                />
                              </Link>

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
                            </div>
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center text-muted">
                        No services found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {services.length > itemsPerPage && (
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
    </>
  );
}

export default Service;
