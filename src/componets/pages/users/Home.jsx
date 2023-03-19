import React, { useContext } from "react";
import UserContext from "../../context/user.context";

const Home = () => {
  let userContext = useContext(UserContext);
 
   console.dir(userContext);
 


  return (
   <div>
      <h1>Welcome {userContext.userData?.user?.name}</h1>
      <h1>User is Loggin: {userContext?.isLogin+""}</h1>
   </div>
  );
};
export default Home;
