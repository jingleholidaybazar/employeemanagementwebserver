import React, { useState, useEffect } from "react";
import { FaCheck, FaTimes, FaUserCheck } from "react-icons/fa";

function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState({});

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
  }, []);

  // Handle attendance toggle
  const toggleAttendance = (id) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Attendance</h1>

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
          Present: {
            Object.values(attendance).filter((status) => status === true).length
          }
        </p>
        <p>
          Absent: {
            employees.length -
            Object.values(attendance).filter((status) => status === true).length
          }
        </p>
      </div>
    </div>
  );
}

export default Attendance;
