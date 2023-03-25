import { Button, Card, Col, Container, Row } from "react-bootstrap";

const CategoryAtomicView = ({ Array }) => {
  return Array?.map((obj) => {
    return (
      <>
        <div key={obj.category} className="mb-3 border-0 shadow">
          <Card>
            <Card.Body>
              <Row className="align-items-center">
                <Col md={2}>
                  <img
                    src={
                      obj.coverImage
                        ? obj.coverImage.startsWith("http")
                          ? obj.coverImage
                          : "/Assets/logo192.png"
                        : "/Assets/logo192.png"
                    }
                    className="rounded-circle"
                    alt=""
                    style={{
                      width: "100px",
                      height: "100px",
                    }}
                  />
                </Col>

                <Col md={8}>
                  <h5> {obj.title}</h5>
                  <p>{obj.description}</p>
                </Col>

                <Col md={2}>
                  <Container className="d-grid">
                    <Button variant="info" size="sm">
                      View
                    </Button>

                    <Button variant="warning" size="sm" className="mt-1">
                      Update
                    </Button>

                    <Button variant="danger" size="sm" className="mt-1">
                      Delete
                    </Button>
                  </Container>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </div>
      </>
    );
  });
};
export default CategoryAtomicView;
