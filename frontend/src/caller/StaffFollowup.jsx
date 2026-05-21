import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCalendar,
  faClock,
  faFire,
  faPhone,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";

function CallerFollowup() {
  const data = [
    {
      id: 1,
      name: "Muhammad Tariq",
      phone: "+92 300 10000",
      service: "Hajj",
    },
    {
      id: 2,
      name: "Zain Abbas",
      phone: "+92 304 10404",
      service: "Hajj",
    },
    {
      id: 3,
      name: "Bilal Hussain",
      phone: "+92 308 10808",
      service: "Hajj",
    },
    {
      id: 4,
      name: "Faisal Mehmood",
      phone: "+92 302 11212",
      service: "Hajj",
    },
    {
      id: 5,
      name: "Kamran Akmal",
      phone: "+92 304 11414",
      service: "Ticket",
    },
    {
      id: 6,
      name: "Muhammad Tariq",
      phone: "+92 306 11616",
      service: "Hajj",
    },
    {
      id: 7,
      name: "Zain Abbas",
      phone: "+92 300 12020",
      service: "Hajj",
    },
    {
      id: 8,
      name: "Bilal Hussain",
      phone: "+92 304 12424",
      service: "Hajj",
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
                <h3 className="mb-1 main-size">Follow-ups</h3>
                <p className="text-muted happened-team fw-medium">
                  Stay on top of every commitment
                </p>
              </div>
            </div>
          </div>

          <div className="row g-2">
            <div className="col-12 bg-white px-3 py-2 rounded-3 mt-4 border">
              <div className="d-flex justify-content-between mt-3 mb-3">
                <div>
                  <span>Missed</span>
                </div>

                <div>
                  <button className="btn text-light rounded-pill bg-danger caller-btn">
                    1
                  </button>
                </div>
              </div>

              {Array.isArray(data) && data.length > 0 ? (
                data.slice(0, 1).map((item) => (
                  <div
                    className="border mt-2 rounded-3 d-flex flex-wrap justify-content-between align-items-center hover-changed"
                    key={item.id}
                  >
                    <div className="d-flex align-items-center px-2 py-2">
                      <div className="flex-grow-1 ms-2">
                        <h5 className="fw-semibold mb-1 customer-name">
                          {item?.name || "N/A"}
                        </h5>

                        <div className="custom-call">
                          <span>{item?.phone || "N/A"}</span>
                          <span className="fw-bold me-1 ms-1">·</span>

                          <span>{item?.service || "N/A"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="ms-2 mb-2 d-flex align-items-center">
                      <span className="callender-date">
                        <FontAwesomeIcon icon={faCalendar} className="me-1" />
                        20/05/2026
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

            <div className="col-12 bg-white px-3 py-2 rounded-3 mt-4 border">
              <div className="d-flex justify-content-between mt-3 mb-3">
                <div>
                  <span>Today</span>
                </div>

                <div>
                  <button className="btn text-light rounded-pill new-length">
                    {data.length}
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
                      <div className="flex-grow-1 ms-2">
                        <h5 className="fw-semibold mb-1 customer-name">
                          {item?.name || "N/A"}
                        </h5>

                        <div className="custom-call">
                          <span>{item?.phone || "N/A"}</span>

                          <span className="fw-bold me-1 ms-1">·</span>

                          <span>{item?.service || "N/A"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="ms-2 mb-2 d-flex align-items-center">
                      <span className="callender-date">
                        <FontAwesomeIcon icon={faCalendar} className="me-1" />
                        21/05/2026
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
          </div>
        </div>
      </div>
    </>
  );
}

export default CallerFollowup;
