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
} from "react-bootstrap";
import { getAllProducts } from "../../../services/product.services";
import { toast } from "react-toastify";
import SingleProductView from "./SingleProductView";
import {
  Product_Pages,
  getProductImageUrl,
} from "../../../services/helper.service";

const ViewProducts = () => {
  const [products, setProducts] = useState(undefined);

  // this state is related with modal
  // related with ModelView function
  // handle view button modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // this state used for setting single product when view button is clicked in view product
  const [singleView, setSingleView] = useState(undefined);

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
            <Card className="text-center shadow border-0">
              <Card.Body>
                <Row className="text-center mb-3">
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
                      <td>{singleView.productId}</td>
                    </tr>

                    <tr>
                      <td>Quantity</td>
                      <td>{singleView.quantity}</td>
                    </tr>

                    <tr>
                      <td>Price</td>
                      <td>{singleView.price}</td>
                    </tr>

                    <tr>
                      <td>Discounted Price</td>
                      <td>{singleView.discountedPrice}</td>
                    </tr>

                    <tr>
                      <td>Live</td>
                      <td>{singleView.live ? "True" : "False"}</td>
                    </tr>

                    <tr>
                      <td>Stock</td>
                      <td>{singleView.stock ? "In Stock" : "Not In Stock"}</td>
                    </tr>

                    <tr>
                      <td>Category</td>
                      <td>
                        {singleView?.category?.title
                          ? singleView?.category?.title
                          : "No Category"}
                      </td>
                    </tr>
                  </tbody>
                </Table>

                {/* Description */}

                <div
                  dangerouslySetInnerHTML={{ __html: singleView.description }}
                  className="img-fluid border-3"
                ></div>
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
        </Row>
      </Container>
    </>
  );
};

export default ViewProducts;
