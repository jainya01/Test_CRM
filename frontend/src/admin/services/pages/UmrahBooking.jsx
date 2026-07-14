import { useEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faX } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const allBookings = [
  {
    id: 1,
    bookingNo: "BKH1001",
    customer: "Muhammad Tariq",
    phone: "+91 300 1000000",
    passport: "AB1234567",
    package: "Umrah Express — 10 Days",
    travelDate: "27 Aug 2026",
    pax: 1,
    total: "INR 1,850,000",
    balance: "INR 350,000",
    status: "Inquiry",
  },
  {
    id: 2,
    bookingNo: "BKH1002",
    customer: "Ayesha Siddiqui",
    phone: "+91 300 1000137",
    passport: "AB1234568",
    package: "Premium Umrah — 12 Days",
    travelDate: "11 Sep 2026",
    pax: 2,
    total: "INR 1,250,000",
    balance: "INR 750,000",
    status: "Follow-up",
  },
  {
    id: 3,
    bookingNo: "BKH1003",
    customer: "Ali Khan",
    phone: "+91 301 1234567",
    passport: "AB1234569",
    package: "Ramadan Umrah Special — 15 Days",
    travelDate: "20 Sep 2026",
    pax: 2,
    total: "INR 980,000",
    balance: "INR 250,000",
    status: "Confirmed",
  },
  {
    id: 4,
    bookingNo: "BKH1004",
    customer: "Fatima Noor",
    phone: "+91 302 4567890",
    passport: "AB1234570",
    package: "Deluxe Umrah — 7 Days",
    travelDate: "05 Oct 2026",
    pax: 4,
    total: "INR 2,400,000",
    balance: "INR 900,000",
    status: "Visa Processing",
  },
];

function UmrahBooking() {
  const [search, setSearch] = useState("");
  const [search1, setSearch1] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const scheduleRef = useRef();

  const [reschedule, setReschedule] = useState({
    open: false,
  });

  const filteredBookings = allBookings.filter((booking) => {
    const query = `${search || ""} ${search1 || ""}`.toLowerCase().trim();
    const matchesSearch =
      booking.bookingNo.toLowerCase().includes(query) ||
      booking.phone.toLowerCase().includes(query) ||
      booking.passport.toLowerCase().includes(query) ||
      booking.customer.toLowerCase().includes(query) ||
      booking.package.toLowerCase().includes(query);
    const matchesStatus = !selectedStatus || booking.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const itemsPerPage = 14;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredBookings.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

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
                  placeholder="Search by booking no, phone, passport, customer name, package name"
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

      <div className="p-2 p-lg-3">
        <div className="d-flex justify-content-between flex-wrap">
          <div>
            <h5 className="fw-bold overview-dashboard">Umrah Bookings</h5>
            <p className="text-muted overview-lead fw-bold">
              Manage Umrah package bookings — {filteredBookings.length} bookings
            </p>
          </div>

          <div className="mb-4">
            <Link
              className="text-decoration-none btn new-leader text-nowrap"
              onClick={() =>
                setReschedule((prev) => ({
                  ...prev,
                  open: true,
                }))
              }
            >
              + New Umrah Booking
            </Link>
          </div>
        </div>

        {reschedule.open && (
          <>
            <div className="modal-overlay">
              <div
                className="reschedule-modal reschedule-modal2 text-dark"
                ref={scheduleRef}
              >
                <div className="d-flex justify-content-between">
                  <h5 className="fw-bold">New Umrah Booking</h5>
                  <div>
                    <FontAwesomeIcon
                      icon={faX}
                      className="pointer-cursor"
                      onClick={() =>
                        setReschedule((prev) => ({
                          ...prev,
                          open: false,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="customer-info-wrapper mb-2">
                  <div className="customer-info-heading">
                    Customer Information
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-1">
                      <label className="form-label">Customer Name</label>
                      <input
                        type="text"
                        className="form-control sector-wise"
                        placeholder="e.g. John Doe"
                      />
                    </div>

                    <div className="col-md-6 mb-1">
                      <label className="form-label">Mobile Number</label>
                      <input
                        type="text"
                        className="form-control sector-wise"
                        placeholder="e.g. 9876543210"
                      />
                    </div>

                    <div className="col-md-6 mb-1">
                      <label className="form-label">WhatsApp Number</label>
                      <input
                        type="tel"
                        className="form-control sector-wise"
                        placeholder="e.g. 9876543210"
                      />
                    </div>

                    <div className="col-md-6 mb-1">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control sector-wise"
                        placeholder="e.g. john.doe@example.com"
                      />
                    </div>

                    <div className="col-md-6 mb-1">
                      <label className="form-label">Passport Number</label>
                      <input
                        type="text"
                        className="form-control sector-wise"
                        placeholder="e.g. A1234567"
                      />
                    </div>

                    <div className="col-md-6 mb-1">
                      <label className="form-label">Nationality</label>
                      <input
                        type="text"
                        className="form-control sector-wise"
                        placeholder="e.g. Indian"
                        defaultValue="Indian"
                      />
                    </div>

                    <div className="col-md-6 mb-1">
                      <label className="form-label">Date of Birth</label>
                      <input
                        type="date"
                        className="form-control sector-wise"
                        placeholder=""
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Gender</label>
                      <select className="form-select sector-wise">
                        <option value="" hidden>
                          Select Gender
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="customer-info-wrapper mb-2">
                  <div className="customer-info-heading">
                    Booking Information
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-1">
                      <label className="form-label">Booking No</label>
                      <input
                        type="text"
                        className="form-control sector-wise"
                        placeholder="e.g. BKH-AUTO"
                      />
                    </div>

                    <div className="col-md-6 mb-1">
                      <label className="form-label">Booking Date</label>
                      <input type="date" className="form-control sector-wise" />
                    </div>

                    <div className="col-md-6 mb-1">
                      <label className="form-label">Package</label>
                      <select className="form-select sector-wise">
                        <option value="" hidden>
                          Select Package
                        </option>
                        <option value="Umrah Express — 10 Days">
                          Umrah Express — 10 Days
                        </option>
                        <option value="Umrah Family Package — 14 Days">
                          Umrah Family Package — 14 Days
                        </option>
                        <option value="Ramadan Umrah Special">
                          Ramadan Umrah Special
                        </option>
                      </select>
                    </div>

                    <div className="col-md-6 mb-1">
                      <label className="form-label">Travel Date</label>
                      <input type="date" className="form-control sector-wise" />
                    </div>

                    <div className="col-md-6 mb-1">
                      <label className="form-label">Return Date</label>
                      <input type="date" className="form-control sector-wise" />
                    </div>

                    <div className="col-md-6 mb-1">
                      <label className="form-label">Adults</label>
                      <input
                        type="number"
                        className="form-control sector-wise"
                        defaultValue="0"
                      />
                    </div>

                    <div className="col-md-6 mb-1">
                      <label className="form-label">Children</label>
                      <input
                        type="number"
                        className="form-control sector-wise"
                        defaultValue="0"
                      />
                    </div>

                    <div className="col-md-6 mb-1">
                      <label className="form-label">Infants</label>
                      <input
                        type="number"
                        className="form-control sector-wise"
                        defaultValue="0"
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Room Sharing</label>
                      <select className="form-select sector-wise">
                        <option value="" hidden>
                          Select sharing
                        </option>
                        <option value="2 Bed">2 Bed</option>
                        <option value="Twin">Twin</option>
                        <option value="Triple">Triple</option>
                        <option value="Quad">Quad</option>
                        <option value="Quint">Quint</option>
                        <option value="Sharing">Sharing</option>
                      </select>
                    </div>

                    <div className="col-md-6 mb-1">
                      <label className="form-label">Hotel Preference</label>
                      <input
                        type="text"
                        className="form-control sector-wise"
                        placeholder="e.g. Fairmont Makkah"
                      />
                    </div>

                    <div className="col-md-6 mb-1">
                      <label className="form-label">
                        Seat / Flight Preference
                      </label>
                      <input
                        type="text"
                        className="form-control sector-wise"
                        placeholder="e.g. Aisle, Qatar Airways"
                      />
                    </div>
                  </div>
                </div>

                <div className="customer-info-wrapper mb-2">
                  <div className="customer-info-heading">Documents</div>

                  <div className="row">
                    <div className="col-md-6">
                      <label className="form-label">Passport Front</label>
                      <input
                        type="file"
                        className="form-control sector-wise dotted-border pe-5"
                        accept=".pdf,.jpg,.png"
                        required
                      />
                      <small className="text-muted">
                        Maximum file size: <strong>2 MB</strong>. Allowed
                        formats: PDF, JPG, PNG.
                      </small>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Passport Back</label>
                      <input
                        type="file"
                        className="form-control sector-wise dotted-border pe-5"
                        accept=".pdf,.jpg,.png"
                        required
                      />
                      <small className="text-muted">
                        Maximum file size: <strong>2 MB</strong>. Allowed
                        formats: PDF, JPG, PNG.
                      </small>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Visa Copy</label>
                      <input
                        type="file"
                        className="form-control sector-wise dotted-border pe-5"
                        accept=".pdf,.jpg,.png"
                        required
                      />
                      <small className="text-muted">
                        Maximum file size: <strong>2 MB</strong>. Allowed
                        formats: PDF, JPG, PNG.
                      </small>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Photograph</label>
                      <input
                        type="file"
                        className="form-control sector-wise dotted-border pe-5"
                        accept=".pdf,.jpg,.png"
                        required
                      />
                      <small className="text-muted">
                        Maximum file size: <strong>2 MB</strong>. Allowed
                        formats: PDF, JPG, PNG.
                      </small>
                    </div>

                    <div className="col-md-12">
                      <label className="form-label">Other Documents</label>
                      <input
                        type="file"
                        className="form-control sector-wise dotted-border pe-5"
                        accept=".pdf,.jpg,.png"
                        required
                      />
                      <small className="text-muted">
                        Maximum file size: <strong>2 MB</strong>. Allowed
                        formats: PDF, JPG, PNG.
                      </small>
                    </div>
                  </div>
                </div>

                <div className="customer-info-wrapper mb-2">
                  <div className="customer-info-heading">Payment</div>

                  <div className="row">
                    <div className="col-md-4 mb-1">
                      <label className="form-label">Package Price</label>
                      <input
                        type="number"
                        className="form-control sector-wise"
                        defaultValue="0"
                      />
                    </div>

                    <div className="col-md-4 mb-1">
                      <label className="form-label">Discount</label>
                      <input
                        type="number"
                        className="form-control sector-wise"
                        defaultValue="0"
                      />
                    </div>

                    <div className="col-md-4 mb-1">
                      <label className="form-label">GST</label>
                      <input
                        type="number"
                        className="form-control sector-wise"
                        defaultValue="0"
                      />
                    </div>

                    <div className="col-md-4 mb-1">
                      <label className="form-label">Extra Charges</label>
                      <input
                        type="number"
                        className="form-control sector-wise"
                        defaultValue="0"
                      />
                    </div>

                    <div className="col-md-4 mb-1">
                      <label className="form-label">Total Amount</label>
                      <input
                        type="number"
                        className="form-control sector-wise"
                        placeholder="1850000"
                      />
                    </div>

                    <div className="col-md-4 mb-1">
                      <label className="form-label">Advance Paid</label>
                      <input
                        type="number"
                        className="form-control sector-wise"
                        defaultValue="0"
                      />
                    </div>

                    <div className="col-md-4 mb-1">
                      <label className="form-label">Remaining Balance</label>
                      <input
                        type="number"
                        className="form-control sector-wise"
                        placeholder="1850000"
                      />
                    </div>

                    <div className="col-md-4 mb-1">
                      <label className="form-label">Payment Method</label>
                      <select className="form-select sector-wise">
                        <option value="" hidden>
                          Select
                        </option>
                        <option value="Cash">Cash</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Card">Card</option>
                        <option value="UPI">UPI</option>
                        <option value="Cheque">Cheque</option>
                      </select>
                    </div>

                    <div className="col-md-4 mb-1">
                      <label className="form-label">Payment Status</label>
                      <select className="form-select sector-wise">
                        <option value="" hidden>
                          Select
                        </option>
                        <option value="Unpaid">Unpaid</option>
                        <option value="Partial">Partial</option>
                        <option value="Paid">Paid</option>
                        <option value="Refunded">Refunded</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="customer-info-wrapper mb-2">
                  <div className="customer-info-heading">Status & Notes</div>

                  <div className="row">
                    <div className="col-md-12 mb-1">
                      <label className="form-label">Booking Status</label>
                      <select className="form-select sector-wise">
                        <option value="" hidden>
                          Select Status
                        </option>
                        <option value="Inquiry">Inquiry</option>
                        <option value="Follow-up">Follow-up</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Visa Processing">Visa Processing</option>
                        <option value="Ticket Issued">Ticket Issued</option>
                        <option value="Hotel Confirmed">Hotel Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Refund Initiated">
                          Refund Initiated
                        </option>
                      </select>
                    </div>

                    <div className="col-md-12 mb-1">
                      <label className="form-label">
                        Internal Notes (Admin & Staff only)
                      </label>
                      <textarea
                        type="text"
                        className="form-control sector-wise"
                        placeholder="Not visible to customer"
                        style={{ height: "50px" }}
                      />
                    </div>

                    <div className="col-md-12 mb-1">
                      <label className="form-label">Customer Remarks</label>
                      <textarea
                        type="text"
                        className="form-control sector-wise"
                        placeholder="Shown on booking confirmation"
                        style={{ height: "50px" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <button
                    className="btn btn-outline-transparent text-dark border rounded-3 cancel-schedule"
                    onClick={() =>
                      setReschedule((prev) => ({
                        ...prev,
                        open: false,
                      }))
                    }
                  >
                    Cancel
                  </button>

                  <button
                    className="btn btn-update"
                    onClick={() => {
                      console.log(reschedule);
                      setReschedule({
                        open: false,
                        passengerName: "",
                        passportNo: "",
                        destination: "",
                        airline: "",
                        flightNo: "",
                        flightDate: "",
                        status: "Requested",
                      });
                    }}
                  >
                    Create Booking
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="row py-2 g-2 mb-2 border rounded">
          <div className="col-lg-10 col-sm-6 col-md-6 col-12">
            <input
              type="search"
              className="form-control sector-wise"
              placeholder="Search by booking no, phone, passport, customer name, package name"
              value={search1}
              onChange={(e) => setSearch1(e.target.value.trim())}
            />
          </div>

          <div className="col-lg-2 col-sm-6 col-md-6 col-12">
            <select
              className="form-select sector-wise"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Inquiry">Inquiry</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Visa Processing">Visa Processing</option>
              <option value="Ticket Issued">Ticket Issued</option>
              <option value="Hotel Confirmed">Hotel Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Refund Initiated">Refund Initiated</option>
            </select>
          </div>
        </div>

        <div className="table-wrapper border p-0">
          <div className="table-responsive custom-scrollbar">
            <table className="table table-hover mb-0">
              <thead className="table-success header-table text-nowrap">
                <tr>
                  <th className="py-2">S/N</th>
                  <th>Booking No</th>
                  <th>Customer</th>
                  <th>Package</th>
                  <th>Travel</th>
                  <th>Pax</th>
                  <th>Total</th>
                  <th>Balance</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(paginatedData) && paginatedData.length > 0 ? (
                  paginatedData.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>

                      <td>
                        <span className="short-name">
                          {item?.bookingNo || "N/A"}
                        </span>
                      </td>

                      <td>
                        <div className="short-name">
                          {item?.customer || "N/A"}
                        </div>

                        <div className="customer-details">
                          <span className="custom-type">
                            {item?.phone || "N/A"}
                          </span>

                          <span className="custom-type">
                            {item?.passport || "N/A"}
                          </span>
                        </div>
                      </td>

                      <td>
                        <span className="short-name">
                          {item?.package || "N/A"}
                        </span>
                      </td>

                      <td>
                        <span className="short-name">
                          {item?.travelDate || "N/A"}
                        </span>
                      </td>

                      <td>
                        <span className="short-name">{item?.pax || "N/A"}</span>
                      </td>

                      <td>
                        <span className="short-name">
                          {item?.total || "N/A"}
                        </span>
                      </td>

                      <td>
                        <span className="short-name">
                          {item?.balance || "N/A"}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`status-badge ${
                            item.status === "Inquiry"
                              ? "status-inquiry"
                              : item.status === "Follow-up"
                                ? "status-followup"
                                : item.status === "Confirmed"
                                  ? "status-confirmed"
                                  : item.status === "Visa Processing"
                                    ? "status-visa"
                                    : item.status === "Ticket Issued"
                                      ? "status-ticket"
                                      : item.status === "Hotel Confirmed"
                                        ? "status-hotel"
                                        : item.status === "Completed"
                                          ? "status-completed"
                                          : item.status === "Cancelled"
                                            ? "status-cancelled"
                                            : item.status === "Refund Initiated"
                                              ? "status-refund"
                                              : ""
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center text-muted">
                      No bookings available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {filteredBookings.length > itemsPerPage && (
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
    </main>
  );
}

export default UmrahBooking;
