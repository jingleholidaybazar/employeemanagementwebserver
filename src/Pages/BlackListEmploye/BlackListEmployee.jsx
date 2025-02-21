import React from "react";

function BlackListEmployee() {
  return (
    <div className="flex items-center justify-center h-screen px-4">
      {/* Container */}
      <div className="flex flex-col md:flex-row items-center w-full max-w-4xl bg-gray-100 shadow-lg rounded-md p-6">
        {/* Left Side - Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="https://img.freepik.com/free-vector/gradient-ransomware-illustration_23-2149380616.jpg"
            alt="Access Denied"
            className="w-full max-w-xs md:max-w-sm h-auto object-cover rounded-lg"
          />
        </div>

        {/* Right Side - Text */}
        <div className="w-full md:w-1/2 text-center md:text-left mt-4 md:mt-0 px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-red-600">
            Access Denied
          </h2>
          <p className="text-gray-700 mt-3 text-lg leading-relaxed">
            Your access has been restricted due to policy violations or security
            concerns. If you believe this is an error, please contact the
            administrator to resolve the issue.
          </p>
        </div>
      </div>
    </div>
  );
}

export default BlackListEmployee;
