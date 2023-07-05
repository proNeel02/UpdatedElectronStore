import React, { useContext } from "react";
import CartContext from "../context/XCartContext";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import SingleCartItemView from "./users/SingleCartItemView";

const Cart = () => {
  const { cart, setCart, addItem, removeItemsFromTheCart } = useContext(CartContext);


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
    <div>
      <Container>
        <Row>
          <Col>
            {cart?.items?.length > 0 ? (
              cartView()
            ) : (
              <h3 className="text-center mt-5">Cart Is Empty</h3>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Cart;
