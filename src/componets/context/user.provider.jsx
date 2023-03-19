import React, { useEffect, useState } from "react";
import {
  doLoginLocalStorage,
  doLogOutFromLocalStorage,
  getUserFromLocalStorage,
  isLoggedIn,
} from "../../auth/helper.auth";
import UserContext from "./user.context";

const UserProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {

    setIsLogin(() => isLoggedIn());
    setUserData((oldObj) => {
      return getUserFromLocalStorage();
    });
  
  }, []);

  // function for loggin to save data in local storage
  const doLogin = (userData) => {
    doLoginLocalStorage(userData);
    setIsLogin(() => true);
    setUserData(() => {
      return getUserFromLocalStorage();
    });
  };

  // function for logged out to remove data form local storage

  const doLogOut = () => {
    doLogOutFromLocalStorage();
    setIsLogin(() => false);
    setUserData((oldObj) => {
      return null;
    });
  };

  return (
    <UserContext.Provider
      value={{
        // setIsLogin: setIsLogin,
        isLogin: isLogin,
        userData: userData,
        // setUserData: setUserData,
        login:doLogin,
        logOut:doLogOut
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
