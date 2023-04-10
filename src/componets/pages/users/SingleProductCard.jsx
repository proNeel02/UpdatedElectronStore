import { Card, Container } from "react-bootstrap";
import { getProductImageUrl } from "../../../services/helper.service";

const SingleProductCard = ({ product }) => {
  return (
    <>
      <Card className="m-1 shadow text-center">
        <Card.Body>
          <Container>
            <img
              src={getProductImageUrl(product.productId)}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = `/Assets/logo192.png`;
              }}
              className="img-fluid"
              alt=""
            />
          </Container>
          <h6>{product.title}</h6>
        </Card.Body>
      </Card>
    </>
  );
};

export default SingleProductCard;
