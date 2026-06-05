import { useEffect, useRef, useState } from "react";
import "../App.css";
import { authHeader } from "../utils/authHeader";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowRight,
  faBell,
  faCheck,
  faClock,
  faCube,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

function Homepage() {
  const API_URL = import.meta.env.VITE_API_URL;

  const scheduleRef = useRef();

  const [reschedule, setReschedule] = useState({
    open: false,
    date: "",
  });

  useEffect(() => {
    const handler = (e) =>
      scheduleRef.current &&
      !scheduleRef.current.contains(e.target) &&
      setReschedule((p) => ({ ...p, open: false }));

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const users = [
    {
      id: 1,
      name: "Muhammad Tariq",
      phone: "+92 300 10000",
      service: "Hajj",
      source: "John Doe",
      status: "New",
      temp: "Hot",
    },
    {
      id: 2,
      name: "Ayesha Siddiqui",
      phone: "+92 301 10101",
      service: "Umrah",
      source: "Sarah Khan",
      status: "Contacted",
      temp: "Warm",
    },
    {
      id: 3,
      name: "Imran Malik",
      phone: "+92 302 10202",
      service: "Ticket",
      source: "Ali Raza",
      status: "Interested",
      temp: "Cold",
    },
    {
      id: 4,
      name: "Fatima Noor",
      phone: "+92 303 10303",
      service: "Medical",
      source: "Michael Smith",
      status: "Not Interested",
      temp: "Hot",
    },
    {
      id: 5,
      name: "Zain Abbas",
      phone: "+92 304 10404",
      service: "Hajj",
      source: "Ayesha Malik",
      status: "Converted",
      temp: "Warm",
    },
    {
      id: 6,
      name: "Hira Sheikh",
      phone: "+92 305 10505",
      service: "Umrah",
      source: "David Johnson",
      status: "New",
      temp: "Cold",
    },
  ];

  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const allData = async () => {
      try {
        const adminId = localStorage.getItem("id");

        const [adminRes] = await Promise.allSettled([
          axios.get(`${API_URL}/alladmindata`, {
            headers: authHeader(),
          }),
        ]);

        if (adminRes.status === "fulfilled") {
          const adminData = adminRes.value.data.result;
          const currentAdmin = adminData.find(
            (item) => item.id === Number(adminId),
          );

          if (currentAdmin) {
            setAdminName(currentAdmin.fullname);
          }
        }
      } catch (error) {
        console.error("error", error);
      }
    };

    allData();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return "Good morning";
    } else if (hour < 17) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };

  const handleShare = () => {
    navigator.share({
      title: "My App",
      text: "Check this out!",
      url: window.location.href,
    });
  };

  const [selected, setSelected] = useState([]);
  const headerRef = useRef(null);

  const allChecked = users.length > 0 && selected.length === users.length;
  const isIndeterminate = selected.length > 0 && selected.length < users.length;

  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = users.slice(startIndex, endIndex);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  return (
    <>
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

        <div className="p-2 p-lg-3">
          <div className="row g-2">
            <div className="d-flex flex-row justify-content-between flex-wrap">
              <div className="d-flex flex-column">
                <h1 className="mb-1 main-size">
                  {getGreeting()}{" "}
                  {adminName
                    ? adminName[0].toUpperCase() + adminName.slice(1)
                    : ""}
                </h1>

                <p className="text-muted happened-team">
                  Here's what's happening across your team today.
                </p>
              </div>

              <div>
                <Link
                  className="btn lead-btn text-nowrap mb-3"
                  to="/admin/leads"
                >
                  View all leads
                </Link>
              </div>
            </div>

            <div className="col-6 col-sm-6 col-md-6 col-lg">
              <div className="card shadow-sm border-0 h-100 rounded-4">
                <div className="card-body d-flex justify-content-between">
                  <div>
                    <p className="card-title-text">Total Leads</p>
                    <div className="card-value mb-0">11</div>
                    <span className="text-muted week-muted">+12 this week</span>
                  </div>

                  <div className="icon-wrapper icon-wrapper1">
                    <FontAwesomeIcon icon={faUsers} />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-6 col-sm-6 col-md-6 col-lg">
              <div className="card shadow-sm border-0 h-100 rounded-4">
                <div className="card-body d-flex justify-content-between">
                  <div>
                    <p className="card-title-text">Converted</p>
                    <div className="card-value mb-0">12</div>
                    <span className="text-muted week-muted">18% rate</span>
                  </div>

                  <div className="icon-wrapper icon-check">
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-6 col-sm-6 col-md-6 col-lg">
              <div className="card shadow-sm border-0 h-100 rounded-4">
                <div className="card-body d-flex justify-content-between">
                  <div>
                    <p className="card-title-text">Follow-ups Due</p>
                    <div className="card-value mb-0">13</div>
                    <span className="text-muted week-muted">Action needed</span>
                  </div>

                  <div className="icon-wrapper icon-clock">
                    <FontAwesomeIcon icon={faClock} />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-6 col-sm-6 col-md-6 col-lg">
              <div className="card shadow-sm border-0 h-100 rounded-4">
                <div className="card-body d-flex justify-content-between">
                  <div>
                    <p className="card-title-text">Active Bookings</p>
                    <div className="card-value">14</div>
                  </div>

                  <div className="icon-wrapper icon-booking">
                    <FontAwesomeIcon icon={faCube} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-3 mt-1">
            <div className="col-12 col-lg-8">
              <div className="urgency-card">
                <div className="d-flex justify-content-between align-items-center mt-2 mb-3">
                  <h1 className="urgency-title mb-0">
                    <span className="warning-icon me-2">⚠</span>
                    Urgency Engine
                  </h1>

                  <span className="top-badge">3 expiring</span>
                </div>

                {[
                  {
                    title: "Umrah Express — 10 Days",
                    seats: "8 seats · PKR 285,000",
                    days: "5d left",
                  },
                  {
                    title: "Ramadan Umrah Special",
                    seats: "6 seats · PKR 540,000",
                    days: "3d left",
                  },
                  {
                    title: "Medical Visa — Turkey",
                    seats: "4 seats · PKR 410,000",
                    days: "2d left",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="offer-card d-flex flex-md-row justify-content-between align-items-md-center gap-3 mb-3"
                  >
                    <div>
                      <div className="umrah-express">{item.title}</div>
                      <p className="mb-0 pb-0">{item.seats}</p>
                    </div>

                    <div className="text-end">
                      <span className="days-badge">{item.days}</span>
                      <p className="discount-text mt-2">Push with discount</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div className="pipeline-card">
                <div className="pipeline-title mb-3 mt-2">Lead Pipeline</div>

                {[
                  { label: "New", value: 6 },
                  { label: "Contacted", value: 10 },
                  { label: "Interested", value: 8 },
                  { label: "Converted", value: 5 },
                  { label: "Not Interested", value: 5 },
                ].map((item, index) => {
                  const percent = Math.min(item.value, 100);

                  return (
                    <div key={index} className="pipeline-item mb-2">
                      <div className="d-flex justify-content-between">
                        <span className="fw-bold">{item.label}</span>
                        <span>{item.value}</span>
                      </div>

                      <div className="progress-track">
                        <div
                          className="progress-fill"
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="row g-2 mt-3">
            <div className="col-12">
              <div className="card shadow-sm border-0 rounded-3 h-100">
                <div className="card-body p-0">
                  <div className="mb-2 mt-3 ms-2 d-flex flex-wrap gap-2 justify-content-between flex-row align-items-center">
                    <div>
                      <div className="fw-bold mb-0 daily-performance mb-2 mt-1">
                        Recent leads
                      </div>
                    </div>

                    <Link
                      className="seen-arrow d-flex align-items-center text-decoration-none"
                      to="/admin/leads"
                    >
                      See all <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                  </div>

                  <div className="table-wrapper rounded-0">
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
                                aria-label="Select all"
                                onChange={(e) =>
                                  setSelected(
                                    e.target.checked
                                      ? users.map((item) => item.id)
                                      : [],
                                  )
                                }
                              />
                            </th>

                            <th>Name</th>
                            <th>Service</th>
                            <th>Source</th>
                            <th>Status</th>
                            <th>Temperature</th>
                            <th></th>
                          </tr>
                        </thead>

                        <tbody className="body-table">
                          {Array.isArray(paginatedData) &&
                          paginatedData.length > 0 ? (
                            paginatedData.map((data) => (
                              <tr key={data.id}>
                                <td>
                                  <input
                                    className="form-check-input custom-input"
                                    type="checkbox"
                                    checked={selected.includes(data.id)}
                                    aria-label={`Select row ${data.id}`}
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
                                  <Link className="name-span" to="/admin/leads">
                                    {data.name || "--"}
                                  </Link>

                                  <span className="phone-span">
                                    {data.phone || "--"}
                                  </span>
                                </td>

                                <td>
                                  <span className="service-border">
                                    {data.service || "--"}
                                  </span>
                                </td>

                                <td className="text-muted walk-source">
                                  {data.source || "--"}
                                </td>

                                <td>
                                  <span
                                    className={
                                      {
                                        "Follow-up": "follow-up cus-res",
                                        "Not Interested":
                                          "non-interested-cust cus-res",
                                        Interested: "interested-cust cus-res",
                                        Contacted: "convert-status cus-res",
                                        New: "new-customer cus-res",
                                        Converted: "convert-status cus-res",
                                      }[data.status] || ""
                                    }
                                  >
                                    {data.status || "--"}
                                  </span>
                                </td>

                                <td>
                                  <span
                                    className={
                                      {
                                        Hot: "hot-up hot-res",
                                        Warm: "warm-up hot-res",
                                        Cold: "cold-status hot-res",
                                      }[data.temp] || ""
                                    }
                                  >
                                    {data.temp === "Hot" && "🔥 "}
                                    {data.temp || "--"}
                                  </span>
                                </td>

                                <td>
                                  <span className="d-flex align-items-center">
                                    <Link className="opened-box text-decoration-none text-dark fw-bold">
                                      Open
                                    </Link>

                                    <div
                                      title="Whatsapp"
                                      className="whatsapp-icon"
                                      onClick={() => {
                                        const phone = data.phone?.replace(
                                          /\D/g,
                                          "",
                                        );
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

                                    <div
                                      className="ms-1"
                                      title="Reschedule"
                                      onClick={() =>
                                        setReschedule((prev) => ({
                                          ...prev,
                                          open: true,
                                        }))
                                      }
                                      style={{ cursor: "pointer" }}
                                    >
                                      <FontAwesomeIcon
                                        icon={faClock}
                                        className="custom-watch"
                                      />
                                    </div>

                                    {reschedule.open && (
                                      <div className="modal-overlay">
                                        <div
                                          className="reschedule-modal"
                                          ref={scheduleRef}
                                        >
                                          <h6>Reschedule Lead</h6>

                                          <div className="border mb-2 mt-2"></div>

                                          <div className="mb-3">
                                            <label>Date</label>
                                            <input
                                              type="date"
                                              className="form-control sector-wise mt-2"
                                              value={reschedule.date}
                                              onChange={(e) =>
                                                setReschedule((prev) => ({
                                                  ...prev,
                                                  date: e.target.value,
                                                }))
                                              }
                                            />
                                          </div>

                                          <div className="d-flex justify-content-end gap-2">
                                            <button
                                              className="btn btn-update"
                                              onClick={() => {
                                                console.log(
                                                  "Date:",
                                                  reschedule.date,
                                                );
                                                console.log(
                                                  "Time:",
                                                  reschedule.time,
                                                );

                                                setReschedule({
                                                  open: false,
                                                  date: "",
                                                  time: "",
                                                });
                                              }}
                                            >
                                              Save
                                            </button>

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
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </span>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="6" className="text-center">
                                No Data Found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>

                      {users.length > 0 && (
                        <>
                          <div className="d-flex justify-content-center">
                            <button className="table-shared">Download</button>

                            <button
                              className="table-shared"
                              onClick={handleShare}
                            >
                              Share
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

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

                      <div className="fw-semibold px-2">
                        Page {currentPage} of {totalPages}
                      </div>

                      <button
                        className={`btn rounded-pill px-3 py-1 shadow-sm ${
                          currentPage >= totalPages
                            ? "btn-light border text-muted"
                            : "btn-success border-0"
                        }`}
                        disabled={currentPage >= totalPages}
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages),
                          )
                        }
                      >
                        Next →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Homepage;
