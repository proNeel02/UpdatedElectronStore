import { isJwtExpired } from "jwt-check-expiration";
import { getTokenFromLocalStorage } from "../../auth/HelperAuth";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const useJwtTokenExpiration = () => {
  const token = getTokenFromLocalStorage();
  const { logOut } = useContext(UserContext);
  const navigate = useNavigate();
  const [JwtTokenCheck, setJwtTokenCheck] = useState(false);

  console.log(token);

  try {
    if (isJwtExpired(token)) {
      setJwtTokenCheck(() => true);
      toast.warning("Seesion Expired, Please Loggin");
      logOut();
      navigate("/login");
    }
  } catch (err) {
    console.log(err);
  } 

  return JwtTokenCheck;
};

export default useJwtTokenExpiration;
