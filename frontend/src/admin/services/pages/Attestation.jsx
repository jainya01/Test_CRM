import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const allAttestations = [
  {
    id: 1,
    passenger: "Muhammad Tariq",
    passport: "AB1000234",
    destination: "Degree Certificate Attestation",
    date: "5 Jul 2026",
    status: "In Process",
  },
  {
    id: 2,
    passenger: "Ayesha Siddiqui",
    passport: "AB1000255",
    destination: "Marriage Certificate Attestation",
    date: "2 Jul 2026",
    status: "Completed",
  },
  {
    id: 3,
    passenger: "Imran Malik",
    passport: "AB1000267",
    destination: "Nikahnama Attestation",
    date: "8 Jul 2026",
    status: "Received",
  },
];

const degreeCertificateRequests = [
  {
    passenger: "Kamran Akmal",
    passport: "AB1000401",
    destination: "Degree Certificate Attestation",
    date: "14 Jul 2026",
    status: "Approved",
  },
];

const marriageCertificateRequests = [
  {
    passenger: "Saima Jamil",
    passport: "AB1000410",
    destination: "Marriage Certificate Attestation",
    date: "16 Jul 2026",
    status: "Requested",
  },
];

const nikahnamaRequests = [
  {
    passenger: "Ahmed Raza",
    passport: "AB1000425",
    destination: "Nikahnama Attestation",
    date: "18 Jul 2026",
    status: "Approved",
  },
];

const powerOfAttorneyRequests = [
  {
    passenger: "Ali Hassan",
    passport: "AB1000455",
    destination: "Power of Attorney Attestation",
    date: "20 Jul 2026",
    status: "Requested",
  },
];

const birthCertificateRequests = [
  {
    passenger: "Hina Malik",
    passport: "AB1000502",
    destination: "Birth Certificate Attestation",
    date: "21 Jul 2026",
    status: "Approved",
  },
];

const commercialDocumentRequests = [
  {
    passenger: "Mariam Khan",
    passport: "AB1000514",
    destination: "Commercial Document Attestation",
    date: "24 Jul 2026",
    status: "Approved",
  },
];

function Attestation() {
  const [search, setSearch] = useState("");
  const [activeCard, setActiveCard] = useState(1);
  const [tableTitle, setTableTitle] = useState("All Requests");

  const requestsMap = {
    1: allAttestations,
    2: degreeCertificateRequests,
    3: marriageCertificateRequests,
    4: nikahnamaRequests,
    5: powerOfAttorneyRequests,
    6: birthCertificateRequests,
    7: commercialDocumentRequests,
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
                  placeholder="Search by applicant name"
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
            <h5 className="fw-bold overview-dashboard">Document Attestation</h5>
            <p className="text-muted overview-lead fw-bold">
              Track attestation cases by document type
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
              + New Attestation
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
                  <h5 className="fw-bold">New Attestation Case</h5>
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
                      <option value="">Select Service</option>
                      <option value="Degree Certificate Attestation">
                        Degree Certificate Attestation
                      </option>
                      <option value="Marriage Certificate Attestation">
                        Marriage Certificate Attestation
                      </option>
                      <option value="Nikahnama Attestation">
                        Nikahnama Attestation
                      </option>
                      <option value="Power of Attorney Attestation">
                        Power of Attorney Attestation
                      </option>
                      <option value="Birth Certificate Attestation">
                        Birth Certificate Attestation
                      </option>
                      <option value="Commercial Document Attestation">
                        Commercial Document Attestation
                      </option>
                    </select>
                  </div>

                  <div className="col-md-6 mb-1">
                    <label className="form-label">Submitted Date</label>
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
                      <option value="Received">Received</option>
                      <option value="In Process">In Process</option>
                      <option value="Completed">Completed</option>
                      <option value="Delivered">Delivered</option>
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
                <span className="locations-span">
                  Degree Certificate Attestation
                </span>
                <span className="mt-2">{allRequests[2].length}</span>
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
                <span className="locations-span">
                  Marriage Certificate Attestation
                </span>
                <span className="mt-2">{allRequests[3].length}</span>
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
                <span className="locations-span">Nikahnama Attestation</span>
                <span className="mt-2">{allRequests[4].length}</span>
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
                <span className="locations-span">
                  Power of Attorney Attestation
                </span>
                <span className="mt-2">{allRequests[5].length}</span>
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
                <span className="locations-span">
                  Birth Certificate Attestation
                </span>
                <span className="mt-2">{allRequests[6].length}</span>
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
                <span className="locations-span">
                  Commercial Document Attestation
                </span>
                <span className="mt-2">{allRequests[7].length}</span>
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
                  <th>Submitted</th>
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

                      <td className="short-name">
                        {item.destination || "N/A"}
                      </td>

                      <td className="short-name">{item.date || "N/A"}</td>

                      <td
                        className={
                          item.status === "In Process" ||
                          item.status === "Completed" ||
                          item.status === "Approved" ||
                          item.status === "Requested" ||
                          item.status === "Received"
                            ? "convert-no"
                            : "convert-call"
                        }
                      >
                        <div className="d-flex align-items-center">
                          <div
                            className={`status-dot me-1 ${
                              item.status === "Approved" ? "custom-no" : ""
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

export default Attestation;
