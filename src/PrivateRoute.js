// src/PrivateRoute.js
import React, { useState, useEffect } from "react";
import { Route, Navigate } from "react-router-dom";
import { auth } from "./firebase";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  if (user === null) {
    return <div>Loading...</div>;
  }

  return (
    <Route
      {...rest}
      element={user ? <Component /> : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
