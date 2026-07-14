import { useEffect, useMemo, useState } from "react";
import "../../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faX, faUsers } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { authHeader } from "../../utils/authHeader";
import axios from "axios";

function Packages() {
  const API_URL = import.meta.env.VITE_API_URL;

  const today = new Date();
  const [search, setSearch] = useState("");
  const [packages, setPackages] = useState([]);
  const [active, setActive] = useState("Hajj");
  const tabs = ["Hajj", "Umrah", "Ticket"];

  const getServiceClass = (service) => {
    switch (service) {
      case "Hajj":
        return "hajj-premium";
      case "Umrah":
        return "umrah-premium";
      case "Ticket":
        return "ticket-premium";
      default:
        return "";
    }
  };

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = (item) => {
    setSelectedPackage(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPackage(null);
  };

  useEffect(() => {
    const packagesData = async () => {
      try {
        const response = await axios.get(`${API_URL}/allpackages`, {
          headers: authHeader(),
        });

        setPackages(response.data.result);
      } catch (error) {
        console.error("error", error);
      }
    };
    packagesData();
  }, [API_URL]);

  const filteredData = useMemo(() => {
    return packages.filter(
      (item) =>
        item.service === active &&
        item.package_name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [packages, active, search]);

  return (
    <>
      <title>Packages Management | Travel CRM Portal</title>
      <meta
        name="description"
        content="Manage Hajj, Umrah, Ticket, and Medical Visa packages. Update pricing, track availability, monitor bookings, and organize travel services in the CRM Packages Portal."
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
              <h5 className="fw-bold overview-dashboard mb-1">Packages</h5>
              <p className="text-muted overview-lead fw-bold">
                {filteredData.length} active packages
              </p>
            </div>

            <div>
              <Link
                className="text-decoration-none btn new-leader text-nowrap"
                to={`/admin/packages/create?service=${active}`}
              >
                + New {active} Package
              </Link>
            </div>
          </div>

          <div className="d-flex flex-wrap flex-md-nowrap gap-2 border custom-packages mt-2">
            {tabs.map((tab) => (
              <div
                key={tab}
                onClick={() => setActive(tab)}
                className={`custom-pad custom-styles ${
                  active === tab ? "tab-active" : "tab-inactive"
                }`}
                role="button"
                tabIndex={0}
              >
                {tab}
              </div>
            ))}
          </div>

          <div className="row g-2 mt-3">
            {Array.isArray(filteredData) && filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <div className="col-12 col-sm-6 col-md-6 col-lg-3" key={index}>
                  <div className="border rounded-3 h-100 pointer-cursor">
                    <div
                      className={`rounded-3 common-code ${getServiceClass(item.service)}`}
                      onClick={() => handleOpenModal(item)}
                    >
                      <span className="d-flex flex-wrap">
                        <div className="hajj-package ms-2">{item.service}</div>
                      </span>
                    </div>

                    <div className="mt-2 px-3 py-1">
                      <div className="package-name">
                        <Link
                          to={`/admin/packages/edit/${item.id}?service=${item.service}`}
                          className="text-dark text-decoration-none"
                        >
                          {item.package_name}
                        </Link>

                        <div className="mt-1 days-client">
                          {Math.ceil(
                            (new Date(item.departure_date) - today) / 86400000,
                          )}{" "}
                          days
                        </div>
                      </div>

                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <div className="d-flex flex-column">
                          <div className="price-package mt-2">
                            INR {item.package_price}
                          </div>
                          <div className="seats-left mt-1 mb-2">
                            <FontAwesomeIcon icon={faUsers} className="me-2" />
                            {item.number_of_seats} seats left
                          </div>
                        </div>

                        <div>
                          <button className="btn new-leader px-2 py-1 new-books">
                            Book
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center w-100 mt-3 text-muted">
                No packages available
              </div>
            )}

            {showModal && selectedPackage && (
              <div className="modal-overlay-flyer" onClick={handleCloseModal}>
                <div
                  className="flyer-modal border border-light"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flyer-header d-flex justify-content-between">
                    <div>
                      <h4 className="mb-1 package-name-flyer">
                        {selectedPackage.package_name}
                      </h4>
                      <span
                        className={`badge ${
                          selectedPackage.service === "Hajj"
                            ? "bg-primary"
                            : selectedPackage.service === "Umrah"
                              ? "bg-success"
                              : selectedPackage.service === "Ticket"
                                ? "bg-warning"
                                : "bg-info"
                        }`}
                      >
                        {selectedPackage.service}
                      </span>
                    </div>

                    <div onClick={handleCloseModal} className="pointer-cursor">
                      <FontAwesomeIcon icon={faX} className="fw-bold" />
                    </div>
                  </div>

                  <hr />

                  <div className="flyer-body">
                    <div className="flyer-item">
                      <strong>Price:</strong> {selectedPackage.package_price}
                    </div>

                    <div className="flyer-item">
                      <strong>Seats:</strong> {selectedPackage.number_of_seats}
                    </div>
                  </div>

                  <div className="flyer-footer">
                    <button className="btn new-leader new-books ms-2">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default Packages;
