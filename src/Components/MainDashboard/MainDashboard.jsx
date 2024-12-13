import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { useAuth } from "../Context.jsx/AuthContext";

const MainDashboard = () => {
  const { leavesList, employees, departments } = useAuth();
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

  const stats = [
    { id: 1, title: "Total Employees", value: employees?.length || 0, bgColor: "bg-blue-500", icon: "👥" },
    { id: 2, title: "Total Departments", value: departments?.length || 0, bgColor: "bg-green-500", icon: "🏢" },
    { id: 3, title: "Monthly Pay", value: `₹${totalSalary.toLocaleString()}`, bgColor: "bg-yellow-300", icon: "💰" },
  ];

  const leaveDetails = [
    { id: 1, title: "Total Leave Applied", value: leavesList?.length || 0, bgColor: "bg-indigo-500", icon: "📝" },
    { id: 2, title: "Total Approved", value: approvedCount, bgColor: "bg-green-500", icon: "✅" },
    { id: 3, title: "Total Pending", value: pendingCount, bgColor: "bg-yellow-300", icon: "⏳" },
    { id: 4, title: "Total Rejected", value: rejectedCount, bgColor: "bg-red-400", icon: "❌" },
  ];

  // Dummy data for graphs
  const attendanceData = [
    { week: "Week 1", Attendance: 85 },
    { week: "Week 2", Attendance: 88 },
    { week: "Week 3", Attendance: 92 },
    { week: "Week 4", Attendance: 87 },
  ];

  const leaveTrendsData = [
    { period: "Jan", Leaves: 10 },
    { period: "Feb", Leaves: 8 },
    { period: "Mar", Leaves: 12 },
    { period: "Apr", Leaves: 9 },
    { period: "May", Leaves: 7 },
  ];

  return (
    <div className="min-lg:p-4 space-y-8">
      {/* General Statistics */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className={`flex items-center p-4 text-white rounded-lg shadow-lg ${stat.bgColor}`}
            >
              <div className="text-4xl mr-4">{stat.icon}</div>
              <div>
                <h2 className="text-lg font-semibold">{stat.title}</h2>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leave Details */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Leave Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {leaveDetails.map((detail) => (
            <div
              key={detail.id}
              className={`flex items-center p-4 text-white rounded-lg shadow-lg ${detail.bgColor}`}
            >
              <div className="text-4xl mr-4">{detail.icon}</div>
              <div>
                <h2 className="text-lg font-semibold">{detail.title}</h2>
                <p className="text-2xl font-bold">{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Attendance Graph */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Attendance Overview</h3>
          <LineChart width={500} height={300} data={attendanceData}>
            <Line type="monotone" dataKey="Attendance" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </div>

        {/* Leave Trends Graph */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Leave Trends</h3>
          <BarChart width={500} height={300} data={leaveTrendsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Leaves" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
