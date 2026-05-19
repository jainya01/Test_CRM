import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCircleInfo,
  faFileExcel,
  faUpload,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
// import { authHeader } from "../utils/authHeader";

function BulkUpload() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [bulk, setBulk] = useState([]);
  const [file, setFile] = useState(null);
  const [customers, setCustomers] = useState(0);

  const fetchCustomers = async () => {
    try {
      const [customerRes] = await Promise.allSettled([
        axios.get(`${API_URL}/allcustomersdata`),
      ]);

      if (customerRes.status === "fulfilled") {
        setCustomers(customerRes.value.data.result.length);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleBulkSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a .xlsx or .csv file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    const token = localStorage.getItem("adminToken");

    try {
      await axios.post(`${API_URL}/upload-stock`, formData);

      toast.success("Bulk upload successfully");
      setFile(null);
      fetchCustomers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Bulk upload failed");
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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

      <div className="row mt-2 gx-2 ms-2 me-2 gy-2">
        <div>
          <h5 className="fw-bold overview-dashboard">Bulk Upload</h5>
          <p className="text-muted mb-md-0 overview-lead fw-bold">
            Import Contacts from Excel
          </p>
        </div>

        <div className="col-12 col-lg-6 col-md-6 d-flex flex-column">
          <form onSubmit={handleBulkSubmit}>
            <div className="card rounded-3 h-100 px-3 py-3 border-0">
              <div className="dotted-class">
                <div className="dotted-class p-5 text-center bg-light">
                  <div className="mb-3">
                    <div className="d-inline-flex align-items-center justify-content-center bg-success text-white custom-typo">
                      <FontAwesomeIcon icon={faFileExcel} size="lg" />
                    </div>
                  </div>

                  <h6 className="mb-2 fw-semibold">
                    Drop your Excel file here
                  </h6>

                  <p className="text-muted small mb-2 fw-bold">
                    .xlsx, .csv up to 10MB
                  </p>

                  {file && (
                    <div className="text-success small fw-semibold mb-2">
                      Selected File: {file.name}
                      <FontAwesomeIcon
                        icon={faX}
                        className="text-danger fw-bold pointer-cursor ms-2"
                        onClick={() => setFile(null)}
                      />
                    </div>
                  )}

                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <label className="btn btn-success btn-sm select-file-btn">
                      <FontAwesomeIcon icon={faUpload} /> Select file
                      <input
                        type="file"
                        hidden
                        accept=".xlsx,.csv"
                        onChange={handleFileChange}
                      />
                    </label>

                    <button
                      className="btn btn-success submit-file-btn mt-2"
                      type="submit"
                    >
                      Submit
                    </button>

                    <div className="mt-3 text-success fw-bold">
                      Total Customer Records: {customers}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <div className="alert alert-light border rounded-3 d-flex text-start gap-2 mt-3">
            <div className="text-success fs-5">
              <FontAwesomeIcon icon={faCircleInfo} />
            </div>

            <div className="ms-0">
              <div className="fw-semibold mb-1">Required columns</div>
              <small className="text-muted fw-medium">
                name, phone, city, source (Hajj / Umrah / Ticket / Medical),
                source. Phone numbers are checked for duplicates across your
                entire database.
              </small>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="bottom-right" autoClose={1500} />
    </div>
  );
}

export default BulkUpload;
