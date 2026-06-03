import { useEffect, useState } from "react";
import { authHeader } from "../utils/authHeader";
import "../App.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBell,
  faCheck,
  faClock,
  faCube,
  faFire,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

function AgentDashboard() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [agentName, setAgentName] = useState("");

  useEffect(() => {
    const allData = async () => {
      try {
        const agentId = localStorage.getItem("id");

        const [agentRes] = await Promise.allSettled([
          axios.get(`${API_URL}/allagents`, {
            headers: authHeader(),
          }),
        ]);

        if (agentRes.status === "fulfilled") {
          const agentData = agentRes.value.data.data;
          const currentAgent = agentData.find(
            (item) => item.id === Number(agentId),
          );

          if (currentAgent) {
            setAgentName(currentAgent.fullname);
          }
        }
      } catch (error) {
        console.error("error", error);
      }
    };

    allData();
  }, []);

  return (
    <>
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
          <div className="row g-2">
            <div className="d-flex flex-row justify-content-between flex-wrap">
              <div className="d-flex flex-column">
                <h3 className="mb-1 main-size">Welcome back, {agentName}</h3>
                <p className="text-muted happened-team">
                  Your B2B partner dashboard
                </p>
              </div>
            </div>

            <div className="col-6 col-sm-6 col-md-6 col-lg">
              <div className="card shadow-sm border-0 h-100 rounded-4">
                <div className="card-body d-flex justify-content-between">
                  <div>
                    <p className="card-title-text">My Customers</p>
                    <h4 className="card-value mb-0">111</h4>
                  </div>

                  <div className="icon-wrapper icon-wrapper1">
                    <FontAwesomeIcon icon={faUsers} />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-6 col-sm-6 col-md-6 col-lg">
              <div className="card shadow-sm border-0 h-100 rounded-4">
                <div className="card-body d-flex justify-content-between">
                  <div>
                    <p className="card-title-text">Bookings</p>
                    <h4 className="card-value mb-0">111</h4>
                  </div>

                  <div className="icon-wrapper icon-check">
                    <FontAwesomeIcon icon={faCube} />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-6 col-sm-6 col-md-6 col-lg">
              <div className="card shadow-sm border-0 h-100 rounded-4">
                <div className="card-body d-flex justify-content-between">
                  <div>
                    <p className="card-title-text">Pending</p>
                    <h4 className="card-value mb-0">111</h4>
                  </div>

                  <div className="icon-wrapper icon-clock">
                    <FontAwesomeIcon icon={faClock} />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-6 col-sm-6 col-md-6 col-lg">
              <div className="card shadow-sm border-0 h-100 rounded-4">
                <div className="card-body d-flex justify-content-between">
                  <div>
                    <p className="card-title-text">Hot Deals</p>
                    <h4 className="card-value">111</h4>
                  </div>

                  <div className="icon-wrapper icon-booking1">
                    <FontAwesomeIcon icon={faFire} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-3 mt-1">
            <div className="col-12 col-lg-6">
              <div className="urgency-card">
                <div className="d-flex justify-content-between align-items-center mt-1">
                  <h4 className="pipeline-title mb-3 mt-2">
                    <FontAwesomeIcon
                      icon={faFire}
                      className="text-danger me-2"
                    />
                    Trending packages
                  </h4>
                </div>

                {[
                  {
                    title: "Premium Hajj 2026 — 40 Days",
                    seats: "40 days · 12 seats",
                    price: "PKR 1850k",
                  },
                  {
                    title: "Umrah Express — 10 Days",
                    seats: "10 days · 8 seats",
                    price: "PKR 285k",
                  },
                  {
                    title: "Ramadan Umrah Special",
                    seats: "15 days · 6 seats",
                    price: "PKR 540k",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="offer-card offer-trend border d-flex flex-md-row justify-content-between align-items-center gap-3 mb-3"
                  >
                    <div>
                      <h6 className="umrah-express mb-2">{item.title}</h6>
                      <p>{item.seats}</p>
                    </div>

                    <div className="text-end price-span">
                      <span>{item.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <div className="urgency-card">
                <div className="d-flex justify-content-between align-items-center mt-2 mb-3">
                  <h4 className="urgency-title mb-0">
                    <span className="me-2">⚠</span>
                    Expiring soon
                  </h4>
                </div>

                {[
                  {
                    title: "Umrah Express — 10 Days",
                    seats: "8 seats · PKR 285,000",
                    days: "5d",
                  },
                  {
                    title: "Ramadan Umrah Special",
                    seats: "6 seats · PKR 540,000",
                    days: "3d",
                  },
                  {
                    title: "Medical Visa — Turkey",
                    seats: "4 seats · PKR 410,000",
                    days: "2d",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="offer-card d-flex express-special flex-md-row justify-content-between align-items-md-center gap-3 mb-3"
                  >
                    <div>
                      <h6 className="umrah-express">{item.title}</h6>
                      <p className="mb-0 pb-0">{item.title.split(" ")[0]}</p>
                    </div>

                    <div className="text-end">
                      <span className="days-badge">{item.days}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AgentDashboard;
