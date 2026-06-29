import { Navigate, Outlet } from "react-router-dom";

const Protected = ({ allow = [] }) => {
  const role = localStorage.getItem("userRole");

  const config = {
    admin: {
      token: localStorage.getItem("myAdminToken"),
      redirect: "/admin/dashboard",
    },
    agent: {
      token: localStorage.getItem("agentToken"),
      redirect: "/agent/overview",
    },
    staff: {
      token: localStorage.getItem("staffToken"),
      redirect: "/staff/leads",
    },
  };

  const current = config[role];

  if (!current) {
    return <Navigate to="/" replace />;
  }

  if (!current.token) {
    return <Navigate to="/" replace />;
  }

  if (allow.length > 0 && !allow.includes(role)) {
    return <Navigate to={current.redirect} replace />;
  }

  return <Outlet />;
};

export default Protected;
