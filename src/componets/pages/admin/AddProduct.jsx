import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormGroup,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { getCategories } from "../../../services/CategoryService";
import {
  addProductImage,
  createProductInCategory,
  createProductWithoutCategory,
} from "../../../services/product.services";

import { Editor } from "@tinymce/tinymce-react";

const AddProduct = () => {
  const [categories, setCategories] = useState(undefined);

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

  const [selectedCatId, setSelectedCatId] = useState("none");

  // using useEffect we are fetching getCategory data
  //once
  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(() => {
          return data;
        });
        // console.log(data);
      })
      .catch((error) => {
        toast.error("Error while fetching categories!");
      });
  }, []);

  const [isLoading, setLoading] = useState(false);

  // below useRef for editable tabel
  const editorRef = useRef(null);

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

  // this function operate on Add
  const submitAddProduct = (event) => {
    event.preventDefault();

    // check for form title
    if (product.title === undefined || product.title.trim() === "") {
      toast.error("Title required!!");
      return;
    }

    // check for description
    if (
      product.description === undefined ||
      product.description.trim() === ""
    ) {
      toast.error("description required!!");
      return;
    }

    if (product.price <= 0) {
      toast.error("price Invalid!!");
      return;
    }

    if (
      Number(product.discountedPrice) < 0 ||
      Number(product.discountedPrice) >= Number(product.price)
    ) {
      toast.error("Discount Invalid!!");
      // console.dir(product);
      return;
    }

    // api call

    setLoading(() => true);
    if (selectedCatId === "none") {
      //create product with out category

      createProductWithoutCategory(product)
        .then((serverResponse) => {
          toast.success("Product Added!!");
          // console.log(serverResponse);

          //uploading an image so we call an api

          // this below condition executes when
          // product.image is undefined
          if (!product.image) {
            clearData();
            return;
          }

          addProductImage(product.image, serverResponse.productId)
            .then((serverResponse) => {
              // console.log(serverResponse);
              toast.success("Image uploaded!");
              clearData();
            })
            .catch((error) => {
              toast.success("Error while uploading image!");
              // console.log(error);
            });
        })
        .catch((error) => {
          toast.error("Failed to Add Product!");
          // console.log(error);
        })
        .finally(() => {
          setLoading(() => false);
        });
    } else {
      // create product in category
      createProductInCategory(product, selectedCatId)
        .then((data) => {
          // console.log(data);
          toast.success(`Product Created Inside category ${product.title}`);

          // this below condition executes when
          // product.image is undefined
          if (!product.image) {
            clearData();
            return;
          }

          //uploading an image so we call an api
          addProductImage(product.image, data.productId)
            .then((serverResponse) => {
              // console.log(serverResponse);
              toast.success("Image uploaded!");
              clearData();
            })
            .catch((error) => {
              toast.success("Error while uploading image!");
              // console.log(error);
            });
        })
        .catch((error) => {
          // console.log(error);
          toast.error(`Product not Created Inside category ${product.title}`);
        })
        .finally(() => {
          setLoading(() => false);
        });
    }
  };

  
  // this function clears data inside field
  // operate on Clear data button
  const clearData = () => {
    setProduct((product) => {
      return {
        title: "",
        description: "",
        price: 0,
        discountedPrice: 0,
        quantity: 1,
        live: false,
        stock: true,
        image: undefined,
        imagePreview: `/Assets/logo192.png`,
      };
    });
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
            <Form onSubmit={submitAddProduct}>
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
                {/* <Form.Control
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
                /> */}

                <Editor
                  apiKey={"5cws83tfeydksa9ws44cb9tixaeucgmib6ix32gji5gxb8of"}
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue={product.description}
                  init={{
                    height: 400,
                    menubar: true,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                  onEditorChange={() => {
                    return setProduct((product) => {
                      return {
                        ...product,
                        description: editorRef.current.getContent(),
                      };
                    });
                  }}
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
                    alt=""
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

                  <Button
                    variant="outline-secondary"
                    onClick={(event) => {
                      setProduct((product) => {
                        return {
                          ...product,
                          image: undefined,
                          imagePreview: `/Assets/logo192.png`,
                        };
                      });
                    }}
                  >
                    Clear
                  </Button>
                </InputGroup>
              </FormGroup>

              <FormGroup className="mt-3">
                <Form.Label>Select Category</Form.Label>

                <Form.Select
                  value={selectedCatId}
                  onChange={(event) => {
                    return setSelectedCatId(() => {
                      return event.target.value;
                    });
                  }}
                >
                  <option value={"none"}>None</option>
                  {categories ? (
                    <>
                      {categories.content.map((obj) => {
                        return (
                          <option key={obj.categoryId} value={obj.categoryId}>
                            {obj.title}
                          </option>
                        );
                      })}
                    </>
                  ) : (
                    ""
                  )}
                </Form.Select>
              </FormGroup>

              <Container className="text-center mt-3">
                <Button
                  variant="success"
                  size="sm"
                  type="submit"
                  className="text-center"
                  disabled={isLoading}
                >
                  <Spinner
                    hidden={!isLoading}
                    animation="border"
                    variant="primary"
                    size="sm"
                  />
                  <span hidden={!isLoading}>Adding...</span>
                  <span hidden={isLoading}>Add Product</span>
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  className="ms-2"
                  onClick={clearData}
                >
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
