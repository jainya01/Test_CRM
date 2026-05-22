import { Link } from "react-router-dom";
import "../App.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBell,
  faCheck,
  faClock,
  faCube,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

function Homepage() {
  const users = [
    {
      id: 1,
      name: "Muhammad Tariq",
      phone: "+92 300 10000",
      Service: "Hajj",
      Source: "John Doe",
      Status: "New",
      Temp: "Hot",
    },
    {
      id: 2,
      name: "Ayesha Siddiqui",
      phone: "+92 301 10101",
      Service: "Umrah",
      Source: "Sarah Khan",
      Status: "Contacted",
      Temp: "Warm",
    },
    {
      id: 3,
      name: "Imran Malik",
      phone: "+92 302 10202",
      Service: "Ticket",
      Source: "Ali Raza",
      Status: "Interested",
      Temp: "Cold",
    },
    {
      id: 4,
      name: "Fatima Noor",
      phone: "+92 303 10303",
      Service: "Medical",
      Source: "Michael Smith",
      Status: "Not Interested",
      Temp: "Hot",
    },
    {
      id: 5,
      name: "Zain Abbas",
      phone: "+92 304 10404",
      Service: "Hajj",
      Source: "Ayesha Malik",
      Status: "Converted",
      Temp: "Warm",
    },
    {
      id: 6,
      name: "Hira Sheikh",
      phone: "+92 305 10505",
      Service: "Umrah",
      Source: "David Johnson",
      Status: "New",
      Temp: "Cold",
    },
  ];

  return (
    <>
      <div className="content-wrapper">
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
                <h3 className="mb-1 main-size">Good morning, Amir 👋</h3>
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
                    <h4 className="card-value mb-0">111</h4>
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
                    <h4 className="card-value mb-0">111</h4>
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
                    <h4 className="card-value mb-0">111</h4>
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
                    <h4 className="card-value">111</h4>
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
                  <h4 className="urgency-title mb-0">
                    <span className="warning-icon me-2">⚠</span>
                    Urgency Engine
                  </h4>

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
                    className="offer-card d-flex express-special flex-md-row justify-content-between align-items-md-center gap-3 mb-3"
                  >
                    <div>
                      <h6 className="umrah-express">{item.title}</h6>
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
                <h4 className="pipeline-title mb-3 mt-2">Lead pipeline</h4>

                {[
                  { label: "New", value: 6 },
                  { label: "Contacted", value: 6 },
                  { label: "Interested", value: 6 },
                  { label: "Converted", value: 5 },
                  { label: "Not Interested", value: 5 },
                ].map((item, index, array) => {
                  const total = array.reduce(
                    (sum, current) => sum + current.value,
                    0,
                  );

                  const percent = ((item.value / total) * 100).toFixed(0);

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
                      <h5 className="fw-bold mb-0 daily-performance mb-2 mt-1">
                        Recent leads
                      </h5>
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
                            <th>Name</th>
                            <th>Service</th>
                            <th>Source</th>
                            <th>Status</th>
                            <th>Temp</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody className="body-table">
                          {Array.isArray(users) && users.length > 0 ? (
                            users.map((data) => (
                              <tr key={data.id}>
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
                                        "Not Interested":
                                          "non-interested-cust cus-res",
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

                                <td>
                                  <Link className="opened-box text-decoration-none text-dark fw-bold">
                                    Open
                                  </Link>
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

                      {/* {users.length > itemsPerPage && (
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
                              setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages),
                              )
                            }
                          >
                            Next →
                          </button>
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
