import { Badge, Button, Card, Container } from "react-bootstrap";
import { getProductImageUrl } from "../../../services/helper.service";
import { Link } from "react-router-dom";

const SingleProductCard = ({ product }) => {

 

  return (
    <>
      <Card className="m-1">
        <Card.Body>
          <Container className="text-center">
            <img
              src={getProductImageUrl(product.productId)}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = "/Assets/logo192.png";
              }}
              style={{
                width: "150px",
                objectFit: "contain",
              }}
              className="img-fluid"
              alt=""
            />
          </Container>

          <h6>{product.title}</h6>

          <Badge pill bg={"info"}>
            {product?.category?.title}
          </Badge>
          <Badge
            pill
            className="ms-2"
            bg={product.stock ? "success" : "danger"}
          >
            {product?.stock ? "In Stock" : "Out Of Stock"}
          </Badge>
          <Container className="text-end">
            <b>
              <span className="h4 text-muted">
                <s>₹{product.price}</s>
              </span>
            </b>

            <b className="ms-2">
              <span className="h4">₹{product.discountedPrice}</span>
            </b>
          </Container>
          <Container className="d-grid text-center mt-4">
            <Button
              size="sm"
              as={Link}
              to={`/store/products/${product.productId}`}
              variant="success"
              style={{
                textDecoration: "none",
              }}
            >
              <b>view Product</b>
            </Button>
          </Container>
        </Card.Body>
      </Card>
    </>
  );
};

export default SingleProductCard;
