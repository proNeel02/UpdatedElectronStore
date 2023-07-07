import { Col, Container, Row } from "react-bootstrap";
import { Navigate, Outlet } from "react-router-dom";
import { isAdminUser, isLoggedIn } from "../../../auth/HelperAuth.js";
import SideMenu from "../../AdminComponents/SideMenu.jsx";
import { useContext } from "react";
import UserContext from "../../context/UserContext.js";

const AdminDashBoard = () => {
  // let navigate = useNavigate();

  const { isLogin } = useContext(UserContext);
  const dashboardView = () => {
    return (
      <div>
        <Container fluid className="px-5 py-5">
          <Row>
            <Col
              md={{
                span: 2,
              }}
            >
              <SideMenu />
            </Col>

            <Col md={10}>
              <Outlet />
            </Col>
          </Row>
        </Container>
      </div>
    );
  };

  // return isAdminUser() ? dashboardView() : ( isLoggedIn ? (<Navigate to="/users/home"/>) : (<Navigate  to="/login"/>))

  return isLoggedIn() ? (
    isAdminUser() ? (
      dashboardView()
    ) : (
      <Navigate to="/users/home" />
    )
  ) : (
    <Navigate to="/login" />
  );

  // navigate("/users/profile");
};

export default AdminDashBoard;
