import React, { useState, useEffect, useRef } from "react";
import { FaEllipsisV, FaTimes, FaSignOutAlt, FaCog } from "react-icons/fa";
import { useAuth } from "../Context.jsx/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar({ onToggleSidebar, onLogoutModal }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);
  const userRef = useRef(null);
  const { singaleEmployee } = useAuth();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };
  const { jobRole, name, avatar } = singaleEmployee;

  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    onToggleSidebar(newState);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        userRef.current &&
        !userRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white text-black py-4 px-4 max-md:px-2 flex justify-between items-center shadow-md rounded-t-xl lg:rounded-t-3xl">
      {/* Left side: Toggle Button and Logo */}
      <div className="flex items-center">
        <img
          src="https://i.imgur.com/f1OH7Ef.png"
          alt="Logo"
          className="h-10 w-40 mr-3 max-sm:w-36 "
        />
      </div>

      {/* Right side: User Section */}
      <div className="flex items-center space-x-3" ref={userRef}>
        <img
          src={avatar}
          alt="User"
          className="h-10 w-10 rounded-full cursor-pointer "
          onClick={toggleDropdown}
        />
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={toggleDropdown}
        >
          <span className="text-md capitalize max-sm:hidden">
            {name || "User"}
          </span>
          <FaEllipsisV size={18} className=" max-md:hidden" />
        </div>
        <button
          className="block md:hidden text-xl font-bold"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          ☰
        </button>

        {/* Dropdown */}
        <div className="relative" ref={dropdownRef}>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-5 w-64 bg-white text-black rounded shadow-lg p-4">
              {/* Close Icon */}
              <button
                className="absolute top-2 right-2 border-2 border-gray-950 text-gray-700 hover:border-red-500 hover:bg-red-500 rounded-2xl p-1 hover:text-white"
                onClick={() => setIsDropdownOpen(false)}
                aria-label="Close Dropdown"
              >
                <FaTimes size={18} />
              </button>

              {/* User Information */}
              <div className="flex items-center mb-4">
                <img
                  src={avatar}
                  alt="User"
                  className="h-12 w-12 rounded-full mr-3"
                />
                <div>
                  <p className="font-semibold capitalize">{name || "User"}</p>
                  <p className="text-sm text-gray-500 capitalize">
                    {jobRole || "Role"}
                  </p>
                </div>
              </div>

              {/* Action Links */}
              <div>
                <button
                  className="block w-full px-4 py-2 text-left text-gray-700 text-lg hover:bg-gray-200 rounded"
                  onClick={() => navigate("/changePassword")}
                >
                  <FaCog className="mr-2 inline" /> Settings
                </button>
                <button
                  onClick={onLogoutModal}
                  className="block w-full px-4 py-2 text-left text-red-500 text-lg hover:bg-gray-200 rounded mt-2"
                >
                  <FaSignOutAlt className="mr-2 inline" /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
