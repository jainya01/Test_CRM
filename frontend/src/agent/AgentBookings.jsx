import { useMemo, useState } from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const data = [
  {
    id: 1,
    airline: "Umrah Express Airlines — 10 Days",
    name: "Muhammad Tariq",
    passport: "AB1000000",
    status: "confirmed",
    price: "INR 285,000",
  },
  {
    id: 2,
    airline: "Hajj Connect Airlines — 15 Days",
    name: "Fatima Noor",
    passport: "AB1000003",
    status: "pending",
    price: "INR 310,000",
  },
  {
    id: 3,
    airline: "Saudi Travel Air — 12 Days",
    name: "Usman Raza",
    passport: "AB1000006",
    status: "pending",
    price: "INR 265,000",
  },
  {
    id: 4,
    airline: "Medina Sky Flights — 20 Days",
    name: "Mariam Yusuf",
    passport: "AB1000009",
    status: "confirmed",
    price: "INR 340,000",
  },
  {
    id: 5,
    airline: "Al Safa Air Services — 8 Days",
    name: "Faisal Mehmood",
    passport: "AB1000012",
    status: "pending",
    price: "INR 240,000",
  },
  {
    id: 6,
    airline: "Noor Air International — 14 Days",
    name: "Saima Jamil",
    passport: "AB1000015",
    status: "confirmed",
    price: "INR 295,000",
  },
];

function AgentBookings() {
  const [search, setSearch] = useState("");

  const filteredAgent = useMemo(() => {
    const keyword = search.toLowerCase().trim();
    return data.filter(
      (data) =>
        data.name?.toLowerCase().includes(keyword) ||
        data.airline?.toLowerCase().includes(keyword) ||
        data.passport?.toLowerCase().includes(keyword),
    );
  }, [search]);

  const itemsPerPage = 21;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredAgent.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredAgent.length / itemsPerPage);

  return (
    <>
      <title>My Bookings | CRM Agent Portal</title>
      <meta
        name="description"
        content="Manage booking requests, track customer reservations, view package details, monitor booking status, and handle travel bookings efficiently."
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
                    placeholder="Search by passport, airline name & customer name"
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
            <h5 className="fw-bold overview-dashboard mb-1">Bookings</h5>
            <p className="text-muted overview-lead fw-bold">
              {filteredAgent.length} booking requests
            </p>
          </div>

          {Array.isArray(paginatedData) && paginatedData.length > 0 ? (
            paginatedData.map((user) => (
              <div className="col-12 col-lg-4" key={user.id}>
                <div className="customer-card p-3 border bg-white rounded-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-3">
                      <div>
                        <h5 className="fw-semibold mb-1 customer-name-passport">
                          {user?.airline || "N/A"}
                        </h5>

                        <p className="text-secondary mb-0 customer-phone-passport">
                          Customer: {user?.name || "N/A"} {user?.price || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div>
                      {user.status === "confirmed" && (
                        <button className="btn btn-success fw-semibold btn-verified">
                          Confirmed
                        </button>
                      )}

                      {user.status === "pending" && (
                        <div className="d-flex gap-2">
                          <button className="btn btn-light border fw-semibold btn-pending">
                            Pending
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="text-center py-5 rounded-3">
                No bookings Found
              </div>
            </div>
          )}

          {filteredAgent.length > itemsPerPage && (
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

export default AgentBookings;
