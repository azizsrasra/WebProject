// src/App.tsx
import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

// AUTH pages
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Home from "./pages/Auth/home";

// LEARNER pages
import Dashboard from "./pages/Learner/Dashboard";

// INSTRUCTOR pages
import CourseManager from "./pages/Instructor/CourseManager";
import Analytics from "./pages/Instructor/Analytics";

// Define user roles
type UserRole = "Learner" | "Instructor" | "Admin" | null;

export default function App() {
  const [role, setRole] = useState<UserRole>(null);
  const navigate = useNavigate();

  const handleLogin = (r: UserRole) => {
    setRole(r);

    if (r === "Learner") navigate("/dashboard");
    if (r === "Instructor") navigate("/admin/courses");
    if (r === "Admin") navigate("/admin/analytics");
  };

  return (
    <Routes>
      {/* HOME PAGE */}
      <Route path="/" element={<Home />} />

      {/* AUTH */}
      <Route
        path="/login"
        element={
          <Login
            onLogin={handleLogin}          // ✅ Correct prop
            goSignup={() => navigate("/signup")}
          />
        }
      />

      <Route
        path="/signup"
        element={
          <Signup
            goLogin={() => navigate("/dashboard")} // ✅ Correct prop
          />
        }
      />

      {/* LEARNER */}
      <Route
        path="/dashboard"
        element={<Dashboard role={role || "Learner"} />} // ✅ Provide default if null
      />

      {/* INSTRUCTOR */}
      <Route
        path="/admin/courses"
        element={role === "Instructor" ? <CourseManager /> : <Navigate to="/login" />}
      />

      {/* ADMIN */}
      <Route
        path="/admin/analytics"
        element={role === "Admin" ? <Analytics /> : <Navigate to="/login" />}
      />

      {/* 404 fallback */}
    
    </Routes>
  );
}
