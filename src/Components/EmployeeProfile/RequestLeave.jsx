import React, { useState } from "react";

const RequestLeave = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for apply leave form modal
  const [descriptionModal, setDescriptionModal] = useState({
    isOpen: false,
    fullDescription: "",
  }); // State for description modal

  const leaveRequests = [
    {
      id: 1,
      employeeId: "E123",
      name: "John Doe",
      from: "2024-11-20",
      to: "2024-11-22",
      description: "Family emergency at home requiring immediate attention.",
      status: "Pending",
    },
    {
      id: 2,
      employeeId: "E124",
      name: "Jane Smith",
      from: "2024-11-23",
      to: "2024-11-25",
      description: "Medical leave for routine health check-up and recovery.",
      status: "Approved",
    },
    {
      id: 3,
      employeeId: "E125",
      name: "Sam Wilson",
      from: "2024-11-26",
      to: "2024-11-27",
      description: "Vacation trip with family during holiday season.",
      status: "Rejected",
    },
  ];

  const toggleApplyLeaveModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const openDescriptionModal = (description) => {
    setDescriptionModal({ isOpen: true, fullDescription: description });
  };

  const closeDescriptionModal = () => {
    setDescriptionModal({ isOpen: false, fullDescription: "" });
  };

  return (
    <div className="p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Leave Requests</h2>
        <button
          onClick={toggleApplyLeaveModal}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Apply Leave
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-300 text-gray-700">
              <th className="px-4 py-2">S No</th>
              <th className="px-4 py-2">Employee ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">From</th>
              <th className="px-4 py-2">To</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((request, index) => (
              <tr
                key={request.id}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2 text-center">{request.employeeId}</td>
                <td className="px-4 py-2 text-center">{request.name}</td>
                <td className="px-4 py-2 text-center">{request.from}</td>
                <td className="px-4 py-2 text-center">{request.to}</td>
                <td className="px-4 py-2">
                  {request.description.split(" ").slice(0, 3).join(" ")}...
                  <button
                    onClick={() => openDescriptionModal(request.description)}
                    className="text-blue-500 ml-2 underline"
                  >
                    Read More
                  </button>
                </td>
                <td
                  className={`px-4 py-2 text-center font-bold ${
                    request.status === "Approved"
                      ? "text-green-500"
                      : request.status === "Rejected"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                >
                  {request.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Apply Leave Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-1/3 p-6">
            <h3 className="text-xl font-bold mb-4">Request Leave</h3>
            <form>
              <div className="mb-4">
                <label className="block font-medium mb-2">Name</label>
                <input
                  type="text"
                  className="w-full border-gray-300 rounded-lg px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-2">Employee ID</label>
                <input
                  type="text"
                  className="w-full border-gray-300 rounded-lg px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your employee ID"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-2">From</label>
                <input
                  type="date"
                  className="w-full border-gray-300 rounded-lg px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-2">To</label>
                <input
                  type="date"
                  className="w-full border-gray-300 rounded-lg px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-2">Description</label>
                <textarea
                  className="w-full border-gray-300 rounded-lg px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-400"
                  rows="4"
                  placeholder="Enter your reason for leave"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={toggleApplyLeaveModal}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Description Modal */}
      {descriptionModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-1/3 p-6">
            <h3 className="text-xl font-bold mb-4">Description</h3>
            <p className="mb-4">{descriptionModal.fullDescription}</p>
            <button
              onClick={closeDescriptionModal}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestLeave;
