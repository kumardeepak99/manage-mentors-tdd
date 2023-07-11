import React from "react";
import "./Header.css";

interface HeaderProps {
  userInfo: any;
  onLogout: () => void;
  onAddMentor: () => void;
}

const Header: React.FC<HeaderProps> = ({ userInfo, onLogout, onAddMentor }) => {
  return (
    <header className="header">
      <div className="left">
        {userInfo.name ? `Hello ${userInfo.name}` : "Mentors Dashboard"}
      </div>

      <div className="right">
        <button className="button" onClick={onAddMentor}>
          Create
        </button>
        <button className="button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
