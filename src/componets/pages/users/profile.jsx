import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getUser } from "../../../services/user.services";
import UserContext from "../../context/UserContext";
import UserProfileView from "./UserProfileView";
// import { Outlet } from "react-router-dom";

const Profile = () => {
  const userContext = useContext(UserContext);
  const [user, setUser] = useState(null);

  const [show, setShow] = useState(false);

 

  // this below hook is used to set userId in the url
  // we make route path dynamic in app.js <Route path="profile/:user_Id" element={<Profile />} />
  // dyanamic should be same in this case user_id same as 
  // the name property of useparams()
  
  //comapare both 
  // see carefully observe path 
  //  path="profile/:user_Id" 
  // const { user_Id } = useParams();
  const { user_Id } = useParams();

  useEffect(() => {
    // if (userContext.userData) { // if for checking userData null
    //   getUserDataFromServer();
    // }
    getUserDataFromServer();
  }, []);

  const getUserDataFromServer = () => {
    const userId = user_Id;

    getUser(userId)
      .then((data) => {
        // toast.success("Succes in loading User Information from server!!");
        // console.dir(data);
        setUser((oldUserData) => {
          return data;
        });
      })
      .catch((error) => {
        console.log(error);
        setUser((oldUserData) => {
          return null;
        });
        // toast.error("Error in loading User Information from server!!");
      });
  };



  // update view 
  const handleClose = () => setShow(false);
  const handleShowModel = () => setShow(true);

 const updateViewModel =()=>{

    return (
        <div>
             <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>     
        </Modal.Footer>
      </Modal>
        </div>
    );
 }

  return (
    <div>
      <Container>
        <Row>
          <Col
            lg={{
              span: 8,
              offset: 2,
            }}
          >
            {user ? (
                <>
              <UserProfileView user={user} handleShowModel={handleShowModel} />
              {updateViewModel()}
              </>
            ) : (
              <Alert variant="danger">
                <h1 className="text-center m-2">
                  User not loaded from Server!
                </h1>
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
