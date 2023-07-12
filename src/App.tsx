import React from "react";
import "./App.css";
import RouteConstant from "./components/Routes/RouteConstant";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <React.Fragment>
      <ToastContainer />
      <RouteConstant />;
    </React.Fragment>
  );
};

export default App;
