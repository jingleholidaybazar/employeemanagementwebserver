import React from "react";
import {
  FaTachometerAlt,
  FaUserTie,
  FaCalendarAlt,
  FaMoneyCheckAlt,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const EmployeeSidebar = ({
  active,
  setActive,
  isOpen,
  toggleSidebar,
  handleLogoutModal,
}) => {
  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt /> },
    { name: "My Profile", icon: <FaUserTie /> },
    { name: "Leave", icon: <FaCalendarAlt /> },
    { name: "Salary", icon: <FaMoneyCheckAlt /> },
    { name: "Setting", icon: <FaCog /> },
  ];

  return (
    <div
      className={`flex flex-col h-screen bg-gray-800 text-white fixed top-0 left-0 z-50 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 md:translate-x-0 md:w-64`}
    >
      {/* Sidebar Header */}
      <div className="p-4 text-center border-b border-gray-700">
        <div className="rounded-md">
          <img
            src="https://img.freepik.com/premium-photo/charismatic-charm-fashionable-man-denim-glasses_1164924-33086.jpg?w=360"
            alt="Admin"
            className="h-28 w-36 mx-auto bg-cover rounded-md"
          />
        </div>
        <h2 className="text-xl font-bold mt-2">Admin Panel</h2>
      </div>

      {/* Menu Items */}
      <div className="flex-1 p-2">
        {menuItems.map((item) => (
          <div
            key={item.name}
            onClick={() => {
              setActive(item.name);
              if (isOpen) toggleSidebar(); // Close sidebar on mobile
            }}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-700 ${
              active === item.name ? "bg-gray-700" : ""
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.name}</span>
          </div>
        ))}
      </div>

      {/* Logout Option */}
      <div className="p-3 border-t border-gray-700">
        <div
          onClick={handleLogoutModal} // Trigger logout modal
          className="flex items-center gap-3 cursor-pointer hover:bg-gray-700 p-3 rounded-lg"
        >
          <FaSignOutAlt className="text-xl" />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSidebar;
