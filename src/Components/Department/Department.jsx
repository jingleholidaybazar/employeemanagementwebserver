import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import AddDepartment from './AddDepartmen'; // Import AddDepartment component

const Department = () => {
  const [departments, setDepartments] = useState([
    { id: 1, name: 'Sales' },
    { id: 2, name: 'Marketing' },
    { id: 3, name: 'HR' },
  ]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (id) => {
    console.log('Edit department', id);
  };

  const handleDelete = (id) => {
    setDepartments(departments.filter(department => department.id !== id));
  };

  const handleAddNewDepartment = (newDepartmentName) => {
    const newId = departments.length + 1;
    setDepartments([...departments, { id: newId, name: newDepartmentName }]);
  };

  const filteredDepartments = departments.filter(department =>
    department.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search Department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          New Department
        </button>
      </div>

      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">S No.</th>
              <th scope="col" className="px-6 py-3">Department Name</th>
              <th scope="col" className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDepartments.map((department, index) => (
              <tr key={department.id} className="bg-white border-b hover:bg-gray-100">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{department.name}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleEdit(department.id)}
                    className="text-blue-600 hover:text-blue-800 mr-3"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(department.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* AddDepartment Modal */}
      <AddDepartment
        showModal={showModal}
        setShowModal={setShowModal}
        addNewDepartment={handleAddNewDepartment}
      />
    </div>
  );
};

export default Department;
