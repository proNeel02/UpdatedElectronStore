import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductFromServerUsingProductId } from "../../services/product.services";
import { useState } from "react";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import ShowHtml from "./ShowHtml";
import { getProductImageUrl } from "../../services/helper.service";
import CartContext from "../context/XCartContext";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
// import { toast } from "react-toastify";
import Swal from "sweetalert2";
const ProductView = () => {
  const { cart, addItem } = useContext(CartContext);
  const userContext = useContext(UserContext);
  const { productId } = useParams();
  const [singleProduct, setSingeProduct] = useState(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    getProductByProductId(productId);
  }, []);

  const getProductByProductId = (productId) => {
    getProductFromServerUsingProductId(productId)
      .then((serverData) => {
        setSingeProduct((singleProduct) => {
          return {
            ...serverData,
          };
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // handle add to cart manage by Add To Cart Button
  const handleAddItem = (productId, quantity) => {

    const productPresent = cart?.items?.find(
      (item) => item?.product?.productId === productId
    );

    if (productPresent && userContext?.userData?.user?.userId) {
      Swal.fire("Item is Present in Cart", "Please Go to the Cart", "success");
      return;
    }

    userContext?.userData?.user?.userId
      ? addItem(productId, quantity)
      : navigate("/login");
  };

  const ProductDetails = () => {
    return (
      <Container fluid className="py-5">
        <Row>
          <Col>
            <Card className="mt-4 shadow border-0">
              <Card.Body>
                <Container>
                  <Row className="d-flex align-items-center">
                    <Col className="py-5" md={5}>
                      <img
                        src={getProductImageUrl(productId)}
                        onError={(event) => {
                          event.currentTarget.onerror = null;
                          event.currentTarget.src = "/Assets/logo192.png";
                        }}
                        className="img-fluid"
                        style={{
                          width: "500px",
                        }}
                        alt=""
                      />
                    </Col>
                    <Col md={7}>
                      <h1 className="mb-3">{singleProduct.title}</h1>

                      <Container className="mb-3">
                        <Badge pill bg={"info"}>
                          {singleProduct?.category?.title}
                        </Badge>
                        <Badge
                          pill
                          className="ms-2"
                          bg={singleProduct.stock ? "success" : "danger"}
                        >
                          {singleProduct?.stock ? "In Stock" : "Out Of Stock"}
                        </Badge>
                      </Container>

                      <Container className="text-center">
                        <b>
                          <span className="h2 text-muted">
                            <s>₹{singleProduct.price}</s>
                          </span>
                        </b>

                        <b className="ms-2">
                          <span className="h1">
                            ₹{singleProduct.discountedPrice}
                          </span>
                        </b>
                      </Container>
                      <Container className="d-grid gap-2 text-center mt-5">
                        <Button
                          variant="warning"
                          disabled={!singleProduct.stock}
                          onClick={(event) => {
                            handleAddItem(singleProduct.productId, 1);
                          }}
                        >
                          <b>Add to Cart</b>
                        </Button>
                        <Button variant="info" as={Link} to={"/store"}>
                          <b>Go to Store</b>
                        </Button>
                      </Container>
                    </Col>
                  </Row>
                </Container>

                <div className="text-center mt-4">
                  <ShowHtml htmlText={singleProduct.description} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Container className="d-grid gap-2 text-center mt-5">
          <Button
            variant="warning"
            disabled={!singleProduct.stock}
            onClick={(event) => {
              handleAddItem(singleProduct.productId, 1);
            }}
          >
            <b>Add to Cart</b>
          </Button>
          <Button variant="info" as={Link} to={"/store"}>
            <b>Go to Store</b>
          </Button>
        </Container>
      </Container>
    );
  };

  return singleProduct && ProductDetails();
};
export default ProductView;
