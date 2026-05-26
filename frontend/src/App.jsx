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
import AgentsCreate from "./admin/AgentsCreate";
import PackagesCreate from "./admin/PackagesCreate";

// const User = lazy(() => import("./User"));
// const Protected = lazy(() => import("./components/Protected"));

const Homepage = lazy(() => import("./admin/Homepage"));
const Leads = lazy(() => import("./admin/Leads"));
const CallerExecutive = lazy(() => import("./admin/CallerExecutive"));
const Packages = lazy(() => import("./admin/Packages"));
const Customers = lazy(() => import("./admin/Customers"));
const Agents = lazy(() => import("./admin/Agents"));
const Passport = lazy(() => import("./admin/Passport"));
const BulkUpload = lazy(() => import("./admin/BulkUpload"));
const Settings = lazy(() => import("./admin/Settings"));

const AgentDashboard = lazy(() => import("./agent/AgentDashboard"));
const AgentCustomers = lazy(() => import("./agent/AgentCustomers"));
const AgentPackages = lazy(() => import("./agent/AgentPackages"));
const AgentBookings = lazy(() => import("./agent/AgentBookings"));

const StaffDashboard = lazy(() => import("./caller/StaffDashboard"));
const StaffPackage = lazy(() => import("./caller/StaffPackage"));
const StaffFollowup = lazy(() => import("./caller/StaffFollowup"));
const CallersCreate = lazy(() => import("./admin/CallerCreate"));
const CallersEdit = lazy(() => import("./admin/CallerEdit"));
const AgentEdit = lazy(() => import("./agent/AgentEdit"));

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

              <Route path="packages" element={<Packages />} />
              <Route path="packages/create" element={<PackagesCreate />} />

              <Route path="agents" element={<Agents />} />
              <Route path="agents/create" element={<AgentsCreate />} />

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
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
