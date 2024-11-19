import React from "react";

const MainDashboard = () => {
  const stats = [
    {
      id: 1,
      title: "Total Employees",
      value: 120,
      bgColor: "bg-blue-500",
      icon: "👥", // Replace with an icon if needed
    },
    {
      id: 2,
      title: "Total Departments",
      value: 10,
      bgColor: "bg-green-500",
      icon: "🏢", // Replace with an icon if needed
    },
    {
      id: 3,
      title: "Monthly Pay",
      value: "$50,000",
      bgColor: "bg-yellow-300",
      icon: "💰", // Replace with an icon if needed
    },
  ];

  const leaveDetails = [
    {
      id: 1,
      title: "Total Leave Applied",
      value: 50,
      bgColor: "bg-indigo-500",
      icon: "📝", // Replace with an icon if needed
    },
    {
      id: 2,
      title: "Total Approved",
      value: 30,
      bgColor: "bg-green-500",
      icon: "✅", // Replace with an icon if needed
    },
    {
      id: 3,
      title: "Total Pending",
      value: 15,
      bgColor: "bg-yellow-300",
      icon: "⏳", // Replace with an icon if needed
    },
    {
      id: 4,
      title: "Total Rejected",
      value: 5,
      bgColor: "bg-red-400",
      icon: "❌", // Replace with an icon if needed
    },
  ];

  return (
    <div className="p-4 space-y-8">
      {/* General Statistics */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className={`flex items-center p-4 text-white rounded-lg shadow-lg ${stat.bgColor}`}
            >
              {/* Icon Section */}
              <div className="text-4xl mr-4">{stat.icon}</div>

              {/* Info Section */}
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
              {/* Icon Section */}
              <div className="text-4xl mr-4">{detail.icon}</div>

              {/* Info Section */}
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
