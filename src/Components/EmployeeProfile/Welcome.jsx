import React, { useState } from "react";
import { Bar } from "react-chartjs-2"; // Change to Bar chart
import { Chart as ChartJS } from "chart.js/auto";
import { useAuth } from "../Context.jsx/AuthContext";
import { FaTimes, FaCheck, FaTimesCircle, FaClock, FaListAlt } from "react-icons/fa"; // Importing the icons

const Welcome = () => {
  const [selectedStatus, setSelectedStatus] = useState("total");
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const { singaleLeave = [], singaleEmployee } = useAuth(); // Destructuring with a default empty array to avoid errors

  // Calculate leave counts
  const counts = {
    approved: singaleLeave.filter((leave) => leave.status === "Approved").length,
    rejected: singaleLeave.filter((leave) => leave.status === "Rejected").length,
    pending: singaleLeave.filter((leave) => leave.status === "Pending").length,
    total: singaleLeave.length,
  };

  // Map counts to the UI labels
  const leaveData = {
    total: counts.total || 0,
    approve: counts.approved || 0,
    pending: counts.pending || 0,
    reject: counts.rejected || 0,
  };

  // Graph data configuration
  // Graph data configuration
const graphData = {
  labels:
    selectedPeriod === "week"
      ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      : ["1st", "2nd", "3rd", "4th"],
  datasets: [
    {
      label: "Leave Count",
      data:
        selectedPeriod === "week"
          ? [10, 20, 30, 40, 50, 60, 70] // Example weekly data
          : [100, 200, 150, 300], // Example monthly data
      backgroundColor: [
        "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)",
        "rgba(255, 159, 64, 0.6)",
        "rgba(255, 99, 132, 0.6)",
      ],
      borderColor: [
        "rgba(75, 192, 192, 0)", // No border color
        "rgba(153, 102, 255, 0)", // No border color
        "rgba(255, 159, 64, 0)", // No border color
        "rgba(255, 99, 132, 0)", // No border color
      ],
      borderWidth: 0, // Set border width to 0
    },
  ],
};


  // Handle section selection
  const handleSectionChange = (status) => {
    setSelectedStatus(status);
    setIsModalOpen(true); // Open the modal when a leave button is clicked
  };

  // Handle period change for the graph
  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  // Close the modal and reset the background color
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStatus(null); // Reset selected status to remove background color
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5">Welcome</h1>

      {/* Status Buttons */}
      <div className="flex flex-wrap justify-between gap-4 mb-5">
        {Object.keys(leaveData).map((status) => (
          <button
            key={status}
            className={`w-full md:w-1/2 lg:w-64 h-40 p-2 rounded-lg text-2xl font-semibold shadow-sm shadow-gray-500 ${
              selectedStatus === status
                ? // Set background and text color based on selected status
                  status === "approve"
                    ? "bg-green-500 text-white"
                    : status === "pending"
                    ? "bg-yellow-500 text-white"
                    : status === "reject"
                    ? "bg-red-500 text-white"
                    : "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => handleSectionChange(status)}
          >
            {/* Icons */}
            {status === "approve" && (
              <FaCheck className="inline-block text-5xl mb-2 text-green-500" />
            )}
            {status === "pending" && (
              <FaClock className="inline-block text-5xl mb-2 text-yellow-500" />
            )}
            {status === "reject" && (
              <FaTimesCircle className="inline-block text-5xl mb-2 text-red-500" />
            )}
            {status === "total" && (
              <FaListAlt className="inline-block text-5xl mb-2 text-blue-500" />
            )}

            <div>
              <span className="block text-2xl font-bold">
                {status.charAt(0).toUpperCase() + status.slice(1)}:
              </span>
              <span className="text-2xl font-semibold">{leaveData[status]}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Graph Section */}
      <div className="my-10">
        <h2 className="text-xl font-semibold mb-4">Leave Count Graph</h2>
        <div className="mb-4">
          <label className="mr-2">Select Period:</label>
          <select
            value={selectedPeriod}
            onChange={handlePeriodChange}
            className="p-2 border rounded"
          >
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
        </div>

        {/* Displaying the Bar Graph */}
        <Bar data={graphData} />
      </div>

      {/* Modal for displaying Leave Section */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 max-md:w-1/2">
            {/* Modal Header with Close Icon */}
            <div className="flex justify-between items-center pb-3 ">
              <h2 className="text-xl font-semibold mb-4">Leave Section</h2>
              <FaTimes
                onClick={closeModal} // Close modal on click
                className="cursor-pointer text-4xl text-black hover:bg-red-500 rounded-2xl p-1 hover:text-white"
              />
            </div>

            <p className="text-md">
              Hello{" "}
              <span className="capitalize text-red-600 font-semibold">
                {singaleEmployee.name}
              </span>
              , If you want to see{" "}
              <span className="capitalize text-red-600 font-semibold">
                {selectedStatus}
              </span>{" "}
              leaves list. Please go to the leave section.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Welcome;
