import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loading from "../Loading/Loading";

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!email || !newPassword || !aadhar) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://management-system-jet.vercel.app/api/password/changepassword",
        { email, newPassword, aadhar }
      );

      if (response.status === 200) {
        toast.success("Password changed successfully!");
        navigate("/");
      } else {
        toast.error("Failed to change password.");
      }
    } catch (error) {
      toast.error("An error occurred while changing password.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-[#002D74] mb-6">
          Change Password
        </h2>
        <form className="space-y-4" onSubmit={handleChangePassword}>
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
              type="email"
              className="mt-1 w-full p-3 border rounded-lg focus:ring-[#002D74] focus:border-[#002D74] outline-none"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Aadhaar Input */}
          <div>
            <label
              htmlFor="aadhar"
              className="block text-sm font-medium text-gray-700"
            >
              Aadhaar Number
            </label>
            <input
              id="aadhar"
              type="text"
              className="mt-1 w-full p-3 border rounded-lg focus:ring-[#002D74] focus:border-[#002D74] outline-none"
              placeholder="Enter your Aadhaar number"
              value={aadhar}
              onChange={(e) => setAadhar(e.target.value)}
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
                type={showPassword ? "text" : "password"}
                className="mt-1 w-full p-3 border rounded-lg focus:ring-[#002D74] focus:border-[#002D74] outline-none"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            className="w-full bg-[#002D74] text-white p-3 rounded-lg font-semibold transition hover:bg-[#001a47] disabled:opacity-50"
            type="submit"
            disabled={isLoading}
          >
            Change Password
          </button>
        </form>
      </div>
    </section>
  );
};

export default ChangePassword;
