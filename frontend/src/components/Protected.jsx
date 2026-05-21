import { Navigate, Outlet } from "react-router-dom";

const Protected = ({ allow = [] }) => {
  const role = localStorage.getItem("role");

  let token = null;
  let redirectPath = "/";

  if (role === "admin") {
    token = localStorage.getItem("adminToken");
    redirectPath = "/admin/dashboard";
  } else if (role === "agent") {
    token = localStorage.getItem("agentToken");
    redirectPath = "/agent/overview";
  } else if (role === "staff") {
    token = localStorage.getItem("staffToken");
    redirectPath = "/staff/leads";
  } else {
    return <Navigate to="/" replace />;
  }

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (allow.length > 0 && !allow.includes(role)) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default Protected;
