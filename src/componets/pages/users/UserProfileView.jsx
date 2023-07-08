import { useContext, useEffect } from "react";
import { Button, Card, Container, Table } from "react-bootstrap";
import UserContext from "../../context/UserContext";
import { NavLink, useNavigate } from "react-router-dom";
// import AdminImg form "./src/Assets/AdminImg.jpg"
const UserProfileView = ({ user = null, handleShowModel, setImage, image }) => {
  const { isLogin, userData } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    setImage((oldImageObj) => {
      let setting = "";
      if (user?.gender === null) {
        setting = "/Assets/female.jpg";
      } else if (user?.gender === "male") {
        setting = "/Assets/male.jpg";
      } else {
        setting = "/Assets/female.jpg";
      }

      return {
        placeholder: setting,
        file: null,
      };
    });
  }, []);

  return (
    <>
      <>
        {/* {user && ( */}

        <Card
          className="m-2 text-center shadow"
          style={{
            borderRadius: "50px",
          }}
        >
          <Card.Body>
            <Container className="my-3">
              {/* BASE_URL */}
              <img
                src={image?.placeholder}
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "100px",
                  objectFit: "cover",
                }}
                alt="img"
                className="border border-warning shadow"
              />
            </Container>

            <h2 className="text-center text-uppercase fw-bold text-primary">
              {user?.name ? user?.name : "Dummy User"}
            </h2>
            <div className="mt-3">
              <Card className="border-0">
                <Card.Body>
                  <Table striped hover bordered variant="warning" responsive>
                    <tbody>
                      <tr>
                        <td>Name</td>
                        <td>{user?.name}</td>
                      </tr>

                      <tr>
                        <td>Email</td>
                        <td>{user?.email}</td>
                      </tr>

                      <tr>
                        <td>Gender</td>
                        <td>{user?.gender}</td>
                      </tr>

                      <tr>
                        <td>About</td>
                        <td>{user?.about}</td>
                      </tr>

                      {/* {console.log("From profile!!")} */}
                      {/* {console.log(user)} */}

                      <tr>
                        <td>Roles</td>
                        <td>
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
            </div>

            <Container className="text-center">
              {isLogin && userData.user.userId === user.userId ? (
                <>
                  {" "}
                  <Button
                    variant="success"
                    size="lg"
                    className="me-2"
                    onClick={handleShowModel}
                  >
                    Update
                  </Button>
                  <Button
                    variant="warning"
                    size="lg"
                    onClick={() => {
                      navigate("/users/orders");
                    }}
                  >
                    Orders
                  </Button>
                </>
              ) : (
                ""
              )}
            </Container>
          </Card.Body>
        </Card>

        {/* )} */}
      </>
    </>
  );
};
export default UserProfileView;
