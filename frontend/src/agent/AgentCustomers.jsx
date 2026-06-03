import { useState } from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

function AgentCustomers() {
  const data = [
    { id: 1, name: "Ahsan Ali", phone: "+92 300 11001", service: "Hajj" },
    { id: 2, name: "Zoya Khan", phone: "+92 303 22002", service: "Medical" },
    { id: 3, name: "Usman Tariq", phone: "+92 304 33003", service: "Hajj" },
    { id: 4, name: "Hina Shah", phone: "+92 306 44004", service: "Ticket" },
    { id: 5, name: "Ali Raza", phone: "+92 309 55005", service: "Umrah" },
    { id: 6, name: "Sara Mehmood", phone: "+92 302 66006", service: "Hajj" },
    { id: 7, name: "Bilal Ahmed", phone: "+92 304 77007", service: "Ticket" },
    { id: 8, name: "Ayesha Noor", phone: "+92 305 88008", service: "Medical" },
    { id: 9, name: "Hamza Malik", phone: "+92 308 99009", service: "Ticket" },
    {
      id: 10,
      name: "Fatima Zahra",
      phone: "+92 309 101010",
      service: "Medical",
    },
    { id: 11, name: "Imran Shah", phone: "+92 301 111011", service: "Umrah" },
    { id: 12, name: "Khadija Ali", phone: "+92 304 121212", service: "Hajj" },
    {
      id: 13,
      name: "Omar Farooq",
      phone: "+92 307 131313",
      service: "Medical",
    },
    { id: 14, name: "Hassan Iqbal", phone: "+92 311 141414", service: "Umrah" },
    {
      id: 15,
      name: "Mariam Saeed",
      phone: "+92 312 151515",
      service: "Medical",
    },
    { id: 16, name: "Noman Javed", phone: "+92 313 161616", service: "Ticket" },
    {
      id: 17,
      name: "Zainab Hussain",
      phone: "+92 314 171717",
      service: "Hajj",
    },
    { id: 18, name: "Saad Khan", phone: "+92 315 181818", service: "Umrah" },
    {
      id: 19,
      name: "Laiba Sheikh",
      phone: "+92 316 191919",
      service: "Medical",
    },
    { id: 20, name: "Talha Ahmed", phone: "+92 317 202020", service: "Ticket" },
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
          <h5 className="fw-bold overview-dashboard">Customers</h5>
          <p className="text-muted mb-md-0 overview-lead fw-bold">
            {paginatedData.length} customers
          </p>
        </div>

        {Array.isArray(paginatedData) && paginatedData.length > 0 ? (
          paginatedData.map((user) => (
            <div
              className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 col-xxl-3"
              key={user.id}
            >
              <div className="customer-card p-3 bg-white rounded-3 h-100">
                <div className="d-flex align-items-start gap-2">
                  <div className="avatar-circle">
                    {user?.name?.charAt(0) || "N"}
                  </div>

                  <div className="flex-grow-1">
                    <h5 className="fw-semibold mb-1 customer-name">
                      {user?.name || "N/A"}
                    </h5>

                    <p className="text-secondary customer-phone">
                      {user?.phone || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="d-flex justify-content-between">
                  <span className="badge rounded-pill text-dark border service-badge d-flex align-items-center">
                    {user?.service || "N/A"}
                  </span>

                  <span className="last-service text-end text-muted">
                    Last: Umrah 2023
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-5 rounded-3">No Customers Found</div>
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

export default AgentCustomers;
