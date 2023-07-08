import { Badge, Button, Card, Col, Form, Row } from "react-bootstrap";
import Swal from "sweetalert2";

export const TrendingProducts = ({ product, setViewModalTrue }) => {
  return (
    <Card
      className="shadow my-3 border-0 text-center"
      onClick={(event) => {
        setViewModalTrue(product);
      }}
      style={{ cursor: "pointer" }}
    >
      <Card.Body>
        <Row className="d-flex align-items-center">
          <Col md={4}>
            <img
              src={product?.img}
              alt=""
              style={{
                width: "200px",
                height: "200px",
                objectFit: "contain",
              }}
            />
          </Col>
          <Col md={8}>
            <h3>{product?.title}</h3>

            <Row className="mt-2">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum
                dolore laborum architecto facilis, laudantium repudiandae labore
                fuga nostrum quaerat quasi.'
              </p>
              <Col>
                <Badge pill className="me-2 px-3">
                  {product?.live && "Live"}
                </Badge>

                <Badge pill bg={"secondary"} className="me-2 px-3">
                  {product?.stock && "In Stock"}
                </Badge>

                <Badge pill bg={"success"} className="me-2 px-3">
                  {product?.category?.title}
                </Badge>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export const ContactUsForm = () => {
  return (
    <Form>
      <Row className="mb-3">
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control placeholder="contact number" type="number" />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group>
          <Form.Label>Message</Form.Label>
          <Form.Control as={"textarea"} rows={8} placeholder="Write here" />
        </Form.Group>

        {/* <Form.Group as={Col} controlId="formGridState">
        <Form.Label>State</Form.Label>
        <Form.Select defaultValue="Choose...">
          <option>Choose...</option>
          <option>...</option>
        </Form.Select>
      </Form.Group> */}

        {/* <Form.Group as={Col} controlId="formGridZip">
        <Form.Label>Zip</Form.Label>
        <Form.Control />
      </Form.Group> */}
      </Row>

      <Button
        variant="primary"
        onClick={() => {
          Swal.fire(
            "Your Store is Under Contruction",
            "Please Explore Other Features",
            "success"
          ).then((result) => {});
        }}
      >
        Submit
      </Button>
    </Form>
  );
};
