import { useEffect, useMemo, useState } from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const data = [
  { id: 1, name: "Ahsan Ali", phone: "+91 300 11001", service: "Hajj" },
  { id: 2, name: "Zoya Khan", phone: "+91 303 22002", service: "Medical" },
  { id: 3, name: "Usman Tariq", phone: "+91 304 33003", service: "Hajj" },
  { id: 4, name: "Hina Shah", phone: "+91 306 44004", service: "Ticket" },
  { id: 5, name: "Ali Raza", phone: "+91 309 55005", service: "Umrah" },
  { id: 6, name: "Sara Mehmood", phone: "+91 302 66006", service: "Hajj" },
  { id: 7, name: "Bilal Ahmed", phone: "+91 304 77007", service: "Ticket" },
  { id: 8, name: "Ayesha Noor", phone: "+91 305 88008", service: "Medical" },
  { id: 9, name: "Hamza Malik", phone: "+91 308 99009", service: "Ticket" },
  {
    id: 10,
    name: "Fatima Zahra",
    phone: "+91 309 101010",
    service: "Medical",
  },
  { id: 11, name: "Imran Shah", phone: "+91 301 111011", service: "Umrah" },
  { id: 12, name: "Khadija Ali", phone: "+91 304 121212", service: "Hajj" },
  {
    id: 13,
    name: "Omar Farooq",
    phone: "+91 307 131313",
    service: "Medical",
  },
  { id: 14, name: "Hassan Iqbal", phone: "+91 311 141414", service: "Umrah" },
  {
    id: 15,
    name: "Mariam Saeed",
    phone: "+91 312 151515",
    service: "Medical",
  },
  { id: 16, name: "Noman Javed", phone: "+91 313 161616", service: "Ticket" },
  {
    id: 17,
    name: "Zainab Hussain",
    phone: "+91 314 171717",
    service: "Hajj",
  },
  { id: 18, name: "Saad Khan", phone: "+91 315 181818", service: "Umrah" },
  {
    id: 19,
    name: "Laiba Sheikh",
    phone: "+91 316 191919",
    service: "Medical",
  },
  { id: 20, name: "Talha Ahmed", phone: "+91 317 202020", service: "Ticket" },
];

function AgentCustomers() {
  const [search, setSearch] = useState("");

  const filteredCustomers = useMemo(() => {
    const keyword = search.toLowerCase();

    return data.filter((item) => {
      return (
        item.name?.toLowerCase().includes(keyword) ||
        item.service?.toLowerCase().includes(keyword) ||
        item.phone?.toLowerCase().includes(keyword)
      );
    });
  }, [search]);

  const itemsPerPage = 24;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredCustomers.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  return (
    <>
      <title>My Customers | CRM Agent Portal</title>
      <meta
        name="description"
        content="Manage customers, track bookings, monitor leads, schedule follow-ups, and access customer details through the CRM Agent Portal."
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
                    placeholder="Search by name, phone & service"
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

        <div className="row mt-2 gx-2 ms-2 me-2 gy-2">
          <div>
            <h5 className="fw-bold overview-dashboard">Customers</h5>
            <p className="text-muted mb-md-0 overview-lead fw-bold">
              {filteredCustomers.length} customers
            </p>
          </div>

          {Array.isArray(paginatedData) && paginatedData.length > 0 ? (
            paginatedData.map((user) => (
              <div
                className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 col-xxl-3"
                key={user.id}
              >
                <div className="customer-card border p-3 bg-white rounded-3 h-100">
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
                      Last: {user?.service || "N/A"} 2025
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-5 rounded-3">No Customers Found</div>
          )}

          {filteredCustomers.length > itemsPerPage && (
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
      </main>
    </>
  );
}

export default AgentCustomers;
