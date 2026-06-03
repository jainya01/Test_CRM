import { useEffect, useState } from "react";
import "../../App.css";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { authHeader } from "../../utils/authHeader";

function CallersView() {
  const API_URL = import.meta.env.VITE_API_URL;

  const { id } = useParams();
  const [caller, setCaller] = useState([]);

  useEffect(() => {
    const callerData = async () => {
      try {
        const [callerRes] = await Promise.allSettled([
          axios.get(`${API_URL}/somecallers/${id}`, { headers: authHeader() }),
        ]);

        if (callerRes.status === "fulfilled") {
          setCaller(callerRes.value.data.data);
        }
      } catch (error) {
        console.error("error", error);
      }
    };

    callerData();
  }, []);

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

      <div className="p-2 p-lg-3 mt-2 d-flex justify-content-center">
        <div className="col-lg-7 col-12">
          <div className="card shadow border-0">
            <div className="card-header profile-header custom-font">
              View Caller: {caller.fullname || "N/A"}, {caller.email || "N/A"}
            </div>

            <div className="card-body">
              <div className="d-flex flex-column">
                <div className="d-flex flex-row justify-content-between custom-font">
                  <div>Total Calls</div>
                  <div>0</div>
                </div>

                <hr />

                <div className="d-flex flex-row justify-content-between custom-font">
                  <div>Daily Calls</div>
                  <div>0</div>
                </div>

                <hr />

                <div className="d-flex flex-row justify-content-between custom-font">
                  <div>Weekly Calls</div>
                  <div>0</div>
                </div>

                <hr />

                <div className="d-flex flex-row justify-content-between custom-font">
                  <div>Monthly Calls</div>
                  <div>0</div>
                </div>

                <hr />

                <div className="d-flex flex-row justify-content-between custom-font">
                  <div>Average Calls</div>
                  <div>0</div>
                </div>

                <hr />

                <div className="d-flex flex-row justify-content-between custom-font">
                  <div>Pending Calls</div>
                  <div>0</div>
                </div>

                <hr />

                <div className="d-flex flex-row justify-content-between custom-font">
                  <div>Last Call</div>
                  <div>02 June 2026 03:30 PM</div>
                </div>

                <hr />

                <div className="d-flex flex-row justify-content-between custom-font">
                  <div>Conversion Rate</div>
                  <div>80%</div>
                </div>

                <div className="mt-3">
                  <Link className="text-success" to="/admin/callers">
                    Back
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CallersView;
