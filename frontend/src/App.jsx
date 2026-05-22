import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import Login from "./components/Login";
import AdminLogin from "./components/AdminLogin";
import StaffLogin from "./components/StaffLogin";
import AgentLogin from "./components/AgentLogin";

import User from "./User";
import Protected from "./components/Protected";

import Homepage from "./admin/Homepage";
import Leads from "./admin/Leads";
import CallerExecutive from "./admin/CallerExecutive";
import Packages from "./admin/Packages";
import Customers from "./admin/Customers";
import Agents from "./admin/Agents";
import Passport from "./admin/Passport";
import BulkUpload from "./admin/BulkUpload";
import Settings from "./admin/Settings";

import AgentDashboard from "./agent/AgentDashboard";
import AgentCustomers from "./agent/AgentCustomers";
import AgentPackages from "./agent/AgentPackages";
import AgentBookings from "./agent/AgentBookings";

import StaffDashboard from "./caller/StaffDashboard";
import StaffPackage from "./caller/StaffPackage";
import StaffFollowup from "./caller/StaffFollowup";
import CallersCreate from "./admin/CallerCreate";
import CallersEdit from "./admin/CallerEdit";
import AgentEdit from "./agent/AgentEdit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/staff/login" element={<StaffLogin />} />
        <Route path="/agent/login" element={<AgentLogin />} />

        <Route element={<Protected allow={["admin"]} />}>
          <Route path="/admin" element={<User />}>
            <Route path="dashboard" element={<Homepage />} />
            <Route path="leads" element={<Leads />} />

            <Route path="callers" element={<CallerExecutive />} />
            <Route path="callers/create" element={<CallersCreate />} />
            <Route path="callers/edit/:id" element={<CallersEdit />} />

            <Route path="packages" element={<Packages />} />
            <Route path="agents" element={<Agents />} />
            <Route path="customers" element={<Customers />} />
            <Route path="passports" element={<Passport />} />
            <Route path="bulk-upload" element={<BulkUpload />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        <Route element={<Protected allow={["agent"]} />}>
          <Route path="/agent" element={<User />}>
            <Route path="overview" element={<AgentDashboard />} />
            <Route path="customers" element={<AgentCustomers />} />
            <Route path="packages" element={<AgentPackages />} />
            <Route path="bookings" element={<AgentBookings />} />

            <Route path="profile" element={<AgentEdit />} />
          </Route>
        </Route>

        <Route element={<Protected allow={["staff"]} />}>
          <Route path="/staff" element={<User />}>
            <Route path="leads" element={<StaffDashboard />} />
            <Route path="packages" element={<StaffPackage />} />
            <Route path="followups" element={<StaffFollowup />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
