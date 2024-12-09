import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header Section */}
      <header className="container-fluid py-3 bg-light shadow-sm">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="text-primary">Employment Portal</h2>
          <div>
            <Link to="/register" className="btn btn-success me-2">
              Register
            </Link>
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="container my-5 flex-grow-1">
        <div className="row align-items-center">
          {/* Features Section */}
          <div className="col-md-6">
            <h3 className="text-secondary mb-4">Welcome to the Employment Portal</h3>
            <p className="mb-4">
              Manage employee agreements, track records, and streamline your HR processes with our secure and easy-to-use platform.
            </p>
            <ul className="list-group mb-4">
              <li className="list-group-item">
                <i className="bi bi-check-circle-fill text-success me-2"></i>
                Manage employee agreements seamlessly.
              </li>
              <li className="list-group-item">
                <i className="bi bi-check-circle-fill text-success me-2"></i>
                Department-wise employee tracking.
              </li>
              <li className="list-group-item">
                <i className="bi bi-check-circle-fill text-success me-2"></i>
                Update and view employment details effortlessly.
              </li>
            </ul>
          </div>

          {/* Image Section */}
          <div className="col-md-6">
            <img
              src="https://via.placeholder.com/500x300"
              alt="Employment Portal"
              className="img-fluid rounded shadow"
            />
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-dark text-white text-center py-3">
        <p className="mb-0">&copy; 2024 Employment Portal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
