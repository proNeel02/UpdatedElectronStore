import { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FormGroup,
  Row,
  Table,
  Label,
  Form,
  Pagination,
  Modal,
  Spinner,
  InputGroup,
} from "react-bootstrap";
import {
  addProductImage,
  getAllProducts,
  serachProduct,
  updateProduct,
  updateProductCategory,
} from "../../../services/product.services";
import { toast } from "react-toastify";
import SingleProductView from "./SingleProductView";
import {
  Product_Pages,
  getProductImageUrl,
} from "../../../services/helper.service";
import ShowHtml from "../users/ShowHtml";
import { Editor } from "@tinymce/tinymce-react";
import { getCategories } from "../../../services/CategoryService";

const ViewProducts = () => {
  const [products, setProducts] = useState(undefined);

  // below state for handling spinner or loader form bootstrap

  const [isLoading, setIsLoading] = useState(false);

  // this state used for setting single product when view button is clicked in view product
  // and also update button clicked
  // this state also helps while changing form data
  // by using on change ..
  const [singleView, setSingleView] = useState(undefined);

  //  this varible or state handle description data
  const editorRef = useRef();

  // Category START
  // this state for showing categories inside update modal
  // in select category section
  const [categories, setCategories] = useState(undefined);

  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories((categories) => {
          return {
            ...data,
          };
        });
      })
      .catch((error) => {
        console.log(" useEffect =", error);
      });
  }, []);
  //Category END

  useEffect(() => {
    getProducts(0, Product_Pages, "addedDate", "desc");
  }, []);

  // calling getAllProducts form product service file
  const getProducts = (
    pageNumber = 0,
    PageSize = Product_Pages,
    sortBy = "addedDate",
    sortDir = "asc"
  ) => {
    getAllProducts(pageNumber, PageSize, sortBy, sortDir)
      .then((data) => {
        setProducts((products) => {
          return data;
        });
      })
      .catch((error) => {
        console.log("getProducts = ", error);
        toast.error("Error in loading products");
      });
  };

  // this variables(states) taking care of image file and selected category
  const [imageUpdate, setImageUpdate] = useState({
    image: undefined,
    imagePreview: undefined,
  });

  const [categoryChangeId, setCategoryChangeId] = useState("");

  // below state used for searching product
  const [searchQuery, setSearchQuery] = useState("");

  // previous set state

  // Info Modal START
  // this state is related with modal
  // related with ModelView function
  // handle view button modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // END info Modal

  // update or edit modal START
  const [showEditModal, setShowEditModal] = useState(false);
  // openEditProductModal opening Modal
  const openEditProductModal = (event, product) => {
    setShowEditModal(() => true);
    setSingleView((singleView) => {
      return product;
    });
  };
  // closeEditProductModal closing Modall
  const closeEditProductModal = () => {
    setShowEditModal(() => false);
  };
  // END update or edit modal

  // View Modal invokes when View button is clicked
  const ModelProductView = () => {
    return (
      <>
        <Modal size={"xl"} animation={false} show={show} onHide={handleClose}>
          <Modal.Header>
            <Container className="mb-2 p-3 text-center">
              <Modal.Title>{singleView.title}</Modal.Title>
            </Container>
          </Modal.Header>
          <Modal.Body>
            <Card className="shadow border-0 text-center">
              <Card.Body>
                <Row className="mb-3">
                  {/* product image */}
                  <Col md={12}>
                    {/* if product image is not available 
                 using onError event lister 
                 when our Url is invalid
                 onError get invoked and sets default image
                 in our case /Assets/logo192.png
                */}
                    <img
                      src={getProductImageUrl(singleView.productId)}
                      onError={(event) => {
                        event.target.onerror = null;
                        event.target.src = "/Assets/logo192.png";
                      }}
                      className="img-fluid"
                    />
                  </Col>
                </Row>

                {/* Information Table */}

                <Table striped bordered responsive>
                  <thead>
                    <tr>
                      <th>Info</th>
                      <th>Value</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>Product ID</td>
                      <td className="fw-bold">{singleView.productId}</td>
                    </tr>

                    <tr>
                      <td>Quantity</td>
                      <td className="fw-bold">{singleView.quantity}</td>
                    </tr>

                    <tr>
                      <td>Price</td>
                      <td className="fw-bold">{singleView.price} ₹</td>
                    </tr>

                    <tr>
                      <td>Discounted Price</td>
                      <td className="fw-bold">
                        {singleView.discountedPrice} ₹
                      </td>
                    </tr>
                    <tr className={singleView.live ? "" : "table-danger"}>
                      <td>Live</td>
                      <td className="fw-bold">
                        {singleView.live ? "True" : "False"}
                      </td>
                    </tr>

                    <tr className={singleView.stock ? "" : "table-danger"}>
                      <td>Stock</td>
                      <td className="fw-bold">
                        {singleView.stock ? "In Stock" : "Not In Stock"}
                      </td>
                    </tr>

                    <tr>
                      <td>Category</td>
                      <td className="fw-bold">
                        {singleView?.category?.title
                          ? singleView?.category?.title
                          : "No Category"}
                      </td>
                    </tr>
                  </tbody>
                </Table>

                {/* Description */}

                <div className="img-fluid border-3 mt-3">
                  <ShowHtml htmlText={singleView?.description} />
                </div>
              </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  // below function is used to handle Updated form
  // information
  const handleUpdateFormSubmit = (event) => {
    event.preventDefault();

    // form validation
    //1) checking title

    if (singleView.title === undefined || singleView.title.trim() === "") {
      toast.error("title is empty!");
      return;
    }

    if (
      singleView.description === undefined ||
      singleView.description.trim() === ""
    ) {
      toast.error("description is empty!");
      return;
    }

    //price validation
    if (singleView.price === undefined) {
      toast.error("price is empty!");
      return;
    }

    // discounted price validation

    if (singleView.discountedPrice === undefined) {
      toast.error("discountedPrice is empty!");
      return;
    }

    // Product Quantity validation

    if (singleView.quantity === undefined) {
      toast.error("Product quantity is empty!");
      return;
    }

    // form submit and make an api call
    //setiing loder to true ..
    setIsLoading(() => true);
    updateProduct(singleView, singleView.productId)
      .then((data) => {
        toast.success("Product Details Updated!");
        // updating product image
        // making an api call to the server
        // if and only if imageUpate.image !== undefined
        // so here we avoid handle unnecessary call to server
        // and uploading an image
        if (imageUpdate.image !== undefined) {
          addProductImage(imageUpdate.image, data.productId)
            .then((imageResponseDataFromServer) => {
              setSingleView((singleView) => {
                return {
                  ...singleView,
                  productImageName: imageResponseDataFromServer.imageName,
                };
              });

              // console.log(imageResponseDataFromServer);
              toast.success("image Uploaded!");

              // setting imageUpdates props to undefined
              setImageUpdate((imageUpate) => {
                return {
                  image: undefined,
                  imagePreview: undefined,
                };
              });
            })
            .catch((error) => {
              console.error(error);
              toast.error("image Not Uploaded!");
            });
        }

        if (
          categoryChangeId !== singleView?.category?.categoryId &&
          categoryChangeId !== ""
        ) {
          updateProductCategory(categoryChangeId, singleView?.productId)
            .then((categoryResponseFromServer) => {
            

              const newArray = products?.content?.map((product) => {
                if (product.productId === data.productId) {
                  return categoryResponseFromServer;
                }
                return product;
              });

              setProducts((products) => {
                return {
                  ...products,
                  content: newArray,
                };
              });

              toast.success("category updated");
            })
            .catch((error) => {
              console.log(error);
              toast.error("unable to update category!");
            });
        }

        //updating table i.e requesting all products
        // from server with the help of getProducts function
        // getProducts(0, Product_Pages, "addedDate", "desc");

        //  or

        // below we not making an api call to server asking for product
        // we just change data object which we resecived from an an call on line 267
        // and we replace updated product with previous one with the help of an product id
        // this is more efficent than above logic in that we calling all products from the server
        // we also ask for products to render which are not updated
        // so ablove approch not efficent ( using getProduct )

        const newArray = products?.content?.map((product) => {
          if (product.productId === data.productId) {
            return data;
          }
          return product;
        });

        setProducts((products) => {
          return {
            ...products,
            content: newArray,
          };
        });

        closeEditProductModal();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(() => false);
      });
  };

  // this function handle product image file
  const handleFileChange = (event) => {
    if (
      event.target.files[0].type === "image/png" ||
      event.target.files[0].type === "image/jpeg"
    ) {
      const reader = new FileReader();
      reader.onload = (r) => {
        setImageUpdate((imageUpdate) => {
          return {
            imagePreview: r.target.result,
            image: event.target.files[0],
          };
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      toast.error("Invalid file!!");

      setImageUpdate((imageUpdate) => {
        return {
          imagePreview: undefined,
          image: undefined,
        };
      });
    }
  };

  // Edit modal invokes when Update button is Clicked
  const ModalProductEdit = () => {
    return (
      <>
        <Modal
          size={"xl"}
          show={showEditModal}
          animation={false}
          onHide={handleClose}
        >
          <Modal.Header>
            <Modal.Title>{singleView.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Card
              className="shadow border-0 p-5"
              style={{
                borderRadius: "100px",
              }}
            >
              <Card.Body>
                <h5 className="text-center">Update Product here</h5>
                <Form onSubmit={(event) => handleUpdateFormSubmit(event)}>
                  {/* Product Title */}
                  <FormGroup className="mt-3">
                    <Form.Label>Product Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Product Title"
                      value={singleView.title}
                      onChange={(event) => {
                        setSingleView((singleView) => {
                          return {
                            ...singleView,
                            title: event.target.value,
                          };
                        });
                      }}
                    />
                  </FormGroup>

                  {/* >Product Description */}
                  <FormGroup className="mt-3">
                    <Form.Label>Product Description</Form.Label>

                    <Editor
                      apiKey={
                        "5cws83tfeydksa9ws44cb9tixaeucgmib6ix32gji5gxb8of"
                      }
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      value={singleView.description}
                      init={{
                        height: 500,
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
                      onEditorChange={(event) => {
                        setSingleView((singleView) => {
                          return {
                            ...singleView,
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
                          value={singleView.price}
                          onChange={(event) => {
                            //admin canot set value of product price in negative
                            // or my means any mistake...
                            // code handle it self Amazing
                            if (Number(event.target.value) < 0) {
                              return;
                            }

                            setSingleView((singleView) => {
                              return {
                                ...singleView,
                                price: event.target.value,
                              };
                            });
                          }}
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
                          value={singleView.discountedPrice}
                          onChange={(event) => {
                            //admin can not set value of product Discounted price in negative
                            // or my means any mistake...
                            // code handle it self Amazing
                            if (
                              Number(event.target.value) > singleView.price ||
                              Number(event.target.value) < 0
                            ) {
                              return;
                            }

                            setSingleView((singleView) => {
                              return {
                                ...singleView,
                                discountedPrice: event.target.value,
                              };
                            });
                          }}
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
                      value={singleView.quantity}
                      onChange={(event) => {
                        if (Number(event.target.value) < 0) {
                          return;
                        }

                        setSingleView((singleView) => {
                          return {
                            ...singleView,
                            quantity: event.target.value,
                          };
                        });
                      }}
                    />
                  </FormGroup>

                  {/* Checked Entities */}
                  <Row className="mt-3 px-1">
                    <Col>
                      <Form.Check
                        type="switch"
                        label={"Live"}
                        checked={singleView.live}
                        onChange={(event) => {
                          setSingleView((singleView) => {
                            return {
                              ...singleView,
                              live: !singleView.live,
                            };
                          });
                        }}
                      />
                    </Col>

                    <Col>
                      <Form.Check
                        type="switch"
                        label={"Stock"}
                        checked={singleView.stock}
                        onChange={(event) => {
                          setSingleView((singleView) => {
                            return {
                              ...singleView,
                              stock: !singleView.stock,
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
                        src={
                          imageUpdate?.imagePreview
                            ? imageUpdate?.imagePreview
                            : getProductImageUrl(singleView.productId)
                        }
                        onError={(event) => {
                          event.target.onerror = null;
                          event.target.src = "/Assets/logo192.png";
                        }}
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
                          setImageUpdate((imageUpdate) => {
                            return {
                              image: undefined,
                              imagePreview: undefined,
                            };
                          });
                        }}
                      >
                        Clear
                      </Button>
                    </InputGroup>
                  </FormGroup>

                  {/* select category */}

                  <FormGroup className="mt-3">
                    <Form.Label>Select Category</Form.Label>

                    <Form.Select
                      defaultValue={
                        categories?.content.find((cat) => {
                          return (
                            cat?.categoryId === singleView?.category?.categoryId
                          );
                        })?.categoryId
                      }
                      onChange={(event) => {
                        setCategoryChangeId((categoryChangeId) => {
                          return event.target.value;
                        });
                      }}
                    >
                      <option value={undefined}>None</option>
                      {categories?.content.map((obj) => {
                        return (
                          <option key={obj.categoryId} value={obj.categoryId}>
                            {obj.title}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </FormGroup>

                  <Container className="text-center mt-3">
                    <Button
                      variant="success"
                      size="lg"
                      type="submit"
                      className="text-center"
                      disabled={isLoading}
                    >
                      <Spinner
                        hidden={!isLoading}
                        animation="border"
                        variant="primary"
                        size="lg"
                        className="me-2"
                      />
                      <span hidden={!isLoading}>Updating...</span>
                      <span hidden={isLoading}>UPDATE</span>
                    </Button>
                  </Container>
                </Form>
              </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeEditProductModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  // searchProduct invokes when search button get clicked
  const searchProduct = () => {
    // api call
    serachProduct(searchQuery)
      .then((serverSearchData) => {
        if (serverSearchData?.content?.length <= 0) {
          toast.info("No result found!");
          return;
        }

        setProducts((products) => {
          return {
            ...serverSearchData,
          };
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setSearchQuery((searchQuery) => {
          return "";
        });
      });
  };

  // products view for conditional rendering
  const productView = () => {
    return (
      <Card
        className="shadow border-0 text-center p-3"
        style={{
          borderEndEndRadius: "50px",
          borderEndStartRadius: "50px",
          borderStartEndRadius: "25px",
          borderStartStartRadius: "25px",
        }}
      >
        <Card.Body>
          <h5 className="mb-3">View Products</h5>

          <FormGroup className="mb-4">
            <Form.Label className="text-muted">Search Product</Form.Label>

            <InputGroup>
              <Form.Control
                type="text"
                placeholder="serach..."
                onChange={(event) => {
                  setSearchQuery((searchQuery) => {
                    return event.target.value;
                  });
                }}
                value={searchQuery}
              />
              <Button
                variant="outline-secondary"
                onClick={(event) => {
                  searchProduct(event);
                }}
                disabled={searchQuery.trim() === "" ? true : false}
              >
                Search
              </Button>
            </InputGroup>
          </FormGroup>

          <Table
            striped
            hover
            bordered
            size="sm"
            className="text-center"
            responsive
          >
            <thead>
              <tr>
                <th className="px-2 small">SN</th>
                <th className="px-2 small">Title</th>
                <th className="px-2 small">Quantity</th>
                <th className="px-2 small">Price</th>
                <th className="px-2 small">Discounte</th>
                <th className="px-2 small">Live</th>
                <th className="px-2 small">Stock</th>
                <th className="px-2 small">Category</th>
                <th className="px-2 small">Date</th>
                <th className="px-2 small ">Action</th>
              </tr>
            </thead>

            <tbody>
              {products?.content?.map((singleProduct, index) => {
                return (
                  <SingleProductView
                    key={singleProduct.productId}
                    SN={index + 1}
                    singleProduct={singleProduct}
                    products={products}
                    setProducts={setProducts}
                    handleShow={handleShow}
                    setSingleView={setSingleView}
                    openEditProductModal={openEditProductModal}
                  />
                );
              })}
            </tbody>
          </Table>

          <Container className="d-flex justify-content-end">
            <Pagination>
              {/* directly  jumpes to first page*/}
              <Pagination.First
                onClick={(event) => {
                  getProducts(0, 10, "addedDate", "desc");
                }}
              />

              <Pagination.Prev
                onClick={(event) => {
                  if (products.pageNumber - 1 < 0) {
                    return;
                  }
                  getProducts(
                    Number(products.pageNumber - 1),
                    Product_Pages,
                    "addedDate",
                    "desc"
                  );
                }}
              />

              {[...Array(products.totalPages)]
                .map((obj, index) => {
                  return index;
                })
                .map((item) => {
                  return products.pageNumber === item ? (
                    <Pagination.Item key={item} active>
                      {item + 1}
                    </Pagination.Item>
                  ) : (
                    <Pagination.Item
                      key={item}
                      onClick={(event) => {
                        getProducts(item, Product_Pages, "addedDate", "desc");
                      }}
                    >
                      {item + 1}
                    </Pagination.Item>
                  );
                })}

              <Pagination.Next
                onClick={(event) => {
                  if (products.lastPage) {
                    return;
                  }
                  getProducts(
                    Number(products.pageNumber + 1),
                    Product_Pages,
                    "addedDate",
                    "desc"
                  );
                }}
              />

              {/* directly jumpes to last pages */}
              <Pagination.Last
                onClick={(event) => {
                  getProducts(products.totalPages - 1, 10, "addedDate", "desc");
                }}
              />
            </Pagination>
          </Container>
        </Card.Body>
      </Card>
    );
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col>{products ? productView() : ""}</Col>
          {singleView && show && ModelProductView()}
          {singleView && showEditModal && ModalProductEdit()}
        </Row>
      </Container>
    </>
  );
};

export default ViewProducts;
