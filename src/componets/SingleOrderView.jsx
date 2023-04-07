import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { formatDate } from "../services/helper.service";

const SingleOrderView = ({ Order, OpenViewOrderModal }) => {
  return (
    <Card className="border border-0 shadow mb-5 text-center">
      <Card.Body>
        <Row>
          <Col>
            {" "}
            <b>Order Id: </b>
            {Order?.orderId}
          </Col>
          <Col>
            <b>Billing Name: </b>
            {Order?.billingName}
          </Col>
        </Row>

        <Row className="mt-3">
          <Col>
            <Table bordered responsive striped>
              <tbody>
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
        <Container className="text-center">
          <Button 
          size="sm" 
          variant="outline-dark"
          onClick={ (event) => {
            OpenViewOrderModal(event, Order);
          }}
          >
            View Order Details
          </Button>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default SingleOrderView;
