import React, { useEffect, useState } from "react";

import Base from "./users/Base";
import { TrendingProducts } from "./HomePageComponents";

import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import { getAllLiveProducts } from "../../services/product.services";
import ReactPlayer from "react-player";

const Index = () => {
  const [products, setProducts] = useState(null);
  const [show, setShow] = useState(false);
  const [viewSingleProduct, setSingleProductview] = useState(null);

  const Myproducts = [
    {
      addedDate: 1688537820385,
      img:"https://m.media-amazon.com/images/I/61HHS0HrjpL._SL1500_.jpg",
      link: "https://www.youtube.com/watch?v=FT3ODSg1GFE&t=3s",
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
      addedDate: 1688537820385,
      img:"https://m.media-amazon.com/images/I/71lMEeDJhuL._SL1500_.jpg",
      link: "https://www.youtube.com/watch?v=Yt_vMFXuFXA",
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
      productImageName: "8f0a0cbd-1bec-4676-bc81-a4ae2157acf7.jpeg",
      quantity: 100,
      stock: false,
      title: "Apple iPhone 14 (128 GB) - Yellow",
    },
    {
      addedDate: 1688547391599,
      link: "https://www.youtube.com/watch?v=Yt_vMFXuFXA",
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
      link: "   https://www.youtube.com/watch?v=AueMDCyXDso",
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
      link: " https://www.youtube.com/watch?v=3jxfxAwU7CE",
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
    {
      addedDate: 1688611903336,
      link:"https://www.youtube.com/watch?v=tw70kbvG694",
      category: {
        categoryId: "223e286c-1597-43f7-8c02-5974e8b91953",
        title: "Gamming",
        description: "Gamming Description",
        coverImage:
          "https://m.media-amazon.com/images/I/81SJ1h9cAPL._AC_UL400_.jpg",
      },
      discountedPrice: 39900,
      live: true,
      price: 49999,
      productId: "b9603d5a-d741-4d97-8bab-892c70e4d7ee",
      productImageName: "1f43092e-5241-4a49-93ee-bd89d5243d1a.jpg",
      quantity: 100,
      stock: true,
      title: "Logitech G920 Driving Force Racing",
    },
  ];

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
    setShow(() => false);
  };
  const setViewModalTrue = (product) => {
    setShow(() => true);
    setSingleProductview((prevProdut) => product);

    console.log(product);
  };

  // ViewModalWithVideo
  function viewModalVideo(props) {
    return (
      <Modal
        show={show}
        onHide={setViewModalFalse}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="text-center"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Product OverView
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="border-0">
            <Card.Body>
              <Container>
                <Row>
                  <Col md={12}>
                    <ReactPlayer
                      pip={true}
                      playing={true}
                      url={viewSingleProduct?.link}
                      width={"100%"}
                    />
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col>
                    <h4>{viewSingleProduct?.title}</h4>
                  </Col>
                </Row>

                <Button className="mt-3" variant="dark">
                  Explore More
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
          "Welcome To Trending Store A retail establishment used for the selling consumer electronic products such as televisions, telephones, and personal computers"
        }
        buttonEnabled={true}
        buttonText={"Start Shopping"}
        buttonType={"primary"}
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
      </Base>
    </>
  );
};

export default Index;
