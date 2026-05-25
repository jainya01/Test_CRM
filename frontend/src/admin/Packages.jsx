import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUsers, faWarning } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../App.css";

function Packages() {
  const [active, setActive] = useState("All");
  const tabs = ["All", "Hajj", "Umrah", "Ticket", "Medical"];

  const data = [
    {
      service: "Hajj",
      status: "Trending",
      package_name: "Premium Hajj 2026 — 40 Days",
      remaining_days: "40 days",
      price: "INR 1850k",
      seats: "12 seats left",
    },
    {
      service: "Hajj",
      status: "",
      package_name: "Economy Hajj — Shifting",
      remaining_days: "35 days",
      price: "INR 1250k",
      seats: "30 seats left",
    },
    {
      service: "Umrah",
      status: "Trending",
      package_name: "Umrah Express — 10 Days",
      remaining_days: "10 days",
      price: "INR 285k",
      seats: "8 seats left",
      alert_days: "5d",
    },
    {
      service: "Umrah",
      status: "",
      package_name: "Umrah Family Package — 14 Days",
      remaining_days: "14 days",
      price: "INR 425k",
      seats: "24 seats left",
    },
    {
      service: "Umrah",
      status: "Trending",
      package_name: "Ramadan Umrah Special",
      remaining_days: "15 days",
      price: "INR 540k",
      seats: "6 seats left",
      alert_days: "3d",
    },
    {
      service: "Ticket",
      status: "",
      package_name: "Dubai-Jeddah Return Ticket",
      remaining_days: "Open",
      price: "INR 95k",
      seats: "50 seats left",
    },
    {
      service: "Medical",
      status: "",
      package_name: "Medical Visa — Thailand",
      remaining_days: "21 days",
      price: "INR 320k",
      seats: "10 seats left",
    },
    {
      service: "Medical",
      status: "",
      package_name: "Medical Visa — Turkey",
      remaining_days: "30 days",
      price: "INR 410k",
      seats: "4 seats left",
      alert_days: "2d",
    },
  ];

  const getServiceClass = (service) => {
    switch (service) {
      case "Hajj":
        return "hajj-premium";
      case "Umrah":
        return "umrah-premium";
      case "Ticket":
        return "ticket-premium";
      case "Medical":
        return "medical-premium";
      default:
        return "";
    }
  };

  const filteredData =
    active === "All" ? data : data.filter((item) => item.service === active);

  return (
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
        <div className="d-flex justify-content-between flex-wrap">
          <div>
            <h5 className="fw-bold overview-dashboard">Packages</h5>
            <p className="text-muted overview-lead fw-bold">
              {filteredData.length} active packages
            </p>
          </div>

          <div>
            <Link className="text-decoration-none btn new-leader text-nowrap">
              + New Package
            </Link>
          </div>
        </div>

        <div className="d-flex flex-wrap flex-md-nowrap gap-2 border custom-packages mt-2">
          {tabs.map((tab) => (
            <div
              key={tab}
              onClick={() => setActive(tab)}
              className={`custom-pad ${
                active === tab
                  ? "bg-white shadow-sm fw-bold text-dark custom-styles"
                  : "text-secondary custom-styles"
              }`}
            >
              {tab}
            </div>
          ))}
        </div>

        <div className="row g-2 mt-3">
          {Array.isArray(filteredData) && filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <div className="col-12 col-sm-6 col-md-6 col-lg-3" key={index}>
                <div className="border rounded-3 h-100">
                  <div
                    className={`rounded-3 common-code ${getServiceClass(item.service)}`}
                  >
                    <span className="d-flex flex-wrap">
                      <div className="hajj-package ms-2">{item.service}</div>

                      {item.status === "Trending" && (
                        <div className="hajj-trend ms-2">🔥 Trending</div>
                      )}

                      <div className="hajj-trend ms-auto me-2">
                        <FontAwesomeIcon icon={faWarning} className="me-1" />
                        2d
                      </div>
                    </span>
                  </div>

                  <div className="mt-2 px-3 py-1">
                    <div className="package-name">{item.package_name}</div>
                    <div className="ramains-day">{item.remaining_days}</div>

                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                      <div className="d-flex flex-column">
                        <div className="price-package mt-2">{item.price}</div>
                        <div className="seats-left mt-1 mb-2">
                          <FontAwesomeIcon icon={faUsers} className="me-2" />
                          {item.seats}
                        </div>
                      </div>

                      <div>
                        <button className="btn new-leader px-2 py-1 new-books">
                          Book
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center w-100 mt-3 text-muted">
              No packages available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Packages;
