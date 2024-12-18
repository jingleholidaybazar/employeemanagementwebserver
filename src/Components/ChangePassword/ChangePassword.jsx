import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!email || !newPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/password/changepassword",
        { email, newPassword }
      );

      if (response.status === 200) {
        toast.success("Password changed successfully!");
        navigate("/"); // Navigate back to login page after successful password change
      } else {
        toast.error("Failed to change password.");
      }
    } catch (error) {
      toast.error("An error occurred while changing password.");
      console.error(error);
    }
  };

  return (
    <section className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-lg">
        <h2 className="font-bold text-3xl text-center text-[#002D74] mb-6">
          Change Password
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleChangePassword}>
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Registered Email
            </label>
            <input
              id="email"
              className="p-2 mt-1 rounded-xl border w-full"
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <div className="relative">
              <input
                id="newPassword"
                className="p-2 mt-1 rounded-xl border w-full"
                type={showPassword ? "text" : "password"} // Toggle input type
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                onClick={() => setShowPassword(!showPassword)} // Toggle visibility
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            className="bg-[#002D74] text-white py-2 rounded-xl mt-4"
            type="submit"
          >
            Change Password
          </button>
        </form>
      </div>
    </section>
  );
};

export default ChangePassword;
