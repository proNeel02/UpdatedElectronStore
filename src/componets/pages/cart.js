import React, { useContext, useState } from "react";
import CartContext from "../context/XCartContext";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import SingleCartItemView from "./users/SingleCartItemView";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import { toast } from "react-toastify";
import { createOrder } from "../../services/order.service";
import Swal from "sweetalert2";

const Cart = () => {
  const { cart, setCart, addItem, removeItemsFromTheCart } =
    useContext(CartContext);
  const { isLogin, userData } = useContext(UserContext);

  const [placeOrder, setPlaceOrder] = useState(false);

  const [orderDetails, setOrderDetails] = useState({
    billingAddress: "",
    billingName: "",
    billingPhone: "",
    cartId: "",
    orderStatus: "",
    paymentStatus: "",
    userId: "",
  });

  const getTotalCartAmount = () => {
    let amount = 0;
    cart?.items?.forEach((item) => {
      amount += item.totalPrice;
    });
    return amount;
  };

  /* handle create Order and pay*/
  const handleCreateOrderAndPay = async (event) => {
    if (orderDetails.billingName.trim() === "") {
      toast.info("Billing Name required", {
        position: "top-left",
      });
      return;
    }

    if (orderDetails.billingAddress.trim() === "") {
      toast.info("Billing Name required", {
        position: "top-left",
      });
      return;
    }

    if (orderDetails.billingPhone.trim() === "") {
      toast.info("Billing Name required", {
        position: "top-left",
      });
      return;
    }

    // set required Other details
    orderDetails.cartId = cart.cartId;
    orderDetails.orderStatus = "PENDING";
    orderDetails.paymentStatus = "NOTPAID";
    orderDetails.userId = userData.user.userId;

    try {
      const result = await createOrder(orderDetails);
      console.log("order details = ", result);
      Swal.fire("Order Created", "Procceding for Payment", "success");

      setPlaceOrder(() => false);
      setCart((cart) => {
        return {
          ...cart,
          items: [],
        };
      });
    } catch (err) {
      console.log(err);
    }
  };

  const orderFormView = () => {
    return (
      <Form>
        {/* Billing name*/}
        <Form.Group className="mt-3">
          {/* take name of user from the useContext*/}
          <Form.Label>
            <h6>Billing Name</h6>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={orderDetails.billingName}
            onChange={(event) => {
              setOrderDetails((orderDetails) => {
                return {
                  ...orderDetails,
                  billingName: event.target.value,
                };
              });
            }}
          ></Form.Control>
        </Form.Group>

        {/* Billing phone*/}
        <Form.Group className="mt-3">
          <Form.Label>
            <h6>Billing phone</h6>
          </Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter number"
            value={orderDetails.billingPhone}
            onChange={(event) => {
              setOrderDetails((orderDetails) => {
                return {
                  ...orderDetails,
                  billingPhone: event.target.value,
                };
              });
            }}
          ></Form.Control>
        </Form.Group>

        {/* Billing Address*/}
        <Form.Group className="mt-3">
          <Form.Label>
            <h6>Billing Address</h6>
          </Form.Label>
          <Form.Control
            rows={6}
            as={"textarea"}
            placeholder="Enter Address"
            value={orderDetails.billingAddress}
            onChange={(event) => {
              setOrderDetails((orderDetails) => {
                return {
                  ...orderDetails,
                  billingAddress: event.target.value,
                };
              });
            }}
          ></Form.Control>
        </Form.Group>

        <Container className="mt-4 text-center">
          <Button
            variant="warning"
            onClick={(event) => handleCreateOrderAndPay(event)}
          >
            <h6>Create Order & Proceed to Pay</h6>
          </Button>
        </Container>
      </Form>
    );
  };

  const cartView = () => {
    return (
      <Card className="mt-3 shadow px-2 border-0">
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
                    setPlaceOrder={setPlaceOrder}
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
          <Container className="text-center mb-3" hidden={placeOrder}>
            <Button
              size="lg"
              onClick={(event) => {
                setPlaceOrder(() => true);
              }}
            >
              Place Order
            </Button>
          </Container>
        </Card.Body>
      </Card>
    );
  };

  return (
    <Container className="mt-5" fluid={placeOrder}>
      {isLogin ? (
        <Row>
          <Col md={placeOrder ? 8 : 12} className="animation">
            {cart?.items?.length > 0 ? (
              cartView()
            ) : (
              <Alert variant="danger text-center">
                <h3 className="text-center my-5">OOPS!! Cart Is Empty</h3>
                <Button as={Link} to={"/store"} variant="warning">
                  Start Shopping
                </Button>
              </Alert>
            )}
          </Col>

          {placeOrder && (
            <Col md={4}>
              <Card className="mt-3 shadow border bg-red">
                <Card.Body>
                  <h4>Fill the form to complete order</h4>
                  {orderFormView()}
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      ) : (
        <Row>
          <Col>
            <Alert variant="success text-center">
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
