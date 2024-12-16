import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Attendance = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [markedDates, setMarkedDates] = useState([]);
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

  // Replace with your user-specific token and ID
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");

  useEffect(() => {
    // Fetch attendance data for the current month
    const fetchAttendance = async () => {
      try {
        // Update the date format to 'YYYY-MM'
        const formattedMonth = currentDate.format("YYYY-MM");

        const response = await axios.get(
          `http://localhost:8080/api/attendance/getAttendance/${userId}/${formattedMonth}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);

        const data = response.data.attendanceRecords;
        setMarkedDates(data.attendance || []);
        calculateStats(data.attendance || []);
      } catch (error) {
        console.error("Error fetching attendance:", error);
        toast.error("Failed to fetch attendance data.");
      }
    };

    fetchAttendance();
  }, [currentDate, userId, token]);

  const calculateStats = (data) => {
    const stats = { fullDay: 0, halfDay: 0, leave: 0, total: 0 };
    data.forEach((entry) => {
      stats[entry.type]++;
    });
    stats.total = stats.fullDay + stats.halfDay + stats.leave;
    setAttendanceStats(stats);
  };

  // Automatically mark attendance as "Leave" after 2:30 PM if not marked yet
  useEffect(() => {
    if (
      currentTime > "14:30" &&
      !markedDates.some((entry) => entry.date === today)
    ) {
      markAttendanceAsLeave();
    }
  }, [currentTime, markedDates]);

  const markAttendanceAsLeave = async () => {
    try {
      const token = localStorage.getItem("token");
      // Call the API to mark attendance as Leave
      const response = await axios.post(
        "https://management-system-jet.vercel.app/api/attendance/markAttendance",
        { date: today, type: "leave" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(today, "leave");
      if (response.status === 200) {
        setMarkedDates([...markedDates, { date: today, type: "leave" }]);
        updateStats("leave");
        toast.success("Attendance marked as Leave automatically after 2:30 PM");
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
      toast.error("Failed to mark attendance as Leave.");
    }
  };

  const handleMarkAttendance = async (e) => {
    e.preventDefault();

    if (!markedDates.some((entry) => entry.date === today)) {
      let type = "leave"; // Default to "leave"

      // Check if the time is between 8:50 AM and 9:10 AM for "Full Day"
      if (currentTime >= "08:50" && currentTime <= "09:10") {
        type = "fullDay";
      }
      // Check if the time is between 9:10 AM and 2:30 PM for "Half Day"
      else if (currentTime > "09:10" && currentTime <= "14:30") {
        type = "halfDay";
      }

      try {
        const token = localStorage.getItem("token");
        // Call the API to mark attendance
        const response = await axios.post(
          "https://management-system-jet.vercel.app/api/attendance/markAttendance",
          { date: today, type },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(today, type);
        if (response.status === 200) {
          setMarkedDates([...markedDates, { date: today, type }]);
          updateStats(type);

          // Display appropriate toast message based on attendance type
          if (type === "fullDay") {
            toast.success("Attendance marked as Full Day");
          } else if (type === "halfDay") {
            toast.success("Attendance marked as Half Day");
          } else if (type === "leave") {
            toast.success("Attendance marked as Leave");
          }
        }
      } catch (error) {
        console.error("Error marking attendance:", error);
        toast.error("Failed to mark attendance.");
      }
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
      <div className="flex max-md:flex-wrap justify-evenly items-center gap-4 mb-6">
        <div className="flex flex-col items-center justify-center text-center h-36 w-60 rounded-md shadow-md bg-white max-md:w-full">
          <h2 className="text-2xl font-bold text-green-600">Full Day</h2>
          <p className="text-3xl text-green-600">{attendanceStats.fullDay}</p>
        </div>
        <div className="flex flex-col items-center justify-center text-center h-36 w-60 rounded-md shadow-md bg-white max-md:w-full">
          <h2 className="text-2xl font-bold text-yellow-600">Half Day</h2>
          <p className="text-3xl text-yellow-600">{attendanceStats.halfDay}</p>
        </div>
        <div className="flex flex-col items-center justify-center text-center h-36 w-60 rounded-md shadow-md bg-white max-md:w-full">
          <h2 className="text-2xl font-bold text-red-600">Leave</h2>
          <p className="text-3xl text-red-600">{attendanceStats.leave}</p>
        </div>
        <div className="flex flex-col items-center justify-center text-center h-36 w-60 rounded-md shadow-md bg-white max-md:w-full">
          <h2 className="text-2xl font-bold text-blue-600">Total Attendance</h2>
          <p className="text-3xl text-blue-600">{attendanceStats.total}</p>
        </div>
      </div>

      <div className="flex max-md:flex-wrap gap-3">
        {/* Calendar Section */}
        <div className="flex-1 bg-white p-6 rounded shadow w-2/3 max-md:w-full shadow-gray-500">
          {/* Input Field */}
          <form onSubmit={handleMarkAttendance} className="mb-4">
            <input
              type="text"
              className="border rounded px-4 py-2 w-full"
              placeholder="Enter attendance for today"
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
          <div className="grid grid-cols-7 max-md:grid-cols-6 gap-8">
            {Array.from({ length: startDay }, (_, i) => (
              <div key={i} className="h-10"></div> // Empty cells before the start of the month
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
                  className={`h-20 w-20 max-md:h-10 max-md:w-10 text-lg flex items-center justify-center rounded ${bgColor}`}
                >
                  {date.date()}
                </div>
              );
            })}
          </div>
        </div>

        {/* Side Section */}
        <div className="bg-white p-6 rounded shadow w-1/3 max-md:w-full shadow-gray-500">
          <h2 className="text-lg font-bold mb-2">Today</h2>
          <p className="text-xl">{dayjs().format("DD MMMM YYYY")}</p>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
