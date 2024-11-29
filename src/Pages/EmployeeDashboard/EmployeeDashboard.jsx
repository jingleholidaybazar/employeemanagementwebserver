import React, { useState } from "react";
import EmployeeSidebar from "../../Components/Sidebar/EmpolyeSidebar";
import EmployeeDashboardContent from "../../Components/DashboardContent/EmployeeDashboardContent";
import { useNavigate } from "react-router-dom"; // Change to useNavigate

const EmployeeDashboard = () => {
  const [active, setActive] = useState("Dashboard");
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate(); // useNavigate instead of useHistory

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Function to open the logout confirmation modal
  const handleLogoutModal = () => setIsLogoutModalOpen(true);

  // Handle the logout process
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role"); // Remove token from localStorage
    navigate("/"); // Use navigate for redirection
    // Close the modal
    setIsLogoutModalOpen(false);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static z-50`}
      >
        <EmployeeSidebar
          active={active}
          setActive={setActive}
          isOpen={isOpen}
          toggleSidebar={toggleSidebar}
          handleLogoutModal={handleLogoutModal} // Pass the function
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
        <nav className="sticky top-0 bg-white text-black py-2 px-4 flex items-center justify-between shadow-md z-50">
          <div className="flex items-center gap-2">
            {/* Company Logo */}
            <img
              src="https://i.imgur.com/pbSEyLX.jpeg"
              alt="Company Logo"
              className="w-44 h-16 rounded"
            />
          </div>

          {/* Logout Button positioned on the right */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleLogoutModal} // Open the confirmation modal
              className="text-white bg-red-500 hover:bg-red-600 px-8 py-3 rounded"
            >
              Logout
            </button>
          </div>
        </nav>

        {/* Main Dashboard Content */}
        <div className="min-lg:p-4">
          <EmployeeDashboardContent active={active} />
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {/* Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsLogoutModalOpen(false)} // Close the modal
                className="px-10 py-2 bg-white text-gray-800 border-2 border-red-600 shadow-md text-2xl rounded-xl  hover:bg-red-600"
              >
                NO
              </button>
              <button
                onClick={() => {
                  setIsLogoutModalOpen(false);
                  handleLogout();
                }}
                className="px-10 py-2 bg-white border-2 text-gray-800 border-green-600 shadow-md text-2xl rounded-xl hover:bg-green-600"
              >
                YES
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;
