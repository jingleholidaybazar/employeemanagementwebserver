import React from "react";

function EmployeeProfile() {
  return (
    <div className="min-lg:p-4 bg-gray-50 min-h-screen">
      {/* Profile Section */}
      <section className="w-full p-4 shadow-lg flex flex-col lg:flex-row gap-10 justify-center bg-white rounded-md">
        {/* Employee Image and Name */}
        <div className="flex flex-col items-center">
          <img
            src="https://fps.cdnpk.net/images/ai/image-generator/gallery/65446.webp?w=1920&h=1920&q=90"
            alt="Employee"
            className="w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 rounded-md object-cover shadow-md"
          />
          <h3 className="font-sans font-semibold tracking-widest text-center mt-2 text-lg">
            Nitish Kumar
          </h3>
          <h3 className="font-sans font-medium tracking-widest text-center text-gray-500">
            Developer
          </h3>
        </div>

        {/* Employee Details */}
        <div className="w-full lg:w-2/3 overflow-x-auto">
          <table className="w-full border border-gray-300 text-left">
            <tbody>
              {[
                ["Name", "Nitish Kumar"],
                ["Employee ID", "12345em"],
                ["Email", "nk768276@gmail.com"],
                ["Aadhar Number", "45362987"],
                ["Pan Card Number", "ASDF6573D"],
                ["Joining Date", "25/12/2023"],
                ["Phone Number", "9572576470"],
                ["Salary", "30000 rs"],
              ].map(([label, value], index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-200`}
                >
                  <td className="px-4 py-2 font-semibold border border-gray-300">
                    {label}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default EmployeeProfile;
