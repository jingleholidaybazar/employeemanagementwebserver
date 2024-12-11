import React from "react";
import { useAuth } from "../Context.jsx/AuthContext";

const MainDashboard = () => {
  const { leavesList, employees, departments } = useAuth(); // Destructure employees from useAuth hook
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
    {
      id: 1,
      title: "Total Employees",
      value: employees?.length || 0, // Dynamic total employees count
      bgColor: "bg-blue-500",
      icon: "👥", // Replace with an icon if needed
    },
    {
      id: 2,
      title: "Total Departments",
      value: departments?.length || 0,
      bgColor: "bg-green-500",
      icon: "🏢", // Replace with an icon if needed
    },
    {
      id: 3,
      title: "Monthly Pay",
      value: "RS " + totalSalary,
      bgColor: "bg-yellow-300",
      icon: "💰", // Replace with an icon if needed
    },
  ];

  const leaveDetails = [
    {
      id: 1,
      title: "Total Leave Applied",
      value: leavesList?.length,
      bgColor: "bg-indigo-500",
      icon: "📝", // Replace with an icon if needed
    },
    {
      id: 2,
      title: "Total Approved",
      value: approvedCount,
      bgColor: "bg-green-500",
      icon: "✅", // Replace with an icon if needed
    },
    {
      id: 3,
      title: "Total Pending",
      value: pendingCount,
      bgColor: "bg-yellow-300",
      icon: "⏳", // Replace with an icon if needed
    },
    {
      id: 4,
      title: "Total Rejected",
      value: rejectedCount,
      bgColor: "bg-red-400",
      icon: "❌", // Replace with an icon if needed
    },
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
    </div>
  );
};

export default MainDashboard;
