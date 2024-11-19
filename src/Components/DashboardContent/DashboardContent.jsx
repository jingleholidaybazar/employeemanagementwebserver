import React from "react";
import MainDshboard from "../MainDashboard/MainDashboard";
import Employees from "../Employees/Employees";
import Department from "../Department/Department";

const DashboardContent = ({ active }) => {
  const renderContent = () => {
    switch (active) {
      case "Dashboard":
        return <p><MainDshboard/></p>;
      case "Employees":
        return <p><Employees/></p>;
      case "Department":
        return <p><Department/></p>
      case "Leave":
        return <h2 className="text-2xl font-bold">Leave Content</h2>;
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

export default DashboardContent;
