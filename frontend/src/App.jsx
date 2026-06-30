import { Suspense, lazy } from "react";
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
const Leads = lazy(() => import("./admin/Leads"));

const Packages = lazy(() => import("./admin/Package/Packages"));
const PackagesCreate = lazy(() => import("./admin/Package/PackagesCreate"));

const Customers = lazy(() => import("./admin/Customers"));

const Agents = lazy(() => import("./admin/Agents/Agents"));
const AgentsCreate = lazy(() => import("./admin/Agents/AgentsCreate"));
const AgentsEdit = lazy(() => import("./admin/Agents/AgentsEdit"));

const Passport = lazy(() => import("./admin/Passport"));
const BulkUpload = lazy(() => import("./admin/BulkUpload"));

const StaffExecutive = lazy(() => import("./admin/Caller/StaffExecutive"));
const StaffCreate = lazy(() => import("./admin/Caller/StaffCreate"));
const StaffEdit = lazy(() => import("./admin/Caller/StaffEdit"));
const StaffView = lazy(() => import("./admin/Caller/StaffView"));

const Service = lazy(() => import("./admin/services/Service"));
const ServiceCreate = lazy(() => import("./admin/services/ServiceCreate"));
const ServicesEdit = lazy(() => import("./admin/services/ServiceEdit"));

const Settings = lazy(() => import("./admin/Settings"));

import AgentDashboard from "./agent/AgentDashboard";
const AgentCustomers = lazy(() => import("./agent/AgentCustomers"));
const AgentPackages = lazy(() => import("./agent/AgentPackages"));
const AgentBookings = lazy(() => import("./agent/AgentBookings"));
const AgentProfile = lazy(() => import("./agent/AgentProfile"));

import StaffDashboard from "./staff/StaffDashboard";
const StaffPackage = lazy(() => import("./staff/StaffPackage"));
const StaffFollowup = lazy(() => import("./staff/StaffFollowup"));

function App() {
  return (
    <BrowserRouter basename="/laraib">
      <Suspense>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/staff/login" element={<StaffLogin />} />
          <Route path="/agent/login" element={<AgentLogin />} />

          <Route element={<Protected allow={["admin"]} />}>
            <Route path="/admin" element={<User />}>
              <Route path="dashboard" element={<Homepage />} />
              <Route path="leads" element={<Leads />} />

              <Route path="staffs" element={<StaffExecutive />} />
              <Route path="staffs/create" element={<StaffCreate />} />
              <Route path="staffs/edit/:id" element={<StaffEdit />} />
              <Route path="staffs/view/:id" element={<StaffView />} />

              <Route path="packages" element={<Packages />} />
              <Route path="packages/create" element={<PackagesCreate />} />

              <Route path="agents" element={<Agents />} />
              <Route path="agents/create" element={<AgentsCreate />} />
              <Route path="agents/edit/:id" element={<AgentsEdit />} />

              <Route path="customers" element={<Customers />} />
              <Route path="passports" element={<Passport />} />
              <Route path="bulk-upload" element={<BulkUpload />} />

              <Route path="services" element={<Service />} />
              <Route path="services/create" element={<ServiceCreate />} />
              <Route path="services/edit/:id" element={<ServicesEdit />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>

          <Route element={<Protected allow={["agent"]} />}>
            <Route path="/agent" element={<User />}>
              <Route path="overview" element={<AgentDashboard />} />
              <Route path="customers" element={<AgentCustomers />} />
              <Route path="packages" element={<AgentPackages />} />
              <Route path="bookings" element={<AgentBookings />} />
              <Route path="profile" element={<AgentProfile />} />
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
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
