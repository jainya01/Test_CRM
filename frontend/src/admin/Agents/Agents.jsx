import { useEffect, useMemo, useState } from "react";
import "../../App.css";
import { authHeader } from "../../utils/authHeader";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Agents() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [search, setSearch] = useState("");
  const [agents, setAgents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const agentsData = async () => {
      try {
        const response = await axios.get(`${API_URL}/allagents`, {
          headers: authHeader(),
        });
        setAgents(response.data.result || []);
      } catch (error) {
        console.error("error", error);
      }
    };

    agentsData();
  }, [API_URL]);

  const filteredAgents = useMemo(() => {
    const keyword = search.toLowerCase();

    return agents.filter((item) => {
      return (
        item.fullname?.toLowerCase().includes(keyword) ||
        item.email?.toLowerCase().includes(keyword) ||
        item.status?.toLowerCase() === keyword
      );
    });
  }, [agents, search]);

  const itemsPerPage = 20;
  const totalPages = Math.ceil(filteredAgents.length / itemsPerPage);
  const page = Math.min(currentPage, Math.max(totalPages, 1));
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredAgents.slice(startIndex, endIndex);

  const uploadsBase = API_URL
    ? API_URL.replace(/\/api\/?$/, "") + "/uploads"
    : "/uploads";

  return (
    <>
      <title>Agents Management | CRM Agent Portal</title>
      <meta
        name="description"
        content="Manage B2B agents, track performance, monitor bookings, view account status, and maintain agent profiles in the CRM Agent Management Portal."
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

        <div className="row mt-2 gx-2 ms-2 me-2 gy-2">
          <div className="d-flex justify-content-between flex-wrap">
            <div>
              <h5 className="fw-bold overview-dashboard">Agents</h5>
              <p className="text-muted overview-lead fw-bold">B2B partners</p>
            </div>

            <div>
              <Link
                className="text-decoration-none btn new-leader text-nowrap"
                to="/admin/agents/create"
              >
                + New Agents
              </Link>
            </div>
          </div>

          {Array.isArray(paginatedData) && paginatedData.length > 0 ? (
            paginatedData.map((user) => (
              <div
                className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 col-xxl-3"
                key={user.id}
              >
                <div className="customer-card p-3 bg-white border rounded-3 h-100">
                  <div className="d-flex align-items-start gap-3">
                    <Link
                      className="text-dark text-decoration-none"
                      to={`/admin/agents/edit/${user.id}`}
                    >
                      <div className="avatar-circle avatar-agents">
                        {user?.profile_image ? (
                          <img
                            src={`${uploadsBase}/${user.profile_image}`}
                            alt={user.fullname}
                            className="img-fluid rounded-circle"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                              e.currentTarget.nextSibling.style.display =
                                "flex";
                            }}
                          />
                        ) : null}

                        <div
                          style={{
                            display: user?.profile_image ? "none" : "flex",
                          }}
                        >
                          {user?.fullname?.charAt(0)?.toUpperCase() || "N"}
                        </div>
                      </div>
                    </Link>

                    <div className="flex-grow-1">
                      <Link
                        className="text-dark text-decoration-none"
                        to={`/admin/agents/edit/${user.id}`}
                      >
                        <h5 className="fw-semibold mb-1 customer-name">
                          {user?.fullname || "N/A"}
                        </h5>
                      </Link>

                      <p className="text-secondary customer-phone">
                        {user?.email || "N/A"}
                      </p>
                    </div>

                    <div className="d-flex mt-2">
                      <div
                        className={
                          user?.status === "Active"
                            ? "active-status status-per"
                            : user?.status === "Inactive"
                              ? "inactive-status status-per"
                              : ""
                        }
                      >
                        {user?.status || "N/A"}
                      </div>
                    </div>
                  </div>

                  <hr className="mt-1 mb-2" />

                  <div className="d-flex justify-content-between">
                    <div className="d-flex flex-column">
                      <div className="agents-data">Customers</div>
                      <div>{user?.customers || 0}</div>
                    </div>

                    <div className="d-flex flex-column">
                      <div className="agents-data">Bookings</div>
                      <div>{user?.bookings || 0}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-5 rounded-3">No Agents Found</div>
          )}

          {filteredAgents.length > itemsPerPage && (
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

export default Agents;
