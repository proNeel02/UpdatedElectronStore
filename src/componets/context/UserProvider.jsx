import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  doLoginLocalStorage,
  doLogOutFromLocalStorage,
  getUserFromLocalStorage,
  isLoggedIn,
  isAdminUser
} from "../../auth/helper.auth";
import UserContext from "./UserContext";

const UserProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [hasAdminUser, setHasAdminUser] = useState(false);
  useEffect(() => {

    setIsLogin(() => isLoggedIn());
    setUserData((oldObj) => {
      return getUserFromLocalStorage();
    });

    setHasAdminUser( ()=>isAdminUser());
  
  }, []);

  // function for loggin to save data in local storage
  const doLogin = (userData) => {

    doLoginLocalStorage(userData);
    setIsLogin(() => true);
    setUserData(() => {
      return getUserFromLocalStorage();
    });
    setHasAdminUser( ()=>isAdminUser());
  };

  // function for logged out to remove data form local storage

  const doLogOut = () => {
    doLogOutFromLocalStorage();
    setIsLogin(() => false);
    setUserData((oldObj) => {
      return null;
    });
    setHasAdminUser( ()=>isAdminUser());
  };

  return (
    <UserContext.Provider
      value={{
        // setIsLogin: setIsLogin,
        isLogin: isLogin,
        userData: userData,
        // setUserData: setUserData,
        login:doLogin,
        logOut:doLogOut,
        hasAdminUser:hasAdminUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
