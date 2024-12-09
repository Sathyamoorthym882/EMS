import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateAgreement = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employeeName: "",
    department: "",
    position: "",
    agreementDate: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/agreements/${id}`)
      .then((response) => {
        setFormData(response.data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching agreement:", error));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/agreements/${id}`, formData)
      .then(() => {
        alert("Agreement updated successfully!");
        navigate("/");
      })
      .catch((error) => console.error("Error updating agreement:", error));
  };

  if (loading) return <p>Loading...</p>;
  
  return (
    <div className="container mt-5 w-50">
      <div className="card shadow">
        <div className="card-header bg-secondary text-dark">
          <center><h3 className="text-white">Update Employment Agreement</h3></center>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Employee Name</label>
              <input
                type="text"
                name="employeeName"
                className="form-control"
                value={formData.employeeName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Department</label>
              <input
                type="text"
                name="department"
                className="form-control"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Position</label>
              <input
                type="text"
                name="position"
                className="form-control"
                value={formData.position}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Agreement Date</label>
              <input
                type="date"
                name="agreementDate"
                className="form-control"
                value={formData.agreementDate}
                onChange={handleChange}
                required
              />
            </div>
           <center>
           <button type="submit" className="btn btn-success">
              Update Agreement
            </button>
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => navigate("/Dashboard")}
            >
              Cancel  
            </button>
           </center>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateAgreement;