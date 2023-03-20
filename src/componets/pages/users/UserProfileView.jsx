import { useContext } from "react";
import { Card, Container, Table } from "react-bootstrap";
import UserContext from "../../context/UserContext";
// import AdminImg form "./src/Assets/AdminImg.jpg"
const UserProfileView = ({ user = null }) => {
  return (
    <>
      <>
        {/* {user && ( */}

        <Card
          className="m-5 text-center shadow"
          style={{
            borderRadius: "50px",
          }}
        >
          <Card.Body>
        
           <Container>

            <img src={"/Assets/AdminImg.jpg"} style={{
                width:'150px',
                height:'150px'
            }} alt="img" />
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

                  {console.log("From profile!!")}
                  {console.log(user)}

                  <tr>
                    <td>Roles</td>
                    <td>
                      {user?.roles?.map((obj) => {
                        return <div>{obj.roleName.toLowerCase()}</div>;
                      })}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
           </Card>




            </div>
          </Card.Body>
        </Card>

        {/* )} */}
      </>
    </>
  );
};
export default UserProfileView;
