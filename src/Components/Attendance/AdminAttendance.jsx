import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../Loading/Loading";
import jsPDF from "jspdf";
import "jspdf-autotable";

const AdminAttendance = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [todayCount, setTodayCount] = useState(0);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [todayStats, setTodayStats] = useState({
    fullDay: 0,
    halfDay: 0,
    leave: 0,
    totalAttendance: 0,
  });
  const [employeeStats, setEmployeeStats] = useState({
    fullDay: 0,
    halfDay: 0,
    leave: 0,
    totalAttendance: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const todayDate = dayjs().format("YYYY/MM/DD");
  const token = localStorage.getItem("token");
  const [isMarkingLeave, setIsMarkingLeave] = useState(false); // State for marking leave button

  useEffect(() => {
    const fetchAttendance = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://management-system-nqq6.onrender.com/api/attendance/allAttendance",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const data = response.data.allattendance || [];
        setAttendanceData(data);
        setFilteredData(data);

        // Count today's attendance
        const todayRecords = data?.filter((item) => item.date === todayDate);
        setTodayCount(todayRecords.length);

        // Calculate today's stats
        const stats = todayRecords.reduce(
          (acc, record) => {
            acc[record.type]++;
            return acc;
          },
          { fullDay: 0, halfDay: 0, leave: 0 }
        );

        stats.totalAttendance = todayRecords.length - stats.leave; // Calculate total attendance
        setTodayStats(stats);
      } catch (error) {
        toast.error("Failed to fetch attendance data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAttendance();
  }, [token, todayDate]);

  // ------------------handle Search------------------------
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

  const handleDateChange = (e) => {
    const selected = e.target.value;
    setSelectedDate(selected);

    const formattedDate = dayjs(selected).format("YYYY/MM/DD"); // Convert to match stored data format
    const filtered = attendanceData.filter(
      (record) => record.date === formattedDate
    );
    setFilteredData(filtered);
  };

  const handleEmployeeClick = (employeeName) => {
    setSelectedEmployee(employeeName);

    // Get the current month in "YYYY/MM" format
    const currentMonth = dayjs().format("YYYY/MM");

    // Filter attendance records for the selected employee within the current month
    const currentMonthRecords = attendanceData.filter(
      (record) =>
        record.name === employeeName && record.date.startsWith(currentMonth)
    );

    // Calculate stats for the current month
    const stats = currentMonthRecords.reduce(
      (acc, record) => {
        acc[record.type]++;
        return acc;
      },
      { fullDay: 0, halfDay: 0, leave: 0 }
    );

    stats.totalAttendance = currentMonthRecords.length - stats.leave;
    setEmployeeStats(stats);

    // Update filteredData to show only the selected employee's current month records
    setFilteredData(currentMonthRecords);
  };

  const handleTodaySummary = () => {
    setSelectedEmployee(null);
  };

  // Handle "Mark Leave" button click

  const handleMarkLeave = async () => {
    const currentTime = dayjs().format("HH:mm");
    const cutoffTime = "14:30";

    if (currentTime > cutoffTime) {
      setIsMarkingLeave(true); // Set loading state to true
      try {
        const response = await axios.get(
          "https://management-system-nqq6.onrender.com/api/automark/auto-mark",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Leave marked successfully!");
      } catch (error) {
        toast.error("Failed to mark leave.");
      } finally {
        setIsMarkingLeave(false); // Reset loading state
      }
    } else {
      toast.error("Leave can only be marked after 2:30 PM.");
    }
  };

  // donload PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Monthly Employee Attendance Summary", 14, 10);

    // Extract all unique months from attendanceData
    const months = [
      ...new Set(attendanceData.map((record) => record.date.slice(0, 7))),
    ].sort();

    const tableColumn = [
      "ID",
      "Employee Name",
      "Full Day",
      "Half Day",
      "Leave",
      "Total Attendance",
    ];

    let index = 1;

    months.forEach((month, monthIndex) => {
      const monthName = dayjs(month, "YYYY/MM").format("MMMM YYYY");
      const employeeAttendance = {};

      // Filter attendance records for this month
      attendanceData.forEach((record) => {
        if (record.date.startsWith(month)) {
          if (!employeeAttendance[record.name]) {
            employeeAttendance[record.name] = {
              fullDay: 0,
              halfDay: 0,
              leave: 0,
              totalAttendance: 0,
            };
          }
          employeeAttendance[record.name][record.type]++;
          employeeAttendance[record.name].totalAttendance =
            employeeAttendance[record.name].fullDay +
            employeeAttendance[record.name].halfDay;
        }
      });

      // Prepare table data
      const tableRows = [];
      index = 1;
      for (const [name, stats] of Object.entries(employeeAttendance)) {
        tableRows.push([
          index++,
          name,
          stats.fullDay || 0,
          stats.halfDay || 0,
          stats.leave || 0,
          stats.totalAttendance || 0,
        ]);
      }

      // Add a new page for each month (except the first)
      if (monthIndex > 0) doc.addPage();
      doc.text(`Attendance Report - ${monthName}`, 14, 20);

      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 30,
      });
    });

    doc.save("Monthly_Attendance_Report.pdf");
  };

  return (
    <div className="p-2">
      <Toaster />
      {isLoading ? (
        <Loading />
      ) : (
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
      )}

      <div className="mt-6 p-4 rounded-lg">
        <h3 className="text-lg font-bold text-gray-700 mb-4">
          {selectedEmployee
            ? `Attendance Summary for ${selectedEmployee}`
            : "Today's Attendance Summary"}
        </h3>

        <div className="flex justify-between max-md:flex-wrap gap-5">
          {(selectedEmployee ? employeeStats : todayStats) &&
            ["fullDay", "halfDay", "leave", "totalAttendance"].map(
              (type, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center justify-center rounded-lg p-4 w-64 h-32 max-md:w-full ${
                    type === "fullDay"
                      ? "bg-green-300 text-green-800"
                      : type === "halfDay"
                      ? "bg-yellow-300 text-yellow-800"
                      : type === "leave"
                      ? "bg-red-300 text-red-800"
                      : "bg-blue-300 text-blue-800"
                  }`}
                >
                  <h4 className="text-xl font-bold capitalize">
                    {type.replace(/([a-z])([A-Z])/g, "$1 $2")}
                  </h4>
                  <p className="text-2xl">
                    {selectedEmployee ? employeeStats[type] : todayStats[type]}
                  </p>
                </div>
              )
            )}
        </div>
      </div>

      <div className="flex max-md:flex-wrap justify-between items-center gap-4 my-2">
        {/* Date Input Section */}
        <div className="w-full sm:w-1/3">
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="border-2 h-12 w-full px-4 py-1 rounded-lg border-red-500"
          />
        </div>

        {/* Buttons Section */}
        <div className="w-full sm:w-1/2 flex flex-col sm:flex-row gap-3">
          <button
            className="border-2 border-red-500 text-red-500 font-semibold h-12 w-full sm:w-1/2 rounded-md hover:text-white hover:bg-red-300 transition"
            onClick={handleMarkLeave}
          >
            {isMarkingLeave ? "Marking..." : "Mark Leave"}
          </button>

          <button
            className="border-2 border-blue-500 text-blue-500 font-semibold h-12 w-full sm:w-1/2 rounded-md hover:text-white hover:bg-blue-300 transition"
            onClick={handleDownloadPDF}
          >
            Download PDF
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        {filteredData.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-red-500 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase">
                  Type
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.map((record, index) => (
                <tr
                  key={record._id} // Using unique identifier for key
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleEmployeeClick(record.name)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{record.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {dayjs(record.date).format("D/M/YYYY")}
                  </td>
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
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-4 text-gray-500 font-semibold">
            No records found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAttendance;
