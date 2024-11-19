import React, { useState } from 'react';

const AddDepartment = ({ showModal, setShowModal, addNewDepartment }) => {
  const [newDepartmentName, setNewDepartmentName] = useState('');

  const handleAddDepartment = () => {
    if (newDepartmentName.trim()) {
      addNewDepartment(newDepartmentName);
      setNewDepartmentName('');
      setShowModal(false);
    }
  };

  return (
    showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg w-1/3">
          <h3 className="text-xl font-bold mb-4">Add New Department</h3>
          <input
            type="text"
            placeholder="Enter department name"
            value={newDepartmentName}
            onChange={(e) => setNewDepartmentName(e.target.value)}
            className="w-full p-2 border rounded-md mb-4"
          />
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowModal(false)}
              className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleAddDepartment}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Add Department
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default AddDepartment;
