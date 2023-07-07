import { Badge, Card, Col, Row } from "react-bootstrap";
import ReactPlayer from "react-player";
import { getProductImageUrl } from "../../services/helper.service";

export const TrendingProducts = ({ product, setViewModalTrue }) => {
 
 console.log(product.img);
    return (
    <Card
      className="shadow my-3 border-0 text-center"
      onClick={(event) => {
        setViewModalTrue(product);
      }}
      style={{ cursor: "pointer" }}
    >
      <Card.Body>
        <Row className="d-flex align-items-center">

          <Col md={4}>
            <img
              src={product?.img}
            
              alt=""
              style={{
                width: "200px",
                height: "200px",
                objectFit: "contain",
              }}
            />
          </Col>
          <Col md={8}>
            <h3>{product?.title}</h3>

            <Row className="mt-2">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum
                dolore laborum architecto facilis, laudantium repudiandae labore
                fuga nostrum quaerat quasi.'
              </p>
              <Col>
                <Badge pill className="me-2 px-3">
                  {product?.live && "Live"}
                </Badge>

                <Badge pill bg={"secondary"} className="me-2 px-3">
                  {product?.stock && "In Stock"}
                </Badge>

                <Badge pill bg={"success"} className="me-2 px-3">
                  {product?.category?.title}
                </Badge>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
