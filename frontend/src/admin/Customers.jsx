import { useEffect, useMemo, useState } from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const data = [
  {
    id: 1,
    name: "Mohammad Tariq",
    phone: "+91 300 10000",
    service: "Hajj",
  },
  {
    id: 2,
    name: "Fatima Noor",
    phone: "+91 303 10303",
    service: "Medical",
  },
  {
    id: 3,
    name: "Zain Abbas",
    phone: "+91 304 10404",
    service: "Hajj",
  },
  {
    id: 4,
    name: "Usman Raza",
    phone: "+91 306 10606",
    service: "Ticket",
  },
  {
    id: 5,
    name: "Mariam Yusuf",
    phone: "+91 309 10909",
    service: "Umrah",
  },
  {
    id: 6,
    name: "Faisal Mahmood",
    phone: "+91 302 11212",
    service: "Hajj",
  },
  {
    id: 7,
    name: "Kamran Akmal",
    phone: "+91 304 11414",
    service: "Ticket",
  },
  {
    id: 8,
    name: "Saima Jamil",
    phone: "+91 305 11515",
    service: "Medical",
  },
  {
    id: 9,
    name: "Imran Malik",
    phone: "+91 308 11818",
    service: "Ticket",
  },
  {
    id: 10,
    name: "Fatima Noor",
    phone: "+91 309 11919",
    service: "Medical",
  },
  {
    id: 11,
    name: "Hira Sheikh",
    phone: "+91 301 12121",
    service: "Umrah",
  },
  {
    id: 12,
    name: "Bilal Hussain",
    phone: "+91 304 12424",
    service: "Hajj",
  },
  {
    id: 13,
    name: "Sana Javed",
    phone: "+91 307 12727",
    service: "Medical",
  },
  {
    id: 14,
    name: "Ahmed Khan",
    phone: "+91 311 1414141",
    service: "Umrah",
  },
  {
    id: 15,
    name: "Ayesha Malik",
    phone: "+91 312 1515151",
    service: "Medical",
  },
  {
    id: 16,
    name: "Hassan Raza",
    phone: "+91 313 1616161",
    service: "Ticket",
  },
  {
    id: 17,
    name: "Noor Fatima",
    phone: "+91 314 1717171",
    service: "Hajj",
  },
  {
    id: 18,
    name: "Ali Hamza",
    phone: "+91 315 1818181",
    service: "Umrah",
  },
  {
    id: 19,
    name: "Zoya Sheikh",
    phone: "+91 316 1919191",
    service: "Medical",
  },
  {
    id: 20,
    name: "Talha Javed",
    phone: "+91 317 2020202",
    service: "Ticket",
  },
];

function Customers() {
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
      <title>Associated Customers | CRM Portal</title>
      <meta
        name="description"
        content="Manage agent-linked customers, track bookings, lead status, follow-ups, services, and interactions through the CRM Agent Management Portal."
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
                <div className="notification-corner bg-danger">0</div>
              </button>

              <div className="text-nowrap ms-2 date-days">
                {new Date()
                  .toLocaleDateString("en-GB", {
                    weekday: "short",
                    day: "2-digit",
                    month: "short",
                  })
                  .replace(",", "")}
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-2 gx-2 ms-2 me-2 gy-2">
          <div>
            <h5 className="fw-bold overview-dashboard mb-1">Customers</h5>
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
                <div className="customer-card p-3 border bg-white rounded-3 h-100">
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
                    <div className="badge rounded-pill text-dark border service-badge d-flex align-items-center">
                      {user?.service || "N/A"}
                    </div>

                    <div className="last-service text-end text-muted">
                      Last: {user?.service || "N/A"} 2025
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-2 rounded-3">No Customers Found</div>
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

              <div className="fw-semibold px-2">
                Page {currentPage} of {totalPages}
              </div>

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

export default Customers;
