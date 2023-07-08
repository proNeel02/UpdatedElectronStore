// import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
// import UserContext from "../../context/UserContext";
// import ErrorPage from "./Errorpage";
import { isLoggedIn } from "../../auth/HelperAuth.js";
import useJwtTokenExpiration from "../hooks/useJwtTokenExpiration.js";
const Dashboard = () => {
  //let userContext =  useContext(UserContext);
  // useContext(UserContext); // we can write also like about
  // but writing this way signify that that this is
  //only for to tell to render to dom
  // if we not use useContext(UserContext) in this cureent file
  // we can't navigate to the login page...
  // 
  // warning occure
  //when we use useContext(UserContext) with navigate("/login")
  // Warning: Cannot update a component (`BrowserRouter`) while rendering a different component (`Dashboard`). To locate the bad setState() call inside `Dashboard`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render
   // at Dashboard (http://localhost:3000/main.10ad5683d488de00705b.hot-update.js:34:52)
 // and navigate to loggin page 

  
  // this warning resolved when we use 
   // useContext(UserContext) with navigate("/login")
  // 
useJwtTokenExpiration();

  // const navigate = useNavigate();
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

  return isLoggedIn() ? dashBoardView() : <Navigate to="/login"/>;
};

export default Dashboard;
