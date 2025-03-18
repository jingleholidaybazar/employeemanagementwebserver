// WeeklyGraph.js
import React from "react";
import { Doughnut } from "react-chartjs-2";

const WeeklyGraph = () => {
  const weeklyData = {
    fullDay: 5,
    halfDay: 1,
    leave: 1,
  };

  const createDoughnutData = (data) => ({
    labels: ["Full Day", "Half Day", "Leave"],
    datasets: [
      {
        data: [data.fullDay, data.halfDay, data.leave],
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
        hoverOffset: 4,
      },
    ],
  });

  return (
    <div className=" w-[50vh] p-4 shadow-md bg-slate-100 rounded-lg text-center">
      <h2 className="text-lg font-semibold mb-4">Weekly Attendance</h2>
      <Doughnut data={createDoughnutData(weeklyData)} />
    </div>
  );
};

export default WeeklyGraph;
