import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { formatDate } from "../services/helper.service";
import UserContext from "./context/UserContext";
import { useContext } from "react";

const SingleOrderView = ({ Order, OpenViewOrderModal }) => {
  const { userData } = useContext(UserContext);


  console.log("UserData = ",userData);
  return (
    <Card className="border border-0 shadow mb-5">
      <Card.Body>
        <Row>
          <Col>
            {" "}
            <b>Order Id: </b>
            {Order?.orderId}
          </Col>
          <Col>
            <b>Ordered By : </b>
            {userData?.user?.name}
          </Col>
        </Row>

        <Row className="mt-3">
          <Col>
            <Table bordered responsive striped>
              <tbody>
                <tr>
                  <td>Billing Name</td>
                  <td className="fw-bold">{Order?.billingName}</td>
                </tr>

                <tr>
                  <td>Billing Phone</td>
                  <td className="fw-bold">{Order?.billingPhone}</td>
                </tr>

                <tr>
                  <td>Items</td>
                  <td className="fw-bold">{Order?.orderItems.length}</td>
                </tr>

                <tr
                  className={
                    Order?.paymentStatus === "NOTPAID"
                      ? "table-danger"
                      : "table-success"
                  }
                >
                  <td>Payment Status</td>
                  <td className="fw-bold">{Order?.paymentStatus}</td>
                </tr>

                <tr>
                  <td>Order Status</td>
                  <td className="fw-bold">{Order?.orderStatus}</td>
                </tr>

                <tr>
                  <td>Order Date</td>
                  <td className="fw-bold">{formatDate(Order?.orderedDate)}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Container className="text-center my-2">
          <Button
            variant="dark"
            onClick={(event) => {
              OpenViewOrderModal(event, Order);
            }}
          >
            <b>Order Details</b>
          </Button>

          <Button variant="warning" className="mx-3">
            <b>Update</b>
          </Button>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default SingleOrderView;
