import React, { useEffect, useState } from "react";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import CreateMentor from "../mentor/CreateMentor";
import { Mentor } from "../../models/Model";
import MentorService from "../../apiServices/MentorService";
import Header from "../headers/Header";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../store/features/userSlice";
import MentorTable from "../mentor/MentorTable";
import UpdateMentor from "../mentor/UpdateMentor";
import { toast } from "react-toastify";
import { MentorToastConstants } from "../../constants/mentorFeatures/AuthToastConstants";
import { DataResultText } from "../../constants/mentorFeatures/MentorTexts";
import "../../global.css";

const initialMentorUpdateState = {
  id: "",
  firstName: "",
  lastName: "",
  age: 0,
  city: "",
  about: "",
};

const MentorDashboardPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateMentorForm, setShowCreateMentorForm] = useState(false);
  const [showUpdateMentorForm, setShowUpdateMentorForm] = useState(false);
  const [updateMentorData, setUpdateMentorData] = useState<Mentor>(
    initialMentorUpdateState
  );
  const [mentorData, setMentorData] = useState<Mentor[]>([]);

  const loadMentorsData = () => {
    setIsLoading(true);
    MentorService.getMentor()
      .then((response) => {
        setMentorData(response.data);
      })
      .catch((error) => {
        toast.error(MentorToastConstants.internalServer);
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadMentorsData();
  }, []);

  const handleAddMentor = () => {
    setShowCreateMentorForm(true);
  };

  const handleLogout = () => {
    dispatch(deleteUser());
    navigate("/login");
  };

  const handleCreated = () => {
    loadMentorsData();
    setShowCreateMentorForm(false);
  };

  const handleCreateCancelled = () => {
    setShowCreateMentorForm(false);
  };

  const handleDeleteMentor = (id: number) => {
    console.log(id);
    setIsLoading(true);
    MentorService.deleteMentor(id)
      .then((data) => {
        toast.success(MentorToastConstants.mentorDeleteSuccess);
        loadMentorsData();
      })
      .catch((error) => {
        toast.error(MentorToastConstants.internalServer);
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleEditMentor = (data: Mentor) => {
    setUpdateMentorData(data);
    setShowUpdateMentorForm(true);
  };

  const handleMentorUpdated = () => {
    loadMentorsData();
    setShowUpdateMentorForm(false);
  };

  const handleUpdateCancelled = () => {
    setShowUpdateMentorForm(false);
  };

  const getCurrentComponent = () => {
    if (isLoading) {
      return <h1 className="text-center">{DataResultText.loading}</h1>;
    }
    if (showCreateMentorForm) {
      return (
        <CreateMentor
          onCreated={handleCreated}
          onCancel={handleCreateCancelled}
        />
      );
    }
    if (showUpdateMentorForm) {
      return (
        <UpdateMentor
          mentorData={updateMentorData}
          onUpdated={handleMentorUpdated}
          onCancel={handleUpdateCancelled}
        />
      );
    } else {
      return (
        <>
          <Header
            userInfo={user}
            onAddMentor={handleAddMentor}
            onLogout={handleLogout}
          />
          {mentorData.length > 0 ? (
            <MentorTable
              data={mentorData}
              onDeleteMentor={handleDeleteMentor}
              onEditMentor={handleEditMentor}
            />
          ) : (
            <h1 className="text-center">{DataResultText.noData}</h1>
          )}
        </>
      );
    }
  };

  return <div>{getCurrentComponent()}</div>;
};

export default MentorDashboardPage;
