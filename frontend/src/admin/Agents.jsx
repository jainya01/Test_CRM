import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../App.css";

function Agents() {
  const data = [
    {
      id: 1,
      name: "Hassan Travels",
      email: "agent@travel.com",
      status: "Active",
      customers: 5,
      bookings: 3,
    },
    {
      id: 2,
      name: "Al Noor Travels",
      email: "info@alnoor.com",
      status: "Inactive",
      customers: 8,
      bookings: 2,
    },
    {
      id: 3,
      name: "Skyline Tours",
      email: "contact@skyline.com",
      status: "Active",
      customers: 12,
      bookings: 7,
    },
    {
      id: 4,
      name: "Royal Travel Agency",
      email: "support@royaltravel.com",
      status: "Active",
      customers: 20,
      bookings: 15,
    },
    {
      id: 5,
      name: "Dream Holidays",
      email: "info@dreamholidays.com",
      status: "Inactive",
      customers: 4,
      bookings: 1,
    },
    {
      id: 6,
      name: "Air Link Travels",
      email: "airlink@travel.com",
      status: "Active",
      customers: 10,
      bookings: 6,
    },
    {
      id: 7,
      name: "Global Wings",
      email: "global@wings.com",
      status: "Active",
      customers: 18,
      bookings: 9,
    },
    {
      id: 8,
      name: "Elite Travel Hub",
      email: "elite@travelhub.com",
      status: "Inactive",
      customers: 6,
      bookings: 2,
    },
    {
      id: 9,
      name: "Pearl Travels",
      email: "info@pearltravels.com",
      status: "Active",
      customers: 14,
      bookings: 11,
    },
    {
      id: 10,
      name: "Starline Tours",
      email: "contact@starline.com",
      status: "Active",
      customers: 9,
      bookings: 4,
    },
    {
      id: 11,
      name: "Moonlight Travels",
      email: "moonlight@travel.com",
      status: "Inactive",
      customers: 7,
      bookings: 2,
    },
    {
      id: 12,
      name: "Blue Sky Agency",
      email: "bluesky@agency.com",
      status: "Active",
      customers: 16,
      bookings: 10,
    },
    {
      id: 13,
      name: "Everest Tours",
      email: "everest@tours.com",
      status: "Active",
      customers: 11,
      bookings: 5,
    },
    {
      id: 14,
      name: "Falcon Travels",
      email: "falcon@travel.com",
      status: "Inactive",
      customers: 3,
      bookings: 1,
    },
    {
      id: 15,
      name: "Sunrise Holidays",
      email: "sunrise@holidays.com",
      status: "Active",
      customers: 22,
      bookings: 18,
    },
    {
      id: 16,
      name: "Ocean View Travels",
      email: "ocean@view.com",
      status: "Active",
      customers: 13,
      bookings: 6,
    },
  ];

  const itemsPerPage = 24;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);

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

      <div className="row mt-2 gx-2 ms-2 me-2 gy-2">
        <div>
          <h5 className="fw-bold overview-dashboard">Agents</h5>
          <p className="text-muted overview-lead fw-bold">B2B partners</p>
        </div>

        {Array.isArray(paginatedData) && paginatedData.length > 0 ? (
          paginatedData.map((user) => (
            <div
              className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 col-xxl-3"
              key={user.id}
            >
              <div className="customer-card p-3 bg-white rounded-3 h-100">
                <div className="d-flex align-items-start gap-3">
                  <div className="avatar-circle avatar-agents">
                    {user?.name?.charAt(0) || "N"}
                  </div>

                  <div className="flex-grow-1">
                    <h5 className="fw-semibold mb-1 customer-name">
                      {user?.name || "N/A"}
                    </h5>

                    <p className="text-secondary customer-phone">
                      {user?.email || "N/A"}
                    </p>
                  </div>

                  <div className="d-flex mt-2">
                    <span
                      className={
                        user?.status === "Active"
                          ? "active-status status-per"
                          : user?.status === "Inactive"
                            ? "inactive-status status-per"
                            : ""
                      }
                    >
                      {user?.status || "N/A"}
                    </span>
                  </div>
                </div>

                <hr className="mt-1 mb-2" />

                <div className="d-flex justify-content-between">
                  <div className="d-flex flex-column">
                    <span className="agents-data">Customers</span>
                    <span>{user?.customers || "N/A"}</span>
                  </div>

                  <div className="d-flex flex-column">
                    <span className="agents-data">Bookings</span>
                    <span>{user?.bookings || "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="">
            <div className="text-center py-5 rounded-3">No Customers Found</div>
          </div>
        )}

        {data.length > itemsPerPage && (
          <div className="d-flex justify-content-center align-items-center flex-wrap mt-3 mb-3 gap-2">
            <button
              className={`btn rounded-pill px-3 py-1 shadow-sm ${
                currentPage <= 1
                  ? "btn-light border text-muted"
                  : "btn-success border-0"
              }`}
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
        )}
      </div>
    </div>
  );
}

export default Agents;
