import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../headers/Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { deleteUser } from "../../store/features/userSlice";
import { Mentor } from "../../models/Model";
import MentorService from "../../apiServices/MentorService";
import MentorTable from "../mentor/MentorTable";

const MentorDashboardPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [mentorData, setMentorData] = useState<Mentor[]>([]);

  const loadMentorsData = () => {
    setIsLoading(true);
    MentorService.getMentor()
      .then((data) => {
        setMentorData(data);
      })
      .catch((error) => {
        alert(
          "Something went wrong while fetching mentors. Please refresh the page"
        );
        console.error(error);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    loadMentorsData();
  }, []);

  const handleLogout = () => {
    dispatch(deleteUser());
    navigate("/login");
  };

  // update mentor using existing mentor data
  const handleEditMentor = (data: Mentor) => {
    console.log(data);
  };

  // delete mentor based on mentor id
  const handleDeleteMentor = (id: number) => {
    console.log(id);
    setIsLoading(true);
    MentorService.deleteMentor(id)
      .then((data) => {
        loadMentorsData();
        alert("Deleted successfully !!");
      })
      .catch((error) => {
        console.error(error);
        alert("Something went wrong while deleting mentor, please try again.");
      });
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && <h1>Loading....</h1>}
      {!isLoading && <Header userInfo={user} onLogout={handleLogout} />}
      {!isLoading && mentorData.length > 0 && (
        <MentorTable
          data={mentorData}
          onDeleteMentor={handleDeleteMentor}
          onEditMentor={handleEditMentor}
        />
      )}
    </div>
  );
};

export default MentorDashboardPage;
