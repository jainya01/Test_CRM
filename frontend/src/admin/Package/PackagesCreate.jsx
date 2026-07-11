import { useEffect, useState } from "react";
import "../../App.css";
import { authHeader } from "../../utils/authHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function PackagesCreate() {
  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("basic");
  const [searchParams] = useSearchParams();
  const selectedService = searchParams.get("service") || "";

  const [packages, setPackages] = useState({
    service: selectedService,
    package_name: "",
    flight_pnr: "",
    flight_number: "",
    trip_way: "",
    package_price: "",
    package_type: "",
    package_duration: "",
    category: "",
    zone: "",
    departure_city: "",
    room_sharing: "",
    number_of_seats: "",
    start_date: "",
    end_date: "",
    departure_date: "",
    departure_time: "",
    dept_am: "AM",
    arrival_am: "AM",
    arrival_time: "",
    arrival_date: "",
    number_of_days: "",
    makkah_hotel: "",
    makkah_rating: "",
    madinah_hotel: "",
    madinah_rating: "",
    azizia_rating: "",
    package_include: "",
    package_excludes: "",
    flights: "",
    flights_no: "",
    flight_date: "",
    package_flyer: "",
    luggage_type: "",
    luggage_details: "",
  });

  const {
    package_name,
    flight_pnr,
    trip_way,
    package_price,
    package_type,
    package_duration,
    category,
    zone,
    departure_city,
    room_sharing,
    number_of_seats,
    start_date,
    end_date,
    departure_date,
    departure_time,
    dept_am,
    arrival_time,
    arrival_date,
    number_of_days,
    makkah_hotel,
    makkah_rating,
    madinah_hotel,
    madinah_rating,
    azizia_rating,
    package_include,
    package_excludes,
    flights,
    flights_no,
    flight_date,
    luggage_type,
    luggage_details,
  } = packages;

  const handleFormSubmit = async () => {
    try {
      const formData = new FormData();

      Object.keys(packages).forEach((key) => {
        formData.append(key, packages[key]);
      });

      await axios.post(`${API_URL}/packagespost`, formData, {
        headers: {
          ...authHeader(),
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Package created successfully");

      setTimeout(() => {
        navigate("/admin/packages");
      }, 500);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add package");
    }
  };

  const onInputChange = (e) => {
    setPackages({
      ...packages,
      [e.target.name]: e.target.value,
    });
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Maximum file size is 5 MB");
      return;
    }

    setPackages((prev) => ({
      ...prev,
      package_flyer: file,
    }));
  };

  useEffect(() => {
    if (selectedService) {
      setPackages((prev) => ({
        ...prev,
        service: selectedService,
      }));
    }
  }, [selectedService]);

  return (
    <>
      <title>Create New Package | Travel CRM Portal</title>
      <meta
        name="description"
        content="Create and manage Hajj, Umrah, Ticket, and Medical Visa packages. Add details, pricing, duration, availability, inclusions, and booking info in the Travel CRM Portal."
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
                    placeholder="Search by package name"
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

        <div className="p-2 p-lg-3 mt-2">
          <div className="col-12">
            <div className="card shadow border-0">
              <div className="card-header profile-header">
                New {selectedService} Package
              </div>

              <div className="card-body">
                <form action={handleFormSubmit}>
                  <div className="row">
                    <div className="stepper d-flex justify-content-evenly py-1 rounded mb-3">
                      <button
                        type="button"
                        className={`btn step-btn ${activeTab === "basic" ? "active" : ""}`}
                        onClick={() => setActiveTab("basic")}
                      >
                        Basic Info
                      </button>

                      <button
                        type="button"
                        className={`btn step-btn ${activeTab === "travel" ? "active" : ""}`}
                        onClick={() => setActiveTab("travel")}
                      >
                        Travel
                      </button>

                      {selectedService !== "Ticket" && (
                        <button
                          type="button"
                          className={`btn step-btn ${activeTab === "hotels" ? "active" : ""}`}
                          onClick={() => setActiveTab("hotels")}
                        >
                          Hotels
                        </button>
                      )}

                      <button
                        type="button"
                        className={`btn step-btn ${activeTab === "details" ? "active" : ""}`}
                        onClick={() => setActiveTab("details")}
                      >
                        Details
                      </button>
                    </div>

                    {selectedService === "Hajj" && (
                      <>
                        {activeTab === "basic" && (
                          <>
                            <div className="col-md-6 mb-2">
                              <label
                                className="form-label"
                                htmlFor="package_name"
                              >
                                Package Name{" "}
                                <span className="text-danger fw-bold">*</span>
                              </label>

                              <input
                                type="text"
                                id="package_name"
                                className="form-control sector-wise"
                                placeholder="Enter Package Name"
                                name="package_name"
                                value={package_name}
                                onChange={onInputChange}
                                required
                              />
                            </div>

                            <div className="col-md-6 mb-2">
                              <label className="form-label" htmlFor="price">
                                Price{" "}
                                <span className="text-danger fw-bold">*</span>
                              </label>

                              <input
                                type="number"
                                id="price"
                                className="form-control sector-wise"
                                placeholder="185000"
                                name="package_price"
                                value={package_price}
                                onChange={onInputChange}
                                required
                              />
                            </div>

                            <div className="col-md-6 mb-2">
                              <label
                                className="form-label"
                                htmlFor="package_type"
                              >
                                Package Type{" "}
                                <span className="text-danger fw-bold">*</span>
                              </label>

                              <select
                                id="package_type"
                                className="form-select sector-wise"
                                name="package_type"
                                value={package_type}
                                onChange={onInputChange}
                                required
                              >
                                <option value="" hidden>
                                  Select Package Type
                                </option>
                                <option value="Shifting">Shifting</option>
                                <option value="Non Shifting">
                                  Non Shifting
                                </option>
                              </select>
                            </div>

                            <div className="col-md-6 mb-2">
                              <label
                                className="form-label"
                                htmlFor="package_duration"
                              >
                                Package Duration{" "}
                                <span className="text-danger fw-bold">*</span>
                              </label>

                              <select
                                id="package_duration"
                                className="form-select sector-wise"
                                name="package_duration"
                                value={package_duration}
                                onChange={onInputChange}
                                required
                              >
                                <option value="" hidden>
                                  Select Package Duration
                                </option>
                                <option value="Short">Short</option>
                                <option value="Long">Long</option>
                              </select>
                            </div>

                            <div className="col-md-6 mb-2">
                              <label className="form-label" htmlFor="category">
                                Category{" "}
                                <span className="text-danger fw-bold">*</span>
                              </label>

                              <select
                                id="category"
                                className="form-select sector-wise"
                                name="category"
                                value={category}
                                onChange={onInputChange}
                                required
                              >
                                <option value="" hidden>
                                  Select Category
                                </option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                              </select>
                            </div>

                            <div className="col-md-6 mb-2">
                              <label className="form-label" htmlFor="zone">
                                Zone{" "}
                                <span className="text-danger fw-bold">*</span>
                              </label>

                              <select
                                id="zone"
                                className="form-select sector-wise"
                                name="zone"
                                value={zone}
                                onChange={onInputChange}
                                required
                              >
                                <option value="" hidden>
                                  Select Zone
                                </option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                              </select>
                            </div>

                            <div className="col-md-6 mb-2">
                              <label
                                className="form-label"
                                htmlFor="departure_city"
                              >
                                Departure City{" "}
                                <span className="text-danger fw-bold">*</span>
                              </label>

                              <select
                                id="departure_city"
                                className="form-select sector-wise"
                                name="departure_city"
                                value={departure_city}
                                onChange={onInputChange}
                                required
                              >
                                <option value="" hidden>
                                  Select City
                                </option>
                                <option value="Lucknow">Lucknow</option>
                                <option value="Hydrabad">Hydrabad</option>
                                <option value="New Delhi">New Delhi</option>
                              </select>
                            </div>

                            <div className="col-md-6 mb-2">
                              <label
                                className="form-label"
                                htmlFor="room_sharing"
                              >
                                Room Sharing{" "}
                                <span className="text-danger fw-bold">*</span>
                              </label>

                              <select
                                id="room_sharing"
                                className="form-select sector-wise"
                                name="room_sharing"
                                value={room_sharing}
                                onChange={onInputChange}
                                required
                              >
                                <option value="" hidden>
                                  Select Sharing
                                </option>
                                <option value="Twin">Twin</option>
                                <option value="Triple">Triple</option>
                                <option value="Quad">Quad</option>
                                <option value="Quint">Quint</option>
                              </select>
                            </div>

                            <div className="col-md-6 mb-2">
                              <label
                                className="form-label"
                                htmlFor="number_of_days"
                              >
                                Number of Seats{" "}
                                <span className="text-danger fw-bold">*</span>
                              </label>

                              <input
                                type="number"
                                id="number_of_seats"
                                className="form-control sector-wise"
                                placeholder="Enter Number of Seats"
                                name="number_of_seats"
                                value={number_of_seats}
                                onChange={onInputChange}
                                required
                              />
                            </div>
                          </>
                        )}

                        {activeTab === "travel" && (
                          <>
                            <div className="col-md-6 mb-2">
                              <label
                                className="form-label"
                                htmlFor="start_date"
                              >
                                Start Date{" "}
                                <span className="text-danger fw-bold">*</span>
                              </label>

                              <input
                                type="date"
                                id="start_date"
                                className="form-control sector-wise"
                                name="start_date"
                                value={start_date}
                                onChange={onInputChange}
                                required
                              />
                            </div>

                            <div className="col-md-6 mb-2">
                              <label className="form-label" htmlFor="end_date">
                                End Date{" "}
                                <span className="text-danger fw-bold">*</span>
                              </label>

                              <input
                                type="date"
                                id="end_date"
                                className="form-control sector-wise"
                                name="end_date"
                                value={end_date}
                                onChange={onInputChange}
                                required
                              />
                            </div>

                            <div className="col-md-6 mb-2">
                              <label
                                className="form-label"
                                htmlFor="departure_date"
                              >
                                Departure Date{" "}
                                <span className="text-danger fw-bold">*</span>
                              </label>

                              <input
                                type="date"
                                id="departure_date"
                                className="form-control sector-wise"
                                name="departure_date"
                                value={departure_date}
                                onChange={onInputChange}
                                required
                              />
                            </div>

                            <div className="col-md-6 mb-2">
                              <label
                                className="form-label"
                                htmlFor="arrival_date"
                              >
                                Arrival Date{" "}
                                <span className="text-danger fw-bold">*</span>
                              </label>

                              <input
                                type="date"
                                id="arrival_date"
                                className="form-control sector-wise"
                                name="arrival_date"
                                value={arrival_date}
                                onChange={onInputChange}
                                required
                              />
                            </div>

                            <div className="col-md-6 mb-2">
                              <label
                                className="form-label"
                                htmlFor="number_of_days"
                              >
                                Number of Days{" "}
                                <span className="text-danger fw-bold">*</span>
                              </label>

                              <input
                                type="number"
                                id="number_of_days"
                                className="form-control sector-wise"
                                placeholder="Enter Number of Days"
                                min="1"
                                name="number_of_days"
                                value={number_of_days}
                                onChange={onInputChange}
                                required
                              />
                            </div>
                          </>
                        )}

                        {activeTab === "hotels" && (
                          <>
                            <h6 className="fw-bold mb-3">Makkah Hotel</h6>

                            <div className="col-md-6 mb-2">
                              <label
                                className="form-label"
                                htmlFor="makkah_distance"
                              >
                                Distance from Haram{" "}
                                <span className="text-danger">*</span>
                              </label>

                              <select
                                id="makkah_distance"
                                className="form-select sector-wise"
                                name="makkah_hotel"
                                value={makkah_hotel}
                                onChange={onInputChange}
                                required
                              >
                                <option value="" hidden>
                                  Select Distance
                                </option>
                                <option value="0">0 Meter</option>
                                <option value="100">100</option>
                                <option value="200">200</option>
                                <option value="300">300</option>
                                <option value="400">400</option>
                                <option value="500">500</option>
                              </select>
                            </div>

                            <div className="col-md-6 mb-2">
                              <label
                                className="form-label"
                                htmlFor="makkah_star"
                              >
                                Star Rating{" "}
                                <span className="text-danger">*</span>
                              </label>

                              <select
                                id="makkah_star"
                                className="form-select sector-wise"
                                name="makkah_rating"
                                value={makkah_rating}
                                onChange={onInputChange}
                                required
                              >
                                <option value="" hidden>
                                  Select Rating
                                </option>
                                <option value="1 Star">1 Star</option>
                                <option value="2 Star">2 Star</option>
                                <option value="3 Star">3 Star</option>
                                <option value="4 Star">4 Star</option>
                                <option value="5 Star">5 Star</option>
                              </select>
                            </div>

                            <hr className="my-3" />

                            <h6 className="fw-bold mb-3">Madinah Hotel</h6>

                            <div className="col-md-6 mb-2">
                              <label
                                className="form-label"
                                htmlFor="madinah_distance"
                              >
                                Distance from Haram{" "}
                                <span className="text-danger">*</span>
                              </label>

                              <select
                                id="madinah_distance"
                                className="form-select sector-wise"
                                name="madinah_hotel"
                                value={madinah_hotel}
                                onChange={onInputChange}
                                required
                              >
                                <option value="" hidden>
                                  Select Distance
                                </option>
                                <option value="0">0 Meter</option>
                                <option value="100">100</option>
                                <option value="200">200</option>
                                <option value="300">300</option>
                                <option value="400">400</option>
                                <option value="500">500</option>
                              </select>
                            </div>

                            <div className="col-md-6 mb-2">
                              <label
                                className="form-label"
                                htmlFor="madinah_star"
                              >
                                Star Rating{" "}
                                <span className="text-danger">*</span>
                              </label>

                              <select
                                id="madinah_star"
                                className="form-select sector-wise"
                                name="madinah_rating"
                                value={madinah_rating}
                                onChange={onInputChange}
                                required
                              >
                                <option value="" hidden>
                                  Select Rating
                                </option>
                                <option value="1 Star">1 Star</option>
                                <option value="2 Star">2 Star</option>
                                <option value="3 Star">3 Star</option>
                                <option value="4 Star">4 Star</option>
                                <option value="5 Star">5 Star</option>
                              </select>
                            </div>

                            <hr className="my-3" />

                            <h6 className="fw-bold mb-3">Azizia Hotel</h6>

                            <div className="col-md-6 mb-2">
                              <label
                                className="form-label"
                                htmlFor="azizia_star"
                              >
                                Star Rating{" "}
                                <span className="text-danger">*</span>
                              </label>

                              <select
                                id="azizia_star"
                                className="form-select sector-wise"
                                name="azizia_rating"
                                value={azizia_rating}
                                onChange={onInputChange}
                                required
                              >
                                <option value="" hidden>
                                  Select Rating
                                </option>
                                <option value="1 Star">1 Star</option>
                                <option value="2 Star">2 Star</option>
                                <option value="3 Star">3 Star</option>
                                <option value="4 Star">4 Star</option>
                                <option value="5 Star">5 Star</option>
                              </select>
                            </div>
                          </>
                        )}

                        {activeTab === "details" && (
                          <>
                            <div className="col-12 mb-2">
                              <label
                                className="form-label"
                                htmlFor="package_includes"
                              >
                                Package Includes{" "}
                                <span className="text-danger">*</span>
                              </label>

                              <textarea
                                id="package_includes"
                                className="form-control sector-wise"
                                placeholder="e.g. Flights, Hotels, Transport, Meals, Ziyarat..."
                                style={{ height: "50px" }}
                                name="package_include"
                                value={package_include}
                                onChange={onInputChange}
                                required
                              ></textarea>
                            </div>

                            <div className="col-12 mb-2">
                              <label
                                className="form-label"
                                htmlFor="package_excludes"
                              >
                                Package Excludes
                              </label>

                              <textarea
                                id="package_excludes"
                                className="form-control sector-wise"
                                placeholder="e.g. Personal Expenses, Laundry, Phone Calls..."
                                style={{ height: "50px" }}
                                name="package_excludes"
                                value={package_excludes}
                                onChange={onInputChange}
                              ></textarea>
                            </div>

                            <div className="col-md-6 mb-2">
                              <label className="form-label" htmlFor="flights">
                                Flights <span className="text-danger">*</span>
                              </label>

                              <select
                                className="form-select sector-wise"
                                name="flights"
                                value={flights}
                                onChange={onInputChange}
                              >
                                <option value="" hidden>
                                  Select Flights
                                </option>
                                <option value="Air Arabia">Air Arabia</option>
                                <option value="Air India">Air India</option>
                                <option value="Air India Express">
                                  Air India Express
                                </option>
                                <option value="Akasa Air">Akasa Air</option>
                                <option value="flynas">flynas</option>
                                <option value="IndiGo">IndiGo</option>
                                <option value="Oman Air">Oman Air</option>
                                <option value="Saudia">Saudia</option>
                              </select>
                            </div>

                            <div className="col-md-6 mb-2">
                              <label className="form-label" htmlFor="flyer">
                                Package Flyer{" "}
                                <span className="text-danger">*</span>
                              </label>

                              <input
                                type="file"
                                id="flyer"
                                className="form-control sector-wise"
                                name="package_flyer"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={onFileChange}
                                required
                              />

                              <small className="text-muted d-block">
                                Maximum file size: <strong>5 MB</strong>.
                                Allowed formats: PDF, JPG, JPEG, PNG.
                              </small>
                            </div>
                          </>
                        )}
                      </>
                    )}

                    {selectedService === "Umrah" && (
                      <>
                        {activeTab === "basic" && (
                          <>
                            <div className="col-md-6 mb-2">
                              <label
                                className="form-label"
                                htmlFor="package_name"
                              >
                                Package Name{" "}
                                <span className="text-danger fw-bold">*</span>
                              </label>

                              <input
                                type="text"
                                id="package_name"
                                className="form-control sector-wise"
                                placeholder="Enter Package Name"
                                name="package_name"
                                value={package_name}
                                onChange={onInputChange}
                                required
                              />
                            </div>

                            <div className="col-md-6 mb-2">
                              <label className="form-label" htmlFor="price">
                                Price{" "}
                                <span className="text-danger fw-bold">*</span>
                              </label>

                              <input
                                type="number"
                                id="price"
                                className="form-control sector-wise"
                                placeholder="185000"
                                name="package_price"
                                value={package_price}
                                onChange={onInputChange}
                                required
                              />
                            </div>

                            <div className="col-md-6 mb-2">
                              <label
                                className="form-label"
                                htmlFor="package_type"
                              >
                                Package Type{" "}
                                <span className="text-danger fw-bold">*</span>
                              </label>

                              <select
                                id="package_type"
                                className="form-select sector-wise"
                                name="package_type"
                                value={package_type}
                                onChange={onInputChange}
                                required
                              >
                                <option value="" hidden>
                                  Select type
                                </option>
                                <option value="Premium">Premium</option>
                                <option value="Deluxe">Deluxe</option>
                                <option value="Semi Deluxe">Semi Deluxe</option>
                                <option value="Economy">Economy</option>
                              </select>
                            </div>

                            <div className="col-md-6 mb-2">
                              <label
                                className="form-label"
                                htmlFor="package_duration"
                              >
                                Custom Duration{" "}
                                <span className="text-danger fw-bold">*</span>
                              </label>

                              <input
                                type="text"
                                className="form-control sector-wise"
                                placeholder="e.g. 5 Days, 10 Days"
                                name="package_duration"
                                value={package_duration}
                                onChange={onInputChange}
                              />
                            </div>

                            <div className="col-md-6 mb-2">
                              <label
                                className="form-label"
                                htmlFor="number_of_days"
                              >
                                Number of Seats{" "}
                                <span className="text-danger fw-bold">*</span>
                              </label>

                              <input
                                type="number"
                                id="number_of_seats"
                                className="form-control sector-wise"
                                placeholder="Enter Number of Seats"
                                name="number_of_seats"
                                value={number_of_seats}
                                onChange={onInputChange}
                                required
                              />
                            </div>
                          </>
                        )}

                        {activeTab === "travel" && (
                          <>
                            <div className="col-md-6 mb-2">
                              <label
                                className="form-label"
                                htmlFor="start_date"
                              >
                                Start Date{" "}
                                <span className="text-danger fw-bold">*</span>
                              </label>

                              <input
                                type="date"
                                id="start_date"
                                className="form-control sector-wise"
                                name="start_date"
                                value={start_date}
                                onChange={onInputChange}
                                required
                              />
                            </div>

                            <div className="col-md-6 mb-2">
                              <label className="form-label" htmlFor="end_date">
                                End Date{" "}
                                <span className="text-danger fw-bold">*</span>
                              </label>

                              <input
                                type="date"
                                id="end_date"
                                className="form-control sector-wise"
                                name="end_date"
                                value={end_date}
                                onChange={onInputChange}
                                required
                              />
                            </div>

                            <div className="col-md-6 mb-2">
                              <label
                                className="form-label"
                                htmlFor="departure_date"
                              >
                                Departure Date{" "}
                                <span className="text-danger fw-bold">*</span>
                              </label>

                              <input
                                type="date"
                                id="departure_date"
                                className="form-control sector-wise"
                                name="departure_date"
                                value={departure_date}
                                onChange={onInputChange}
                                required
                              />
                            </div>

                            <div className="col-md-6 mb-2">
                              <label
                                className="form-label"
                                htmlFor="arrival_date"
                              >
                                Arrival Date{" "}
                                <span className="text-danger fw-bold">*</span>
                              </label>

                              <input
                                type="date"
                                id="arrival_date"
                                className="form-control sector-wise"
                                name="arrival_date"
                                value={arrival_date}
                                onChange={onInputChange}
                                required
                              />
                            </div>

                            <div className="col-md-6 mb-2">
                              <label
                                className="form-label"
                                htmlFor="number_of_days"
                              >
                                Departure City{" "}
                                <span className="text-danger fw-bold">*</span>
                              </label>

                              <select
                                className="form-select sector-wise"
                                name="departure_city"
                                value={departure_city}
                                onChange={onInputChange}
                              >
                                <option value="" hidden>
                                  Select city
                                </option>
                                <option value="Lucknow">Lucknow</option>
                                <option value="Hydrabad">Hydrabad</option>
                                <option value="New Delhi">New Delhi</option>
                              </select>
                            </div>

                            <div className="col-md-6 mb-2">
                              <label className="form-label" htmlFor="flights">
                                Flights <span className="text-danger">*</span>
                              </label>

                              <select
                                className="form-select sector-wise"
                                name="flights"
                                value={flights}
                                onChange={onInputChange}
                              >
                                <option value="" hidden>
                                  Select Flights
                                </option>
                                <option value="Air Arabia">Air Arabia</option>
                                <option value="Air India">Air India</option>
                                <option value="Air India Express">
                                  Air India Express
                                </option>
                                <option value="Akasa Air">Akasa Air</option>
                                <option value="flynas">flynas</option>
                                <option value="IndiGo">IndiGo</option>
                                <option value="Oman Air">Oman Air</option>
                                <option value="Saudia">Saudia</option>
                              </select>
                            </div>

                            <div className="card border-0 shadow-sm rounded-4">
                              <div className="d-flex justify-content-between align-items-center">
                                <h6 className="fw-semibold mb-0">
                                  Departure Flight Details
                                </h6>
                              </div>

                              <div className="flight-box mt-2">
                                <div className="row g-3">
                                  <div className="col-lg-6 col-md-6 col-12">
                                    <input
                                      type="text"
                                      className="form-control sector-wise"
                                      placeholder="Flight No. (e.g. QR-501)"
                                      name="flights_no"
                                      value={flights_no}
                                      onChange={onInputChange}
                                    />
                                  </div>

                                  <div className="col-lg-6 col-md-6 col-12">
                                    <input
                                      type="date"
                                      className="form-control sector-wise"
                                      name="flight_date"
                                      value={flight_date}
                                      onChange={onInputChange}
                                    />
                                  </div>

                                  <div className="row g-2 align-items-end">
                                    <div className="col-lg-5 col-md-4 col-8">
                                      <label className="form-label">
                                        Departure Time
                                      </label>
                                      <input
                                        type="time"
                                        className="form-control sector-wise"
                                        name="departure_time"
                                        value={departure_time}
                                        onChange={onInputChange}
                                      />
                                    </div>

                                    <div className="col-lg-1 col-md-2 col-4">
                                      <label className="form-label invisible">
                                        AM/PM
                                      </label>
                                      <select
                                        className="form-select sector-wise"
                                        name="dept_am"
                                        value={dept_am}
                                        onChange={onInputChange}
                                      >
                                        <option value="AM">AM</option>
                                        <option value="PM">PM</option>
                                      </select>
                                    </div>

                                    <div className="col-lg-5 col-md-4 col-8">
                                      <label className="form-label">
                                        Arrival Time
                                      </label>
                                      <input
                                        type="time"
                                        className="form-control sector-wise"
                                        name="arrival_time"
                                        value={arrival_time}
                                        onChange={onInputChange}
                                      />
                                    </div>

                                    <div className="col-lg-1 col-md-2 col-4">
                                      <label className="form-label invisible">
                                        AM/PM
                                      </label>
                                      <select
                                        className="form-select sector-wise"
                                        name="arrival_am"
                                        value="arrival_am"
                                        onChange={onInputChange}
                                      >
                                        <option value="AM">AM</option>
                                        <option value="PM">PM</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}

                        {activeTab === "hotels" && (
                          <>
                            <h6 className="fw-bold mb-3">Makkah Hotel</h6>

                            <div className="col-md-6 mb-2">
                              <label
                                className="form-label"
                                htmlFor="makkah_distance"
                              >
                                Distance from Haram{" "}
                                <span className="text-danger">*</span>
                              </label>

                              <select
                                id="makkah_distance"
                                className="form-select sector-wise"
                                name="makkah_hotel"
                                value={makkah_hotel}
                                onChange={onInputChange}
                                required
                              >
                                <option value="" hidden>
                                  Select Distance
                                </option>
                                <option value="0">0 Meter</option>
                                <option value="100">100</option>
                                <option value="200">200</option>
                                <option value="300">300</option>
                                <option value="400">400</option>
                                <option value="500">500</option>
                              </select>
                            </div>

                            <div className="col-md-6 mb-2">
                              <label
                                className="form-label"
                                htmlFor="makkah_star"
                              >
                                Star Rating{" "}
                                <span className="text-danger">*</span>
                              </label>

                              <select
                                id="makkah_star"
                                className="form-select sector-wise"
                                name="makkah_rating"
                                value={makkah_rating}
                                onChange={onInputChange}
                                required
                              >
                                <option value="" hidden>
                                  Select Rating
                                </option>
                                <option value="1 Star">1 Star</option>
                                <option value="2 Star">2 Star</option>
                                <option value="3 Star">3 Star</option>
                                <option value="4 Star">4 Star</option>
                                <option value="5 Star">5 Star</option>
                              </select>
                            </div>

                            <hr className="my-3" />

                            <h6 className="fw-bold mb-3">Madinah Hotel</h6>

                            <div className="col-md-6 mb-2">
                              <label
                                className="form-label"
                                htmlFor="madinah_distance"
                              >
                                Distance from Haram{" "}
                                <span className="text-danger">*</span>
                              </label>

                              <select
                                id="madinah_distance"
                                className="form-select sector-wise"
                                name="madinah_hotel"
                                value={madinah_hotel}
                                onChange={onInputChange}
                                required
                              >
                                <option value="" hidden>
                                  Select Distance
                                </option>
                                <option value="0">0 Meter</option>
                                <option value="100">100</option>
                                <option value="200">200</option>
                                <option value="300">300</option>
                                <option value="400">400</option>
                                <option value="500">500</option>
                              </select>
                            </div>

                            <div className="col-md-6 mb-2">
                              <label
                                className="form-label"
                                htmlFor="madinah_star"
                              >
                                Star Rating{" "}
                                <span className="text-danger">*</span>
                              </label>

                              <select
                                id="madinah_star"
                                className="form-select sector-wise"
                                name="madinah_rating"
                                value={madinah_rating}
                                onChange={onInputChange}
                                required
                              >
                                <option value="" hidden>
                                  Select Rating
                                </option>
                                <option value="1 Star">1 Star</option>
                                <option value="2 Star">2 Star</option>
                                <option value="3 Star">3 Star</option>
                                <option value="4 Star">4 Star</option>
                                <option value="5 Star">5 Star</option>
                              </select>
                            </div>
                          </>
                        )}

                        {activeTab === "details" && (
                          <>
                            <div className="col-12 mb-2">
                              <label
                                className="form-label"
                                htmlFor="package_includes"
                              >
                                Package Includes{" "}
                                <span className="text-danger">*</span>
                              </label>

                              <textarea
                                id="package_includes"
                                className="form-control sector-wise"
                                placeholder="e.g. Flights, Hotels, Transport, Meals, Ziyarat..."
                                style={{ height: "50px" }}
                                name="package_include"
                                value={package_include}
                                onChange={onInputChange}
                                required
                              ></textarea>
                            </div>

                            <div className="col-12 mb-2">
                              <label
                                className="form-label"
                                htmlFor="package_excludes"
                              >
                                Package Excludes
                              </label>

                              <textarea
                                id="package_excludes"
                                className="form-control sector-wise"
                                placeholder="e.g. Personal Expenses, Laundry, Phone Calls..."
                                name="package_excludes"
                                value={package_excludes}
                                onChange={onInputChange}
                                style={{ height: "50px" }}
                              ></textarea>
                            </div>

                            <div className="col-12 mb-2">
                              <label className="form-label" htmlFor="flyer">
                                Package Flyer{" "}
                                <span className="text-danger">*</span>
                              </label>

                              <input
                                type="file"
                                id="flyer"
                                className="form-control sector-wise"
                                accept=".pdf,.jpg,.jpeg,.png"
                                name="package_flyer"
                                onChange={onFileChange}
                                required
                              />

                              <small className="text-muted d-block">
                                Maximum file size: <strong>5 MB</strong>.
                                Allowed formats: PDF, JPG, JPEG, PNG.
                              </small>
                            </div>
                          </>
                        )}
                      </>
                    )}

                    {selectedService === "Ticket" && (
                      <>
                        {activeTab === "basic" && (
                          <>
                            <div className="col-md-6 mb-2">
                              <label
                                className="form-label"
                                htmlFor="package_name"
                              >
                                Group Name{" "}
                                <span className="text-danger fw-bold">*</span>
                              </label>

                              <input
                                type="text"
                                id="package_name"
                                className="form-control sector-wise"
                                placeholder="Enter Group Name"
                                name="package_name"
                                value={package_name}
                                onChange={onInputChange}
                                required
                              />
                            </div>

                            <div className="col-md-6 mb-2">
                              <label className="form-label" htmlFor="price">
                                PNR Number{" "}
                                <span className="text-danger fw-bold">*</span>
                              </label>

                              <input
                                type="text"
                                id="price"
                                className="form-control sector-wise"
                                placeholder="e.g. XZ7K9P"
                                name="flight_pnr"
                                value={flight_pnr}
                                onChange={onInputChange}
                                required
                              />
                            </div>

                            <div className="col-md-6 mb-2">
                              <label
                                className="form-label"
                                htmlFor="package_type"
                              >
                                Trip Way{" "}
                                <span className="text-danger fw-bold">*</span>
                              </label>

                              <select
                                id="package_type"
                                className="form-select sector-wise"
                                name="trip_way"
                                value={trip_way}
                                onChange={onInputChange}
                                required
                              >
                                <option value="" hidden>
                                  Select Way
                                </option>
                                <option value="Shifting">One Way</option>
                                <option value="Non Shifting">Return</option>
                              </select>
                            </div>

                            <div className="col-md-6 mb-2">
                              <label className="form-label" htmlFor="price">
                                Price{" "}
                                <span className="text-danger fw-bold">*</span>
                              </label>

                              <input
                                type="number"
                                id="price"
                                className="form-control sector-wise"
                                placeholder="185000"
                                name="package_price"
                                value={package_price}
                                onChange={onInputChange}
                                required
                              />
                            </div>
                          </>
                        )}

                        {activeTab === "travel" && (
                          <>
                            <div className="col-md-6 mb-2">
                              <label
                                className="form-label"
                                htmlFor="start_date"
                              >
                                Number of Seats{" "}
                                <span className="text-danger fw-bold">*</span>
                              </label>

                              <input
                                type="number"
                                id="number_of_seats"
                                className="form-control sector-wise"
                                placeholder="40"
                                name="number_of_seats"
                                value={number_of_seats}
                                onChange={onInputChange}
                                required
                              />
                            </div>

                            <div className="col-md-6 mb-2">
                              <label className="form-label" htmlFor="end_date">
                                Departure Date{" "}
                                <span className="text-danger fw-bold">*</span>
                              </label>

                              <input
                                type="date"
                                id="end_date"
                                className="form-control sector-wise"
                                name="departure_date"
                                value={departure_date}
                                onChange={onInputChange}
                                required
                              />
                            </div>

                            <div className="col-md-6 mb-2">
                              <label
                                className="form-label"
                                htmlFor="arrival_date"
                              >
                                Departure Time{" "}
                                <span className="text-danger fw-bold">*</span>
                              </label>

                              <input
                                type="time"
                                id="arrival_date"
                                className="form-control sector-wise"
                                name="departure_time"
                                value={departure_time}
                                onChange={onInputChange}
                                required
                              />
                            </div>

                            <div className="col-md-6 mb-2">
                              <label
                                className="form-label"
                                htmlFor="arrival_date"
                              >
                                Flight Number{" "}
                                <span className="text-danger fw-bold">*</span>
                              </label>

                              <select
                                className="form-select sector-wise"
                                name="flights_no"
                                value={flights_no}
                                onChange={onInputChange}
                              >
                                <option value="" hidden>
                                  Select Flight Number
                                </option>
                                <option value="SV-701">SV-701</option>
                                <option value="AI-965">AI-965</option>
                                <option value="QR-501">QR-501</option>
                                <option value="EK-620">EK-620</option>
                                <option value="6E-1401">6E-1401</option>
                                <option value="PK-731">PK-731</option>
                              </select>
                            </div>
                          </>
                        )}

                        {activeTab === "details" && (
                          <>
                            <div className="col-md-6 mb-2">
                              <label
                                className="form-label"
                                htmlFor="package_includes"
                              >
                                Luggage Type{" "}
                                <span className="text-danger">*</span>
                              </label>

                              <select
                                className="form-select sector-wise"
                                name="luggage_type"
                                value={luggage_type}
                                onChange={onInputChange}
                              >
                                <option value="" hidden>
                                  Select Luggage Type
                                </option>
                                <option value="Checked Baggage">
                                  Checked Baggage
                                </option>
                                <option value="Hand Baggage">
                                  Hand Baggage
                                </option>
                              </select>
                            </div>

                            <div className="col-md-6 mb-2">
                              <label
                                className="form-label"
                                htmlFor="package_excludes"
                              >
                                Luggage Details
                              </label>

                              <select
                                className="form-select sector-wise"
                                name="luggage_details"
                                value={luggage_details}
                                onChange={onInputChange}
                              >
                                <option value="" hidden>
                                  Select Luggage
                                </option>
                                <option value="Cabin 7 kg">Cabin 7 kg</option>
                                <option value="Cabin 10 kg">Cabin 10 kg</option>
                                <option value="20 kg">20 kg</option>
                                <option value="30 kg">30 kg</option>
                                <option value="40 kg">40 kg</option>
                              </select>
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>

                  <div className="col-md-6 d-flex flex-column mt-2">
                    <div>
                      <button
                        type="submit"
                        className="btn btn-success submit-btn mb-2"
                      >
                        Submit
                      </button>
                    </div>

                    <Link className="text-success" to="/admin/packages">
                      Back
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <ToastContainer position="bottom-right" autoClose={1500} />
      </main>
    </>
  );
}

export default PackagesCreate;
