import React, { useContext } from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import UserContext from "../../context/user.context";

const NavBar = () => {
  const userContext = useContext(UserContext);

  // const { isLogin, userData } = userContext;
  // const { user } = userData;
  // const { name, email } = user;



  const doLogOut =()=>{
    userContext.setIsLogin(() => {
      return false;
    });
 
     userContext.setUserData( (oldObj) => {
      return null
     });

  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={NavLink} to={"/"}>
          <img src={"/Assets/logo192.png"} width={"30px"} height={"30px"} />
          <span className="ms-1">Electron Store</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">
            <Nav.Link as={NavLink} to="/services">
              Features
            </Nav.Link>
            <NavDropdown title="Categories" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                Smart Phones
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Smart TVs</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Laptops</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">More</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={NavLink} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact">
              Contact Us
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to="/cart">
              Cart
            </Nav.Link>

            {(userContext?.isLogin) ? (
              <>
                {" "}
                <Nav.Link as={NavLink} to="users/home">
                  {userContext?.userData?.user?.email}
                </Nav.Link>
                <Nav.Link onClick={doLogOut}>
                  Logout
                </Nav.Link>
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

{
  /* <div> */
}
{
  /* <ul>
  <li>
    <a href="/">Home</a>
  </li>

  <li>
    <a href="/about">About</a>
  </li>

  <li>
    <a href="/services">Services</a>
  </li>

  <li>
    <a href="/cart">Cart</a>
  </li>

  <li>
    <a href="/users/profile">Users Profile</a>
  </li>
</ul>
</div> */
}
