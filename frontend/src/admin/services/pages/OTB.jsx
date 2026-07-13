import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const travelRequests = [
  {
    name: "Kamran Akmal",
    passportNumber: "AB1000401",
    destination: "Dubai",
    airline: "Emirates",
    flightNumber: "EK612",
    travelDate: "14 Jul 2026",
    status: "Approved",
  },
  {
    name: "Saima Jamil",
    passportNumber: "AB1000410",
    destination: "Sharjah",
    airline: "Air Arabia",
    flightNumber: "G9524",
    travelDate: "16 Jul 2026",
    status: "Requested",
  },
];

function OTB() {
  const [search, setSearch] = useState("");
  const [activeCard, setActiveCard] = useState(1);
  const [requestsData, setRequestsData] = useState(travelRequests);
  const [tableTitle, setTableTitle] = useState("All Requests");
  const scheduleRef = useRef();
  const [reschedule, setReschedule] = useState({
    open: false,
  });

  useEffect(() => {
    const handler = (e) =>
      scheduleRef.current &&
      !scheduleRef.current.contains(e.target) &&
      setReschedule((p) => ({ ...p, open: false }));

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const activeTableData =
    activeCard === 1
      ? requestsData
      : activeCard === 2
        ? requestsData.filter((item) => item.destination === "Dubai")
        : activeCard === 3
          ? requestsData.filter((item) => item.destination === "Abu Dhabi")
          : requestsData.filter((item) => item.destination === "Sharjah");

  const deleteData = (index) => {
    const itemToDelete = activeTableData[index];

    setRequestsData((prev) =>
      prev.filter(
        (item) =>
          !(
            item.name === itemToDelete.name &&
            item.passportNumber === itemToDelete.passportNumber
          ),
      ),
    );
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
                  placeholder="Search by passenger name"
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
            <h5 className="fw-bold overview-dashboard">OTB — Ok To Board</h5>
            <p className="text-muted overview-lead fw-bold">
              Manage OTB requests by destination and airline
            </p>
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
              + New OTB Request
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
                  <h5 className="fw-bold">New OTB Request</h5>
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

                <div className="row mt-3">
                  <div className="col-md-6 mb-1">
                    <label className="form-label">Passenger Name</label>
                    <input
                      type="text"
                      className="form-control sector-wise"
                      placeholder="Enter Passenger Name"
                      value={reschedule.passengerName || ""}
                      onChange={(e) =>
                        setReschedule((prev) => ({
                          ...prev,
                          passengerName: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="col-md-6 mb-1">
                    <label className="form-label">Passport No.</label>
                    <input
                      type="text"
                      className="form-control sector-wise"
                      placeholder="Enter Passport No."
                      value={reschedule.passportNo || ""}
                      onChange={(e) =>
                        setReschedule((prev) => ({
                          ...prev,
                          passportNo: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="col-md-6 mb-1">
                    <label className="form-label">Destination</label>
                    <select
                      className="form-select sector-wise"
                      value={reschedule.destination || ""}
                      onChange={(e) =>
                        setReschedule((prev) => ({
                          ...prev,
                          destination: e.target.value,
                        }))
                      }
                    >
                      <option value="">Select Destination</option>
                      <option value="Dubai">Dubai</option>
                      <option value="Abu Dhabi">Abu Dhabi</option>
                      <option value="Sharjah">Sharjah</option>
                    </select>
                  </div>

                  <div className="col-md-6 mb-1">
                    <label className="form-label">Airline</label>
                    <select
                      className="form-select sector-wise"
                      value={reschedule.airline || ""}
                      onChange={(e) =>
                        setReschedule((prev) => ({
                          ...prev,
                          airline: e.target.value,
                        }))
                      }
                    >
                      <option value="">Select Airline</option>
                      <option value="Emirates">Emirates</option>
                      <option value="Qatar Airways">Qatar Airways</option>
                      <option value="Etihad Airways">Etihad Airways</option>
                      <option value="FlyDubai">FlyDubai</option>
                    </select>
                  </div>

                  <div className="col-md-6 mb-1">
                    <label className="form-label">Flight No.</label>
                    <input
                      type="text"
                      className="form-control sector-wise"
                      placeholder="e.g. EK612"
                      value={reschedule.flightNo || ""}
                      onChange={(e) =>
                        setReschedule((prev) => ({
                          ...prev,
                          flightNo: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="col-md-6 mb-1">
                    <label className="form-label">Flight Date</label>
                    <input
                      type="date"
                      className="form-control sector-wise"
                      value={reschedule.flightDate || ""}
                      onChange={(e) =>
                        setReschedule((prev) => ({
                          ...prev,
                          flightDate: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Status</label>
                    <select
                      className="form-control sector-wise"
                      value={reschedule.status || "Requested"}
                      onChange={(e) =>
                        setReschedule((prev) => ({
                          ...prev,
                          status: e.target.value,
                        }))
                      }
                    >
                      <option value="Requested">Requested</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
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

                  <button
                    className="btn btn-update"
                    onClick={() => {
                      console.log(reschedule);
                      setReschedule({
                        open: false,
                        passengerName: "",
                        passportNo: "",
                        destination: "",
                        airline: "",
                        flightNo: "",
                        flightDate: "",
                        status: "Requested",
                      });
                    }}
                  >
                    Create Request
                  </button>
                </div>
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
                setTableTitle("All Requests");
              }}
            >
              <div className="d-flex flex-column">
                <span className="locations-span">All Destinations</span>
                <span className="mt-2">2</span>
                <span className="requests-span">requests</span>
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
                setTableTitle("Dubai Requests");
              }}
            >
              <div className="d-flex flex-column">
                <span className="locations-span">Dubai</span>
                <span className="mt-2">1</span>
                <span className="requests-span">requests</span>
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
                setTableTitle("Abu Dhabi Requests");
              }}
            >
              <div className="d-flex flex-column">
                <span className="locations-span">Abu Dhabi</span>
                <span className="mt-2">0</span>
                <span className="requests-span">requests</span>
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
                setTableTitle("Sharjah Requests");
              }}
            >
              <div className="d-flex flex-column">
                <span className="locations-span">Sharjah</span>
                <span className="mt-2">1</span>
                <span className="requests-span">requests</span>
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
                  <th>S/N</th>
                  <th>Passenger</th>
                  <th>Passport</th>
                  <th>Destination</th>
                  <th>Airline</th>
                  <th>Flight</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {activeTableData.length > 0 ? (
                  activeTableData.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <span className="short-name">
                          {item.passenger || item.name || "N/A"}
                        </span>
                      </td>

                      <td>
                        <span className="short-name">
                          {item.passport || item.passportNumber || "N/A"}
                        </span>
                      </td>

                      <td className="short-name">
                        {item.destination || "N/A"}
                      </td>
                      <td className="short-name">{item.airline || "N/A"}</td>
                      <td className="short-name">
                        {item.flight || item.flightNumber || "N/A"}
                      </td>
                      <td className="short-name">
                        {item.date || item.travelDate || "N/A"}
                      </td>

                      <td
                        className={
                          item.status === "Approved"
                            ? "convert-no"
                            : "convert-call"
                        }
                      >
                        <div className="d-flex align-items-center">
                          <div
                            className={`status-dot me-1 ${
                              item.status === "Approved"
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
                        <button
                          type="button"
                          title="Delete"
                          onClick={() => deleteData(index)}
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
                    <td colSpan="9" className="text-center text-muted">
                      No cases yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* {services.length > itemsPerPage && (
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
            )} */}
          </div>
        </div>
      </div>
    </main>
  );
}

export default OTB;
