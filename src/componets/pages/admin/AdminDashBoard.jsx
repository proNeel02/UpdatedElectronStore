import React, { useContext, useEffect } from "react";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { isAdminUser, isLoggedIn } from "../../../auth/HelperAuth.js";
import SideMenu from "../../AdminComponents/SideMenu.jsx";
import UserContext from "../../context/UserContext";

const AdminDashBoard = () => {
  // let navigate = useNavigate();

  let userContext = useContext(UserContext);
  const dashboardView = () => {
    return (
      <div>
        <Container className="p-5">
          <Row>
            <Col
              md={{
                span: 2,
                offset: 1,
              }}
            >
              <SideMenu />
            </Col>

            <Col md={8} className="ps-2 pt-3" >
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
