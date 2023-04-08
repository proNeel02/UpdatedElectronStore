import React from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RiProductHuntLine } from "react-icons/ri";
import { MdOutlineCategory } from "react-icons/md";
import { BsBox2HeartFill } from 'react-icons/bs'
const AdminHome = () => {
  return (
    <Container>
      <Row>
        <Col
          md={{
            span: 8,
            offset: 2,
          }}
        >
          <Card className="shadow text-center">
            <Card.Body>
              <h3 className="text-center text-muted">
                WelCome to admin Dashboard
              </h3>

              <Container className="mt-4 d-grid gap-4">
                <Button
                  as={Link}
                  to={"/admin/categories"}
                  variant="outline-secondary"
                  //   className="me-3"
                >
                  <b>Start Managing Categories</b>
                </Button>
                <Button
                  as={Link}
                  to={"/admin/products"}
                  variant="outline-secondary"
                >
                  <b>Start Managing Products</b>
                </Button>

                <Button
                  as={Link}
                  to={"/admin/users"}
                  variant="outline-secondary"
                >
                  <b>Start Managing Users</b>
                </Button>

                <Button
                  as={Link}
                  to={"/admin/orders"}
                  variant="outline-secondary"
                >
                  <b>Start Managing Orders</b>
                </Button>
              </Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-3  text-muted">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <RiProductHuntLine size={50} className="mb-3" />
              <h3 className="mb-2">Number Of Products</h3>
              <h3>15825</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <MdOutlineCategory size={50} className="mb-3" />
              <h3 className="mb-2">Number Of categories</h3>
              <h3>15</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mt-3">
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <BsBox2HeartFill size={50}/>
              <h3 className="mb-2">Number Of Orders</h3>
              <h3>1500</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminHome;
