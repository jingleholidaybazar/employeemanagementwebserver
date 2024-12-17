import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import CountUp from 'react-countup';

const AdminAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [todayCount, setTodayCount] = useState(0);

  const todayDate = dayjs().format("YYYY/MM/DD");
  const token = localStorage.getItem("token");

  // Fetch all attendance records
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/attendance/allAttendance",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const data = response.data.allattendance || [];
        setAttendanceData(data);
        setFilteredData(data);

        // Count today's attendance
        const todayRecords = data?.filter((item) => item.date === todayDate);
        setTodayCount(todayRecords.length);
      } catch (error) {
        toast.error("Failed to fetch attendance data.");
      }
    };
    fetchAttendance();
  }, [token, todayDate]);

  // Handle search input
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = attendanceData.filter(
      (record) =>
        record.name.toLowerCase().includes(query) ||
        record.type.toLowerCase().includes(query) ||
        record.date.includes(query)
    );
    setFilteredData(filtered);
  };

  return (
    <div className="p-2  ">
      <Toaster />

      {/* Display Today's Date at the Top */}
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-700">
          Attendance Management
        </h2>
        <p className="text-lg font-semibold">
          Today:{" "}
          <span className="text-green-500">
            {dayjs().format("DD MMMM YYYY")}
          </span>
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex max-md:flex-wrap justify-between items-center mb-4 max-md:gap-5">
        <input
          type="text"
          placeholder="Search by name, type, or date..."
          value={searchQuery}
          onChange={handleSearch}
          className="border rounded px-4 py-2 w-1/3"
        />
        {/* Summary: Today's Attendance */}
        <div className="text-lg font-bold text-center">
          Total Attendance Marked Today:{" "}
          <span className="text-blue-500">{todayCount}</span>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-red-500 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase">
                Type
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredData.length > 0 ? (
              filteredData.map((record, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{record.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{record.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        record.type === "fullDay"
                          ? "bg-green-100 text-green-800"
                          : record.type === "halfDay"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {record.type}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-4 text-gray-500 font-semibold"
                >
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAttendance;
