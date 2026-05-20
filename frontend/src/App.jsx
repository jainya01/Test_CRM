import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import Login from "./components/Login";
import AdminLogin from "./components/AdminLogin";
import AgentLogin from "./components/AgentLogin";
import CallerLogin from "./components/CallerLogin";

// import AdminProtected from "./components/AdminProtected";
// import UserProtected from "./components/UserProtected";

import User from "./User";
import Homepage from "./admin/Homepage";
import Leads from "./admin/Leads";
import Packages from "./admin/Packages";
import BulkUpload from "./admin/BulkUpload";
import Settings from "./admin/Settings";
import Customers from "./admin/Customers";
import Agents from "./admin/Agents";
import Passport from "./admin/Passport";
import CallerExecutive from "./admin/CallerExecutive";

import AgentDashboard from "./agent/AgentDashboard";
import AgentCustomers from "./agent/AgentCustomers";
import AgentPackages from "./agent/AgentPackages";
import AgentBookings from "./agent/AgentBookings";

import CallerDashboard from "./caller/CallerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="admin/login" element={<AdminLogin />} />
        <Route path="caller/login" element={<CallerLogin />} />
        <Route path="agent/login" element={<AgentLogin />} />

        <Route path="/admin" element={<User />}>
          <Route path="dashboard" element={<Homepage />} />
          <Route path="leads" element={<Leads />} />
          <Route path="callers" element={<CallerExecutive />} />
          <Route path="packages" element={<Packages />} />
          <Route path="agents" element={<Agents />} />
          <Route path="customers" element={<Customers />} />
          <Route path="passports" element={<Passport />} />
          <Route path="bulk-upload" element={<BulkUpload />} />
          <Route path="settings" element={<Settings />} />

          {/* Agent */}

          <Route path="overview" element={<AgentDashboard />} />
          <Route path="customer" element={<AgentCustomers />} />
          <Route path="package" element={<AgentPackages />} />
          <Route path="bookings" element={<AgentBookings />} />

          {/* Agent */}

          <Route path="lead" element={<CallerDashboard />} />
        </Route>

        {/* <Route path="/agent" element={<User />}>
          <Route path="dashboard" element={<AgentDashboard />} />
        </Route> */}

        {/* <Route path="/caller" element={<User />}>
          <Route path="leads" element={<AgentDashboard />} />
        </Route> */}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
