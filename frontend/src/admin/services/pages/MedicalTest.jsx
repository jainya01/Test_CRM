import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const dubai = [
  {
    id: 1,
    passenger: "Muhammad Tariq",
    passport: "AB1000234",
    country: "Saudi Arabia",
    center: "GAMCA Dubai",
    date: "12 Jul 2026",
    status: "Scheduled",
  },
  {
    id: 2,
    passenger: "Ali Hassan",
    passport: "CD2001456",
    country: "United Arab Emirates",
    center: "GAMCA Dubai",
    date: "14 Jul 2026",
    status: "In Process",
  },
  {
    id: 3,
    passenger: "Ahmed Khan",
    passport: "EF3002789",
    country: "Oman",
    center: "GAMCA Dubai",
    date: "16 Jul 2026",
    status: "Completed",
  },
];

const uae = [
  {
    id: 2,
    passenger: "Kamran Akmal",
    passport: "AB1000401",
    country: "UAE",
    center: "Dubai Attestation Center",
    date: "14 Jul 2026",
    status: "fit",
  },
];

const kuwait = [
  {
    id: 3,
    passenger: "Saima Jamil",
    passport: "AB1000410",
    country: "Kuwait",
    center: "Kuwait Attestation Center",
    date: "16 Jul 2026",
    status: "Scheduled",
  },
];

const oman = [
  {
    id: 4,
    passenger: "Ahmed Raza",
    passport: "AB1000425",
    country: "Oman",
    center: "Oman Attestation Center",
    date: "18 Jul 2026",
    status: "fit",
  },
];

const qatar = [
  {
    id: 5,
    passenger: "Ali Hassan",
    passport: "AB1000455",
    country: "Qatar",
    center: "Qatar Attestation Center",
    date: "28 Jul 2026",
    status: "Scheduled",
  },
];

const bahrain = [
  {
    id: 6,
    passenger: "Hina Malik",
    passport: "AB1000502",
    country: "Bahrain",
    center: "Bahrain Attestation Center",
    date: "25 Jul 2026",
    status: "fit",
  },
];

function MedicalTest() {
  const [search, setSearch] = useState("");
  const [activeCard, setActiveCard] = useState(1);
  const [tableTitle, setTableTitle] = useState("Saudi Arabia Bookings");

  const requestsMap = {
    1: dubai,
    2: uae,
    3: kuwait,
    4: oman,
    5: qatar,
    6: bahrain,
  };

  const [allRequests, setAllRequests] = useState(requestsMap);
  const scheduleRef = useRef();

  const [reschedule, setReschedule] = useState({
    open: false,
  });

  const activeTableData = allRequests[activeCard] || [];

  const deleteData = (index) => {
    setAllRequests((prev) => ({
      ...prev,
      [activeCard]: prev[activeCard].filter((_, i) => i !== index),
    }));
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
            <h5 className="fw-bold overview-dashboard">Medical Test — GCC</h5>
            <p className="text-muted overview-lead fw-bold">
              Schedule and track candidate medicals by country
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
              + New Medical Booking
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
                  <h5 className="fw-bold">New Medical Booking</h5>
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
                    <label className="form-label">Candidate Name</label>
                    <input
                      type="text"
                      className="form-control sector-wise"
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
                    <label className="form-label">Attestation Type</label>
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
                      <option value="">Select Country</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="UAE">UAE</option>
                      <option value="Kuwait">Kuwait</option>
                      <option value="Oman">Oman</option>
                      <option value="Qatar">Qatar</option>
                      <option value="Bahrain">Bahrain</option>
                    </select>
                  </div>

                  <div className="col-md-6 mb-1">
                    <label className="form-label">Center</label>
                    <input
                      type="text"
                      className="form-control sector-wise"
                      placeholder="e.g. GAMCA Dubai"
                      value={reschedule.flightDate || ""}
                      onChange={(e) =>
                        setReschedule((prev) => ({
                          ...prev,
                          flightDate: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="col-md-6 mb-1">
                    <label className="form-label">Appointment Date</label>
                    <input
                      type="date"
                      className="form-control sector-wise"
                      placeholder="e.g. GAMCA Dubai"
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
                      className="form-select sector-wise"
                      value={reschedule.status || "Requested"}
                      onChange={(e) =>
                        setReschedule((prev) => ({
                          ...prev,
                          status: e.target.value,
                        }))
                      }
                    >
                      <option value="" hidden>
                        Select Status
                      </option>
                      <option value="Scheduled">Scheduled</option>
                      <option value="Pending">Pending</option>
                      <option value="Fit">Fit</option>
                      <option value="Unfit">Unfit</option>
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
                    Create Booking
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
                setTableTitle("Saudi Arabia Bookings");
              }}
            >
              <div className="d-flex flex-column">
                <span className="locations-span">Saudi Arabia</span>
                <span className="mt-2">{dubai.length}</span>
                <span className="requests-span">bookings</span>
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
                setTableTitle("UAE Bookings");
              }}
            >
              <div className="d-flex flex-column">
                <span className="locations-span">UAE</span>
                <span className="mt-2">{uae.length}</span>
                <span className="requests-span">bookings</span>
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
                setTableTitle("Kuwait Bookings");
              }}
            >
              <div className="d-flex flex-column">
                <span className="locations-span">Kuwait</span>
                <span className="mt-2">{kuwait.length}</span>
                <span className="requests-span">bookings</span>
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
                setTableTitle("Oman Bookings");
              }}
            >
              <div className="d-flex flex-column">
                <span className="locations-span">Oman</span>
                <span className="mt-2">{oman.length}</span>
                <span className="requests-span">bookings</span>
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
                setTableTitle("Qatar Bookings");
              }}
            >
              <div className="d-flex flex-column">
                <span className="locations-span">Qatar</span>
                <span className="mt-2">{qatar.length}</span>
                <span className="requests-span">bookings</span>
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
                setTableTitle("Bahrain Bookings");
              }}
            >
              <div className="d-flex flex-column">
                <span className="locations-span">Bahrain</span>
                <span className="mt-2">{bahrain.length}</span>
                <span className="requests-span">bookings</span>
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
                  <th>Candidate</th>
                  <th>Passport</th>
                  <th>Country</th>
                  <th>Center</th>
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
                          {item.passenger || "N/A"}
                        </span>
                      </td>

                      <td>
                        <span className="short-name">
                          {item.passport || "N/A"}
                        </span>
                      </td>

                      <td className="short-name">{item.country || "N/A"}</td>

                      <td className="short-name">{item.center || "N/A"}</td>
                      <td className="short-name">{item.date || "N/A"}</td>

                      <td className={item.status === "fit" ? "convert-no" : ""}>
                        <div className="d-flex align-items-center">
                          <span className="status-span status-span1">
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
                    <td colSpan="8" className="text-center text-muted">
                      No cases yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MedicalTest;
