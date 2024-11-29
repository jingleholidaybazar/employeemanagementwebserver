import React from "react";
import EmployeesProfile from "../EmployeeProfile/EmployeeProfile";
import Welcome from "../EmployeeProfile/Welcome";
import RequestLeave from "../EmployeeProfile/RequestLeave";
const EmployeeDashboardContent = ({ active }) => {
  const renderContent = () => {
    switch (active) {
      case "Dashboard":
        return <p><Welcome/></p>;
      case "My Profile":
        return <p><EmployeesProfile/></p>;
      case "Leave":
        return <p><RequestLeave/></p>;
      case "Salary":
        return <h2 className="text-2xl font-bold">Salary Content</h2>;
      case "Setting":
        return <h2 className="text-2xl font-bold">Setting Content</h2>;
      default:
        return <h2 className="text-2xl font-bold">Dashboard Content</h2>;
    }
  };

  return <div className="p-6">{renderContent()}</div>;
};

export default EmployeeDashboardContent;
