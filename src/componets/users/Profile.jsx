import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getUser,
  modifyUserData,
  // updateUserProfilePicture,
} from "../../services/user.services";
// import UserContext from "../../context/UserContext";
import UserProfileView from "./UserProfileView";
import { isLoggedIn } from "../../auth/HelperAuth";
// import { Outlet } from "react-router-dom";

const Profile = () => {
  // const { isLogin } = useContext(UserContext);

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

  const [updateLoading, setUpdateLoading] = useState(false);

  //state to handle image
  const [image, setImage] = useState({
    placeholder: "",
    file: null,
  });

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

  const handleClose = () => setShow(false);
  const handleShowModel = () => setShow(true);

  // update view
  const updateFieldHandler = (event, proprty) => {
    setUser((oldUser) => {
      return {
        ...oldUser,
        [proprty]: event.target.value,
      };
    });
  };

  // updating user data which is comming from <model />

  const updateUserData = () => {
    console.dir("userData", user);
    console.dir(user);

    // validation for name check
    if (user.name === undefined || user.name.trim() === "") {
      toast.error("User name Required!!");
      return;
    }

    //  validation for about!!

    if (user.about === undefined || user.about.trim() === "") {
      toast.error("User About required!!");
      return;
    }

    setUpdateLoading(() => true);
    modifyUserData(user)
      .then((modifiedUser) => {
        console.dir(modifiedUser);
        toast.success("User Details Updated!!!");
        handleClose();
      })
      .catch((error) => {
        console.dir(error);
        if (error.response.status === 400) {
          toast.error(error.response.data.name);
        }
        toast.error("User not Updated Erro!!");
      })
      .finally(() => {
        setUpdateLoading(() => false);
      });
  };

  const updateViewModel = () => {
    return (
      <div>
        <Modal size="lg" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update the Information!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card className="border-0">
              <Card.Body>
                <Table striped hover bordered variant="success" responsive>
                  <tbody>
                    {/* Update name */}

                    <tr>
                      <td>profile Image</td>
                      <td>
                        {/* image tag for preview */}

                        <Container className="text-center mb-3">
                          <img
                            src={image.placeholder}
                            alt=""
                            style={{
                              width: "150px",
                              height: "150px",
                              borderRadius: "100px",
                              objectFit: "cover",
                            }}
                          />
                        </Container>

                        {/* blow might be implemented in future */}
                        {/* <Form.Control
                          type="file"
                          onChange={handleProfileImageChange}
                        /> */}
                        {/* <p className="mt-2 text-muted">
                          Select Square size picture for better ui
                        </p> */}
                      </td>
                    </tr>

                    <tr>
                      <td>Name</td>
                      <td>
                        <Form.Control
                          type="text"
                          value={user?.name}
                          onChange={(event) =>
                            updateFieldHandler(event, "name")
                          }
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>Email</td>
                      <td className="text-center"> {user?.email}</td>
                    </tr>

                    {/* Update Password */}
                    <tr>
                      <td>Password</td>
                      <td>
                        {" "}
                        <Form.Control
                          className="text-center"
                          type="password"
                          placeholder={"Enter new password"}
                          onChange={(event) =>
                            updateFieldHandler(event, "password")
                          }
                        />
                        <p className="text-center text-muted">
                          Leave the field empty for same password!!
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td>Gender</td>
                      <td className="text-center">{user?.gender}</td>
                    </tr>

                    {/* Update About */}
                    <tr>
                      <td>About</td>
                      <td>
                        {" "}
                        <Form.Control
                          as="textarea"
                          row={8}
                          value={user?.about}
                          onChange={(event) =>
                            updateFieldHandler(event, "about")
                          }
                        />
                      </td>
                    </tr>

                    {/* {console.log("From profile!!")} */}
                    {/* {console.log(user)} */}

                    <tr>
                      <td>Roles</td>
                      <td className="text-center">
                        {user?.roles?.map((obj) => {
                          return (
                            <div key={obj.roleId}>
                              {obj.roleName.toLowerCase()}
                            </div>
                          );
                        })}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={updateUserData}
              disabled={updateLoading}
            >
              {updateLoading ? (
                <>
                  {" "}
                  <Spinner animation="border" size="sm" className="me-2" />
                  UPDATING...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

  const Authenticate = () => {
    return (
      <div>
        <Container>
          <Row>
            <Col
              lg={{
                span: 10,
                offset: 1,
              }}
            >
              {user ? (
                <>
                  <UserProfileView
                    user={user}
                    handleShowModel={handleShowModel}
                    setImage={setImage}
                    image={image}
                  />
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

  return isLoggedIn() ? Authenticate() : <Navigate to={"/login"} />;
};

export default Profile;
