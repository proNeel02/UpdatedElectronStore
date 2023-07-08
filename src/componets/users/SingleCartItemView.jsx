import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { getProductImageUrl } from "../../services/helper.service";
import { SiAddthis } from "react-icons/si";
import { GrSubtractCircle } from "react-icons/gr";
import UserContext from "../context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CartContext from "../context/XCartContext";

const SingleCartItemView = ({
  item,
  removeItemsFromTheCart,
  addItem,
  setPlaceOrder,
}) => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const { cart } = useContext(CartContext);
  // Remove Product From the Cart Handler
  const handleProductRemoveFromCart = (event, itemId) => {
    if (cart.items.length === 1) {
      setPlaceOrder(() => false);
    }
    userContext?.userData?.user?.userId
      ? removeItemsFromTheCart(itemId)
      : navigate("/login");
  };

  // handleAddProductFromCart

  const handleRemoveOneAtaTime = (event, item) => {
    const decreasedQuantity = item.quantity - 1;

    if (decreasedQuantity > 0) {
      addItem(item.product.productId, decreasedQuantity, "remove", "cart");
    } else {
      toast.info("Quantity Can not less Than 1", {
        position: "bottom-center",
      });
    }
  };

  // handleRemoveOneAtaTime
  const handleIncreseProductFromCart = (event, item) => {
    const incresedQuantity = item.quantity + 1;

    addItem(item.product.productId, incresedQuantity, "add", "cart");
  };

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
                  <Button
                    size="sm"
                    variant="outline-success"
                    onClick={(event) =>
                      handleIncreseProductFromCart(event, item)
                    }
                  >
                    <SiAddthis />
                  </Button>
                </Col>
                <Col md={6}>
                  {" "}
                  <Button
                    size="sm"
                    variant="outline-secondary"
                    onClick={(event) => handleRemoveOneAtaTime(event, item)}
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
