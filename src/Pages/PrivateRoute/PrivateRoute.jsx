import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";

const PrivateRoute = ({ element }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const token = localStorage.getItem("token");
    const employeeId = localStorage.getItem("id"); // Get the stored employee ID

    if (token && employeeId) {
      // Fetch employee data from the API
      const fetchEmployeeData = async () => {
        try {
          const response = await axios.get(
            `https://management-system-production-ffd5.up.railway.app/api/employee/getSingaleEmployee/${employeeId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Include the token in headers
              },
            }
          );

          const { role } = response.data.employee;

          setAuthenticated(true);

          // Navigate based on role
          if (
            location.pathname === "/" ||
            location.pathname === "/employeeDashboard" ||
            location.pathname === "/adminDashboard"
          ) {
            if (role === "employee") {
              navigate("/employeeDashboard");
            } else if (role === "superadmin") {
              navigate("/adminDashboard");
            } else {
              console.error("User role not recognized.");
              setAuthenticated(false);
            }
          }
        } catch (error) {
          console.error("Error fetching employee data:", error);
          setAuthenticated(false);
        } finally {
          setLoading(false); // Stop loading
        }
      };

      fetchEmployeeData();
    } else {
      setAuthenticated(false);
      setLoading(false); // Stop loading if no token or ID is found
    }
  }, [location, navigate]);

  if (loading) {
    // Show a loading spinner or placeholder while fetching data
    return <Loading message="Loading employee data..." />;
  }

  // Render protected element or redirect
  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
