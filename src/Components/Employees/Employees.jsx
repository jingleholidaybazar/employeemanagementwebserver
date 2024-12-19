import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import EmployeeForm from "../AddEmployee/EmployeeForm";
import { useAuth } from "../Context.jsx/AuthContext";
import MainDashboard from "../MainDashboard/MainDashboard";
import { handleError, handleSuccess } from "../util";
import DeleteConfirmationModal from "./DeleteConfirmationModal"; // Import the modal

const Employees = () => {
  const [employeesList, setEmployeesList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State to control modal visibility
  const [employeeToDelete, setEmployeeToDelete] = useState(null); // State to store the employee to be deleted
  const { deleteEmployee, updateEmployee, employees } = useAuth();

  useEffect(() => {
    setEmployeesList(employees);
  }, [employees]);

  const onEdit = (employee) => {
    setEmployeeToEdit(employee);
    setShowForm(true);
  };

  const handleAddEmployee = (newEmployee) => {
    const newId = employeesList.length + 1;
    setEmployeesList([
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

  const handleDeleteEmployee = async () => {
    if (!employeeToDelete) return;

    try {
      await deleteEmployee(employeeToDelete._id); // Perform the deletion
      setEmployeesList((prevEmployees) =>
        prevEmployees.filter((emp) => emp._id !== employeeToDelete._id)
      );
      handleSuccess(`Employee deleted successfully.`);
      setShowDeleteModal(false); // Close the modal
    } catch (error) {
      handleError("Error deleting employee:", error);
      setShowDeleteModal(false); // Close the modal on error
    }
  };

  const filteredEmployees = employeesList.filter(
    (employee) =>
      employee.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log(filteredEmployees.image);

  return (
    <div className="">
      <h2 className="text-2xl font-semibold text-center uppercase mb-3">
        Employee Details
      </h2>

      <div className="flex justify-between max-md:gap-5">
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

      {/* Table container */}
      <div className="shadow-md w-full rounded-lg bg-white overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-red-500 text-left text-white">
              <th className="border-gray-300 px-4 py-2">S. No</th>
              <th className="border-gray-300 px-4 py-2">Image</th>
              <th className="border-gray-300 px-4 py-2">Name</th>
              <th className="border-gray-300 px-4 py-2">Email</th>
              <th className="border-gray-300 px-4 py-2">Phone</th>
              <th className="border-gray-300 px-4 py-2">Aadhar No</th>
              <th className="border-gray-300 px-4 py-2">Pan Card No</th>
              <th className="border-gray-300 px-4 py-2">Job Role</th>
              <th className="border-gray-300 px-4 py-2">Salary</th>
              <th className="border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee, index) => (
              <tr key={employee.id} className="hover:bg-gray-200">
                <td className="border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border-gray-300 px-4 py-2">
                  <img
                    src={employee.image}
                    alt={employee.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="border-gray-300 px-4 py-2">{employee.name}</td>
                <td className="border-gray-300 px-4 py-2">{employee.email}</td>
                <td className="border-gray-300 px-4 py-2">{employee.mobile}</td>
                <td className="border-gray-300 px-4 py-2">{employee.aadhar}</td>
                <td className="border-gray-300 px-4 py-2">
                  {employee.panCard}
                </td>
                <td className="border-gray-300 px-4 py-2">
                  {employee.jobRole}
                </td>
                <td className="border-gray-300 px-4 py-2">{employee.salary}</td>
                <td className="border-gray-300 px-4 py-2 text-center flex justify-center gap-4">
                  <button
                    onClick={() => onEdit(employee)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => {
                      setEmployeeToDelete(employee);
                      setShowDeleteModal(true);
                    }}
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
          employee={employeeToEdit}
          onSubmit={employeeToEdit ? updateEmployee : handleAddEmployee}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Delete confirmation modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onConfirm={handleDeleteEmployee}
        onCancel={() => setShowDeleteModal(false)}
        employeeName={employeeToDelete?.name}
      />
    </div>
  );
};

export default Employees;
