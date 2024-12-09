import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ViewAgreement = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [agreement, setAgreement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/agreements/${id}`)
      .then((response) => {
        setAgreement(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching agreement:", error);
        setError("Error fetching agreement details.");
        setLoading(false);
      });
  }, [id]);

  // Handle agreement deletion
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this agreement?")) {
      axios
        .delete(`http://localhost:5000/agreements/${id}`)
        .then(() => {
          alert("Agreement deleted successfully!");
          navigate("/"); // Redirect to the dashboard after deletion
        })
        .catch((error) => {
          console.error("Error deleting agreement:", error);
          alert("Error deleting agreement.");
        });
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center mt-5">
        <strong>{error}</strong>
      </div>
    );
  }

  if (!agreement) {
    return (
      <div className="alert alert-warning text-center mt-5">
        <strong>Agreement not found!</strong>
      </div>
    );
  }

  return (
    <div className="container mt-5 w-50">
      <div className="card shadow">
        <div className="card-header bg-info text-white">
          <h3 className="text-center">View Employment Agreement</h3>
        </div>
        <div className="card-body p-3">
          <h5 className="card-title"><strong>Name:</strong> {agreement.employeeName}</h5>
          <p><strong>Department:</strong> {agreement.department}</p>
          <p><strong>Position:</strong> {agreement.position}</p>
          <p><strong>Agreement Date:</strong> {new Date(agreement.agreementDate).toLocaleDateString()}</p>
          
          <div className="d-flex justify-content-end">
            <Link to="/Dashboard" className="btn btn-primary me-4">
              Back
            </Link>
            <Link to={`/update/${agreement.id}`} className="btn btn-warning me-4">
              Edit
            </Link>
            <button onClick={handleDelete} className="btn btn-danger">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAgreement;
