import React, { useState } from "react";
import { Bar } from "react-chartjs-2"; // Ensure this import matches your charting library
import { useAuth } from "../Context.jsx/AuthContext";

const MainDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("week"); // Moved inside the component
  const { leavesList, employees, departments, attendanceData } = useAuth();

  const totalSalary = employees.reduce(
    (total, employee) => total + employee.salary,
    0
  );

  const approvedCount = leavesList.filter(
    (leave) => leave.status === "Approved"
  ).length;
  const rejectedCount = leavesList.filter(
    (leave) => leave.status === "Rejected"
  ).length;
  const pendingCount = leavesList.filter(
    (leave) => leave.status === "Pending"
  ).length;

  // Group attendance data by date
  const getDailyAttendanceCounts = () => {
    const grouped = {};
    attendanceData.forEach((record) => {
      const date = new Date(record.date).toLocaleDateString("en-US", {
        weekday: "short",
      });
      grouped[date] = (grouped[date] || 0) + 1;
    });
    return grouped;
  };

  const attendanceCounts = getDailyAttendanceCounts();

  const stats = [
    {
      id: 1,
      title: "Total Employees",
      value: employees?.length || 0,
      bgColor: " bg-gray-100",
      icon: "👥",
    },
    {
      id: 2,
      title: "Total Departments",
      value: departments?.length || 0,
      bgColor: "bg-gray-100",
      icon: "🏢",
    },
    {
      id: 3,
      title: "Monthly Pay",
      value: `₹${totalSalary.toLocaleString()}`,
      bgColor: "bg-gray-100",
      icon: "💰",
    },
  ];

  const leaveDetails = [
    {
      id: 1,
      title: "Total Leave Applied",
      value: leavesList?.length || 0,
      bgColor: "bg-indigo-300",
      textColor: "text-blue-500",
      icon: "📝",
    },
    {
      id: 2,
      title: "Total Approved",
      value: approvedCount,
      bgColor: "bg-green-300",
      textColor: "text-green-500",
      icon: "✅",
    },
    {
      id: 3,
      title: "Total Pending",
      value: pendingCount,
      bgColor: "bg-yellow-300",
      textColor: "text-yellow-500",
      icon: "⏳",
    },
    {
      id: 4,
      title: "Total Rejected",
      value: rejectedCount,
      bgColor: "bg-red-300",
      textColor: "text-red-500",
      icon: "❌",
    },
  ];

  // Leave Graph Data
  const leaveGraphData = {
    labels:
      selectedPeriod === "week"
        ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        : ["1st", "2nd", "3rd", "4th"],
    datasets: [
      {
        label: "Leave Count",
        data:
          selectedPeriod === "week"
            ? [
                leavesList?.length,
                leavesList?.length,
                leavesList?.length,
                leavesList?.length,
                leavesList?.length,
                leavesList?.length,
                leavesList?.length,
              ] // Weekly data
            : [
                leavesList?.length,
                leavesList?.length,
                leavesList?.length,
                leavesList?.length,
              ], // Monthly data
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderWidth: 0,
      },
    ],
  };

  // Attendance Graph Data
  const attendanceGraphData = {
    labels:
      selectedPeriod === "week"
        ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        : ["1st", "2nd", "3rd", "4th"],
    datasets: [
      {
        label: "Attendance Count",
        data:
          selectedPeriod === "week"
            ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                (day) => attendanceCounts[day] || 0
              )
            : [35, 36, 37, 38], // Adjust for monthly as needed
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderWidth: 0,
      },
    ],
  };

  // Handle graph period change
  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  return (
    <div className="min-lg:p-4 p-1 space-y-8 ">
      {/* General Statistics */}
      <div className=" bg-white pb-3 pt-3 px-3 rounded-md shadow-sm">
        <h2 className="text-2xl font-semibold mb-4  ">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-10 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="flex items-center justify-center h-32 text-black rounded-lg shadow-md bg-pink-200"
            >
              <div className="text-4xl mr-4">{stat.icon}</div>
              <div>
                <h2 className="text-lg font-semibold text-gray-700">
                  {stat.title}
                </h2>
                <p className="text-3xl font-bold text-gray-700 text-center">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leave Details */}
      <div className=" bg-white pb-3 pt-3 px-3 rounded-md shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Leave Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {leaveDetails.map((detail) => (
            <div
              key={detail.id}
              className={`flex items-center p-4 mb-10 text-white rounded-lg shadow-md ${detail.bgColor}`}
            >
              <div className="text-4xl mr-4">{detail.icon}</div>
              <div>
                <h2
                  className={`text-xl font-bold ${detail.textColor}`}
                  key={detail.id}
                >
                  {detail.title}
                </h2>
                <p
                  className={`text-3xl font-bold text-center bg- ${detail.textColor}`}
                  key={detail.id}
                >
                  {detail.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Graphs Section */}
      <div className="flex max-md:flex-wrap gap-6">
        {/* Leave Graph */}
        <div className="w-full lg:w-1/2 p-4 shadow-md bg-white rounded-lg">
          <div className=" flex justify-between ">
            <h2 className="text-xl font-semibold mb-4">Leave Graph</h2>
            <div className="mb-4">
              {/* <label className="mr-2">Select Period:</label> */}
              <select
                value={selectedPeriod}
                onChange={handlePeriodChange}
                className="p-2 border rounded"
              >
                <option value="week">Week</option>
                <option value="month">Month</option>
              </select>
            </div>
          </div>
          <Bar data={leaveGraphData} />
        </div>

        {/* Attendance Graph */}
        <div className="w-full lg:w-1/2 p-4 shadow-md bg-white rounded-lg">
          <div className=" flex justify-between">
            <h2 className="text-xl font-semibold mb-4">Attendance Graph</h2>
            <div className="mb-4">
              {/* <label className="mr-2">Select Period:</label> */}
              <select
                value={selectedPeriod}
                onChange={handlePeriodChange}
                className="p-2 border rounded"
              >
                <option value="week">Week</option>
                <option value="month">Month</option>
              </select>
            </div>
          </div>
          <Bar data={attendanceGraphData} />
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
