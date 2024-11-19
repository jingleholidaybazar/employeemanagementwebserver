import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import EmployeeForm from "../AddEmployee/EmployeeForm";

const Employees = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      image: "https://via.placeholder.com/40",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
      department: "Engineering",
      salary: "$60,000",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/40",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "9876543210",
      department: "Marketing",
      salary: "$55,000",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);

  const onEdit = (id) => {
    console.log("Edit employee with ID:", id);
  };

  const onDelete = (id) => {
    console.log("Delete employee with ID:", id);
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  const handleAddEmployee = (newEmployee) => {
    const newId = employees.length + 1;
    setEmployees([
      ...employees,
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

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">
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
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add New Employee
          </button>
        </div>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border border-gray-300 px-4 py-2">S. No</th>
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Department</th>
              <th className="border border-gray-300 px-4 py-2">Salary</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee, index) => (
              <tr key={employee.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <img
                    src={employee.image}
                    alt={employee.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">{employee.name}</td>
                <td className="border border-gray-300 px-4 py-2">{employee.email}</td>
                <td className="border border-gray-300 px-4 py-2">{employee.phone}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {employee.department}
                </td>
                <td className="border border-gray-300 px-4 py-2">{employee.salary}</td>
                <td className="border border-gray-300 px-4 py-2 text-center flex justify-center gap-4">
                  <button
                    onClick={() => onEdit(employee.id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onDelete(employee.id)}
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
          onSubmit={handleAddEmployee}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default Employees;
