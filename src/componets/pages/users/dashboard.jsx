import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
// import ErrorPage from "./Errorpage";
import { isLoggedIn } from "../../../auth/HelperAuth.js";
const Dashboard = () => {
  const userContext = useContext(UserContext);

  // const { isLogin } = userContext;
  let navigate = useNavigate();
  const dashBoardView = () => {
    return (
      <div>
        {/* <h1>This Is User DashBoard</h1> */}

        
        <Outlet />
      </div>
    );
  };

  //solving timing issue like state ---> change one state to
  //other state we can use direct value from local storage
  //insted of waiting for state to change his value
  // so we can use function from helper.auth.js

  return isLoggedIn() ? dashBoardView() : navigate("/login");
};

export default Dashboard;
