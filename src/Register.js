import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
    role: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword, department, role } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save additional user info to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        department,
        role,
      });

      navigate("/Dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow w-50 mx-auto">
        <div className="card-header bg-success text-white text-center">
          <h3>Register</h3>
        </div>
        <div className="card-body">
          {error && <p className="text-danger">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label>Department</label>
              <input
                type="text"
                name="department"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label>Role</label>
              <input
                type="text"
                name="role"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-success w-100">
              Register
            </button>
          </form>
        </div>
        <div className="card-footer text-center">
          <Link to="/login" className="btn btn-link">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
