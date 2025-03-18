// LeaveStatusGraph.js
import React from "react";
import { Doughnut } from "react-chartjs-2";

const LeaveStatusGraph = () => {
  const leaveStatusData = {
    approved: 10,
    pending: 5,
    rejected: 3,
  };

  const createDoughnutData = (data) => ({
    labels: ["Approved", "Pending", "Rejected"],
    datasets: [
      {
        data: [data.approved, data.pending, data.rejected],
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
        hoverOffset: 4,
      },
    ],
  });

  return (
    <div className="w-[50vh] p-4 shadow-md bg-slate-100 rounded-lg text-center">
      <h2 className="text-lg font-semibold mb-4">Leave Status</h2>
      <Doughnut data={createDoughnutData(leaveStatusData)} />
    </div>
  );
};

export default LeaveStatusGraph;
