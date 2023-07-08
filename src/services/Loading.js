import React from "react";
import '../App.css'
import { Card, Container, Spinner } from "react-bootstrap";

const Loading = ({ show }) => {
  return (
    show && (
      <Container className="text-center mt-4">
        <Card className="border-0">
          <Card.Body>
            <Spinner size="lg" />
          </Card.Body>
        </Card>
      </Container>
    )
  );
};

export default Loading;
