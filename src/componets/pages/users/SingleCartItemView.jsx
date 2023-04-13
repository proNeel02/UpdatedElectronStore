import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { getProductImageUrl } from "../../../services/helper.service";

const SingleCartItemView = ({ item }) => {
  return (
    <Card className="shadow-sm mb-3">
      <Card.Body>
        <Row>
          <Col md={2}  className="d-flex align-items-center justify-content-center">
            <img
              src={getProductImageUrl(item.product.productId)}
              style={{
                width: "80px",
                height: "80px",
                objectFit: "contain",
              }}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = "/Assets/logo192.png";
              }}
              alt=""
            />
          </Col>
          <Col>
            <h5>{item?.product?.title}</h5>
            <p className="text-muted">Lorem ipsum dolor sit amet consectetur</p>
          </Col>
          <Col></Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default SingleCartItemView;
