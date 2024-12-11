import React from "react";
import MainDashboard from "../MainDashboard/MainDashboard";
import Employee from "../Employees/Employees";
import Leave from "../../Pages/Leave/Leave";
import Department from "../Department/Department";

// Dashboard content component
const DashboardContent = ({ activeComponent }) => {
  const renderContent = () => {
    switch (activeComponent) {
      case "Dashboard":
        return <MainDashboard />;
      case "Employee":
        return <Employee />;
      case "Departments":
        return <Department />;
      case "Leave":
        return <Leave />;
      case "Salary":
        return <div>Salary Content</div>;
      case "Settings":
        return <div>Settings Content</div>;
      default:
        return <div>Select a section from the sidebar</div>;
    }
  };

  return (
    <div className="p-1 h-full overflow-y-auto">
      {/* Render the active component content */}
      {renderContent()}
    </div>
  );
};

export default DashboardContent;
