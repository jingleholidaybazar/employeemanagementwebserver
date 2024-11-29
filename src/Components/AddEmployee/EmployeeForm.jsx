import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { handleError, handleSuccess } from "../util";

const EmployeeForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    mobile: "",
    jobRole: "",
    salary: "",
    aadhar: "",
    panCard: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const {
      name,
      lastname,
      email,
      password,
      mobile,
      jobRole,
      salary,
      aadhar,
      panCard,
    } = formData;

    // Basic validation checks
    if (
      !name ||
      !lastname ||
      !email ||
      !password ||
      !mobile ||
      !jobRole ||
      !salary ||
      !aadhar ||
      !panCard
    ) {
      return handleError("All fields are required.");
    }

    // Email validation (simple format check)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return handleError("Please enter a valid email address.");
    }

    // Mobile validation (simple numeric check)
    if (!/^\d{10}$/.test(mobile)) {
      return handleError("Please enter a valid 10-digit mobile number.");
    }

    // Salary validation (positive number check)
    if (isNaN(salary) || parseFloat(salary) <= 0) {
      return handleError("Please enter a valid salary.");
    }

    // Aadhar validation (simple numeric check for 12 digits)
    if (!/^\d{12}$/.test(aadhar)) {
      return handleError("Please enter a valid 12-digit Aadhar number.");
    }

    // PAN Card validation (simple alphanumeric check for 10 characters)
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panCard)) {
      return handleError("Please enter a valid PAN card number.");
    }

    return true;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate form data before submitting
    if (!validateForm()) {
      return;
    }

    // Log the form data before submitting
    console.log("Form Data Submitted:", formData);

    try {
      // Send form data to the backend API using axios
      setIsSubmitting(true); // Disable submit button while sending request
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/addEmployee",
        formData
      );

      // Handle success response
      handleSuccess("Employee added successfully!");

      // Optionally reset the form data
      setFormData({
        name: "",
        lastname: "",
        email: "",
        password: "",
        mobile: "",
        jobRole: "",
        salary: "",
        aadhar: "",
        panCard: "",
      });

      // Assuming onSubmit is for additional actions
      onSubmit(response.data);
    } catch (error) {
      console.error("Error adding employee:", error);
      handleError("Failed to add employee.");
    } finally {
      setIsSubmitting(false); // Enable the submit button again
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-4xl relative">
        <h3 className="text-lg font-semibold mb-4 uppercase text-center">
          Add Employee
        </h3>
        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="mb-4">
              <label className="block font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-2">Last Name</label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="mb-4">
              <label className="block font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="mb-4">
              <label className="block font-medium mb-2">Mobile</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-2">Job Role</label>
              <select
                name="jobRole"
                value={formData.jobRole}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Job Role</option>
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Finance">Finance</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="mb-4">
              <label className="block font-medium mb-2">Salary</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-2">Aadhar Number</label>
              <input
                type="text"
                name="aadhar"
                value={formData.aadhar}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="mb-4">
              <label className="block font-medium mb-2">Pan Card</label>
              <input
                type="text"
                name="panCard"
                value={formData.panCard}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white py-2 px-4 rounded disabled:bg-gray-400"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
