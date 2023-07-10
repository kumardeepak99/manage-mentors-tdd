import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../headers/Header";
let user = { name: "Deepak" };
const MentorDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const handleAddMentor = () => {
    console.log("Add Mentor Clicked");
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div>
      <Header userInfo={user} onLogout={handleLogout} />
      <h3>Welcome Mentors</h3>
    </div>
  );
};

export default MentorDashboardPage;
