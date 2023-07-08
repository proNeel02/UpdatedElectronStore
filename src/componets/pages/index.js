import React, { useEffect, useState } from "react";

import Base from "./users/Base";
import { ContactUsForm, TrendingProducts } from "./HomePageComponents";

import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import { getAllLiveProducts } from "../../services/product.services";
import ReactPlayer from "react-player";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [products, setProducts] = useState(null);
  const [show, setShow] = useState(false);
  const [viewSingleProduct, setSingleProductview] = useState(null);
  const navigate = useNavigate();
  const Myproducts = [
    {
      addedDate: 1688537820385,
      img: "https://m.media-amazon.com/images/I/61HHS0HrjpL._SL1500_.jpg",
      link1: "https://www.youtube.com/watch?v=FT3ODSg1GFE&t=3s",
      link2: "https://m.media-amazon.com/images/I/51tfF8TGyAL._SL1500_.jpg",
      link3: "https://m.media-amazon.com/images/I/71KdlxeM59L._SL1500_.jpg",
      link4: "https://m.media-amazon.com/images/I/711JE+dD1KL._SL1500_.jpg",
      link5: "https://m.media-amazon.com/images/I/61Zs7cUrPAL._SL1500_.jpg",
      category: {
        categoryId: "b5a502a2-632a-4643-9bc9-782603d67878",
        title: "Smart Phones",
        description: "Smart Phone Description",
        coverImage:
          "https://m.media-amazon.com/images/I/814ePfNubRL._SL1500_.jpg",
      },
      discountedPrice: 70999,
      live: true,
      price: 80999,
      productId: "464fe42d-6a37-43c7-9e57-d4c97a3964c4",
      productImageName: "5544c956-eb75-454c-9fcd-d2e03d42f413.jpg",
      quantity: 100,
      stock: true,
      title: "Apple iPhone 14 (128 GB) - Midnight",
    },

    {
      addedDate: 1688547391599,
      img: "https://m.media-amazon.com/images/I/41yXkqOpfML._SX300_SY300_QL70_FMwebp_.jpg",
      link1: "https://www.youtube.com/watch?v=Yt_vMFXuFXA",
      link2: "https://m.media-amazon.com/images/I/71qaVIPLuNL._SL1500_.jpg",
      link3: "https://m.media-amazon.com/images/I/81FilDMqLhL._SL1500_.jpg",
      link4: "https://m.media-amazon.com/images/I/81GezhVdE7L._SL1500_.jpg",
      link5: "https://m.media-amazon.com/images/I/716-jMpnwoL._SL1500_.jpg",
      category: {
        categoryId: "1099cf88-4f65-40b8-855d-1bdaad06608d",
        title: "HeadSet",
        description: "Head Set Description",
        coverImage:
          "https://m.media-amazon.com/images/I/51ODvrKqxTL._SL1200_.jpg",
      },
      discountedPrice: 49999,
      live: true,
      price: 51000,
      productId: "a7432f5c-d3fa-45df-9e4c-c6782c1f19db",
      productImageName: "a059f105-5c97-4345-90b5-aff1f6040124.jpg",
      quantity: 1000,
      stock: true,
      title: "Honor MagicBook X14",
    },
    {
      addedDate: 1688547753532,
      img: "https://m.media-amazon.com/images/I/610UgT6Pf4L._SL1500_.jpg",
      link1: "   https://www.youtube.com/watch?v=AueMDCyXDso",
      link2: "https://m.media-amazon.com/images/I/61p2ypXtuEL._SL1500_.jpg",
      link3: "https://m.media-amazon.com/images/I/61-CecEofPL._SL1500_.jpg",
      link4: "https://m.media-amazon.com/images/I/71l5F1nd1fL._SL1500_.jpg",
      link5: "https://m.media-amazon.com/images/I/71wxLtKIAaL._SL1500_.jpg",
      category: {
        categoryId: "1099cf88-4f65-40b8-855d-1bdaad06608d",
        title: "HeadSet",
        description: "Head Set Description",
        coverImage:
          "https://m.media-amazon.com/images/I/51ODvrKqxTL._SL1200_.jpg",
      },
      discountedPrice: 2999,
      live: true,
      price: 4999,
      productId: "ed4d1148-7de9-4cce-855f-a8c35b089f3f",
      productImageName: "cbdbdbaa-f781-4689-aa1e-0be00343535d.jpg",
      quantity: 100,
      stock: true,
      title: " JBL Quantum 100, Wired Over Ear Gaming Headphones",
    },
    {
      addedDate: 1688548526715,
      img: "https://m.media-amazon.com/images/I/71dNFrLc22L._SL1500_.jpg",
      link1: " https://www.youtube.com/watch?v=3jxfxAwU7CE",
      link2: "https://m.media-amazon.com/images/I/81KqErUpBOL._SL1500_.jpg",
      link3: "https://m.media-amazon.com/images/I/812-h-uCrTL._SL1500_.jpg",
      link4: "https://m.media-amazon.com/images/I/91DqpvZC5rL._SL1500_.jpg",
      link5: "https://m.media-amazon.com/images/I/915LumjYaGL._SL1500_.jpg",
      category: {
        categoryId: "a92998a8-b767-4b60-bfa5-f240544e7f8c",
        title: "Buds",
        description: "Buds Description",
        coverImage:
          "https://m.media-amazon.com/images/I/61k6xPkgMdL._AC_SL1500_.jpg",
      },
      discountedPrice: 1299,
      live: true,
      price: 2999,
      productId: "5153fbcc-8dab-4255-ab24-b4b861701f9d",
      productImageName: "aa13d8a4-dee4-4f9d-903a-6b3be2a18ba2.jpg",
      quantity: 100,
      stock: true,
      title: "Boult Audio Z25 True Wireless in Ear Earbuds",
    },
    // {
    //   addedDate: 1688611903336,
    //   img: "https://m.media-amazon.com/images/I/61IYYoZ66VL._SL1500_.jpg",
    //   link1: "https://www.youtube.com/watch?v=tw70kbvG694",
    //   link2: "",
    //   link3: "",
    //   link4: "",
    //   link5: "",
    //   category: {
    //     categoryId: "223e286c-1597-43f7-8c02-5974e8b91953",
    //     title: "Gamming",
    //     description: "Gamming Description",
    //     coverImage:
    //       "https://m.media-amazon.com/images/I/81SJ1h9cAPL._AC_UL400_.jpg",
    //   },
    //   discountedPrice: 39900,
    //   live: true,
    //   price: 49999,
    //   productId: "b9603d5a-d741-4d97-8bab-892c70e4d7ee",
    //   productImageName: "1f43092e-5241-4a49-93ee-bd89d5243d1a.jpg",
    //   quantity: 100,
    //   stock: true,
    //   title: "Logitech G920 Driving Force Racing",
    // },
  ];

  const [video, setVideo] = useState(true);
  const [link, setLink] = useState("");
  // get all products
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setProducts((prevProduts) => {
      return Myproducts;
    });

    // getAllLiveProducts(0, 1000, "addedDate", "asc").then((data) => {
    //   console.log(data);
    // });
  };

  const setViewModalFalse = () => {
    setLink((prevLink) => "");
    setShow(() => false);
  };
  const setViewModalTrue = (product) => {
    setVideo(() => true);
    setShow(() => true);
    setSingleProductview((prevProdut) => product);
  };

  const handleLinkSet = (linkParam) => {
    setLink((prevLink) => linkParam);
    setVideo(() => false);
  };

  const handleVideoLinkSet = (linkParam) => {
    setVideo(() => true);
    setLink((prevLink) => "");
  };

  // ViewModalWithVideo
  function viewModalVideo() {
    return (
      <Modal
        show={show}
        onHide={setViewModalFalse}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="text-center"
        // fullscreen
      >
        <Modal.Header closeButton>
          <Modal.Title>Product OverView</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="border-0">
            <Card.Body>
              <Container>
                <Row>
                  <Col md={11}>
                    <Container>
                      {!video && (
                        <img
                          src={link}
                          alt={""}
                          style={{
                            width: "370px",
                            height: "360px",
                            objectFit: "contain",
                          }}
                        />
                      )}

                      {video && (
                        <ReactPlayer
                          pip={true}
                          playing={true}
                          url={viewSingleProduct?.link1}
                          width={"100%"}
                        />
                      )}
                    </Container>
                  </Col>
                  <Col md={1}>
                    <Row>
                      <Col className="m-2" md={4}>
                        <img
                          src={viewSingleProduct?.link2}
                          alt=""
                          style={{
                            width: "40px",
                            height: "40px",
                            objectFit: "contain",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            handleLinkSet(viewSingleProduct?.link2)
                          }
                        />
                      </Col>
                      <Col className="m-2" md={4}>
                        <img
                          src={viewSingleProduct?.link3}
                          alt=""
                          style={{
                            width: "40px",
                            height: "40px",
                            objectFit: "contain",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            handleLinkSet(viewSingleProduct?.link3)
                          }
                        />
                      </Col>

                      {/*setting video  */}
                      <Col className="m-2" md={4}>
                        <img
                          src={
                            "https://cdn.pixabay.com/photo/2021/10/09/12/45/play-button-6694069_640.png"
                          }
                          alt=""
                          style={{
                            width: "40px",
                            height: "40px",
                            objectFit: "contain",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            handleVideoLinkSet(viewSingleProduct?.link1)
                          }
                        />
                      </Col>
                      <Col className="m-2" md={4}>
                        <img
                          src={viewSingleProduct?.link4}
                          alt=""
                          style={{
                            width: "40px",
                            height: "40px",
                            objectFit: "contain",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            handleLinkSet(viewSingleProduct?.link4)
                          }
                        />
                      </Col>
                      <Col className="m-2">
                        <img
                          src={viewSingleProduct?.link5}
                          alt=""
                          style={{
                            width: "40px",
                            height: "40px",
                            objectFit: "contain",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            handleLinkSet(viewSingleProduct?.link5)
                          }
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row className="mt-5">
                  <Col>
                    <h6>{viewSingleProduct?.title}</h6>
                  </Col>
                </Row>

                <Button
                  className="mt-3"
                  variant="dark"
                  //     ,
                  // "Please Explore Other Features",
                  // "success"
                  onClick={() => {
                    Swal.fire({
                      title: "Your Store is Under Construction",
                      showDenyButton: true,
                      confirmButtonText: "Go to Shop",
                      denyButtonText: `Stay on Home`,
                    }).then((result) => {
                      if (result.isConfirmed) {
                        navigate("/store");
                      }
                    });
                  }}
                >
                  <span>Explore More</span>
                </Button>
              </Container>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <>
      <Base
        title={"Shop What You Need"}
        description={
          "Welcome To Trending Store A retail establishment selling consumer electronic products"
        }
        buttonEnabled={true}
        buttonText={"Start Shopping"}
        buttonType={"primary"}
        buttonLink="/store"
      >
        <Container className="mt-4">
          <Row>
            <Col>
              <Card className="border-0 shadow">
                <h3 className="text-center mt-3">Trending Products</h3>
                <Card.Body>
                  {products?.map((product) => {
                    return (
                      product.stock && (
                        <TrendingProducts
                          key={product?.addedDate}
                          product={product}
                          setViewModalTrue={setViewModalTrue}
                        />
                      )
                    );
                  })}
                  {show && viewModalVideo()}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <Container className="m-5">
          <Row>
            <Col
              md={{
                span: 6,
                offset: 3,
              }}
            >
              <Card className="p-1">
                <h3 className="text-center"> Contact Us</h3>
                <Card.Body>
                  <ContactUsForm />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Base>
    </>
  );
};

export default Index;
