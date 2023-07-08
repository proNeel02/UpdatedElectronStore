import React, { useContext } from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import UserContext from "../../context/UserContext";
import XCartContext from "../../context/XCartContext.jsx";

const NavBar = () => {
  const { isLogin, userData, logOut, hasAdminUser } = useContext(UserContext);

  const { cart } = useContext(XCartContext);
  // const { isLogin, userData } = userContext;
  // const { user } = userData;
  // const { name, email } = user;

  // console.dir(userContext);

  const doLogOut = () => {
    logOut();
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={NavLink} to={"/"}>
          <img
            src={"/Assets/logo192.png"}
            width={"30px"}
            height={"30px"}
            alt=""
          />
          <span className="ms-1">Electron Store</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">
            {/* <Nav.Link as={NavLink} to="/services">
              Features
            </Nav.Link> */}
            {/* <NavDropdown title="Categories" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                Smart Phones
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Smart TVs</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Laptops</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">More</NavDropdown.Item>
            </NavDropdown> */}
            <Nav.Link as={NavLink} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact">
              ContactUs
            </Nav.Link>
            <Nav.Link as={NavLink} to="/store">
              Store
            </Nav.Link>
            <Nav.Link as={NavLink} to="/cart">
              Cart{" "}
              {isLogin
                ? "(" + (cart?.items?.length ? cart?.items?.length : 0) + ")"
                : ""}
            </Nav.Link>
            {/* <Nav.Link hidden={!isAdminUser()} as={NavLink} to="admin/home">
              Admin Home
            </Nav.Link>

            <Nav.Link
              hidden={!isAdminUser()}
              as={NavLink}
              to="admin/add-product"
            >
              Add Product
            </Nav.Link> */}

            {hasAdminUser && (
              <>
                <Nav.Link as={NavLink} to="/admin/home">
                  AdminDashBoard
                </Nav.Link>
              </>
            )}

            {isLogin ? (
              <>
                {" "}
                <Nav.Link
                  as={NavLink}
                  to={`users/profile/${userData?.user?.userId}`}
                >
                  {userData?.user?.email}
                </Nav.Link>
                <Nav.Link as={NavLink} to="users/orders">
                  Orders
                </Nav.Link>
                <Nav.Link onClick={doLogOut}>Logout</Nav.Link>
              </>
            ) : (
              <>
                {" "}
                <Nav.Link as={NavLink} to="/login">
                  Log In
                </Nav.Link>
                <Nav.Link as={NavLink} to="/signup">
                  Sign Up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavBar;
