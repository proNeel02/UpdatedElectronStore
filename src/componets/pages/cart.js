import React, { useContext } from "react";
import CartContext from "../context/XCartContext";
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import SingleCartItemView from "./users/SingleCartItemView";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

const Cart = () => {
  const { cart, setCart, addItem, removeItemsFromTheCart } =
    useContext(CartContext);
  const { isLogin } = useContext(UserContext);

  const getTotalCartAmount = () => {
    let amount = 0;
    cart?.items?.forEach((item) => {
      amount += item.totalPrice;
    });
    return amount;
  };

  const cartView = () => {
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
                return (
                  <SingleCartItemView
                    key={item?.cartItemId}
                    item={item}
                    removeItemsFromTheCart={removeItemsFromTheCart}
                    addItem={addItem}
                  />
                );
              })}
            </Col>
          </Row>
          <Container className="px-5">
            <h3 className="text-end px-5">
              Total Amount: ₹ {getTotalCartAmount()}
            </h3>
          </Container>
          <Container className="text-center mb-3">
            <Button size="lg">Place Order</Button>
          </Container>
        </Card.Body>
      </Card>
    );
  };

  return (
    <Container className="mt-5 text-center">
      {isLogin ? (
        <Row>
          <Col>
            {cart?.items?.length > 0 ? (
              cartView()
            ) : (
              <Alert variant="danger">
                <h3 className="text-center my-5">OOPS!! Cart Is Empty</h3>
                <Button as={Link} to={"/store"} variant="warning">
                  Start Shopping
                </Button>
              </Alert>
            )}
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
              <Alert variant="success">
                <h3 className="text-center my-5">OOPS!! Your not Login</h3>
                <Button as={Link} to={"/login"} variant="success">
                  Login
                </Button>
              </Alert>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Cart;
