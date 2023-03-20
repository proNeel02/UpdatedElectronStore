import React, { useContext, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { isAdminUser, isLoggedIn } from "../../../auth/HelperAuth.js";
import UserContext from "../../context/UserContext";

const AdminDashBoard = () => {
  // let navigate = useNavigate();

  let userContext = useContext(UserContext);
  const dashboardView = () => {
    return (
      <div>
        <h1>This is Admin DashBoard!!!</h1>
        <Outlet />
      </div>
    );
  };

  // return isAdminUser() ? dashboardView() : ( isLoggedIn ? (<Navigate to="/users/home"/>) : (<Navigate  to="/login"/>))

  return (
    isLoggedIn() ? (isAdminUser() ? dashboardView() : <Navigate  to="/users/home"/>) : <Navigate  to="/login"/> 
  );
  
  // navigate("/users/profile");

};

export default AdminDashBoard;
