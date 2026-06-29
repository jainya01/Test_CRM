import { useEffect, useMemo, useRef, useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import { authHeader } from "../utils/authHeader";

const users = [
  {
    id: 1,
    name: "Muhammad Tariq",
    phone: "+91 300 10000",
    Service: "Hajj",
    Source: "John Doe",
    Status: "New",
    Temp: "Hot",
    Followup: "Today",
  },
  {
    id: 2,
    name: "Ayesha Siddiqui",
    phone: "+91 301 10101",
    Service: "Umrah",
    Source: "Sarah Khan",
    Status: "Contacted",
    Temp: "Warm",
    Followup: "In 1d",
  },
  {
    id: 3,
    name: "Imran Malik",
    phone: "+91 302 10202",
    Service: "Ticket",
    Source: "Ali Raza",
    Status: "Interested",
    Temp: "Cold",
    Followup: "In 2d",
  },
  {
    id: 4,
    name: "Fatima Noor",
    phone: "+91 303 10303",
    Service: "Medical",
    Source: "Michael Smith",
    Status: "Not Interested",
    Temp: "Hot",
    Followup: "In 3d",
  },
  {
    id: 5,
    name: "Zain Abbas",
    phone: "+91 304 10404",
    Service: "Hajj",
    Source: "Ayesha Malik",
    Status: "Converted",
    Temp: "Warm",
    Followup: "Today",
  },
  {
    id: 6,
    name: "Hira Sheikh",
    phone: "+91 305 10505",
    Service: "Umrah",
    Source: "David Johnson",
    Status: "New",
    Temp: "Cold",
    Followup: "Missed 1d",
  },
  {
    id: 7,
    name: "Ayesha Khan",
    phone: "+91 311 4455667",
    Service: "Hajj",
    Source: "Fatima Noor",
    Status: "Contacted",
    Temp: "Warm",
    Followup: "Today",
  },
  {
    id: 8,
    name: "Bilal Ahmed",
    phone: "+91 300 7788991",
    Service: "Umrah",
    Source: "Usman Tariq",
    Status: "New",
    Temp: "Cold",
    Followup: "Missed 2d",
  },
  {
    id: 9,
    name: "Sara Malik",
    phone: "+91 322 5566778",
    Service: "Visa",
    Source: "Emily Brown",
    Status: "Qualified",
    Temp: "Hot",
    Followup: "Tomorrow",
  },
];

function Leads() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [search, setSearch] = useState("");
  const [search1, setSearch1] = useState("");
  const [service, setService] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const allData = async () => {
      try {
        const [serviceRes] = await Promise.allSettled([
          axios.get(`${API_URL}/allservices`, { headers: authHeader }),
        ]);

        if (serviceRes.status === "fulfilled") {
          setService(serviceRes.value.data.result);
        }
      } catch (error) {
        console.error("error", error);
      }
    };
    allData();
  }, [API_URL]);

  const keyword = (search || search1 || "").toLowerCase().trim();

  const filteredLeads = useMemo(() => {
    return users.filter((item) => {
      return (
        (selectedService === "" || item.Service === selectedService) &&
        (status === "" || item.Status === status) &&
        (item.name?.toLowerCase().includes(keyword) ||
          item.phone?.toString().toLowerCase().includes(keyword) ||
          item.service_name?.toLowerCase().includes(keyword))
      );
    });
  }, [selectedService, status, keyword]);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredLeads.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const [selected, setSelected] = useState([]);
  const headerRef = useRef(null);

  const allChecked =
    paginatedData.length > 0 && selected.length === paginatedData.length;

  const isIndeterminate =
    selected.length > 0 && selected.length < paginatedData.length;

  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  const [months, setMonths] = useState("");
  const monthPillRef = useRef(null);
  const popoverRef = useRef(null);
  const [month, setMonth] = useState(false);
  const [popoverStyle, setPopoverStyle] = useState(null);
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("halfYearly");

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
      <title>Leads Management | CRM Portal</title>
      <meta
        name="description"
        content="Manage and track customer leads, monitor lead status, assign follow-ups, view lead sources, and streamline your sales pipeline in the CRM Leads Portal."
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
                    placeholder="Search by name & phone"
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

        <div className="row mt-2 gx-2 ms-2 me-2 gy-2">
          <div className="d-flex justify-content-between">
            <div>
              <h5 className="fw-bold overview-dashboard">Leads</h5>
              <p className="text-muted overview-lead fw-bold">
                {paginatedData.length} of {paginatedData.length} leads
              </p>
            </div>
          </div>

          <div className="d-flex align-items-center flex-wrap justify-content-between gap-3 p-3 rounded-3 border">
            <div className="flex-grow-1">
              <input
                type="search"
                className="form-control sector-wise"
                placeholder="Search by name & phone"
                value={search1}
                onChange={(e) => setSearch1(e.target.value)}
              />
            </div>

            <div className="d-flex align-items-center gap-2 p-1 rounded-4">
              <select
                className="form-select rounded-3 sector-wise"
                aria-label="Lead category filter"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
              >
                <option value="">All services</option>
                {Array.isArray(service) && service.length > 0 ? (
                  service
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
            </div>

            <div className="d-flex gap-2">
              <div>
                <select
                  className="form-select rounded-3 sector-wise"
                  aria-label="Lead status filter"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Interested">Interested</option>
                  <option value="Not Interested">Not Interested</option>
                  <option value="Converted">Converted</option>
                </select>
              </div>

              <div className="d-flex justify-content-start gap-2">
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
                              className="btn btn-primary apply-btn"
                              onClick={applyCustomRange}
                            >
                              Apply
                            </button>

                            <button
                              type="button"
                              className="btn btn-secondary mt-0 ms-2"
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
            </div>
          </div>

          <div className="table-wrapper border p-0 mb-3">
            <div className="table-responsive custom-scrollbar">
              <table className="table table-hover mb-0">
                <thead className="table-success header-table text-nowrap">
                  <tr>
                    <th>
                      <input
                        className="form-check-input custom-input"
                        ref={headerRef}
                        type="checkbox"
                        checked={allChecked}
                        aria-label="Select all rows"
                        onChange={(e) =>
                          setSelected(
                            e.target.checked
                              ? paginatedData.map((item) => item.id)
                              : [],
                          )
                        }
                      />
                    </th>

                    <th>Lead</th>
                    <th>Service</th>
                    <th>Source</th>
                    <th>Status</th>
                    <th>Temperature</th>
                    <th>Follow-up</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="body-table">
                  {Array.isArray(paginatedData) && paginatedData.length > 0 ? (
                    paginatedData.map((data) => (
                      <tr key={data.id}>
                        <td>
                          <input
                            className="form-check-input custom-input"
                            type="checkbox"
                            checked={selected.includes(data.id)}
                            aria-label={`Select row ${data.name || data.id}`}
                            onChange={(e) =>
                              setSelected((prev) =>
                                e.target.checked
                                  ? [...prev, data.id]
                                  : prev.filter((id) => id !== data.id),
                              )
                            }
                          />
                        </td>

                        <td className="d-flex flex-column">
                          <span className="name-span">{data.name || "--"}</span>
                          <span className="phone-span">
                            {data.phone || "--"}
                          </span>
                        </td>

                        <td>
                          <span className="service-border">
                            {data.Service || "--"}
                          </span>
                        </td>

                        <td className="text-muted walk-source">
                          {data.Source || "--"}
                        </td>

                        <td>
                          <span
                            className={
                              {
                                "Follow-up": "follow-up cus-res",
                                "Not Interested": "non-interested-cust cus-res",
                                Interested: "interested-cust cus-res",
                                Contacted: "convert-status cus-res",
                                New: "new-customer cus-res",
                                Converted: "convert-status cus-res",
                              }[data.Status] || ""
                            }
                          >
                            {data.Status || "--"}
                          </span>
                        </td>

                        <td>
                          <span
                            className={
                              {
                                Hot: "hot-up hot-res",
                                Warm: "warm-up hot-res",
                                Cold: "cold-status hot-res",
                              }[data.Temp] || ""
                            }
                          >
                            {data.Temp === "Hot" && "🔥 "}
                            {data.Temp || "--"}
                          </span>
                        </td>

                        <td className="text-nowrap">
                          <span
                            className={
                              data.Followup === "Today"
                                ? "follow-today follow-to"
                                : data.Followup?.includes("Missed")
                                  ? "follow-missed follow-to"
                                  : ""
                            }
                          >
                            {data.Followup || "--"}
                          </span>
                        </td>

                        <td>
                          <span className="d-flex align-items-center">
                            <Link className="opened-box text-decoration-none text-dark fw-bold text-nowrap">
                              <FontAwesomeIcon icon={faPhone} /> Open
                            </Link>

                            <div
                              className="whatsapp-icon"
                              onClick={() => {
                                const phone = data.phone?.replace(/\D/g, "");
                                if (phone) {
                                  window.open(
                                    `https://wa.me/${phone}`,
                                    "_blank",
                                  );
                                }
                              }}
                            >
                              <FontAwesomeIcon icon={faWhatsapp} />
                            </div>
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center">
                        No Data Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {paginatedData.length > 0 && (
                <>
                  <div className="d-flex justify-content-center mt-2 mb-2">
                    <button className="btn download-btn">Download</button>
                  </div>
                </>
              )}

              {users.length > itemsPerPage && (
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
      </main>
    </>
  );
}

export default Leads;
