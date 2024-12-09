import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext"; // Adjusted to use context
import Dashboard from "./pages/Dashboard";
import CreateAgreement from "./pages/CreateAgreement";
import ViewAgreement from "./pages/ViewAgreement";
import UpdateAgreement from "./pages/UpdateAgreement";
import Login from "./Login"; // Add this route for login
import Register from "./Register"; // Add this route for registration
import Home from "./Home";

// Protected Route to ensure only authenticated users can access the dashboard
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    // Redirect them to the login page if not authenticated
    return <Navigate to="/login" />;
  }

  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
        <Route path="/" element={<Home />} />
          {/* Public Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/Dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateAgreement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/view/:id"
            element={
              <ProtectedRoute>
                <ViewAgreement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update/:id"
            element={
              <ProtectedRoute>
                <UpdateAgreement />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
