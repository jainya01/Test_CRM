import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faClock,
  faFire,
  faPhone,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";

function CallerDashboard() {
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
                <h3 className="mb-1 main-size">Your day at a glance</h3>
                <p className="text-muted happened-team fw-medium">
                  14 leads assigned · 8 calls due today
                </p>
              </div>
            </div>

            <div className="col-6 col-sm-6 col-md-6 col-lg">
              <div className="card shadow-sm border-0 h-100 rounded-4">
                <div className="card-body d-flex justify-content-between">
                  <div>
                    <p className="card-title-text">Today</p>
                    <h4 className="card-value mb-0">8</h4>
                  </div>

                  <div className="icon-wrapper icon-wrapper1">
                    <FontAwesomeIcon icon={faPhone} />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-6 col-sm-6 col-md-6 col-lg">
              <div className="card shadow-sm border-0 h-100 rounded-4">
                <div className="card-body d-flex justify-content-between">
                  <div>
                    <p className="card-title-text">Missed</p>
                    <h4 className="card-value mb-0">1</h4>
                  </div>

                  <div className="icon-wrapper icon-booking1">
                    <FontAwesomeIcon icon={faWarning} className="text-danger" />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-6 col-sm-6 col-md-6 col-lg">
              <div className="card shadow-sm border-0 h-100 rounded-4">
                <div className="card-body d-flex justify-content-between">
                  <div>
                    <p className="card-title-text">Upcoming</p>
                    <h4 className="card-value mb-0">5</h4>
                  </div>

                  <div className="icon-wrapper icon-check">
                    <FontAwesomeIcon icon={faClock} className="text-dark" />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-6 col-sm-6 col-md-6 col-lg">
              <div className="card shadow-sm border-0 h-100 rounded-4">
                <div className="card-body d-flex justify-content-between">
                  <div>
                    <p className="card-title-text">Hot Leads</p>
                    <h4 className="card-value">5</h4>
                  </div>

                  <div className="icon-wrapper icon-booking1">
                    <FontAwesomeIcon icon={faFire} />
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

export default CallerDashboard;
