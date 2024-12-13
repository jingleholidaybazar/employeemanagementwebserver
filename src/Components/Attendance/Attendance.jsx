import React, { useState, useEffect } from "react";
import { FaCheck, FaTimes, FaUserCheck } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";

function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [selectedDate, setSelectedDate] = useState("");

  // Fetch employee list (mocked for this example)
  useEffect(() => {
    const fetchEmployees = async () => {
      // Replace with actual API call if necessary
      const mockEmployees = [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
        { id: 3, name: "Alice Johnson" },
      ];
      setEmployees(mockEmployees);
    };
    fetchEmployees();

    // Set default date to today
    setSelectedDate(new Date().toISOString().split("T")[0]);
  }, []);

  // Handle attendance toggle
  const toggleAttendance = (id) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Handle attendance submission
  const markAttendance = () => {
    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }

    toast.success("Attendance marked successfully!");
    console.log("Attendance marked for date:", selectedDate);
    console.log("Attendance data:", attendance);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Toaster />
      <h1 className="text-2xl font-bold mb-6">Attendance</h1>

      {/* Date Selection */}
      <div className="flex items-center mb-6 gap-4">
        <label className="text-lg font-semibold" htmlFor="attendance-date">
          Select Date:
        </label>
        <input
          id="attendance-date"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="p-2 border rounded-lg"
        />
      </div>

      {/* Employee List */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <table className="table-auto w-full text-left">
          <thead>
            <tr>
              <th className="px-4 py-2">Employee</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="border-t">
                <td className="px-4 py-2 capitalize">{employee.name}</td>
                <td className="px-4 py-2">
                  {attendance[employee.id] ? (
                    <span className="text-green-600 flex items-center">
                      <FaUserCheck className="mr-2" /> Present
                    </span>
                  ) : (
                    <span className="text-red-600 flex items-center">
                      <FaTimes className="mr-2" /> Absent
                    </span>
                  )}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => toggleAttendance(employee.id)}
                    className={`px-4 py-2 rounded-lg text-white font-semibold ${
                      attendance[employee.id] ? "bg-red-500" : "bg-green-500"
                    }`}
                  >
                    {attendance[employee.id] ? "Mark Absent" : "Mark Present"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Summary</h2>
        <p>Total Employees: {employees.length}</p>
        <p>
          Present:{" "}
          {Object.values(attendance).filter((status) => status === true).length}
        </p>
        <p>
          Absent:{" "}
          {employees.length -
            Object.values(attendance).filter((status) => status === true).length}
        </p>
      </div>

      {/* Mark Attendance Button */}
      <div className="mt-6">
        <button
          onClick={markAttendance}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600"
        >
          Mark Attendance
        </button>
      </div>
    </div>
  );
}

export default Attendance;
