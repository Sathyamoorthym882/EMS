import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // Adjust the import path if needed

const Dashboard = () => {
  const [agreements, setAgreements] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        alert("You have been logged out!");
        navigate("/login"); // Redirect to login page after logout
      })
      .catch((error) => {
        console.error("Error logging out:", error);
        alert("Error logging out.");
      });
  };

  // Fetch agreements from the backend API
  useEffect(() => {
    fetchAgreements();
  }, []);

  const fetchAgreements = () => {
    setLoading(true);
    axios
      .get("http://localhost:5000/agreements") // Replace with your actual API endpoint
      .then((response) => {
        setAgreements(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching agreements:", error);
        setLoading(false);
      });
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="container mt-5 w-75">
      <div className="card shadow">
        <div className="card-header bg-primary text-white d-flex justify-content-between">
          <h3 className="mb-0">Employment Dashboard</h3>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div className="card-body text-center mt-3">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Employee Name</th>
                <th>Department</th>
                <th>Position</th>
                <th>Agreement Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {agreements.map((agreement) => (
                <tr key={agreement.id}>
                  <td>{agreement.id}</td>
                  <td>{agreement.employeeName}</td>
                  <td>{agreement.department}</td>
                  <td>{agreement.position}</td>
                  <td>{new Date(agreement.agreementDate).toLocaleDateString()}</td>
                  <td className="p-3">
                    <Link to={`/view/${agreement.id}`} className="btn btn-info btn-sm">
                      View
                    </Link>
                    <Link
                      to={`/update/${agreement.id}`}
                      className="btn btn-warning btn-sm mx-2"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card-footer text-center">
          <Link to="/create" className="btn btn-success">
            New Agreement
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
