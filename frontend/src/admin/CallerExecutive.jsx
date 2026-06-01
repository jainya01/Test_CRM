import { useEffect, useState } from "react";
import { authHeader } from "../utils/authHeader";
import { Link } from "react-router-dom";
import "../App.css";
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
  }, []);

  const itemsPerPage = 14;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = callers.slice(startIndex, endIndex);
  const totalPages = Math.ceil(callers.length / itemsPerPage);

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
            <Link
              className="text-decoration-none btn new-leader text-nowrap"
              to="/admin/callers/create"
            >
              + New Caller
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
                      type="checkbox"
                      className="form-check-input custom-input"
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
                          type="checkbox"
                          className="form-check-input custom-input"
                        />
                      </td>

                      <td>{index + 1}</td>

                      <td>
                        <span className="short-name">
                          {item?.fullname || "N/A"}
                        </span>
                      </td>

                      <td className="convert-percent">
                        {item.conversion || "10%"}
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

                          <Link
                            title="Edit"
                            to={`/admin/callers/edit/${item.id}`}
                          >
                            <FontAwesomeIcon
                              icon={faEdit}
                              className="icons-color"
                            />
                          </Link>

                          <span
                            title="Delete"
                            onClick={() => deleteData(item.id)}
                          >
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

            <div className="text-center">
              <button className="table-shared" onClick={handleShare}>
                Share
              </button>
            </div>

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

      <ToastContainer position="bottom-right" autoClose={1500} />
    </div>
  );
}

export default CallerExecutive;
