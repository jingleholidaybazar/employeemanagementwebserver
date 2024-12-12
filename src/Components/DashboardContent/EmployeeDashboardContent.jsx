import React from "react";
import Welcome from "../EmployeeProfile/Welcome";
import EmployeeProfile from "../EmployeeProfile/EmployeeProfile";
import RequestLeave from "../EmployeeProfile/RequestLeave";
import Attendance from "../Attendance/Attendance";

// Example components for sidebar content
const Dashboard = () => (
  <div>
    <Welcome />
  </div>
);
const Profile = () => (
  <div>
    <EmployeeProfile />
  </div>
);
const Leave = () => (
  <div>
    <RequestLeave />
  </div>
);
const Attendances = () => (
  <div>
    <Attendance />
  </div>
);
const Settings = () => <div>Settings Content</div>;

const DashboardContent = ({ activeComponent }) => {
  const renderContent = () => {
    switch (activeComponent) {
      case "Dashboard":
        return <Dashboard />;
      case "Profile":
        return <Profile />;
      case "Leave":
        return <Leave />;
      case "Attendances":
        return <Attendances />; // Fixed here
      case "Settings":
        return <Settings />;
      default:
        return (
          <div className="text-gray-500 text-center">
            Please select a section from the sidebar to view details.
          </div>
        );
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
