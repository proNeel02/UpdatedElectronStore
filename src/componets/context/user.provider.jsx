import React, { useState } from "react";
import UserContext from "./user.context";

const UserProvider = ({Children}) =>{

    const [isLogin,setLogin] = useState(false);
    const [userData, setUserData]=UserContext(null);


    return (
        <UserContext.Provider>
            {Children}
        </UserContext.Provider>
    );
}