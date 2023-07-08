import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import {  NavLink } from "react-router-dom";

const ErrorPage = () => {
  const PresentError = () => {
    return (
      <Container className="mt-5">
        <Row>
          <Col
            lg={{
              span: 8,
              offset: 2,
            }}
          >
            <Card
              className="text-center border-0 shadow"
              style={{ borderRadius: "100px" }}
            >
              <Card.Body>
                <h3>You are not logged In</h3>
                <p>Please do login to view the page</p>
                <Container className="text-center mb-3">
                  <img
                    src={"/Assets/logo192.png"}
                    width={"250px"}
                    height={"250px"}
                  />
                </Container>

                <Button
                  className="mt-3"
                  variant="success"
                  as={NavLink}
                  to="/login"
                >
                  Login Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };

  return PresentError();
};

export default ErrorPage;
