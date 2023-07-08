import React from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RiProductHuntLine } from "react-icons/ri";
import { MdOutlineCategory } from "react-icons/md";
import { BsBox2HeartFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { DashBoardCardView } from "../users/DashBoardCardView";
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

      <Row className="mt-3">
        <Col md={6}>
          <DashBoardCardView
            icon={<RiProductHuntLine size={50} />}
            number={1500}
            text={"Products"}
          />
        </Col>

        <Col md={6}>
          <DashBoardCardView
            icon={<MdOutlineCategory size={50} />}
            number={1500}
            text={"Categories"}
          />
        </Col>

        <Col md={6} className="mt-3">
          <DashBoardCardView
            icon={<BsBox2HeartFill size={50} />}
            number={1500}
            text={"Orders"}
          />
        </Col>

        <Col md={6} className="mt-3">
          <DashBoardCardView
            icon={<FaUsers size={50} />}
            number={15000}
            text={"Users"}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminHome;
