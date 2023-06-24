import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { getProductImageUrl } from "../../../services/helper.service";
import { SiAddthis } from "react-icons/si";
import { GrSubtractCircle } from "react-icons/gr";
import UserContext from "../../context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const SingleCartItemView = ({ item, removeItemsFromTheCart }) => {

  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  // Remove Product From the Cart Handler
  const handleProductRemoveFromCart = (event, itemId) => {
    userContext?.userData?.user?.userId ? removeItemsFromTheCart(itemId) : navigate('/login');
  };


  // handleAddProductFromCart

  const handleAddProductFromCart = (event,itemId) => {
   console.log("handleAddProductFromCart");
  }

  // handleRemoveOneAtaTime
const handleRemoveOneAtaTime = (event,itemId) => {
  console.log("handleRemoveOneAtaTime");

}

  return (
    <Card
      className="shadow-sm mb-3"
      style={{
        backgroundColor: "#e2e2e2",
      }}
    >
      <Card.Body>
        <Row>
          <Col
            className="d-flex align-items-center justify-content-center"
            md={2}
          >
            <img
              src={getProductImageUrl(item.product.productId)}
              style={{
                width: "80px",
                height: "80px",
                objectFit: "contain",
              }}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = "/Assets/logo192.png";
              }}
              alt=""
            />
          </Col>
          <Col md={8}>
            <h5>{item?.product?.title}</h5>
            <p className="text-muted">Lorem ipsum dolor sit amet consectetur</p>
            <Row>
              <Col>
                <p>
                  {" "}
                  <b>{item.quantity}</b>{" "}
                  <span className="text-muted">Quantity</span>
                </p>
              </Col>
              <Col>
                <p>
                  {" "}
                  <span className="text-muted">Price</span>
                  <b> ₹{item.product.discountedPrice}</b>{" "}
                </p>
              </Col>
              <Col>
                <p>
                  {" "}
                  <span className="text-muted">Total Price</span>
                  <b> ₹{item.totalPrice}</b>{" "}
                </p>
              </Col>
            </Row>
          </Col>

          <Col md={2} className="text-center">
            <div className="d-grid mb-3">
              <Button
                size="sm"
                variant="danger"
                onClick={(e) =>
                  handleProductRemoveFromCart(e, item?.cartItemId)
                }
              >
                Remove
              </Button>
            </div>
            <div>
              <Row>
                <Col md={6}>
                  {" "}
                  <Button size="sm" variant="outline-success"
                  onClick={(event) => handleAddProductFromCart(item?.cartItemId)}
                  >
                    <SiAddthis />
                  </Button>
                </Col>
                <Col md={6}>
                  {" "}
                  <Button size="sm" variant="outline-secondary"
                  onClick={(event) => handleRemoveOneAtaTime(item?.cartItemId)}
                  >
                    <GrSubtractCircle />
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default SingleCartItemView;
