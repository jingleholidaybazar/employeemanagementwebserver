import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import DashboardContent from "../../Components/DashboardContent/DashboardContent";
import { FaBars } from "react-icons/fa";

const Dashboard = () => {
  const [active, setActive] = useState("Dashboard");
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static  z-50`}
      >
        <Sidebar
          active={active}
          setActive={setActive}
          isOpen={isOpen}
          toggleSidebar={toggleSidebar}
        />
      </div>

      {/* Overlay for Sidebar (Mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 ml-0 md:ml-64 ">
        

        {/* Top Navbar */}
        <nav className="bg-gray-800 text-white py-2 px-4 flex items-center justify-between ">
          <div className="flex items-center gap-2">
            {/* Company Logo */}
            <img
              src="https://i.imgur.com/pbSEyLX.jpeg"
              alt="Company Logo"
              className=" w-44 h-16 rounded"
            />
            {/* Company Name */}
            {/* <h1 className="text-xl font-bold">Namrata Universal</h1> */}
          </div>
        </nav>

        {/* Mobile Navbar */}
        <div className="bg-gray-900 text-white flex items-center justify-between px-4 py-2 md:hidden">
          <h1 className="text-lg font-bold">Admin Panel</h1>
          <button onClick={toggleSidebar} className="text-2xl">
            <FaBars />
          </button>
          
        </div>

        {/* Main Dashboard Content */}
        <div className="p-4">
          <DashboardContent active={active} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
