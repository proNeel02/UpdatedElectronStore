
import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import UserContext from "../../context/UserContext";
import UserProfileView from "./UserProfileView";
// import { Outlet } from "react-router-dom";

const Profile = () => {
    const userContext = useContext(UserContext);
    return (
       <div>
       <Container>
       <UserProfileView user={userContext?.userData?.user}/>
       </Container>
       
       </div>
    );
}

export default Profile;