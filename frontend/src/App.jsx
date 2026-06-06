import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
const Login = lazy(() => import("./components/Login"));
const AdminLogin = lazy(() => import("./components/AdminLogin"));
const StaffLogin = lazy(() => import("./components/StaffLogin"));
const AgentLogin = lazy(() => import("./components/AgentLogin"));

import User from "./User";
import Protected from "./components/Protected";

const Homepage = lazy(() => import("./admin/Homepage"));
const Leads = lazy(() => import("./admin/Leads"));

const Packages = lazy(() => import("./admin/Package/Packages"));
const PackagesCreate = lazy(() => import("./admin/Package/PackagesCreate"));

const Customers = lazy(() => import("./admin/Customers"));

const Agents = lazy(() => import("./admin/Agents/Agents"));
const AgentsCreate = lazy(() => import("./admin/Agents/AgentsCreate"));

const Passport = lazy(() => import("./admin/Passport"));
const BulkUpload = lazy(() => import("./admin/BulkUpload"));

const CallerExecutive = lazy(() => import("./admin/Caller/CallerExecutive"));
const CallersCreate = lazy(() => import("./admin/Caller/CallerCreate"));
const CallersEdit = lazy(() => import("./admin/Caller/CallerEdit"));
const CallersView = lazy(() => import("./admin/Caller/CallersView"));

const Service = lazy(() => import("./admin/services/Service"));
const ServiceCreate = lazy(() => import("./admin/services/ServiceCreate"));
const ServicesEdit = lazy(() => import("./admin/services/ServiceEdit"));

const Settings = lazy(() => import("./admin/Settings"));

const AgentDashboard = lazy(() => import("./agent/AgentDashboard"));
const AgentCustomers = lazy(() => import("./agent/AgentCustomers"));
const AgentPackages = lazy(() => import("./agent/AgentPackages"));
const AgentBookings = lazy(() => import("./agent/AgentBookings"));
const AgentEdit = lazy(() => import("./agent/AgentEdit"));

const StaffDashboard = lazy(() => import("./staff/StaffDashboard"));
const StaffPackage = lazy(() => import("./staff/StaffPackage"));
const StaffFollowup = lazy(() => import("./staff/StaffFollowup"));

function App() {
  return (
    <BrowserRouter>
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

              <Route path="callers" element={<CallerExecutive />} />
              <Route path="callers/create" element={<CallersCreate />} />
              <Route path="callers/edit/:id" element={<CallersEdit />} />
              <Route path="callers/view/:id" element={<CallersView />} />

              <Route path="packages" element={<Packages />} />
              <Route path="packages/create" element={<PackagesCreate />} />

              <Route path="agents" element={<Agents />} />
              <Route path="agents/create" element={<AgentsCreate />} />

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
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
