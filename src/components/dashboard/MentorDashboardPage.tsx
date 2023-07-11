import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../headers/Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { deleteUser } from "../../store/features/userSlice";

const MentorDashboardPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  const handleLogout = () => {
    dispatch(deleteUser());
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
