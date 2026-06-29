import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faClock,
  faFire,
  faPhone,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";

function StaffDashboard() {
  const data = [
    {
      id: 1,
      name: "Muhammad Tariq",
      phone: "+91 300 10000",
      city: "Dubai",
      service: "Hajj",
      status: "Hot",
      lead: "New",
    },
    {
      id: 2,
      name: "Zain Abbas",
      phone: "+91 304 10404",
      city: "Abu Dhabi",
      service: "Hajj",
      status: "Warm",
      lead: "Interested",
    },
    {
      id: 3,
      name: "Bilal Hussain",
      phone: "+91 308 10808",
      city: "Sharjah",
      service: "Hajj",
      status: "Cold",
      lead: "Converted",
    },
    {
      id: 4,
      name: "Faisal Mehmood",
      phone: "+91 302 11212",
      city: "Ajman",
      service: "Hajj",
      status: "Hot",
      lead: "Contacted",
    },
    {
      id: 5,
      name: "Kamran Akmal",
      phone: "+91 304 11414",
      city: "Ras Al Khaimah",
      service: "Ticket",
      status: "Cold",
      lead: "Not Interested",
    },
    {
      id: 6,
      name: "Muhammad Tariq",
      phone: "+91 306 11616",
      city: "Fujairah",
      service: "Hajj",
      status: "Warm",
      lead: "New",
    },
    {
      id: 7,
      name: "Zain Abbas",
      phone: "+91 300 12020",
      city: "Umm Al Quwain",
      service: "Hajj",
      status: "Cold",
      lead: "Interested",
    },
    {
      id: 8,
      name: "Bilal Hussain",
      phone: "+91 304 12424",
      city: "Al Ain",
      service: "Hajj",
      status: "Hot",
      lead: "Converted",
    },
  ];

  return (
    <>
      <title>Staff Dashboard | CRM Staff Portal</title>
      <meta
        name="description"
        content="Manage assigned leads, track daily calls, monitor follow-ups, view hot prospects, update lead status, and stay productive with real-time sales insights."
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
                    placeholder="Search by name & service"
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
                <h3 className="mb-1 main-size">Your day at a glance</h3>
                <p className="text-muted happened-team fw-medium">
                  14 leads assigned · 8 calls due today
                </p>
              </div>
            </div>

            <div className="col-6 col-sm-6 col-md-6 col-lg">
              <div className="card shadow-sm border-0 h-100 rounded-4 custom-card">
                <div className="card-body d-flex justify-content-between">
                  <div>
                    <p className="card-title-text">Today</p>
                    <h4 className="card-value mb-0">8</h4>
                  </div>

                  <div className="icon-wrapper icon-phone border text-light">
                    <FontAwesomeIcon icon={faPhone} />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-6 col-sm-6 col-md-6 col-lg">
              <div className="card shadow-sm border-0 h-100 rounded-4 custom-card1">
                <div className="card-body d-flex justify-content-between">
                  <div>
                    <p className="card-title-text">Missed</p>
                    <h4 className="card-value mb-0">1</h4>
                  </div>

                  <div className="icon-wrapper icon-booking1 border">
                    <FontAwesomeIcon icon={faWarning} className="text-light" />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-6 col-sm-6 col-md-6 col-lg">
              <div className="card shadow-sm border-0 h-100 rounded-4 custom-card2">
                <div className="card-body d-flex justify-content-between">
                  <div>
                    <p className="card-title-text">Upcoming</p>
                    <h4 className="card-value mb-0">5</h4>
                  </div>

                  <div className="icon-wrapper icon-check border">
                    <FontAwesomeIcon icon={faClock} className="text-dark" />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-6 col-sm-6 col-md-6 col-lg">
              <div className="card shadow-sm border-0 h-100 rounded-4 custom-card3">
                <div className="card-body d-flex justify-content-between">
                  <div>
                    <p className="card-title-text">Hot Leads</p>
                    <h4 className="card-value">5</h4>
                  </div>

                  <div className="icon-wrapper icon-booking1 border">
                    <FontAwesomeIcon icon={faFire} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-2">
            <div className="col-12 bg-white px-3 py-2 rounded-3 mt-4 border">
              <div className="d-flex justify-content-between mt-3 mb-3">
                <div>
                  <FontAwesomeIcon icon={faPhone} className="me-2" />
                  <span>Today's calls</span>
                </div>

                <div>
                  <button className="btn btn-light fw-semibold btn-caller">
                    8 Pending
                  </button>
                </div>
              </div>

              {Array.isArray(data) && data.length > 0 ? (
                data.map((item) => (
                  <div
                    className="border mt-2 rounded-3 d-flex flex-wrap justify-content-between align-items-center hover-changed"
                    key={item.id}
                  >
                    <div className="d-flex align-items-center px-2 py-2">
                      <div className="avatar-circle avatar-caller">
                        {item?.name?.charAt(0) || "N"}
                      </div>

                      <div className="flex-grow-1 ms-2">
                        <h5 className="fw-semibold mb-1 customer-name">
                          {item?.name || "N/A"}
                        </h5>

                        <div className="custom-call">
                          <span>{item?.phone || "N/A"}</span>
                          <span className="fw-bold me-1 ms-1">·</span>

                          <span>{item?.city || "N/A"}</span>
                          <span className="fw-bold me-1 ms-1">·</span>

                          <span>{item?.service || "N/A"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="ms-2 mb-2">
                      <span
                        className={
                          {
                            Hot: "hot-up hot-res",
                            Warm: "warm-up hot-res",
                            Cold: "cold-status hot-res",
                          }[item?.status] || ""
                        }
                      >
                        {item?.status === "Hot" && "🔥 "}
                        {item?.status || "--"}
                      </span>

                      <div className="btn new-call me-2 ms-2">
                        <FontAwesomeIcon icon={faPhone} className="me-2" />
                        Call
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <h6 className="mb-1">No Data Found</h6>
                  <p className="text-muted mb-0">
                    There are no customers available right now.
                  </p>
                </div>
              )}
            </div>

            <div className="col-12 bg-white px-3 py-2 rounded-3 mt-3 border">
              <div className="d-flex justify-content-between mt-2 mb-3">
                <div>
                  <span>All my leads</span>
                </div>
              </div>

              {Array.isArray(data) && data.length > 0 ? (
                data.map((item) => (
                  <div
                    className="mt-2 px-2 pb-2 rounded-3 d-flex flex-wrap pb-1 justify-content-between align-items-center hover-changed"
                    key={item.id}
                  >
                    <div className="d-flex align-items-center py-2">
                      <div className="flex-grow-1 ms-2">
                        <h5 className="fw-semibold mb-1 customer-name">
                          {item?.name || "N/A"}
                        </h5>

                        <div className="custom-call">
                          <span>{item?.phone || "N/A"}</span> ·{" "}
                          <span>{item?.city || "N/A"}</span> ·{" "}
                          <span>{item?.service || "N/A"}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <span
                        className={
                          {
                            "Follow-up": "follow-up cus-res",
                            "Not Interested": "non-interested-cust cus-res",
                            Interested: "interested-cust cus-res",
                            Contacted: "convert-status cus-res",
                            New: "new-customer cus-res",
                            Converted: "convert-status cus-res",
                          }[item?.lead] || ""
                        }
                      >
                        {item?.lead || "--"}
                      </span>

                      <span
                        className={
                          {
                            Hot: "hot-up hot-res ms-2",
                            Warm: "warm-up hot-res ms-2",
                            Cold: "cold-status hot-res ms-2",
                          }[item?.status] || ""
                        }
                      >
                        {item?.status === "Hot" && "🔥 "}
                        {item?.status || "--"}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <h6 className="mb-1">No Data Found</h6>
                  <p className="text-muted mb-0">
                    There are no customers available right now.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default StaffDashboard;
