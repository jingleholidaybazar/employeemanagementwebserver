import React, { useState } from "react";

const EmployeeForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    image: null,
    name: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    department: "",
    salary: "",
    adharnumber: "",
    pancardnumber: "", // Add PAN card number field
  });
  const [previewImage, setPreviewImage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      image: null,
      name: "",
      lastname: "",
      email: "",
      password: "",
      phone: "",
      department: "",
      salary: "",
      adharnumber: "",
      pancardnumber: "", // Reset PAN card number
    });
    setPreviewImage("");
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-4xl relative">
        <h3 className="text-lg font-semibold mb-4 uppercase text-center">Add New Employee</h3>
        <form onSubmit={handleFormSubmit}>
          <div className="flex gap-5">
            <div className="mb-4 w-[49%]">
              <label className="block font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4 w-[49%]">
              <label className="block font-medium mb-2">Last Name</label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>
          <div className="flex gap-5">
            <div className="mb-4 w-[49%]">
              <label className="block font-medium mb-2">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-16 h-16 mt-2 rounded-full object-cover"
                />
              )}
            </div>
            <div className="mb-4 w-[49%]">
              <label className="block font-medium mb-2">Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="">Select Department</option>
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Finance">Finance</option>
              </select>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="mb-4 w-[49%]">
              <label className="block font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4 w-[49%]">
              <label className="block font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>
          <div className="flex gap-5">
            <div className="mb-4 w-[49%]">
              <label className="block font-medium mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4 w-[49%]">
              <label className="block font-medium mb-2">Salary</label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          {/* Aadhar Number Section */}
          <div className="flex gap-5">
            <div className="mb-4 w-[49%]">
              <label className="block font-medium mb-2">Aadhar Number</label>
              <input
                type="text"
                name="adharnumber"
                value={formData.adharnumber}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            {/* PAN Card Number Section */}
            <div className="mb-4 w-[49%]">
              <label className="block font-medium mb-2">PAN Card Number</label>
              <input
                type="text"
                name="pancardnumber"
                value={formData.pancardnumber}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Employee
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
