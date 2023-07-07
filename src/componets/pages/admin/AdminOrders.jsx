import { getAllOrders } from "../../../services/order.service";
import { useEffect, useState } from "react";
import {
  ADMIN_ORDERS_PAGE,
  formatDate,
  getProductImageUrl,
} from "../../../services/helper.service";
import {
  Badge,
  Card,
  Col,
  Container,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import SingleOrderView from "../../SingleOrderView";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

const AdminOrders = () => {
  const [ordersData, setOrdersData] = useState();

  const { userData } = useContext(UserContext);

  const getOrdersLocally = async () => {
    try {
      const data = await getAllOrders();

      setOrdersData((ordersData) => {
        return {
          ...data,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // single time on load
    getOrdersLocally();
  }, []);

  // Modal VIew START
  // below state handle modal view
  // this state handle data comming from after clicking view Order details
  const [viewSingleOrder, setviewSingleOrder] = useState(undefined);

  const [viewModal, setViewModal] = useState(false);

  const OpenViewOrderModal = (event, Order) => {
    setviewSingleOrder((viewSingleOrder) => {
      return {
        ...Order,
      };
    });
    setViewModal(() => true);
  };
  const CloseViewOrderModal = () => {
    setViewModal(() => false);
  };
  // Modal VIew END
  // modal view
  const orderModalView = () => {
    const { orderItems } = viewSingleOrder;

    return (
      <>
        <Modal
          show={viewModal}
          onHide={CloseViewOrderModal}
          size="lg"
          centered
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Order Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card className="border-0">
              <Card.Body>
                <h3>Orderd Items</h3>
                {orderItems?.map((orderItem) => {
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
                {viewSingleOrder?.orderId}
              </Col>
              <Col>
                <b>Ordered By: </b>
                {viewSingleOrder?.user?.name}
              </Col>
            </Row>

            <Row className="mt-3">
              <Col>
                <Table bordered responsive striped>
                  <tbody>
                    <tr>
                      <td>Billing Name</td>
                      <td className="fw-bold">
                        {viewSingleOrder?.billingName}
                      </td>
                    </tr>

                    <tr>
                      <td>Billing Phone</td>
                      <td className="fw-bold">
                        {viewSingleOrder?.billingPhone}
                      </td>
                    </tr>

                    <tr>
                      <td>Items</td>
                      <td className="fw-bold">
                        {viewSingleOrder?.orderItems.length}
                      </td>
                    </tr>

                    <tr
                      className={
                        viewSingleOrder?.paymentStatus === "NOTPAID"
                          ? "table-danger"
                          : "table-success"
                      }
                    >
                      <td>Payment Status</td>
                      <td className="fw-bold">
                        {viewSingleOrder?.paymentStatus}
                      </td>
                    </tr>

                    <tr>
                      <td>Order Status</td>
                      <td className="fw-bold">
                        {viewSingleOrder?.orderStatus}
                      </td>
                    </tr>

                    <tr>
                      <td>Billing Address</td>
                      <td className="fw-bold">
                        {viewSingleOrder?.billingAddress}
                      </td>
                    </tr>

                    <tr>
                      <td>Delivered Date</td>
                      <td className="fw-bold">
                        {viewSingleOrder?.deliveredDate}
                      </td>
                    </tr>

                    <tr>
                      <td>Order Amount</td>
                      <td className="fw-bold">
                        ₹ {viewSingleOrder?.orderAmount}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </>
    );
  };

  const OrdersView = () => {
    return (
      <>
        <Card className="shadow">
          {/* "This page Have work to do insufficient Order object Data comming from Server Bz */}
          {/* customer not yet order single item so no object is present in data base"} */}
          <Card.Body>
            <h3 className="text-center mb-3"> All Orders are here </h3>
            {ordersData?.content?.map((order) => {
              return (
                <SingleOrderView
                  key={order?.orderId}
                  Order={order}
                  OpenViewOrderModal={OpenViewOrderModal}
                />
              );
            })}
          </Card.Body>
        </Card>
      </>
    );
  };
  return (
    <>
      <Container>
        <Row>
          <Col>{ordersData && OrdersView()}</Col>
          {viewSingleOrder && viewModal && orderModalView()}
        </Row>
      </Container>
    </>
  );
};
export default AdminOrders;
