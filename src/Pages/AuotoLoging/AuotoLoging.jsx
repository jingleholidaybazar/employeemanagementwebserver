import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

function AutoLogin() {
  const [isLoading, setIsLoading] = useState(true); // Loading state tracker
  const navigate = useNavigate();

  useEffect(() => {
    const autoLogin = async () => {
      try {
        const response = await axios.get(
          "https://employeemanagment-trda.onrender.com/api/auth/autologin",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200) {
          const { role } = response.data.employee;

          // Store retrieved user details in local storage

          // localStorage.setItem("id", _id);

          // Redirect user based on their role
          if (role === "superadmin") {
            navigate("/adminDashboard");
          } else if (role === "employee") {
            navigate("/employeeDashboard");
          } else if (role === "blacklist") {
            navigate("/blacklist");
          } else {
            console.error("User type not recognized.");
          }
        }
      } catch (error) {
        // Handle token-related errors and redirect to login
        if (error.response && error.response.status === 403) {
          console.warn("Token expired or invalid. Redirecting to login.");
          localStorage.clear(); // Clear outdated session data
          navigate("/login");
        } else {
          console.error("Auto-login failed:", error);
        }
      } finally {
        // Introduce a deliberate 1-second delay
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };

    autoLogin();
  }, [navigate]);

  return <div>{isLoading ? <Loading /> : null}</div>;
}

export default AutoLogin;
