import { useEffect, useState } from "react";
import "../../App.css";
import { authHeader } from "../../utils/authHeader";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function AgentsView() {
  const API_URL = import.meta.env.VITE_API_URL;

  const { id } = useParams();
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const agentsData = async () => {
      try {
        const response = await axios.get(`${API_URL}/someagents/${id}`, {
          headers: authHeader(),
        });
        setAgents(response.data.result[0]);
      } catch (error) {
        console.error("error", error);
      }
    };

    agentsData();
  }, [id, API_URL]);

  return (
    <>
      <title>View Agent | CRM Agent Portal</title>
      <meta
        name="description"
        content="View agent profile, contact details, addresses, KYC documents, bank information, social links, and account status."
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
                    placeholder="Search by name & email"
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

        <div className="container-fluid py-3">
          <div className="row py-3">
            <div className="col-12">
              <div className="bg-white rounded-3 shadow-sm p-4 border">
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                  <div className="agents-info">
                    <div className="fw-bold mb-1">Agent Information</div>
                    <div className="agents-info1 mb-0">
                      Complete profile and account details of the agents.
                    </div>
                  </div>

                  <div
                    className={`badge active-statuses px-3 mt-2 py-2 ${
                      agents.status === "Active" ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {agents.status}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card shadow-sm border-0 rounded-3 h-100">
                <div className="card-header card-header-custom text-white rounded-top-3">
                  <div className="mb-0">Personal Information</div>
                </div>

                <div className="card-body">
                  <div className="row gy-2">
                    <div className="col-md-6">
                      <small className="text-muted text-success">
                        Full Name
                      </small>
                      <h6>{agents.fullname || "N/A"}</h6>
                    </div>

                    <div className="col-md-6">
                      <small className="text-muted">Mobile Number</small>
                      <h6>{agents.phone || "-"}</h6>
                    </div>

                    <div className="col-md-6">
                      <small className="text-muted">Email</small>
                      <h6>{agents.email || "-"}</h6>
                    </div>

                    <div className="col-md-6">
                      <small className="text-muted">WhatsApp</small>
                      <h6>{agents.whatsapp_number || "-"}</h6>
                    </div>

                    <div className="col-md-6">
                      <small className="text-muted">Alternate Number</small>
                      <h6>{agents.alternate_mobile_number || "-"}</h6>
                    </div>

                    <div className="col-md-6">
                      <small className="text-muted">Notes</small>
                      <h6>{agents.notes || "-"}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card shadow-sm border-0 rounded-3 h-100">
                <div className="card-header card-header-custom text-white rounded-top-3">
                  <div className="mb-0">Identity Details</div>
                </div>

                <div className="card-body">
                  <div className="row gy-3">
                    <div className="col-md-6">
                      <small className="text-muted">Aadhaar Number</small>
                      <h6>{agents.aadhaar_number || "N/A"}</h6>
                    </div>

                    <div className="col-md-6">
                      <small className="text-muted">PAN Number</small>
                      <h6>{agents.pan_number || "-"}</h6>
                    </div>

                    <div className="col-md-12">
                      <small className="text-muted">Passport Number</small>
                      <h6>{agents.passport_number || "-"}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card shadow-sm border-0 rounded-3 h-100">
                <div className="card-header card-header-custom text-white rounded-top-3">
                  <div className="mb-0">Current Address</div>
                </div>

                <div className="card-body">
                  <p className="mb-3">
                    {[
                      agents.current_house_no,
                      agents.current_street,
                      agents.current_area,
                      agents.current_landmark,
                    ]
                      .filter(Boolean)
                      .join(", ") || "-"}
                  </p>

                  <div className="row gy-3">
                    <div className="col-md-6">
                      <small className="text-muted">City</small>
                      <h6>{agents.current_city || "-"}</h6>
                    </div>

                    <div className="col-md-6">
                      <small className="text-muted">District</small>
                      <h6>{agents.current_district || "-"}</h6>
                    </div>

                    <div className="col-md-6">
                      <small className="text-muted">State</small>
                      <h6>{agents.current_state || "-"}</h6>
                    </div>

                    <div className="col-md-6">
                      <small className="text-muted">Country</small>
                      <h6>{agents.current_country || "-"}</h6>
                    </div>

                    <div className="col-md-6">
                      <small className="text-muted">Pincode</small>
                      <h6>{agents.current_pincode || "-"}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card shadow-sm border-0 rounded-3 h-100">
                <div className="card-header card-header-custom text-white rounded-top-3">
                  <div className="mb-0">Permanent Address</div>
                </div>

                <div className="card-body">
                  <p className="mb-3">
                    {(agents.same_as_current_address === 1
                      ? [
                          agents.current_house_no,
                          agents.current_street,
                          agents.current_area,
                          agents.current_landmark,
                        ]
                      : [
                          agents.permanent_house_no,
                          agents.permanent_street,
                          agents.permanent_area,
                          agents.permanent_landmark,
                        ]
                    )
                      .filter(Boolean)
                      .join(", ") || "-"}
                  </p>

                  <div className="row gy-3">
                    <div className="col-md-6">
                      <small className="text-muted">City</small>
                      <h6>
                        {agents.same_as_current_address === 1
                          ? agents.current_city || "-"
                          : agents.permanent_city || "-"}
                      </h6>
                    </div>

                    <div className="col-md-6">
                      <small className="text-muted">District</small>
                      <h6>
                        {agents.same_as_current_address === 1
                          ? agents.current_district || "-"
                          : agents.permanent_district || "-"}
                      </h6>
                    </div>

                    <div className="col-md-6">
                      <small className="text-muted">State</small>
                      <h6>
                        {agents.same_as_current_address === 1
                          ? agents.current_state || "-"
                          : agents.permanent_state || "-"}
                      </h6>
                    </div>

                    <div className="col-md-6">
                      <small className="text-muted">Country</small>
                      <h6>
                        {agents.same_as_current_address === 1
                          ? agents.current_country || "-"
                          : agents.permanent_country || "-"}
                      </h6>
                    </div>

                    <div className="col-md-6">
                      <small className="text-muted">Pincode</small>
                      <h6>
                        {agents.same_as_current_address === 1
                          ? agents.current_pincode || "-"
                          : agents.permanent_pincode || "-"}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card shadow-sm border-0 rounded-3 h-100">
                <div className="card-header card-header-custom text-white rounded-top-3">
                  <div className="mb-0">Bank Details</div>
                </div>

                <div className="card-body">
                  <div className="row gy-3">
                    <div className="col-md-6">
                      <small className="text-muted">Account Holder</small>
                      <h6>{agents.account_holder_name || "-"}</h6>
                    </div>

                    <div className="col-md-6">
                      <small className="text-muted">Bank Name</small>
                      <h6>{agents.bank_name || "-"}</h6>
                    </div>

                    <div className="col-md-6">
                      <small className="text-muted">Account Number</small>
                      <h6>{agents.account_number || "-"}</h6>
                    </div>

                    <div className="col-md-6">
                      <small className="text-muted">IFSC Code</small>
                      <h6>{agents.ifsc_code || "-"}</h6>
                    </div>

                    <div className="col-md-6">
                      <small className="text-muted">Branch</small>
                      <h6>{agents.branch_name || "-"}</h6>
                    </div>

                    <div className="col-md-6">
                      <small className="text-muted">UPI ID</small>
                      <h6>{agents.upi_id || "-"}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card shadow-sm border-0 rounded-3 h-100">
                <div className="card-header card-header-custom text-white rounded-top-3">
                  <div className="mb-0">Social Media</div>
                </div>

                <div className="card-body">
                  <div className="row gy-2">
                    <div className="col-12">
                      <small className="text-muted">Facebook</small>
                      <h6>
                        {agents.facebook ? (
                          <a
                            href={agents.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-success"
                          >
                            {agents.facebook}
                          </a>
                        ) : (
                          "-"
                        )}
                      </h6>
                    </div>

                    <div className="col-12">
                      <small className="text-muted">Instagram</small>
                      <h6>
                        {agents.instagram ? (
                          <a
                            href={agents.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-success"
                          >
                            {agents.instagram}
                          </a>
                        ) : (
                          "-"
                        )}
                      </h6>
                    </div>

                    <div className="col-12">
                      <small className="text-muted">LinkedIn</small>
                      <h6>
                        {agents.linkedin ? (
                          <a
                            href={agents.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-success"
                          >
                            {agents.linkedin}
                          </a>
                        ) : (
                          "-"
                        )}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default AgentsView;
