import { useMemo, useState } from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faClock,
  faFileCircleCheck,
  faFileCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

function Passport() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [search, setSearch] = useState("");

  const data = [
    {
      id: 1,
      name: "Muhammad Tariq",
      passport: "AB1000000",
      status: "verified",
    },
    {
      id: 2,
      name: "Fatima Noor",
      passport: "AB1000003",
      status: "rejected",
    },
    {
      id: 3,
      name: "Usman Raza",
      passport: "AB1000006",
      status: "pending",
    },
    {
      id: 4,
      name: "Mariam Yusuf",
      passport: "AB1000009",
      status: "verified",
    },
    {
      id: 5,
      name: "Faisal Mehmood",
      passport: "AB1000012",
      status: "rejected",
    },
    {
      id: 6,
      name: "Saima Jamil",
      passport: "AB1000015",
      status: "pending",
    },
    {
      id: 7,
      name: "Imran Malik",
      passport: "AB1000018",
      status: "verified",
    },
    {
      id: 8,
      name: "Hira Sheikh",
      passport: "AB1000021",
      status: "rejected",
    },
    {
      id: 9,
      name: "Bilal Hussain",
      passport: "AB1000024",
      status: "pending",
    },
    {
      id: 10,
      name: "Sana Javed",
      passport: "AB1000027",
      status: "verified",
    },
  ];

  const filteredPassports = useMemo(() => {
    const keyword = search.toLowerCase();

    return data.filter((item) => {
      return (
        item.name?.toLowerCase().includes(keyword) ||
        item.passport?.toLowerCase().includes(keyword) ||
        item.status?.toLowerCase().includes(keyword)
      );
    });
  }, [data, search]);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredPassports.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredPassports.length / itemsPerPage);

  return (
    <main className="content-wrapper">
      <div className="container-fluid border-bottom bg-light pb-2 pt-md-2 pb-lg-1 top-searchbar">
        <div className="row align-items-center">
          <div className="col-10 col-md-11">
            <div className="row align-items-center">
              <div className="col-9 col-md-8 col-lg-6">
                <input
                  type="search"
                  className="form-control sector-wise"
                  placeholder="Search passport, name, phone, PNR..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
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

      <div className="row mt-2 gx-2 ms-2 me-2 gy-2 mb-3">
        <div>
          <h5 className="fw-bold overview-dashboard">Passport Verification</h5>
          <p className="text-muted overview-lead fw-bold">
            {paginatedData.length} passports awaiting review
          </p>
        </div>

        {Array.isArray(paginatedData) && paginatedData.length > 0 ? (
          paginatedData.map((user) => (
            <div className="col-12 col-lg-8" key={user.id}>
              <div className="customer-card p-3 bg-white border rounded-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-3">
                    <div className="status-icon-wrapper">
                      {user.status === "verified" && (
                        <FontAwesomeIcon
                          icon={faFileCircleCheck}
                          className="text-success"
                        />
                      )}

                      {user.status === "rejected" && (
                        <FontAwesomeIcon
                          icon={faFileCircleXmark}
                          className="text-danger"
                        />
                      )}

                      {user.status === "pending" && (
                        <FontAwesomeIcon icon={faClock} className="text-dark" />
                      )}
                    </div>

                    <div>
                      <h5 className="fw-semibold mb-1 customer-name-passport">
                        {user?.name || "N/A"}
                      </h5>

                      <p className="text-secondary mb-0 customer-phone-passport">
                        Passport: {user?.passport || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div>
                    {user.status === "verified" && (
                      <button className="btn btn-success fw-semibold btn-verified">
                        Verified
                      </button>
                    )}

                    {user.status === "rejected" && (
                      <button className="btn btn-danger rounded-pill fw-semibold btn-reject">
                        Rejected
                      </button>
                    )}

                    {user.status === "pending" && (
                      <div className="d-flex gap-2">
                        <button className="btn btn-light fw-semibold btn-pending">
                          Pending
                        </button>

                        <button className="btn fw-semibold border btn-rejected">
                          Reject
                        </button>

                        <button className="btn fw-semibold btn-verify">
                          Verify
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
            <div className="text-center py-5 rounded-3">No passports Found</div>
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
    </main>
  );
}

export default Passport;
