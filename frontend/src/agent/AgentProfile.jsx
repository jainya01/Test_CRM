import { useEffect, useRef, useState } from "react";
import "../App.css";
import { authHeader } from "../utils/authHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function AgentEdit() {
  const API_URL = import.meta.env.VITE_API_URL;

  const fileInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  const [agent, setAgent] = useState({
    fullname: "",
    email: "",
    password: "",
    file: null,
  });

  const { fullname, email, password, file } = agent;

  const handleUpdateProfile = async () => {
    try {
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
        headers: authHeader(),
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
        const response = await axios.get(`${API_URL}/profile`, {
          headers: authHeader(),
        });

        const data = response.data.result;
        setAgent({
          fullname: data.fullname || "",
          email: data.email || "",
          password: "",
          profile_image: data.profile_image || "",
        });
      } catch (error) {
        console.error("error", error);
      }
    };

    getProfile();
  }, [API_URL]);

  return (
    <>
      <title>My Profile | CRM Agent Portal</title>
      <meta
        name="description"
        content="Update your profile information, manage account settings, change your password, upload a profile image, and keep your agent account details up to date."
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
                <form action={handleUpdateProfile}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        Full Name{" "}
                        <span className="text-danger fw-bolder">*</span>
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
                        Email Address{" "}
                        <span className="text-danger fw-bolder">*</span>
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

                    <div className="position-relative col-md-6 mb-3">
                      <label className="form-label">New Password</label>
                      <input
                        type={showPassword ? "text" : "password"}
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

                      <span
                        className="eye-login1"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <FontAwesomeIcon
                          icon={showPassword ? faEyeSlash : faEye}
                          className="me-2"
                        />
                      </span>
                    </div>

                    <div className="col-md-6 mb-2">
                      <label htmlFor="profileImage" className="form-label">
                        {agent.profile_image
                          ? "Choose Another Image"
                          : "Profile Image"}
                      </label>

                      <input
                        id="profileImage"
                        name="profileImage"
                        type="file"
                        ref={fileInputRef}
                        className="form-control sector-wise mb-0"
                        accept="image/*"
                        onChange={(e) =>
                          setAgent((prev) => ({
                            ...prev,
                            file: e.target.files?.[0] || null,
                          }))
                        }
                      />

                      {agent.profile_image && (
                        <small className="text-start current-replace d-block mt-1">
                          Current image exists. Choose another image to replace
                          it.
                        </small>
                      )}
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
      </main>
    </>
  );
}

export default AgentEdit;
