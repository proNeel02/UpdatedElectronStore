import { useEffect, useState } from "react";
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
import { getAllProducts } from "../../../services/product.services";
import { toast } from "react-toastify";
import SingleProductView from "./SingleProductView";
import {
  Product_Pages,
  getProductImageUrl,
} from "../../../services/helper.service";
import ShowHtml from "../users/ShowHtml";
import { Editor } from "@tinymce/tinymce-react";

const ViewProducts = () => {
  const [products, setProducts] = useState(undefined);

  // this state used for setting single product when view button is clicked in view product
  const [singleView, setSingleView] = useState(undefined);

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
        console.log(data);
        setProducts((products) => {
          return data;
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading products");
      });
  };

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
                <Form>
                  {/* Product Title */}
                  <FormGroup className="mt-3">
                    <Form.Label>Product Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Product Title"
                      value={singleView.title}
                    />
                  </FormGroup>

                  {/* >Product Description */}
                  <FormGroup className="mt-3">
                    <Form.Label>Product Description</Form.Label>

                    <Editor
                      apiKey={
                        "5cws83tfeydksa9ws44cb9tixaeucgmib6ix32gji5gxb8of"
                      }
                      // onInit={(evt, editor) => ()}
                      initialValue={singleView.description}
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
                    />
                  </FormGroup>

                  {/* Checked Entities */}
                  <Row className="mt-3 px-1">
                    <Col>
                      <Form.Check
                        type="switch"
                        label={"Live"}
                        checked={singleView.live}
                      />
                    </Col>

                    <Col>
                      <Form.Check
                        type="switch"
                        label={"Stock"}
                        checked={singleView.stock}
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
                        src={getProductImageUrl(singleView.productId)}
                        className="img-fluid mb-3"
                        style={{
                          maxHeight: "300px",
                        }}
                      />
                    </Container>

                    <Form.Label> Select Product Image</Form.Label>

                    <InputGroup>
                      <Form.Control type={"file"} />

                      <Button variant="outline-secondary">Clear</Button>
                    </InputGroup>
                  </FormGroup>

                  <FormGroup className="mt-3">
                    <Form.Label>Select Category</Form.Label>

                    <Form.Select>
                      <option value={"none"}>None</option>
                    </Form.Select>
                  </FormGroup>

                  <Container className="text-center mt-3">
                    <Button
                      variant="success"
                      size="lg"
                      type="submit"
                      className="text-center"
                      disabled={""}
                    >
                      <Spinner
                        hidden={true}
                        animation="border"
                        variant="primary"
                        size="lg"
                      />
                      <span hidden={true}>Updating...</span>
                      <span hidden={""}>UPDATE</span>
                    </Button>

                    <Button variant="danger" size="lg" className="ms-2">
                      CLEAR
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
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
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

          <FormGroup>
            <Form.Label className="text-muted">Search Product</Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              placeholder="serach..."
            />
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
              {products.content?.map((singleProduct, index) => {
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
          {showEditModal && ModalProductEdit()}
        </Row>
      </Container>
    </>
  );
};

export default ViewProducts;
