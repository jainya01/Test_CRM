import { useState } from "react";
import "../App.css";
import { faBell, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Leads() {
  const users = [
    {
      id: 1,
      name: "Muhammad Tariq",
      phone: "+92 300 10000",
      Service: "Hajj",
      Source: "John Doe",
      Status: "New",
      Temp: "Hot",
      Followup: "Today",
    },
    {
      id: 2,
      name: "Ayesha Siddiqui",
      phone: "+92 301 10101",
      Service: "Umrah",
      Source: "Sarah Khan",
      Status: "Contacted",
      Temp: "Warm",
      Followup: "in 1d",
    },
    {
      id: 3,
      name: "Imran Malik",
      phone: "+92 302 10202",
      Service: "Ticket",
      Source: "Ali Raza",
      Status: "Interested",
      Temp: "Cold",
      Followup: "in 2d",
    },
    {
      id: 4,
      name: "Fatima Noor",
      phone: "+92 303 10303",
      Service: "Medical",
      Source: "Michael Smith",
      Status: "Not Interested",
      Temp: "Hot",
      Followup: "in 3d",
    },
    {
      id: 5,
      name: "Zain Abbas",
      phone: "+92 304 10404",
      Service: "Hajj",
      Source: "Ayesha Malik",
      Status: "Converted",
      Temp: "Warm",
      Followup: "Today",
    },
    {
      id: 6,
      name: "Hira Sheikh",
      phone: "+92 305 10505",
      Service: "Umrah",
      Source: "David Johnson",
      Status: "New",
      Temp: "Cold",
      Followup: "Missed 1d",
    },
    {
      id: 7,
      name: "Ayesha Khan",
      phone: "+92 311 4455667",
      Service: "Hajj",
      Source: "Fatima Noor",
      Status: "Contacted",
      Temp: "Warm",
      Followup: "Today",
    },
    {
      id: 8,
      name: "Bilal Ahmed",
      phone: "+92 300 7788991",
      Service: "Umrah",
      Source: "Usman Tariq",
      Status: "New",
      Temp: "Cold",
      Followup: "Missed 2d",
    },
    {
      id: 9,
      name: "Sara Malik",
      phone: "+92 322 5566778",
      Service: "Visa",
      Source: "Emily Brown",
      Status: "Qualified",
      Temp: "Hot",
      Followup: "Tomorrow",
    },
  ];

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = users.slice(startIndex, endIndex);
  const totalPages = Math.ceil(users.length / itemsPerPage);

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
        <div className="d-flex justify-content-between">
          <div>
            <h5 className="fw-bold overview-dashboard">Leads</h5>
            <p className="text-muted overview-lead fw-bold">
              {paginatedData.length} of {paginatedData.length} leads
            </p>
          </div>

          <div>
            <Link className="text-decoration-none btn new-leader text-nowrap">
              + New Lead
            </Link>
          </div>
        </div>

        <div className="d-flex align-items-center flex-wrap justify-content-between gap-3 p-3 rounded-3 border">
          <div className="flex-grow-1">
            <input
              type="search"
              className="form-control sector-wise"
              placeholder="Search name, phone, passport, city..."
            />
          </div>

          <div className="d-flex align-items-center gap-2 p-1 rounded-4">
            <select className="form-select rounded-3 sector-wise">
              <option value="">All</option>
              <option value="Hajj">Hajj</option>
              <option value="Umrah">Umrah</option>
              <option value="Ticket">Ticket</option>
              <option value="Medical">Medical</option>
              <option value="Converted">Converted</option>
            </select>
          </div>

          <div>
            <select className="form-select rounded-3 sector-wise">
              <option value="">All</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Interested">Interested</option>
              <option value="Not Interested">Not Interested</option>
              <option value="Converted">Converted</option>
            </select>
          </div>
        </div>

        <div className="table-wrapper border p-0">
          <div className="table-responsive custom-scrollbar">
            <table className="table table-hover mb-0">
              <thead className="table-success header-table text-nowrap">
                <tr>
                  <th>Lead</th>
                  <th>Service</th>
                  <th>Source</th>
                  <th>Status</th>
                  <th>Temperature</th>
                  <th>Follow-up</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="body-table">
                {Array.isArray(paginatedData) && paginatedData.length > 0 ? (
                  paginatedData.map((data) => (
                    <tr key={data.id}>
                      <td className="d-flex flex-column">
                        <span className="name-span">{data.name || "--"}</span>

                        <span className="phone-span">{data.phone || "--"}</span>
                      </td>

                      <td>
                        <span className="service-border">
                          {data.Service || "--"}
                        </span>
                      </td>

                      <td className="text-muted walk-source">
                        {data.Source || "--"}
                      </td>

                      <td>
                        <span
                          className={
                            {
                              "Follow-up": "follow-up cus-res",
                              "Not Interested": "non-interested-cust cus-res",
                              Interested: "interested-cust cus-res",
                              Contacted: "convert-status cus-res",
                              New: "new-customer cus-res",
                              Converted: "convert-status cus-res",
                            }[data.Status] || ""
                          }
                        >
                          {data.Status || "--"}
                        </span>
                      </td>

                      <td>
                        <span
                          className={
                            {
                              Hot: "hot-up hot-res",
                              Warm: "warm-up hot-res",
                              Cold: "cold-status hot-res",
                            }[data.Temp] || ""
                          }
                        >
                          {data.Temp === "Hot" && "🔥 "}
                          {data.Temp || "--"}
                        </span>
                      </td>

                      <td>
                        <span
                          className={
                            data.Followup === "Today"
                              ? "follow-today follow-to"
                              : data.Followup === "Missed 1d"
                                ? "follow-missed follow-to"
                                : ""
                          }
                        >
                          {data.Followup || "--"}
                        </span>
                      </td>

                      <td>
                        <Link className="opened-box text-decoration-none text-dark fw-bold text-nowrap">
                          <FontAwesomeIcon icon={faPhone} /> Open
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No Data Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {users.length > itemsPerPage && (
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

export default Leads;
