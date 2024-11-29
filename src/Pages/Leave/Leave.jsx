import React, { useState } from "react";

const Leave = () => {
  const [leaves, setLeaves] = useState([
    {
      id: 1,
      employeeId: "EMP001",
      name: "John Doe",
      leaveType: "Sick Leave",
      department: "HR",
      days: 3,
      status: "Pending",
    },
    {
      id: 2,
      employeeId: "EMP002",
      name: "Jane Smith",
      leaveType: "Casual Leave",
      department: "Finance",
      days: 2,
      status: "Approved",
    },
    {
      id: 3,
      employeeId: "EMP003",
      name: "Alice Brown",
      leaveType: "Sick Leave",
      department: "IT",
      days: 4,
      status: "Pending",
    },
    {
      id: 4,
      employeeId: "EMP004",
      name: "Bob White",
      leaveType: "Annual Leave",
      department: "Sales",
      days: 5,
      status: "Rejected",
    },
  ]);

  const [filter, setFilter] = useState("All"); // Tracks which button is active
  const [search, setSearch] = useState(""); // Tracks search input

  const handleAction = (id, actionType) => {
    setLeaves((prev) =>
      prev.map((leave) =>
        leave.id === id
          ? { ...leave, status: actionType === "approve" ? "Approved" : "Rejected" }
          : leave
      )
    );
  };

//   const handleBulkAction = (actionType) => {
//     setLeaves((prev) =>
//       prev.map((leave) =>
//         filteredLeaves.includes(leave)
//           ? { ...leave, status: actionType === "approve" ? "Approved" : "Rejected" }
//           : leave
//       )
//     );
//   };

  const filteredLeaves = leaves.filter((leave) => {
    const matchesSearch =
      leave.name.toLowerCase().includes(search.toLowerCase()) ||
      leave.department.toLowerCase().includes(search.toLowerCase());

    if (filter === "All") return matchesSearch;
    return matchesSearch && leave.status === filter;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Leave Management</h1>

      {/* Filter Buttons */}
        <div className=" flex justify-between">
        {/* Search Bar */}
            <div className="mb-4">
                <input
                type="text"
                placeholder="Search by Name or Department"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
            </div>


            <div className="flex space-x-3 mb-4">
                <button
                className={`px-4 py-2 rounded ${
                    filter === "All" ? "bg-blue-500 text-white" : "bg-gray-300"
                }`}
                onClick={() => setFilter("All")}
                >
                All
                </button>
                <button
                className={`px-4 py-2 rounded ${
                    filter === "Pending" ? "bg-yellow-500 text-white" : "bg-gray-300"
                }`}
                onClick={() => setFilter("Pending")}
                >
                Pending
                </button>
                <button
                className={`px-4 py-2 rounded ${
                    filter === "Approved" ? "bg-green-500 text-white" : "bg-gray-300"
                }`}
                onClick={() => setFilter("Approved")}
                >
                Approved
                </button>
                <button
                className={`px-4 py-2 rounded ${
                    filter === "Rejected" ? "bg-red-500 text-white" : "bg-gray-300"
                }`}
                onClick={() => setFilter("Rejected")}
                >
                Rejected
                </button>
            </div>

            
        </div>

      
     

      {/* Leave Table */}
      <div className="overflow-x-auto shadow-md">
        <table className="w-full text-sm text-left text-gray-500 bg-white shadow-md rounded-lg">
          <thead className="bg-gray-300 text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-3">S No</th>
              <th className="px-4 py-3">Employee ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Leave Type</th>
              <th className="px-4 py-3">Department</th>
              <th className="px-4 py-3">Day(s)</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaves.map((leave, index) => (
              <tr key={leave.id} className="border-b hover:bg-gray-200">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{leave.employeeId}</td>
                <td className="px-4 py-3">{leave.name}</td>
                <td className="px-4 py-3">{leave.leaveType}</td>
                <td className="px-4 py-3">{leave.department}</td>
                <td className="px-4 py-3">{leave.days}</td>
                <td
                  className={`px-4 py-3 font-semibold ${
                    leave.status === "Approved"
                      ? "text-green-600"
                      : leave.status === "Rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {leave.status}
                </td>
                <td className="px-4 py-3 space-x-2">
                  <button
                    className="px-3 py-1 text-white bg-green-500 hover:bg-green-600 rounded"
                    onClick={() => handleAction(leave.id, "approve")}
                  >
                    Approve
                  </button>
                  <button
                    className="px-3 py-1 text-white bg-red-500 hover:bg-red-600 rounded"
                    onClick={() => handleAction(leave.id, "reject")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leave;
