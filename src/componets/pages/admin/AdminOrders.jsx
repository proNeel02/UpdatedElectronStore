import { useEffect } from "react";
import { getAllOrders } from "../../../services/order.service";
import { useState } from "react";
import { ADMIN_ORDERS_PAGE } from "../../../services/helper.service";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
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

  // useEffect(() => {
  //   // single time on load
  //   getOrdersLocally();
  // }, []);

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
          backdrop="static"
          keyboard={false}
          size="lg"
          centered
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{ viewSingleOrder.orderId}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            I will not close if you click outside me. Don't even try to press
            escape key.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={CloseViewOrderModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  const OrdersView = () => {
    return (
      <>
        <Card className="shadow-2">
          {JSON.stringify(ordersData)}
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
          {viewModal && orderModalView()}
        </Row>
      </Container>
    </>
  );
};

export default AdminOrders;
