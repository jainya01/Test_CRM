import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { authHeader } from "../utils/authHeader";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function AgentEdit() {
  const API_URL = import.meta.env.VITE_API_URL;

  const { id } = useParams();
  const fileInputRef = useRef(null);

  const [agent, setAgent] = useState({
    fullname: "",
    email: "",
    password: "",
    file: null,
  });

  const { fullname, email, password, file } = agent;

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");

      const formData = new FormData();

      formData.append("fullname", fullname);
      formData.append("email", email);

      if (password) {
        formData.append("password", password);
      }

      if (file) {
        formData.append("profile_image", file);
      }

      await axios.put(`${API_URL}/editprofile/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Profile updated successfully");

      setAgent({
        fullname: "",
        email: "",
        password: "",
        file: null,
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.log(error);
      toast.error("Profile update failed");
    }
  };

  useEffect(() => {
    const getProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data.result;
        setAgent({
          fullname: data.fullname || "",
          email: data.email || "",
          password: "",
          file: null,
        });
      } catch (error) {
        console.error("error", error);
      }
    };

    getProfile();
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

      <div className="p-2 p-lg-3">
        <div className="mb-4">
          <h5 className="fw-bold overview-dashboard">Your Profile</h5>
        </div>

        <div className="col-12">
          <div className="card shadow border-0">
            <div className="card-header profile-header">Update Profile</div>

            <div className="card-body">
              <form onSubmit={handleUpdateProfile}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Full Name <span className="text-danger">*</span>
                    </label>

                    <input
                      type="text"
                      className="form-control sector-wise mb-0"
                      placeholder="Enter your name"
                      value={fullname}
                      onChange={(e) =>
                        setAgent({
                          ...agent,
                          fullname: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Email Address <span className="text-danger">*</span>
                    </label>

                    <input
                      type="email"
                      className="form-control sector-wise mb-0"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) =>
                        setAgent({
                          ...agent,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">New Password</label>

                    <input
                      type="password"
                      className="form-control sector-wise mb-0"
                      placeholder="Enter new password"
                      value={password}
                      onChange={(e) =>
                        setAgent({
                          ...agent,
                          password: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Profile Image</label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="form-control sector-wise mb-0"
                      onChange={(e) =>
                        setAgent({
                          ...agent,
                          file: e.target.files[0],
                        })
                      }
                    />
                  </div>

                  <div className="col-12 mt-2">
                    <button type="submit" className="btn btn-update">
                      Update Profile
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="bottom-right" autoClose={1500} />
    </div>
  );
}

export default AgentEdit;
