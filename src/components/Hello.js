import React from "react";
import "../components/Hello.css";
import { useNavigate } from "react-router-dom";

const Hello = () => {
  const nav = useNavigate();
  const logoutHandler = () => {
    nav("/");
  };
  return (
    <>
      <div className="headerContainer">
        <h1>Hello World!</h1>
      </div>
      <div className="form-actions">
        <button onClick={logoutHandler}>Logout</button>
      </div>
    </>
  );
};

export default Hello;
