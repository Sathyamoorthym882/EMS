import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CreateAgreement = () => {
  const [formData, setFormData] = useState({
    employeeName: "",
    department: "",
    position: "",
    agreementDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/agreements", formData)
      .then(() => alert("Agreement Created!"))
      .catch((error) => console.error("Error creating agreement:", error));
  };

  return (
    <div className="container mt-5 w-50">
      <div className="card shadow">
        <div className="card-header bg-success text-white">
          <h3 className="text-center">Create Employment Agreement</h3>
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
            <div className="m-2 text-center p-3">
              <button type="submit" className="btn btn-success me-4">
                Submit
              </button>
              <Link to="/Dashboard" className="btn btn-primary me-2">
                Back  
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAgreement;