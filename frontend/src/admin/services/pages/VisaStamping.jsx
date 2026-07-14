import { useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBell,
  faPen,
  faTrash,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ksaVisas = [
  {
    id: 1,
    country: "Saudi Arabia",
    countryCode: "KSA",
    visaType: "Employment Visa",
    status: "Active",
  },
  {
    id: 2,
    country: "Saudi Arabia",
    countryCode: "KSA",
    visaType: "Tourist Visa",
    status: "Active",
  },
  {
    id: 3,
    country: "Saudi Arabia",
    countryCode: "KSA",
    visaType: "Business Visit Visa",
    status: "Active",
  },
  {
    id: 4,
    country: "Saudi Arabia",
    countryCode: "KSA",
    visaType: "Umrah Visa",
    status: "Active",
  },
  {
    id: 5,
    country: "Saudi Arabia",
    countryCode: "KSA",
    visaType: "Group Umrah Visa",
    status: "Active",
  },
  {
    id: 6,
    country: "Saudi Arabia",
    countryCode: "KSA",
    visaType: "Resident Visa",
    status: "Active",
  },
  {
    id: 7,
    country: "Saudi Arabia",
    countryCode: "KSA",
    visaType: "Family Visit Visa",
    status: "Active",
  },
];

const uaeVisas = [
  {
    id: 1,
    country: "United Arab Emirates",
    countryCode: "UAE",
    visaType: "30 Days Visit Visa",
    status: "Active",
  },
  {
    id: 2,
    country: "United Arab Emirates",
    countryCode: "UAE",
    visaType: "60 Days Visit Visa",
    status: "Active",
  },
  {
    id: 3,
    country: "United Arab Emirates",
    countryCode: "UAE",
    visaType: "90 Days Visit Visa",
    status: "Active",
  },
  {
    id: 4,
    country: "United Arab Emirates",
    countryCode: "UAE",
    visaType: "Employment Visa",
    status: "Active",
  },
  {
    id: 5,
    country: "United Arab Emirates",
    countryCode: "UAE",
    visaType: "Resident Visa",
    status: "Active",
  },
];

const kuwaitVisas = [
  {
    id: 1,
    country: "Kuwait",
    countryCode: "KWT",
    visaType: "Employment Visa",
    status: "Active",
  },
  {
    id: 2,
    country: "Kuwait",
    countryCode: "KWT",
    visaType: "Resident Visa",
    status: "Active",
  },
];

const omanVisas = [
  {
    id: 1,
    country: "Oman",
    countryCode: "OMN",
    visaType: "14 Days Visit Visa",
    status: "Active",
  },
  {
    id: 2,
    country: "Oman",
    countryCode: "OMN",
    visaType: "30 Days Visit Visa",
    status: "Active",
  },
  {
    id: 3,
    country: "Oman",
    countryCode: "OMN",
    visaType: "60 Days Visit Visa",
    status: "Active",
  },
  {
    id: 4,
    country: "Oman",
    countryCode: "OMN",
    visaType: "14 KB Days",
    status: "Active",
  },
  {
    id: 5,
    country: "Oman",
    countryCode: "OMN",
    visaType: "30 KB Days",
    status: "Active",
  },
  {
    id: 6,
    country: "Oman",
    countryCode: "OMN",
    visaType: "60 KB Days",
    status: "Active",
  },
];

const bahrainVisas = [
  {
    id: 1,
    country: "Bahrain",
    countryCode: "BHR",
    visaType: "14 Days Visit Visa",
    status: "Active",
  },
  {
    id: 2,
    country: "Bahrain",
    countryCode: "BHR",
    visaType: "20 Days Visit Visa",
    status: "Active",
  },
];

const qatarVisas = [
  {
    id: 1,
    country: "Qatar",
    countryCode: "QAT",
    visaType: "Visit Visa",
    status: "Active",
  },
];

const countries = [
  {
    title: "Saudi Arabia",
    code: "KSA",
    key: "ksaVisas",
  },
  {
    title: "United Arab Emirates",
    code: "UAE",
    key: "uaeVisas",
  },
  {
    title: "Kuwait",
    code: "KWT",
    key: "kuwaitVisas",
  },
  {
    title: "Oman",
    code: "OMN",
    key: "omanVisas",
  },
  {
    title: "Bahrain",
    code: "BHR",
    key: "bahrainVisas",
  },
  {
    title: "Qatar",
    code: "QAT",
    key: "qatarVisas",
  },
];

function VisaStamping() {
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const scheduleRef = useRef();

  const [visaData, setVisaData] = useState({
    ksaVisas,
    uaeVisas,
    kuwaitVisas,
    omanVisas,
    bahrainVisas,
    qatarVisas,
  });

  const handleToggle = (countryKey, id) => {
    setVisaData((prev) => ({
      ...prev,
      [countryKey]: prev[countryKey].map((visa) =>
        visa.id === id
          ? {
              ...visa,
              status: visa.status === "Active" ? "Disabled" : "Active",
            }
          : visa,
      ),
    }));
  };

  const [reschedule, setReschedule] = useState({
    open: false,
    mode: "add",
    countryKey: "",
    id: null,
    country: "",
    visaType: "",
    status: "Active",
  });

  const deleteData = (countryKey, id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this visa?",
    );

    if (!confirmDelete) return;

    setVisaData((prev) => ({
      ...prev,
      [countryKey]: prev[countryKey].filter((visa) => visa.id !== id),
    }));
  };

  const editVisaData = (countryKey, visa) => {
    setReschedule({
      open: true,
      mode: "edit",
      countryKey: countryKey,
      id: visa.id,
      country: visa.country,
      visaType: visa.visaType,
      status: visa.status,
    });
  };

  const { filteredCountries, filteredVisaData } = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    const filteredVisaData = Object.fromEntries(
      Object.entries(visaData).map(([key, visas]) => [
        key,
        visas.filter((visa) => {
          const searchText =
            `${visa.countryCode} ${visa.visaType}`.toLowerCase();

          return (
            searchText.includes(keyword) &&
            (!selectedCountry || visa.country === selectedCountry)
          );
        }),
      ]),
    );

    const filteredCountries = countries.filter((country) => {
      if (selectedCountry && country.title !== selectedCountry) {
        return false;
      }

      return filteredVisaData[country.key]?.length > 0;
    });

    return {
      filteredCountries,
      filteredVisaData,
    };
  }, [visaData, search, selectedCountry]);

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
                  placeholder="Search by visa type"
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
          <div className="d-flex justify-content-between">
            <div className="mt-2 me-3">
              <Link className="text-dark" to="/admin/services">
                <FontAwesomeIcon icon={faArrowLeft} className="arrow-left" />
              </Link>
            </div>

            <div>
              <h5 className="fw-bold overview-dashboard mb-1">Visa Stamping</h5>
              <p className="text-muted overview-lead fw-bold">
                Manage visa types across countries
              </p>
            </div>
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
              + Add Visa Type
            </Link>
          </div>
        </div>

        {reschedule.open && (
          <>
            <div className="modal-overlay">
              <div
                className="reschedule-modal reschedule-modal1 text-dark"
                ref={scheduleRef}
              >
                <div className="d-flex justify-content-between">
                  <h5 className="fw-bold">
                    {reschedule.mode === "edit"
                      ? "Edit Visa Type"
                      : "Add Visa Type"}
                  </h5>
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

                <div className="row mt-3">
                  <div className="col-12 mb-1">
                    <label className="form-label">Country</label>
                    <select
                      className="form-select sector-wise"
                      value={reschedule.country}
                      onChange={(e) =>
                        setReschedule((prev) => ({
                          ...prev,
                          country: e.target.value,
                        }))
                      }
                    >
                      <option value="" hidden>
                        Select Country
                      </option>
                      <option value="Saudia Arabia (KSA)">
                        Saudia Arabia (KSA)
                      </option>
                      <option value="United Arab Emirated (UAE)">
                        United Arab Emirated (UAE)
                      </option>
                      <option value="Kuwait">Kuwait</option>
                      <option value="Oman">Oman</option>
                      <option value="Bahrain">Bahrain</option>
                      <option value="Katar">Katar</option>
                    </select>
                  </div>

                  <div className="col-12 mb-1">
                    <label className="form-label">Visa Name</label>
                    <input
                      type="text"
                      className="form-control sector-wise"
                      placeholder="e.g. KSA Tourist Visa"
                      value={reschedule.visaType || ""}
                      onChange={(e) =>
                        setReschedule((prev) => ({
                          ...prev,
                          visaType: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="mb-2">
                    <div className="d-flex justify-content-between align-items-center border rounded-3 px-3 py-2">
                      <div className="d-flex flex-column">
                        <span className="fw-semibold">Enabled</span>
                        <span className="text-muted muted-text">
                          Show this visa type to staff
                        </span>
                      </div>

                      <div className="form-check form-switch mb-0">
                        <input
                          className="form-check-input visa-toggle"
                          type="checkbox"
                          checked={reschedule.status === "Active"}
                          onChange={(e) =>
                            setReschedule((prev) => ({
                              ...prev,
                              status: e.target.checked ? "Active" : "Disabled",
                            }))
                          }
                        />
                      </div>
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
                      if (reschedule.mode === "edit") {
                        setVisaData((prev) => ({
                          ...prev,
                          [reschedule.countryKey]: Array.isArray(
                            prev[reschedule.countryKey],
                          )
                            ? prev[reschedule.countryKey].map((visa) =>
                                visa.id === reschedule.id
                                  ? {
                                      ...visa,
                                      visaType: reschedule.visaType,
                                      status: reschedule.status,
                                    }
                                  : visa,
                              )
                            : [],
                        }));
                      } else {
                        const countryKey =
                          reschedule.countryKey ||
                          `${reschedule.country
                            .toLowerCase()
                            .replace(/\s/g, "")
                            .replace(/[()]/g, "")}Visas`;

                        const newVisa = {
                          id: Date.now(),
                          country: reschedule.country,
                          countryCode:
                            reschedule.country
                              ?.split("(")[1]
                              ?.replace(")", "") || "",
                          visaType: reschedule.visaType,
                          status: reschedule.status,
                        };

                        setVisaData((prev) => ({
                          ...prev,
                          [countryKey]: [
                            ...(Array.isArray(prev[countryKey])
                              ? prev[countryKey]
                              : []),
                            newVisa,
                          ],
                        }));
                      }

                      setReschedule({
                        open: false,
                        mode: "add",
                        countryKey: "",
                        id: null,
                        country: "",
                        visaType: "",
                        status: "Active",
                      });
                    }}
                  >
                    {reschedule.mode === "edit"
                      ? "Save Changes"
                      : "Add Visa Type"}
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
              placeholder="Search visa type..."
              value={search}
              onChange={(e) => setSearch(e.target.value.trim())}
            />
          </div>

          <div className="col-lg-2 col-sm-6 col-md-6 col-12">
            <select
              className="form-select sector-wise"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="">All Countries</option>
              <option value="Saudi Arabia">Saudi Arabia</option>
              <option value="United Arab Emirates">United Arab Emirates</option>
              <option value="Kuwait">Kuwait</option>
              <option value="Oman">Oman</option>
              <option value="Bahrain">Bahrain</option>
              <option value="Qatar">Qatar</option>
            </select>
          </div>
        </div>

        <div className="row py-2">
          {filteredCountries.map((country) => (
            <div className="country-section mb-4" key={country.key}>
              <div className="country-header d-flex align-items-center mb-3">
                <h4 className="country-title mb-0">
                  {country.title} ({country.code})
                </h4>

                <span className="country-count ms-2">
                  {Array.isArray(filteredVisaData[country.key])
                    ? filteredVisaData[country.key].length
                    : 0}
                </span>
              </div>

              <div className="row g-3">
                {Array.isArray(filteredVisaData[country.key]) &&
                filteredVisaData[country.key].length > 0 ? (
                  filteredVisaData[country.key].map((visa) => (
                    <div className="col-xl-4 col-lg-4 col-md-6" key={visa.id}>
                      <div className="visa-card">
                        <div className="visa-info d-flex align-items-center">
                          <div
                            className={`status-bar ${
                              visa.status === "Active"
                                ? "status-active"
                                : "status-disabled"
                            }`}
                          ></div>

                          <div className="ms-3">
                            <h6 className="visa-title mb-1">
                              {country.code} {visa.visaType}
                            </h6>

                            <small
                              className={
                                visa.status === "Active"
                                  ? "visa-status active"
                                  : "visa-status disabled"
                              }
                            >
                              {visa.status}
                            </small>
                          </div>
                        </div>

                        <div className="visa-actions d-flex align-items-center">
                          <div className="form-check form-switch mb-0 me-3">
                            <input
                              className="form-check-input visa-toggle"
                              type="checkbox"
                              checked={visa.status === "Active"}
                              onChange={() =>
                                handleToggle(country.key, visa.id)
                              }
                            />
                          </div>

                          <FontAwesomeIcon
                            icon={faPen}
                            className="icons-color"
                            style={{ cursor: "pointer" }}
                            onClick={() => editVisaData(country.key, visa)}
                          />

                          <FontAwesomeIcon
                            icon={faTrash}
                            className="icons-color1 ms-2"
                            onClick={() => deleteData(country.key, visa.id)}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center text-muted py-3">
                    No visa records found.
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default VisaStamping;
