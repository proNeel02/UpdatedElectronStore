import React, { useContext } from "react";
import CartContext from "../context/XCartContext";
import { Card, Col, Container, Row } from "react-bootstrap";
import SingleCartItemView from "./users/SingleCartItemView";

const Cart = () => {
  const { cart, setCart, addItem, removeItemFromTheCart } =
    useContext(CartContext);

  const cartView = () => {
    console.log(cart);
    return (
      <Card className="mt-3 shadow px-5 border-0">
        <Card.Body>
          <Row>
            <Col>
              <h3>Cart</h3>
            </Col>
            <Col className="text-end">
              <h3>{cart.items.length} Items</h3>
            </Col>
          </Row>

          <Row className="px-5 mt-3">

            <Col>
              {cart?.items?.map((item) => {
                return <SingleCartItemView item={item} />;
              })}
            </Col>

          </Row>
        </Card.Body>
      </Card>
    );
  };

  return (
    <div>
      <Container>
        <Row>
          <Col>{cart && cartView()}</Col>
        </Row>
      </Container>
    </div>
  );
};

export default Cart;
