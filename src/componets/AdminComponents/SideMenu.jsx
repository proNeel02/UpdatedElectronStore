import React, { useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import UserContext from "../context/UserContext";
import { FcHome } from "react-icons/fc";
import { MdCategory } from "react-icons/md";
import { BiMessageSquareAdd } from "react-icons/bi";
import { FcViewDetails } from "react-icons/fc";
import { SiProducthunt } from "react-icons/si";
import { BsBoxes } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { BiLogOut } from "react-icons/bi";
const SideMenu = () => {
  const userContex = useContext(UserContext);

  const handleLogOut = () => {
    userContex.logOut();
  };
  return (
    <>
      <ListGroup className="sticky-top">
      
        <ListGroup.Item className="shadow" as={NavLink} to="/admin/home" action>
          <FcHome />
          <span className="ms-2">Home</span>
        </ListGroup.Item>

        <ListGroup.Item
          className="shadow"
          as={NavLink}
          to="/admin/add-category"
          action
        >
          <MdCategory />
          <span className="ms-2">Add Cateory</span>
        </ListGroup.Item>

        <ListGroup.Item
          className="shadow"
          as={NavLink}
          to="/admin/categories"
          action
        >
          <FcViewDetails />
          <span>View Category</span>
        </ListGroup.Item>
        <ListGroup.Item
          className="shadow"
          as={NavLink}
          to="/admin/add-product"
          action
        >
          <BiMessageSquareAdd />
          <span className="ms-1"> Add Products</span>
        </ListGroup.Item>
        <ListGroup.Item
          className="shadow"
          as={NavLink}
          to="/admin/products"
          action
        >
          <SiProducthunt />
          <span className="ms-1">View Products</span>
        </ListGroup.Item>
        <ListGroup.Item
          className="shadow"
          as={NavLink}
          to="/admin/orders"
          action
        >
          <BsBoxes />
          <span className="ms-2"> Orders</span>
        </ListGroup.Item>
        <ListGroup.Item
          className="shadow"
          as={NavLink}
          to="/admin/users"
          action
        >
          <FaUsers />
          <span className="ms-2"> Users</span>
        </ListGroup.Item>
        <ListGroup.Item className="shadow" as={NavLink} to="/users/home" action>
          <RxDashboard />
          <span className="ms-2">DashBoard</span>
        </ListGroup.Item>
        <ListGroup.Item className="shadow" onClick={handleLogOut} action>
          <BiLogOut />
          <span className="ms-2">Logout</span>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default SideMenu;
