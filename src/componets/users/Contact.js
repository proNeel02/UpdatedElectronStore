import React from "react";
import Base from "./Base";
import { ContactUsForm } from "../HomePageComponents";
import { Card, Col, Container, Row } from "react-bootstrap";
const Contact = () => {
  return (
    <>
      <Base title={"Electron Store / Contact Us"} description={null}>
        <Container className="m-5">
          <Row>
            <Col
              md={{
                span: 6,
                offset: 3,
              }}
            >
              <Card className="p-1" style={{ borderRadius: "25px" }}>
                <h3 className="text-center"> Contact Us</h3>
                <Card.Body>
                  <ContactUsForm />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Base>
    </>
  );
};
export default Contact;
