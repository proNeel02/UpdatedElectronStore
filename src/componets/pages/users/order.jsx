import React, { useContext, useEffect, useState } from "react";
import { getOrdersOfUsers } from "../../../services/order.service";
import UserContext from "../../context/UserContext";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { toast } from "react-toastify";
import SingleOrderView from "../../SingleOrderView";
import { getProductImageUrl } from "../../../services/helper.service";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../../../auth/HelperAuth";
const Order = () => {
  const { isLogin, userData } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  const [viewModal, setViewModal] = useState(false);
  const [modelOrder, setModalOrder] = useState(null);
  useEffect(() => {
    if (isLogin) {
      loadOrderOfUsers(userData?.user?.userId);
    }
  }, [isLogin]);

  const loadOrderOfUsers = async (userId) => {
    try {
      const result = await getOrdersOfUsers(userId);

      setOrders((prevResult) => {
        return [...result];
      });
    } catch (err) {
      console.log(err);
      toast.error("Error in Loading Orders", {
        position: "bottom-left",
      });
    }
  };

  // closing Modal
  const CloseViewOrderModal = () => {
    setViewModal(() => false);
  };

  // opening Modal
  const OpenViewOrderModal = (event, order) => {
    setModalOrder(() => {
      return { ...order };
    });
    setViewModal(() => true);
  };

  // modal View
  const orderModalView = () => {
    return (
      <>
        <Modal
          show={viewModal}
          onHide={CloseViewOrderModal}
          size="lg"
          centered
          animation={true}
        >
          <Modal.Header>
            <Modal.Title>Order Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card className="border-0">
              <Card.Body>
                <h3>Orderd Items</h3>
                {modelOrder?.orderItems?.map((orderItem) => {
                  return (
                    <Card
                      key={orderItem?.product?.addedDate}
                      className="shadow my-3 border-0"
                    >
                      <Card.Body>
                        <Row className="d-flex align-items-center">
                          <Col md={2}>
                            <img
                              src={getProductImageUrl(
                                orderItem?.product?.productId
                              )}
                              alt=""
                              style={{
                                width: "80px",

                                height: "80px",
                                objectFit: "contain",
                              }}
                            />
                          </Col>
                          <Col md={10}>
                            <b>{orderItem?.product?.title}</b>

                            <Row className="mt-2">
                              <Col>
                                <Badge pill className="me-2">
                                  Quantity : {orderItem?.quantity}
                                </Badge>

                                <Badge pill bg={"success"} className="me-2">
                                  Total Amount for This Item :{" "}
                                  {orderItem?.totalPrice}
                                </Badge>

                                <Badge pill bg={"warning"}>
                                  Price Per Item :{" "}
                                  {orderItem?.product?.discountedPrice}
                                </Badge>
                              </Col>
                            </Row>

                            <Row className="mt-4">
                              <span>
                                Product Id: {orderItem?.product?.productId}
                              </span>
                            </Row>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  );
                })}
              </Card.Body>
            </Card>

            <Row className="mt-4">
              <Col>
                {" "}
                <b>Order Id: </b>
                {modelOrder?.orderId}
              </Col>
              <Col>
                <b>Ordered By: </b>
                {modelOrder?.user?.name}
              </Col>
            </Row>

            <Row className="mt-3">
              <Col>
                <Table bordered responsive striped>
                  <tbody>
                    <tr>
                      <td>Billing Name</td>
                      <td className="fw-bold">{modelOrder?.billingName}</td>
                    </tr>

                    <tr>
                      <td>Billing Phone</td>
                      <td className="fw-bold">{modelOrder?.billingPhone}</td>
                    </tr>

                    <tr>
                      <td>Items</td>
                      <td className="fw-bold">
                        {modelOrder?.orderItems?.length}
                      </td>
                    </tr>

                    <tr
                      className={
                        modelOrder?.paymentStatus === "NOTPAID"
                          ? "table-danger"
                          : "table-success"
                      }
                    >
                      <td>Payment Status</td>
                      <td className="fw-bold">{modelOrder?.paymentStatus}</td>
                    </tr>

                    <tr>
                      <td>Order Status</td>
                      <td className="fw-bold">{modelOrder?.orderStatus}</td>
                    </tr>

                    <tr>
                      <td>Billing Address</td>
                      <td className="fw-bold">{modelOrder?.billingAddress}</td>
                    </tr>

                    <tr>
                      <td>Delivered Date</td>
                      <td className="fw-bold">{modelOrder?.deliveredDate}</td>
                    </tr>

                    <tr>
                      <td>Order Amount</td>
                      <td className="fw-bold">₹ {modelOrder?.orderAmount}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={CloseViewOrderModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  // order View
  const OrdersView = () => {
    return (
      <>
        <Card className="border-0">
          <Card.Body>
            <h3 className="text-center mb-3">Your Previous Orders</h3>
            {orders?.map((order) => {
              return (
                <SingleOrderView
                  key={order?.orderId}
                  Order={order}
                  page={"normalUser"}
                  OpenViewOrderModal={OpenViewOrderModal}
                />
              );
            })}
            {orderModalView()}

            {orders.length <= 0 && (
              <Alert variant="secondary" className="text-center">
                <h3>No Order Placed Yet!</h3>
              </Alert>
            )}
          </Card.Body>
        </Card>
      </>
    );
  };

  return isLoggedIn() ? (
    <Row className="mt-4">
      <Col
        md={{
          span: 10,
          offset: 1,
        }}
      >
        {OrdersView()}
      </Col>
    </Row>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default Order;
