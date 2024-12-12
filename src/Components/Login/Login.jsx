import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { handleError, handleSuccess } from "../util";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      handleError("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(
        "https://management-system-jet.vercel.app/api/auth/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        const { role, _id } = response.data.employee;
        const { token } = response.data;
        // Store token in local storage
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("id", _id);
        handleSuccess("Login successful!");

        // Navigate based on user role
        if (role === "admin") {
          navigate("/adminDashboard");
        } else if (role === "employee") {
          navigate("/employeeDashboard");
        } else {
          handleError("User type not recognized.");
        }

        // Clear the input fields
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.data) {
        handleError(error.response.data.message || "Login failed.");
      } else {
        handleError("An error occurred while logging in.");
      }
    }
  };

  return (
    <section className="min-h-screen flex box-border justify-center items-center">
      <div className="bg-gray-100 rounded-2xl flex max-w-5xl p-5 items-center shadow-lg">
        {/* Image Section */}
        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl max-h-[1600px]"
            src="https://img.freepik.com/free-vector/programmer-working-isometric-style_52683-16803.jpg"
            alt="login form"
          />
        </div>

        <div className="md:w-1/2 px-8">
          <h2 className="font-bold text-3xl uppercase text-center text-[#002D74]">
            Login
          </h2>
          <p className="text-sm mt-4 text-[#002D74]">
            If you are already a member, log in now.
          </p>

          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <input
              className="p-2 mt-8 rounded-xl border"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="gray"
                onClick={togglePasswordVisibility}
                className={`bi bi-eye${
                  showPassword ? "-slash-fill" : ""
                } absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer z-20`}
                viewBox="0 0 16 16"
              >
                <path
                  d={
                    showPassword
                      ? "M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"
                      : "M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
                  }
                />
              </svg>
            </div>
            <button
              className="bg-[#002D74] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium"
              type="submit"
            >
              Login
            </button>
          </form>
          <div className="mt-6 items-center text-gray-100">
            <hr className="border-gray-300" />
            <p className="text-center text-sm">OR</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
