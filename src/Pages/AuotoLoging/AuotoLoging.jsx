import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AutoLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    const autoLogin = async () => {
      try {
        const response = await axios.get(
          "https://management-system-jet.vercel.app/api/auth/autologin",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200) {
          const { role, id, name } = response.data.employee;

          // Store data in localStorage
          localStorage.setItem("role", role);
          localStorage.setItem("id", id);
          localStorage.setItem("name", name);

          // Redirect based on role
          if (role === "superadmin") {
            navigate("/adminDashboard");
          } else if (role === "employee") {
            navigate("/employeeDashboard");
          } else {
            console.error("User type not recognized.");
          }
        }
      } catch (error) {
        // Handle expired or invalid token
        if (error.response && error.response.status === 403) {
          console.warn("Token expired or invalid. Redirecting to login.");
          localStorage.clear(); // Clear all stored user data
          navigate("/login"); // Navigate to the login page
        } else {
          console.error("Auto-login failed:", error);
        }
      }
    };

    autoLogin();
  }, [navigate]);

  return <div></div>;
}

export default AutoLogin;
