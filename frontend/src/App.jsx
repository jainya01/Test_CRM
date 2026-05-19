import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

// import Login from "./components/Login";
// import AdminLogin from "./pages/AdminLogin";
// import CallerLogin from "./pages/CallerLogin";

// import AdminProtected from "./components/AdminProtected";
// import UserProtected from "./components/UserProtected";

import User from "./User";
import Homepage from "./admin/Homepage";
import Leads from "./admin/Leads";
import BulkUpload from "./admin/BulkUpload";
import Settings from "./admin/Settings";
import Customers from "./admin/Customers";
import Agents from "./admin/Agents";
import Passport from "./admin/Passport";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<User />}>
          <Route path="dashboard" element={<Homepage />} />
          <Route path="leads" element={<Leads />} />
          <Route path="agents" element={<Agents />} />
          <Route path="customers" element={<Customers />} />
          <Route path="passports" element={<Passport />} />
          <Route path="bulk-upload" element={<BulkUpload />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
