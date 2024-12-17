import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Attendance = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [markedDates, setMarkedDates] = useState([]); // Holds fetched attendance
  const [attendanceStats, setAttendanceStats] = useState({
    fullDay: 0,
    halfDay: 0,
    leave: 0,
    total: 0,
  });

  const daysInMonth = currentDate.daysInMonth();
  const startDay = currentDate.startOf("month").day(); // Get the first day of the month
  const today = dayjs().format("YYYY/MM/DD");
  const currentTime = dayjs().format("HH:mm");

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");

  // Fetch Attendance Data
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const formattedMonth = currentDate.format("YYYY-MM");
        const response = await axios.get(
          `http://localhost:8080/api/attendance/getAttendance/${userId}/${formattedMonth}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data.attendanceRecords || [];
        setMarkedDates(data);
        calculateStats(data);
      } catch (error) {
        console.error("Error fetching attendance:", error);
        toast.error("Failed to fetch attendance data.");
      }
    };
    fetchAttendance();
  }, [currentDate, userId, token]);

  // Calculate Attendance Statistics
  const calculateStats = (data) => {
    const stats = { fullDay: 0, halfDay: 0, leave: 0, total: 0 };
    data.forEach((entry) => {
      stats[entry.type]++;
    });
    stats.total = stats.fullDay + stats.halfDay + stats.leave;
    setAttendanceStats(stats);
  };

  // Automatically mark "Leave" after 2:30 PM
  useEffect(() => {
    if (
      currentTime > "14:30" &&
      !markedDates.some((entry) => entry.date === today)
    ) {
      markAttendance("leave");
    }
  }, [currentTime, markedDates]);

  // Mark Attendance Function
  const markAttendance = async (type) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/attendance/markAttendance",
        { date: today, type },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        setMarkedDates([...markedDates, { date: today, type }]);
        updateStats(type);
        toast.success(
          `Attendance marked as ${type === "leave" ? "Leave" : "Day"}`
        );
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
      toast.error("Failed to mark attendance.");
    }
  };

  const handleMarkAttendance = (e) => {
    e.preventDefault();

    if (!markedDates.some((entry) => entry.date === today)) {
      let type = "leave";
      if (currentTime >= "08:50" && currentTime <= "09:10") type = "fullDay";
      else if (currentTime > "09:10" && currentTime <= "14:30")
        type = "halfDay";

      markAttendance(type);
    } else {
      toast.error("Attendance already marked for today.");
    }
  };

  const updateStats = (type) => {
    setAttendanceStats((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
      total: prev.total + 1,
    }));
  };

  return (
    <div className="p-1 min-h-screen">
      <Toaster />
      {/* Attendance Summary */}
      <div className="flex flex-wrap justify-evenly items-center gap-4 mb-6">
        {["Full Day", "Half Day", "Leave", "Total Attendance"].map(
          (item, index) => {
            const statKey = ["fullDay", "halfDay", "leave", "total"][index];
            const colors = ["green", "yellow", "red", "blue"];
            return (
              <div
                key={item}
                className={`flex flex-col items-center justify-center text-center h-36 w-60 rounded-md shadow-md bg-white`}
              >
                <h2 className={`text-2xl font-bold text-${colors[index]}-600`}>
                  {item}
                </h2>
                <p className={`text-3xl text-${colors[index]}-600`}>
                  {attendanceStats[statKey]}
                </p>
              </div>
            );
          }
        )}
      </div>

      {/* Calendar Section */}
      <div className="flex max-md:flex-wrap gap-3">
        <div className="flex-1 bg-white p-6 rounded shadow w-2/3 max-md:w-full">
          <form onSubmit={handleMarkAttendance} className="mb-4">
            <input
              type="text"
              className="border rounded px-4 py-2 w-full"
              disabled
              value={today}
            />
            <div className="flex justify-center pt-1 pb-2">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 mt-2 rounded"
              >
                Mark Attendance
              </button>
            </div>
          </form>

          {/* Calendar */}
          <div className="grid grid-cols-6 gap-8">
            {Array.from({ length: startDay }, (_, i) => (
              <div key={i} className="h-10"></div>
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const date = currentDate.startOf("month").add(i, "day");
              const formattedDate = date.format("YYYY/MM/DD");
              const markedDate = markedDates.find(
                (entry) => entry.date === formattedDate
              );

              let bgColor = "bg-gray-200";
              if (markedDate?.type === "fullDay")
                bgColor = "bg-green-500 text-white";
              if (markedDate?.type === "halfDay")
                bgColor = "bg-yellow-500 text-white";
              if (markedDate?.type === "leave")
                bgColor = "bg-red-500 text-white";

              return (
                <div
                  key={i}
                  className={`h-20 w-20 text-lg flex items-center justify-center rounded ${bgColor}`}
                >
                  {date.date()}
                </div>
              );
            })}
          </div>
        </div>

        {/* Side Section */}
        <div className="bg-white p-6 rounded shadow w-1/3">
          <h2 className="text-lg font-bold mb-2">Today</h2>
          <p className="text-xl">{dayjs().format("DD MMMM YYYY")}</p>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
