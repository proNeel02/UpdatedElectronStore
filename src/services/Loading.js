import React from "react";
import { Card, Container } from "react-bootstrap";

const Loading = ({ show }) => {
  return (
    show && (
      <Container className="text-center mt-4">
        <Card className="shadow border-0">
          <Card.Body>
            <h2>Loading....</h2>
          </Card.Body>
        </Card>
      </Container>
    )
  );
};

export default Loading;
