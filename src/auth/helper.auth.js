// this file for saving data in local storage
import { useContext } from "react";
import UserContext from "../componets/context/UserContext";

export const doLoginLocalStorage = (Userdata) => {
  localStorage.setItem("userData", JSON.stringify(Userdata));
};

// and fetching data
export const getUserFromLocalStorage = () => {
  const userData = getDataFromLocalStorage();
  // console.log("getUserFromLocalStorage Successful!");
  // console.dir(userData);
  if (userData !== null) {
    return userData;
  }

  return null;
};

export const getTokenFromLocalStorage = () => {
  const Token = getDataFromLocalStorage()?.jwtToken;
  if (Token !== null) {
    return Token;
  }

  return null;
};

export const getDataFromLocalStorage = () => {
  let Data = localStorage.getItem("userData");
  if (Data !== null) {
    return JSON.parse(Data);
  }
  return null;
};

export const isLoggedIn = () => {
  if (getTokenFromLocalStorage()) {
    return true;
  }
  return false;
};

export const isAdminUser = () => {
  console.log("Admin User");

  if (isLoggedIn()) {
    console.log("isLoggedIn is true in Admin");
    const user = getUserFromLocalStorage();
    let array = user?.user?.roles;
    console.log(array);

    return array
      .map((obj) => {
          return obj.roleId === "wetrsdfwetwfasfwdf";
      })
      .includes(true);

    //   console.log(value);
    // return user?.user?.roles[0]?.roleId === "wetrsdfwetwfasfwdf";
  }
  return false;
};

// data remove or logout user

export const doLogOutFromLocalStorage = () => {
  localStorage.removeItem("userData");
};
