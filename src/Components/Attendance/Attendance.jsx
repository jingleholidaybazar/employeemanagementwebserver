import React, { useState, useEffect, useMemo } from "react";
import dayjs from "dayjs";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Loading from "../Loading/Loading";

const Attendance = () => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [markedDates, setMarkedDates] = useState([]);
  const [attendanceStats, setAttendanceStats] = useState({
    fullDay: 0,
    halfDay: 0,
    leave: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [targetLocation] = useState({
    lat: 28.686253, // Example latitude (Bangalore, India)
    lng: 77.33669, // Example longitude
  });

  const daysInMonth = currentDate.daysInMonth();
  const startDay = currentDate.startOf("month").day();
  const today = dayjs().format("YYYY/MM/DD");
  const currentTime = dayjs().format("HH:mm");

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");

  // Fetch attendance data
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const formattedMonth = currentDate.format("YYYY-MM");
        const response = await axios.get(
          `https://management-system-jet.vercel.app/api/attendance/getAttendance/${userId}/${formattedMonth}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const data = response.data.attendanceRecords || [];
        setMarkedDates(data);
        calculateStats(data);
      } catch (error) {
        toast.error("Failed to fetch attendance data.");
      } finally {
        setLoading(false);
      }
    };
    fetchAttendance();
  }, [currentDate, userId, token]);

  // Calculate stats
  const calculateStats = (data) => {
    const stats = { fullDay: 0, halfDay: 0, leave: 0, total: 0 };
    data.forEach((entry) => {
      if (stats.hasOwnProperty(entry.type)) {
        stats[entry.type]++;
      }
    });
    stats.total = stats.fullDay + stats.halfDay;
    setAttendanceStats(stats);
  };

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);
        },
        () => {
          toast.error("Failed to retrieve location.");
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  }, []);

  // Calculate distance between two coordinates using the Haversine formula
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const toRadians = (deg) => (deg * Math.PI) / 180;
    const earthRadius = 6371e3; // Earth radius in meters

    const dLat = toRadians(lat2 - lat1);
    const dLng = toRadians(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadius * c; // Distance in meters
  };

  const markAttendance = async (type) => {
    try {
      const response = await axios.post(
        "https://management-system-jet.vercel.app/api/attendance/markAttendance",
        { date: today, type },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        setMarkedDates([...markedDates, { date: today, type }]);
        updateStats(type);
        toast.success(`Attendance marked as ${type}`);
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
      toast.error("Failed to mark attendance.");
    }
  };

  const handleMarkAttendance = async (e) => {
    e.preventDefault();

    // Check if attendance marking is allowed based on time
    if (currentTime < "08:40") {
      return toast.error("Attendance marking starts at 8:40 AM.");
    }

    // Ensure user location is available
    if (!userLocation) {
      return toast.error("Unable to determine your location.");
    }

    // Calculate the distance between user and target locations
    const distance = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      targetLocation.lat,
      targetLocation.lng
    );

    console.log("User Location:", userLocation);
    console.log("Target Location:", targetLocation);
    console.log("Distance between user and target:", distance, "meters");

    // Check if the distance is within 50 meters
    const allowedRadius = 50; // in meters
    if (distance > allowedRadius) {
      return toast.error(`You are outside the ${allowedRadius}-meter radius.`);
    }

    // Check if attendance is already marked for today
    if (markedDates.some((entry) => entry.date === today)) {
      return toast.error("Attendance already marked for today.");
    }

    // Determine attendance type based on current time
    let type = "leave";
    if (currentTime >= "08:40" && currentTime <= "09:06") {
      type = "fullDay";
    } else if (currentTime > "09:06" && currentTime <= "14:30") {
      type = "halfDay";
    }

    setButtonLoading(true); // Set loading state
    try {
      await markAttendance(type);
    } catch (error) {
      console.error("Error marking attendance:", error);
      // Error handling is already done in markAttendance
    } finally {
      setButtonLoading(false); // Reset loading state
    }
  };

  const updateStats = (type) => {
    setAttendanceStats((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
      total: type !== "leave" ? prev.total + 1 : prev.total,
    }));
  };

  // Memoized calendar data
  const calendarDays = useMemo(() => {
    return Array.from({ length: daysInMonth }, (_, i) => {
      const date = currentDate.startOf("month").add(i, "day");
      const formattedDate = date.format("YYYY/MM/DD");
      const markedDate = markedDates.find(
        (entry) => entry.date === formattedDate
      );
      return { date, markedDate };
    });
  }, [currentDate, markedDates, daysInMonth]);

  if (loading) {
    return <Loading message="Loading employee data..." />;
  }

  return (
    <div className="p-1 min-h-screen">
      <Toaster />
      <div className="flex flex-wrap justify-evenly gap-4 mb-6">
        {["Full Day", "Half Day", "Leave", "Total Attendance"].map(
          (item, index) => {
            const statKey = ["fullDay", "halfDay", "leave", "total"][index];
            const bgColors = [
              "bg-green-300",
              "bg-yellow-300",
              "bg-red-300",
              "bg-blue-300",
            ];
            const textColors = [
              "text-green-600",
              "text-yellow-600",
              "text-red-600",
              "text-blue-600",
            ];

            return (
              <div
                key={item}
                className={`h-36 w-60 max-sm:w-full rounded-md shadow-md flex flex-col items-center justify-center ${bgColors[index]}`}
              >
                <h2
                  className={`text-2xl font-bold ${textColors[index]} text-center`}
                >
                  {item}
                </h2>
                <p
                  className={`text-3xl font-bold ${textColors[index]} text-center`}
                >
                  {attendanceStats[statKey]}
                </p>
              </div>
            );
          }
        )}
      </div>

      <div className="flex max-md:flex-wrap gap-5">
        <div className="flex-1 bg-slate-100 p-6 rounded shadow-md w-2/3 max-md:w-full">
          <form onSubmit={handleMarkAttendance}>
            <input
              type="text"
              className="border-2 rounded-xl px-4 py-3 w-full bg-white"
              disabled
              value={today}
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-green-500 text-white w-52 h-10 mt-2 mb-2 rounded flex items-center justify-center"
                disabled={buttonLoading} // Disable button while loading
              >
                {buttonLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                ) : (
                  "Mark Attendance"
                )}
              </button>
            </div>
          </form>

          <div className="grid grid-cols-7 max-md:grid-cols-6 gap-3 mt-4">
            {/* Weekday Headers */}
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center font-semibold">
                {day}
              </div>
            ))}
            {/* Empty slots for the first week */}
            {Array.from({ length: startDay }, (_, i) => (
              <div key={`empty-${i}`} className="h-10"></div>
            ))}
            {/* Calendar Days */}
            {calendarDays.map(({ date, markedDate }, i) => {
              let bgColor = "bg-gray-200";
              let textColor = "text-black";

              if (markedDate?.type === "fullDay") {
                bgColor = "bg-green-500";
                textColor = "text-white";
              } else if (markedDate?.type === "halfDay") {
                bgColor = "bg-yellow-500";
                textColor = "text-white";
              } else if (markedDate?.type === "leave") {
                bgColor = "bg-red-500";
                textColor = "text-white";
              }

              const isToday = date.isSame(dayjs(), "day");

              return (
                <div
                  key={i}
                  className={`h-20 max-sm:h-12 max-sm:w-12 flex flex-col items-center justify-center rounded ${bgColor} ${
                    isToday ? "border-2 border-blue-700" : ""
                  }`}
                >
                  <span className={`font-bold ${textColor}`}>
                    {date.date()}
                  </span>
                  {markedDate && (
                    <span className={`text-xs ${textColor}`}>
                      {markedDate.type}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-slate-50 p-6 rounded shadow-md w-1/3 max-md:w-full">
          <h2 className="text-lg font-bold mb-2">Today</h2>
          <p className="text-xl">{dayjs().format("DD MMMM YYYY")}</p>
          {userLocation && (
            <div className="mt-4">
              <h3 className="text-md font-semibold">Your Location:</h3>
              <p className="text-sm">
                Latitude: {userLocation.lat.toFixed(6)}, Longitude:{" "}
                {userLocation.lng.toFixed(6)}
              </p>
              <h3 className="text-md font-semibold mt-2">
                Distance to Office:
              </h3>
              <p className="text-sm">
                {calculateDistance(
                  userLocation.lat,
                  userLocation.lng,
                  targetLocation.lat,
                  targetLocation.lng
                ).toFixed(2)}{" "}
                meters
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
