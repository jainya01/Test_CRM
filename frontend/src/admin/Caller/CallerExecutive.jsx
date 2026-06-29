import { useEffect, useMemo, useRef, useState } from "react";
import "../../App.css";
import { authHeader } from "../../utils/authHeader";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faEye,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function CallerExecutive() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [search, setSearch] = useState("");
  const [callers, setCallers] = useState([]);

  useEffect(() => {
    const allData = async () => {
      try {
        const [callerRes] = await Promise.allSettled([
          axios.get(`${API_URL}/allcallers`, { headers: authHeader() }),
        ]);

        if (callerRes.status === "fulfilled") {
          setCallers(callerRes.value.data.data);
        }
      } catch (error) {
        console.error("error", error);
      }
    };
    allData();
  }, [API_URL]);

  const filteredCallers = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return callers.filter((item) =>
      item.fullname?.toLowerCase().includes(keyword),
    );
  }, [callers, search]);

  const itemsPerPage = 14;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredCallers.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredCallers.length / itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const deleteData = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this caller?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/callerdelete/${id}`, {
        headers: authHeader(),
      });

      setCallers((prev) => prev.filter((item) => item.id !== id));

      toast.success("Caller deleted successfully");
    } catch (error) {
      console.error("error", error);
      toast.error("Failed to delete caller");
    }
  };

  const handleShare = () => {
    navigator.share({
      title: "My App",
      text: "Check this out!",
      url: window.location.href,
    });
  };

  const [selected, setSelected] = useState([]);
  const headerRef = useRef(null);

  const allChecked =
    paginatedData.length > 0 && selected.length === paginatedData.length;

  const isIndeterminate =
    selected.length > 0 && selected.length < paginatedData.length;

  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  return (
    <>
      <title>Caller Executive Dashboard | CRM Staff Portal</title>
      <meta
        name="description"
        content="Manage customer leads, handle follow-ups, update lead status, track call activity, schedule callbacks, and streamline daily interactions in the CRM Caller Portal."
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
                    placeholder="Search by staff name"
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

        <div className="p-2 p-lg-3">
          <div className="d-flex justify-content-between flex-wrap">
            <div>
              <h5 className="fw-bold overview-dashboard">Staffs</h5>
              <p className="text-muted overview-lead fw-bold">
                {paginatedData.length} staffs
              </p>
            </div>

            <div>
              <Link
                className="text-decoration-none btn new-leader text-nowrap"
                to="/admin/callers/create"
              >
                + New Staff
              </Link>
            </div>
          </div>

          <div className="table-wrapper border p-0">
            <div className="table-responsive custom-scrollbar">
              <table className="table table-hover mb-0">
                <thead className="table-success header-table text-nowrap">
                  <tr>
                    <th>
                      <input
                        className="form-check-input custom-input"
                        ref={headerRef}
                        type="checkbox"
                        checked={allChecked}
                        aria-label="Select all rows"
                        onChange={(e) =>
                          setSelected(
                            e.target.checked
                              ? paginatedData.map((item) => item.id)
                              : [],
                          )
                        }
                      />
                    </th>

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
                      <tr key={item.id}>
                        <td>
                          <input
                            className="form-check-input custom-input"
                            type="checkbox"
                            checked={selected.includes(item.id)}
                            aria-label={`Select row ${item.name || item.id}`}
                            onChange={(e) =>
                              setSelected((prev) =>
                                e.target.checked
                                  ? [...prev, item.id]
                                  : prev.filter((id) => id !== item.id),
                              )
                            }
                          />
                        </td>

                        <td>{index + 1}</td>

                        <td>
                          <span className="short-name">
                            {item?.fullname || "N/A"}
                          </span>
                        </td>

                        <td className="convert-percent">
                          {item.conversion || "0"}%
                        </td>

                        <td>{item.badge || "--"}</td>

                        <td
                          className={
                            item.status === "Active"
                              ? "convert-no"
                              : "convert-call"
                          }
                        >
                          <div className="d-flex align-items-center">
                            <div
                              className={`status-dot me-1 ${
                                item.status === "Active"
                                  ? "custom-success"
                                  : "custom-active"
                              }`}
                            />

                            <span className="status-span">
                              {item.status || "N/A"}
                            </span>
                          </div>
                        </td>

                        <td className="text-start">
                          <div className="d-flex align-items-center">
                            <Link
                              title="View"
                              to={`/admin/callers/view/${item.id}`}
                              className="p-1 d-inline-flex align-items-center justify-content-center"
                            >
                              <FontAwesomeIcon
                                icon={faEye}
                                className="icons-color2"
                              />
                            </Link>

                            <Link
                              title="Edit"
                              to={`/admin/callers/edit/${item.id}`}
                              className="p-1 d-inline-flex align-items-center justify-content-center"
                            >
                              <FontAwesomeIcon
                                icon={faEdit}
                                className="icons-color"
                              />
                            </Link>

                            <button
                              type="button"
                              title="Delete"
                              onClick={() => deleteData(item.id)}
                              className="d-inline-flex align-items-center justify-content-center border-0 bg-transparent"
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="p-1 icons-color1"
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center text-muted">
                        No callers found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {paginatedData.length > 0 && (
                <>
                  <div className="d-flex justify-content-center">
                    <button className="table-shared">Download</button>

                    <button className="table-shared" onClick={handleShare}>
                      Share
                    </button>
                  </div>
                </>
              )}

              {paginatedData.length > itemsPerPage && (
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

        <ToastContainer position="bottom-right" autoClose={1500} />
      </main>
    </>
  );
}

export default CallerExecutive;
