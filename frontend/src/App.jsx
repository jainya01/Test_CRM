import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

// import Login from "./components/Login";
// import AdminLogin from "./pages/AdminLogin";
// import CallerLogin from "./pages/CallerLogin";

// import AdminProtected from "./components/AdminProtected";
// import UserProtected from "./components/UserProtected";

import User from "./User";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<User />}>
          <Route path="dashboard" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
