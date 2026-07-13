import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const travelRequests = [
  {
    passenger: "Kamran Akmal",
    passport: "AB1000401",
    type: "Saudi Normal Immigration",
    airline: "Emirates",
    flight: "EK612",
    date: "14 Jul 2026",
    status: "Approved",
  },
  {
    passenger: "Saima Jamil",
    passport: "AB1000410",
    type: "Dubai Family Immigration",
    airline: "Air Arabia",
    flight: "G9524",
    date: "16 Jul 2026",
    status: "Requested",
  },
  {
    passenger: "Ahmed Raza",
    passport: "AB1000425",
    type: "Qatar Family Immigration",
    airline: "Saudia",
    flight: "SV715",
    date: "18 Jul 2026",
    status: "Approved",
  },
];

const dubaiRequests = [
  {
    passenger: "Kamran Akmal",
    passport: "AB1000401",
    type: "Dubai Family Immigration",
    airline: "Emirates",
    flight: "EK612",
    date: "14 Jul 2026",
    status: "Approved",
  },
  {
    passenger: "Ali Hassan",
    passport: "AB1000455",
    type: "Dubai Family Immigration",
    airline: "FlyDubai",
    flight: "FZ336",
    date: "20 Jul 2026",
    status: "Requested",
  },
];

const sharjahRequests = [
  {
    passenger: "Saima Jamil",
    passport: "AB1000410",
    type: "Sharjah Normal Immigration",
    airline: "Air Arabia",
    flight: "G9524",
    date: "16 Jul 2026",
    status: "Requested",
  },
  {
    passenger: "Usman Tariq",
    passport: "AB1000462",
    type: "Sharjah Normal Immigration",
    airline: "Air Arabia",
    flight: "G9531",
    date: "22 Jul 2026",
    status: "Approved",
  },
];

const saudiRequests = [
  {
    passenger: "Ahmed Raza",
    passport: "AB1000425",
    type: "Saudi Offence Immigration",
    airline: "Saudia",
    flight: "SV715",
    date: "18 Jul 2026",
    status: "Approved",
  },
];

const omanRequests = [
  {
    passenger: "Ayesha Noor",
    passport: "AB1000491",
    type: "Oman Family Immigration",
    airline: "Oman Air",
    flight: "WY324",
    date: "19 Jul 2026",
    status: "Approved",
  },
  {
    passenger: "Bilal Ahmed",
    passport: "AB1000498",
    type: "Oman Family Immigration",
    airline: "SalamAir",
    flight: "OV118",
    date: "27 Jul 2026",
    status: "Requested",
  },
];

const qatarRequests = [
  {
    passenger: "Hina Malik",
    passport: "AB1000502",
    type: "Qatar Family Immigration",
    airline: "Qatar Airways",
    flight: "QR605",
    date: "21 Jul 2026",
    status: "Approved",
  },
];

const bahrainRequests = [
  {
    passenger: "Mariam Khan",
    passport: "AB1000514",
    type: "Bahrain Family Immigration",
    airline: "Gulf Air",
    flight: "GF771",
    date: "24 Jul 2026",
    status: "Approved",
  },
];

function Emigration() {
  const [search, setSearch] = useState("");
  const [activeCard, setActiveCard] = useState(1);
  const [setRequestsData] = useState(travelRequests);
  const [tableTitle, setTableTitle] = useState("All Clearances");
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

  const requestsMap = {
    1: travelRequests,
    2: saudiRequests,
    3: sharjahRequests,
    4: saudiRequests,
    5: dubaiRequests,
    6: qatarRequests,
    7: omanRequests,
    8: bahrainRequests,
  };

  const activeTableData = requestsMap[activeCard] || [];

  const deleteData = (index) => {
    const itemToDelete = activeTableData[index];

    setRequestsData((prev) =>
      prev.filter(
        (item) =>
          !(
            item.name === itemToDelete.name &&
            item.passport === itemToDelete.passport
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
            <h5 className="fw-bold overview-dashboard">
              Emigration / Immigration Clearance
            </h5>
            <p className="text-muted overview-lead fw-bold">
              Track clearance cases by service type
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
              + New Clearance
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
                  <h5 className="fw-bold">New Clearance Case</h5>
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
                    <label className="form-label">Applicant Name</label>
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
                    <label className="form-label">Service Type</label>
                    <select
                      className="form-select sector-wise"
                      value={reschedule.type || ""}
                      onChange={(e) =>
                        setReschedule((prev) => ({
                          ...prev,
                          type: e.target.value,
                        }))
                      }
                    >
                      <option value="">Select type</option>
                      <option value="Saudi Immigration">
                        Saudi Immigration
                      </option>
                      <option value="Saudi Normal Immigration">
                        Saudi Normal Immigration
                      </option>
                      <option value="Saudi Offence Immigration">
                        Saudi Offence Immigration
                      </option>
                      <option value="Dubai Family Immigration">
                        Dubai Family Immigration
                      </option>
                      <option value="Qatar Family Immigration">
                        Qatar Family Immigration
                      </option>
                      <option value="Oman Family Immigration">
                        Oman Family Immigration
                      </option>
                      <option value="Bahrain Family Immigration">
                        Bahrain Family Immigration
                      </option>
                    </select>
                  </div>

                  <div className="col-md-6 mb-1">
                    <label className="form-label">Filed Date</label>
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
                      <option value="" hidden>
                        Select Status
                      </option>
                      <option value="Filed">Filed</option>
                      <option value="In Progress">In Progress</option>
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
                        type: "",
                        airline: "",
                        flightNo: "",
                        flightDate: "",
                        status: "Requested",
                      });
                    }}
                  >
                    Create Case
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
                setTableTitle("All Clearances");
              }}
            >
              <div className="d-flex flex-column">
                <span className="locations-span">All Types</span>
                <span className="mt-2">{travelRequests.length}</span>
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
                setTableTitle("Saudi Emigration");
              }}
            >
              <div className="d-flex flex-column">
                <span className="locations-span">Saudi Emigration</span>
                <span className="mt-2">{saudiRequests.length}</span>
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
                setTableTitle("Saudi Normal Immigration");
              }}
            >
              <div className="d-flex flex-column">
                <span className="locations-span">Saudi Normal Immigration</span>
                <span className="mt-2">{sharjahRequests.length}</span>
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
                setTableTitle("Saudi Offence Immigration");
              }}
            >
              <div className="d-flex flex-column">
                <span className="locations-span">
                  Saudi Offence Immigration
                </span>
                <span className="mt-2">{saudiRequests.length}</span>
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
                setTableTitle("Dubai Family Immigration");
              }}
            >
              <div className="d-flex flex-column">
                <span className="locations-span">Dubai Family Immigration</span>
                <span className="mt-2">{dubaiRequests.length}</span>
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
                setTableTitle("Qatar Family Immigration");
              }}
            >
              <div className="d-flex flex-column">
                <span className="locations-span">Qatar Family Immigration</span>
                <span className="mt-2">{qatarRequests.length}</span>
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
                setTableTitle("Oman Family Immigration");
              }}
            >
              <div className="d-flex flex-column">
                <span className="locations-span">Oman Family Immigration</span>
                <span className="mt-2">{omanRequests.length}</span>
                <span className="requests-span">cases</span>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6 col-md-6 col-12">
            <div
              className={`border pointer-cursor rounded-4 px-3 py-2 h-100 custom-otb ${
                activeCard === 8 ? "active" : ""
              }`}
              onClick={() => {
                setActiveCard(8);
                setTableTitle("Bahrain Family Immigration");
              }}
            >
              <div className="d-flex flex-column">
                <span className="locations-span">
                  Bahrain Family Immigration
                </span>
                <span className="mt-2">{bahrainRequests.length}</span>
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
                  <th>S/N</th>
                  <th>Applicant</th>
                  <th>Passport</th>
                  <th>Type</th>
                  <th>Filed</th>
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
                          {item.passport || "N/A"}
                        </span>
                      </td>

                      <td className="short-name">{item.type || "N/A"}</td>

                      <td className="short-name">{item.airline || "N/A"}</td>

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
                    <td colSpan="7" className="text-center text-muted">
                      No clearances yet.
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

export default Emigration;
