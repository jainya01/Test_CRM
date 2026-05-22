import { useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faEye,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

function CallerExecutive() {
  const callers = [
    {
      rank: 1,
      caller: "John Doe",
      conversion: "70%",
      badge: "Good",
      status: "Active",
    },
    {
      rank: 2,
      caller: "Sarah Khan",
      conversion: "85%",
      badge: "Excellent",
      status: "Active",
    },
    {
      rank: 3,
      caller: "Ali Raza",
      conversion: "65%",
      badge: "Good",
      status: "Inactive",
    },
    {
      rank: 4,
      caller: "Michael Smith",
      conversion: "60%",
      badge: "Average",
      status: "Active",
    },
    {
      rank: 5,
      caller: "Ayesha Malik",
      conversion: "78%",
      badge: "Very Good",
      status: "Active",
    },
    {
      rank: 6,
      caller: "David Johnson",
      conversion: "55%",
      badge: "Average",
      status: "Inactive",
    },
    {
      rank: 7,
      caller: "Fatima Noor",
      conversion: "82%",
      badge: "Excellent",
      status: "Active",
    },
    {
      rank: 8,
      caller: "Usman Tariq",
      conversion: "68%",
      badge: "Good",
      status: "Active",
    },
    {
      rank: 9,
      caller: "Emily Brown",
      conversion: "74%",
      badge: "Very Good",
      status: "Inactive",
    },
    {
      rank: 10,
      caller: "Hassan Ali",
      conversion: "90%",
      badge: "Top Performer",
      status: "Active",
    },
    {
      rank: 11,
      caller: "Imran Shah",
      conversion: "72%",
      badge: "Good",
      status: "Active",
    },
    {
      rank: 12,
      caller: "Nadia Ali",
      conversion: "88%",
      badge: "Excellent",
      status: "Active",
    },
    {
      rank: 13,
      caller: "Zeeshan Malik",
      conversion: "64%",
      badge: "Average",
      status: "Inactive",
    },
    {
      rank: 14,
      caller: "Areeba Khan",
      conversion: "79%",
      badge: "Very Good",
      status: "Active",
    },
    {
      rank: 15,
      caller: "Hamza Raza",
      conversion: "58%",
      badge: "Average",
      status: "Inactive",
    },
    {
      rank: 16,
      caller: "Sana Iqbal",
      conversion: "83%",
      badge: "Excellent",
      status: "Active",
    },
    {
      rank: 17,
      caller: "Bilal Ahmed",
      conversion: "69%",
      badge: "Good",
      status: "Active",
    },
    {
      rank: 18,
      caller: "Hina Noor",
      conversion: "91%",
      badge: "Top Performer",
      status: "Active",
    },
    {
      rank: 19,
      caller: "Usama Khan",
      conversion: "62%",
      badge: "Average",
      status: "Inactive",
    },
    {
      rank: 20,
      caller: "Maria Sheikh",
      conversion: "87%",
      badge: "Excellent",
      status: "Active",
    },
  ];

  const itemsPerPage = 14;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = callers.slice(startIndex, endIndex);
  const totalPages = Math.ceil(callers.length / itemsPerPage);

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
            <h5 className="fw-bold overview-dashboard">Callers</h5>
            <p className="text-muted overview-lead fw-bold">
              {paginatedData.length} callers
            </p>
          </div>

          <div>
            <Link className="text-decoration-none btn new-leader text-nowrap">
              + New Caller
            </Link>
          </div>
        </div>

        <div className="table-wrapper border p-0">
          <div className="table-responsive custom-scrollbar">
            <table className="table table-hover mb-0">
              <thead className="table-success header-table text-nowrap">
                <tr>
                  <th className="py-2">Rank</th>
                  <th>Caller</th>
                  <th>Conversion</th>
                  <th>Performance</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(paginatedData) && paginatedData.length > 0 ? (
                  paginatedData.map((item, index) => (
                    <tr key={item.id || index}>
                      <td>{item.rank || ""}</td>
                      <td>
                        <span className="short-name">
                          {item?.caller || "N/A"}
                        </span>
                      </td>

                      <td className="convert-percent">
                        {item.conversion || ""}
                      </td>

                      <td>
                        {item.badge || ""}
                        {/* <span
                          className={`badge ${
                            item.id === 100
                              ? "bg-success"
                              : item.id >= 80
                                ? "bg-primary"
                                : item.id >= 50
                                  ? "bg-warning text-dark"
                                  : "bg-danger"
                          }`}
                        >
                          {item.id === 100
                            ? "Excellent"
                            : item.id >= 80
                              ? "Good"
                              : item.id >= 50
                                ? "Avg"
                                : "Need Improvement"}
                        </span> */}
                      </td>

                      <td
                        className={
                          item.status === "Active"
                            ? "convert-no"
                            : "convert-call"
                        }
                      >
                        <div className="d-flex align-items-center">
                          <div
                            className={`me-1 ${
                              item.status === "Active"
                                ? "custom-success"
                                : "custom-active"
                            }`}
                          ></div>

                          {item.status || "N/A"}
                        </div>
                      </td>

                      <td className="text-start">
                        <span className="d-flex flex-row flex-nowrap">
                          <Link title="View">
                            <FontAwesomeIcon
                              icon={faEye}
                              className="icons-color2 me-1"
                            />
                          </Link>

                          <Link title="Edit">
                            <FontAwesomeIcon
                              icon={faEdit}
                              className="icons-color"
                            />
                          </Link>

                          <span title="Delete">
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="icons-color1 ps-1"
                            />
                          </span>
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {callers.length > itemsPerPage && (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CallerExecutive;
