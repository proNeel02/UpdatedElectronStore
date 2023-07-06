import React, { useContext, useEffect, useState } from "react";
import { getOrdersOfUsers } from "../../../services/order.service";
import UserContext from "../../context/UserContext";
import { Card, Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";

const Order = () => {
  const { isLogin, userData } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {

    if(isLogin){
      loadOrderOfUsers(userData?.user?.userId);
    }
  }, [isLogin]);

  const loadOrderOfUsers = async (userId) => {
    try {
      const result = await getOrdersOfUsers(userId);
      console.log("result = ", result);

      setOrders((prevResult) => {
        return [...result];
      });
    } catch (err) {
      console.log(err);
      toast.error("Error in Loading Orders",{
        position:"bottom-left"
      })
    }
  };

  return (
    <Container>
      <Card className="mt-3">
        <Card.Body>
          <Row>
            <Col>
              <h1>This is first Order</h1>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Order;
