import { useEffect } from "react";
import { getAllOrders } from "../../../services/order.service";
import { useState } from "react";
import {
  ADMIN_ORDERS_PAGE,
  formatDate,
} from "../../../services/helper.service";
import {
  Button,
  Card,
  Col,
  Container,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import SingleOrderView from "../../SingleOrderView";

const AdminOrders = () => {
  const [ordersData, setOrdersData] = useState({
    content: [
      {
        orderId: "145fgfgfg5646454fgfdfadsadh",
        billingName: "Prashat Dabe",
        billingPhone: "9370800073",
        orderItems: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        paymentStatus: "NOTPAID",
        orderStatus: "PENDING",
        orderedDate: 9999099968801,
      },
    ],
  });

  const getOrdersLocally = async () => {
    try {
      const data = await getAllOrders(
        0,
        ADMIN_ORDERS_PAGE,
        "orderedDate",
        "desc"
      );

      setOrdersData((ordersData) => {
        return {
          ...data,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   // single time on load

  //   getOrdersLocally();
  // }, []);


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
            <Row>
              <Col>
                {" "}
                <b>Order Id: </b>
                {viewSingleOrder?.orderId}
              </Col>
              <Col>
                <b>Billing Name: </b>
                {viewSingleOrder?.billingName}
              </Col>
            </Row>

            <Row className="mt-3">
              <Col>
                <Table bordered responsive striped>
                  <tbody>
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
                      <td>Order Date</td>
                      <td className="fw-bold">
                        {formatDate(viewSingleOrder?.orderedDate)}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
           
          </Modal.Footer>
        </Modal>
      </>
    );
  };
  
  const OrdersView = () => {
    return (
      <>
        <Card className="shadow-2">
          {JSON.stringify("Work Remaining On View Orders Details")}
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
