import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./Pages/PrivateRoute/PrivateRoute";
import Login from "./Components/Login/Login";
import EmployeeDashbord from "./Pages/EmployeeDashboard/EmployeeDashboard";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { Toaster } from "react-hot-toast";
import ChangePassword from "./Components/ChangePassword/ChangePassword";
import AutoLogin from "./Pages/AuotoLoging/AuotoLoging";
import BlackListEmployee from "./Pages/BlackListEmploye/BlackListEmployee";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AutoLogin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blacklist" element={<BlackListEmployee />} />
        <Route
          path="/employeeDashboard"
          element={<PrivateRoute element={<EmployeeDashbord />} />}
        />
        <Route
          path="/adminDashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route path="/changePassword" element={<ChangePassword />} />
      </Routes>

      <Toaster />
    </Router>
  );
};

export default App;
