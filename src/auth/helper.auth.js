// this file for saving data in local storage
import { useContext } from "react";
import UserContext from "../componets/context/user.context";

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

// data remove or logout user

export const doLogOutFromLocalStorage = () => {
  localStorage.removeItem("userData");
};
