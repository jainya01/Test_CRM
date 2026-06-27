import axios from "axios";
const APP_URL = import.meta.env.VITE_BASE_URL;

const getToken = () => {
  return (
    localStorage.getItem("adminToken") ||
    localStorage.getItem("agentToken") ||
    localStorage.getItem("staffToken")
  );
};

export const authHeader = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

axios.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const currentPath = window.location.pathname;

    const isLoginPage =
      currentPath === "/admin/login" ||
      currentPath === "/agent/login" ||
      currentPath === "/staff/login";

    if (error.response?.status === 401 && !isLoginPage) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("agentToken");
      localStorage.removeItem("staffToken");
      localStorage.removeItem("role");
      localStorage.removeItem("id");
      window.location.href = APP_URL;
    }

    return Promise.reject(error);
  },
);
