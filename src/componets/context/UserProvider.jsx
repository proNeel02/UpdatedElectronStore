/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  doLoginLocalStorage,
  doLogOutFromLocalStorage,
  getUserFromLocalStorage,
  isLoggedIn,
  isAdminUser,
} from "../../auth/HelperAuth";
import UserContext from "./UserContext";

const UserProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [hasAdminUser, setHasAdminUser] = useState(false);

  useEffect(() => {
    setIsLogin((isLogin) => isLoggedIn());
    setUserData((oldObj) => {
      return getUserFromLocalStorage();
    });

    setHasAdminUser((hasAdminUser) => isAdminUser());
  }, []);

  // function for loggin to save data in local storage
  const doLogin = (userData) => {
    doLoginLocalStorage(userData);
    setIsLogin((isLogin) => true);
    setUserData((userData) => {
      return getUserFromLocalStorage();
    });
    setHasAdminUser((hasAdminUser) => isAdminUser());
  };

  // function for logged out to remove data form local storage

  const doLogOut = () => {
    doLogOutFromLocalStorage();
    setIsLogin(() => false);
    setUserData((oldObj) => {
      return null;
    });
    setHasAdminUser(() => isAdminUser());
  };

  return (
    <UserContext.Provider
      value={{
        // setIsLogin: setIsLogin,
        isLogin: isLogin,
        userData: userData,
        // setUserData: setUserData,
        login: doLogin,
        logOut: doLogOut,
        hasAdminUser: hasAdminUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
