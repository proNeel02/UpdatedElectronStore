import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormGroup,
  InputGroup,
  Row,
} from "react-bootstrap";
import { toast } from "react-toastify";
const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: 0,
    discountedPrice: 0,
    quantity: 1,
    live: false,
    stock: true,
    image: undefined,
    imagePreview: `/Assets/logo192.png`,
  });

  // this function handle product image file
  const handleFileChange = (event) => {
    if (
      event.target.files[0].type === "image/png" ||
      event.target.files[0].type === "image/jpeg"
    ) {
      const reader = new FileReader();
      reader.onload = (r) => {
        setProduct((product) => {
          return {
            ...product,
            imagePreview: r.target.result,
            image: event.target.files[0],
          };
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      toast.error("Invalid file!!");

      setProduct((product) => {
        return {
          ...product,
          imagePreview: `/Assets/logo192.png`,
          image: undefined,
        };
      });
    }
  };

  const formView = () => {
    return (
      <>
        <Card
          className="shadow border-0 px-2"
          style={{
            borderStartStartRadius: "100px",
            borderEndEndRadius: "100px",
          }}
        >
          <Card.Body>
            <h5 className="text-center">Add Product here</h5>
            <Form>
              {/* Product Title */}
              <FormGroup className="mt-3">
                <Form.Label>Product Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Product Title"
                  onChange={(event) =>
                    setProduct((product) => {
                      return {
                        ...product,
                        title: event.target.value,
                      };
                    })
                  }
                  value={product.title}
                />
              </FormGroup>

              {/* >Product Description */}
              <FormGroup className="mt-3">
                <Form.Label>Product Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  placeholder="Product Description"
                  onChange={(event) =>
                    setProduct((product) => {
                      return {
                        ...product,
                        description: event.target.value,
                      };
                    })
                  }
                  value={product.description}
                />
              </FormGroup>

              <Row>
                {/* Product Price  */}
                <Col>
                  <FormGroup className="mt-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Product Price"
                      onChange={(event) =>
                        setProduct((product) => {
                          return {
                            ...product,
                            price: event.target.value,
                          };
                        })
                      }
                      value={product.price}
                    />
                  </FormGroup>
                </Col>

                {/* Discounted Price */}
                <Col>
                  <FormGroup className="mt-3">
                    <Form.Label>Discouted Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Discount"
                      onChange={(event) => {
                        return setProduct((product) => {
                          if (parseInt(event.target.value) > product.price) {
                            toast.error("Invalid Discount value!!");
                            return {
                              ...product,
                            };
                          }

                          return {
                            ...product,
                            discountedPrice: event.target.value,
                          };
                        });
                      }}
                      value={product.discountedPrice}
                    />
                  </FormGroup>
                </Col>
              </Row>

              {/* Product Quantity */}

              <FormGroup className="mt-3">
                <Form.Label>Product Quantity</Form.Label>

                <Form.Control
                  type="number"
                  placeholder="Product Quantity"
                  onChange={(event) => {
                    return setProduct((product) => {
                      return {
                        ...product,
                        quantity: event.target.value,
                      };
                    });
                  }}
                  value={product.quantity}
                />
              </FormGroup>

              {/* Checked Entities */}
              <Row className="mt-3 px-1">
                <Col>
                  <Form.Check
                    type="switch"
                    label={"Live"}
                    checked={product.live}
                    onChange={(event) => {
                      return setProduct((product) => {
                        return {
                          ...product,
                          live: !product.live,
                        };
                      });
                    }}
                  />
                </Col>

                <Col>
                  <Form.Check
                    type="switch"
                    label={"Stock"}
                    checked={product.stock}
                    onChange={(event) => {
                      return setProduct((product) => {
                        return {
                          ...product,
                          stock: !product.stock,
                        };
                      });
                    }}
                  />
                </Col>
              </Row>

              {/* Product image */}
              <FormGroup>
                <Container
                  className="text-center mt-3 mb-3 shadow"
                  style={{
                    borderRadius: "20px",
                  }}
                >
                  <p className="text-muted">Product Image Preview</p>
                  <img
                    src={product.imagePreview}
                    className="img-fluid mb-3"
                    style={{
                      maxHeight: "300px",
                    }}
                  />
                </Container>

                <Form.Label> Select Product Image</Form.Label>

                <InputGroup>
                  <Form.Control
                    type={"file"}
                    onChange={(event) => {
                      return handleFileChange(event);
                    }}
                  />

                  <Button variant="outline-secondary">Clear</Button>
                </InputGroup>
              </FormGroup>

              <Container className="text-center mt-3">
                <Button variant="success" size="sm">
                  Add Product
                </Button>

                <Button variant="danger" size="sm" className="ms-2">
                  Clear Data
                </Button>
              </Container>
            </Form>
          </Card.Body>
        </Card>
      </>
    );
  };

  return <div>{formView()}</div>;
};

export default AddProduct;
