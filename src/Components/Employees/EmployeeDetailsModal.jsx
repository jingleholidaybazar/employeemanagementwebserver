import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";

const EmployeeDetailsModal = ({ isOpen, employee, onClose }) => {
  const [status, setStatus] = useState(""); // Store fetched status
  const [selectedStatus, setSelectedStatus] = useState(""); // Store user-selected status
  const [loading, setLoading] = useState(false); // For API calls

  useEffect(() => {
    if (isOpen && employee && (employee.id || employee._id)) {
      console.log("Employee Data:", employee); // Debugging
    }
  }, [isOpen, employee]);

  // Get Token & User ID from Local Storage
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");

    console.log("Retrieved User ID:", userId);

    if (!token) {
      console.error("No authentication token found!");
      return null;
    }
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
  };

  // Handle Submit Status Change
  const handleSubmit = async () => {
    if (!selectedStatus) return; // Prevent empty submission
    const employeeId = employee.id || employee._id;

    if (!employeeId) {
      return;
    }

    const authHeaders = getAuthHeaders();
    if (!authHeaders) return;

    try {
      setLoading(true);
      console.log(selectedStatus);

      await axios.patch(
        `http://localhost:8080/api/auth/blacklist/${employeeId}`,
        { role: selectedStatus },
        authHeaders
      );

      setStatus(selectedStatus); // Update UI state after successful request
      alert("Employee status updated successfully!"); // Notification
      onClose(); // Close modal after update
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !employee) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-3xl max-h-[90vh] h-auto md:h-96 relative flex flex-col md:flex-row shadow-lg overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={22} />
        </button>

        {/* Employee Image */}
        <div className="flex justify-center items-center md:w-1/2 p-4">
          <img
            src={employee.avatar}
            alt={employee.name}
            className="w-40 h-40 md:w-52 md:h-52 rounded-full object-cover border border-gray-300 shadow-md"
          />
        </div>

        {/* Employee Details */}
        <div className="md:w-1/2 p-4 overflow-y-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {employee.name}
          </h2>
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Email:</strong> {employee.email}
            </p>
            <p>
              <strong>Phone:</strong> {employee.mobile}
            </p>
            <p>
              <strong>Aadhar No:</strong> {employee.aadhar}
            </p>
            <p>
              <strong>Pan Card No:</strong> {employee.panCard}
            </p>
            <p>
              <strong>Job Role:</strong> {employee.jobRole}
            </p>
            <p>
              <strong>Role:</strong> {employee.role}
            </p>
            <p>
              <strong>Salary:</strong> {employee.salary}
            </p>
          </div>

          {/* Dropdown for Employee Actions */}
          <div className="mt-4 flex gap-3">
            <select
              className="w-full mt-1 p-2 border rounded-lg bg-gray-100 focus:ring focus:ring-gray-300"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              disabled={loading}
            >
              <option value="">Select an option</option>
              <option value="employee">employee</option>
              <option value="superadmin">superadmin</option>
              <option value="blacklist">blacklist</option>
            </select>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full mt-1 p-2 border rounded-lg bg-blue-500 text-white focus:ring focus:ring-gray-300"
              disabled={loading || selectedStatus === status} // Disable if same status or loading
            >
              {loading ? "Updating..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailsModal;
