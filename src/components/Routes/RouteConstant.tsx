import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../authentication/LoginPage";
import MentorDashboardPage from "../dashboard/MentorDashboardPage";
import RegisterPage from "../authentication/RegisterPage";

const RouteConstant: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<MentorDashboardPage />} />
      </Routes>
    </Router>
  );
};

export default RouteConstant;
