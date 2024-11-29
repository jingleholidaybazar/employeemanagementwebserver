import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import EmployeeForm from "../AddEmployee/EmployeeForm";
import { useAuth } from "../Context.jsx/AuthContext";

const Employees = () => {
  const [employeesList, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const { deleteEmployee, updateEmployee } = useAuth(); // Correct usage of useAuth hook

  // Fetch employee data from the API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/employee/getAllEmplyees"
        );

        // Ensure the response contains the employees array
        if (Array.isArray(response.data.employees)) {
          setEmployees(response.data.employees); // Use correct key 'employees'
        } else {
          console.error("API response is not an array:", response.data);
          setEmployees([]); // Fallback to an empty array if data is not valid
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
        setEmployees([]); // Fallback to an empty array
      }
    };

    fetchEmployees();
  }, []);

  const onEdit = (employee) => {
    setEmployeeToEdit(employee); // Set the employee data for editing
    setShowForm(true); // Show the form
  };

  const handleAddEmployee = (newEmployee) => {
    const newId = employeesList.length + 1;
    setEmployees([
      ...employeesList,
      {
        id: newId,
        image: newEmployee.image
          ? URL.createObjectURL(newEmployee.image)
          : "https://via.placeholder.com/40",
        ...newEmployee,
      },
    ]);
    setShowForm(false);
  };

  const handleDeleteEmployee = async (_id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (!confirmed) return;

    try {
      const deletedEmployee = await deleteEmployee(_id); // Use the deleteEmployee method from AuthContext
      if (deletedEmployee) {
        setEmployees((prevEmployees) =>
          prevEmployees.filter((emp) => emp._id !== _id)
        );
        console.log(`Employee with ID ${_id} deleted successfully.`);
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const filteredEmployees = employeesList.filter(
    (employee) =>
      employee.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className=" max-lg:p-4">
      <h2 className="text-2xl font-semibold text-center uppercase mb-3">
        Employee Details
      </h2>

      <div className="flex justify-between">
        <div className="mb-4 w-96">
          <input
            type="text"
            placeholder="Search by name or department"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => {
              setShowForm(true);
              setEmployeeToEdit(null); // Clear the employee data for adding new employee
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add New Employee
          </button>
        </div>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-300 text-left">
              <th className="border border-gray-300 px-4 py-2">S. No</th>
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Aadhar No</th>
              <th className="border border-gray-300 px-4 py-2">Pan Card No</th>
              <th className="border border-gray-300 px-4 py-2">Job Role</th>
              <th className="border border-gray-300 px-4 py-2">Salary</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee, index) => (
              <tr key={employee.id} className="hover:bg-gray-200">
                <td className=" border-gray-300 px-4 py-2">{index + 1}</td>
                <td className=" border-gray-300 px-4 py-2">
                  <img
                    src={employee.image}
                    alt={employee.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className=" border-gray-300 px-4 py-2">{employee.name}</td>
                <td className=" border-gray-300 px-4 py-2">{employee.email}</td>
                <td className=" border-gray-300 px-4 py-2">
                  {employee.mobile}
                </td>
                <td className=" border-gray-300 px-4 py-2">
                  {employee.aadhar}
                </td>
                <td className=" border-gray-300 px-4 py-2">
                  {employee.panCard}
                </td>
                <td className=" border-gray-300 px-4 py-2">
                  {employee.jobRole}
                </td>
                <td className=" border-gray-300 px-4 py-2">
                  {employee.salary}
                </td>
                <td className=" border-gray-300 px-4 py-2 text-center flex justify-center gap-4">
                  <button
                    onClick={() => onEdit(employee)} // Pass the full employee object
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteEmployee(employee.id)} // Use the new delete handler
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <EmployeeForm
          employee={employeeToEdit} // Pass the employee data to the form for editing
          onSubmit={employeeToEdit ? updateEmployee : handleAddEmployee}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default Employees;
