import React, { useState } from "react";
import UserContext from "./user.context";

const UserProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);

  return (
    <UserContext.Provider
      value={{
        setIsLogin: setIsLogin,
        isLogin: isLogin,
        userData: userData,
        setUserData: setUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
