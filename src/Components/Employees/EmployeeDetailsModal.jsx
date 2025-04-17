import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import { handleError, handleSuccess } from "../util";

const EmployeeDetailsModal = ({ isOpen, employee, onClose }) => {
  const [status, setStatus] = useState(""); // Store fetched status
  const [selectedStatus, setSelectedStatus] = useState(""); // Store user-selected status
  const [loading, setLoading] = useState(false); // For API calls
  const [halfDayLoading, setHalfDayLoading] = useState(false);

  useEffect(() => {
    if (isOpen && employee && (employee.id || employee._id)) {
      console.log("Employee Data:", employee); // Debugging
    }
  }, [isOpen, employee]);

  // Get Token & User ID from Local Storage
  const handleSubmit = async () => {
    if (!selectedStatus) return; // Prevent empty submission
    const employeeId = employee.id || employee._id;

    if (!employeeId) {
      return;
    }

    const token = localStorage.getItem("token"); // Get token here
    if (!token) {
      handleError("No authentication token found!");
      return;
    }

    try {
      setLoading(true);

      await axios.patch(
        `https://management-system-production-ffd5.up.railway.app/api/auth/blacklist/${employeeId}`,
        { role: selectedStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStatus(selectedStatus);
      handleSuccess("Employee Role updated successfully!");
      onClose(); // Close modal after update
    } catch (error) {
      handleError("Error updating status:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsHalfDay = async () => {
    const employeeId = employee.id || employee._id;
    if (!employeeId) {
      handleError("Employee ID is missing!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      handleError("Authentication token is missing!");
      return;
    }

    try {
      setHalfDayLoading(true);

      const response = await axios.patch(
        `https://management-system-production-ffd5.up.railway.app/api/attendance/markHalfday/${employeeId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token
          },
        }
      );

      handleSuccess(
        response.data.message || "Marked as Half-Day Successfully!"
      );
      onClose(); // Close modal after marking attendance
    } catch (error) {
      handleError(error.response?.data?.message || "Error marking half-day!");
    } finally {
      setHalfDayLoading(false);
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
        <div className="flex flex-col justify-center items-center md:w-1/2 p-4">
          {/* Employee Image */}
          <img
            src={employee.avatar}
            alt={employee.name}
            className="w-40 h-40 md:w-64 md:h-64 rounded-lg object-cover border border-gray-300 "
          />

          {/* Employee Name */}
          <h3 className="mt-3 text-xl font-semibold text-gray-900 text-center">
            {employee.name}
          </h3>

          {/* Job Role */}
          <p className="text-gray-600 text-center">{employee.jobRole}</p>
        </div>

        {/* Employee Details */}
        <div className="md:w-1/2 p-4 overflow-y-auto">
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
            {/* Mark as Half-Day Button */}
            <button
              onClick={markAsHalfDay}
              className="w-full mt-1 p-2 border rounded-lg bg-yellow-500 text-white focus:ring focus:ring-gray-300"
              disabled={halfDayLoading}
            >
              {halfDayLoading ? "Marking..." : "Mark as Half-Day"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailsModal;
