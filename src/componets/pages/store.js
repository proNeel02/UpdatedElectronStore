import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { getCategories } from "../../services/CategoryService";
import { useState } from "react";
import { useEffect } from "react";
import { FcHome } from "react-icons/fc";
import { NavLink } from "react-router-dom";
import { MdCategory } from "react-icons/md";
import { getAllProducts } from "../../services/product.services";
import SingleProductCard from "./users/SingleProductCard";

const Store = () => {
  const [categories, setCategories] = useState(undefined);
  const [products, setProducts] = useState(undefined);

  useEffect(() => {
    loadCategories();
    loadProducts(0, 9, "addedDate", "decs");
  }, []);

  const loadCategories = () => {
    getCategories()
      .then((categoryData) => {
        console.log(categoryData);
        setCategories((categories) => {
          return {
            ...categoryData,
          };
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadProducts = (pageNumber, pageSize, sortBy, sortDir) => {
    getAllProducts(pageNumber, pageSize, sortBy, sortDir)
      .then((serverProductData) => {
        console.log(serverProductData);

        setProducts((products) => {
          return {
            ...serverProductData,
          };
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const categoryView = () => {
    return (
      categories && (
        <>
          <ListGroup variant="flush" className="sticky-top">
            {categories?.content?.map((cat) => {
              return (
                <ListGroup.Item key={cat.categoryId}>
                  <Row className="d-flex align-items-center">
                    <Col md={3}>
                      {" "}
                      <img
                        src={cat.coverImage}
                        className="img-fluid rounded-circle"
                        style={{
                          height: "40px",
                          width: "40px",
                          objectFit: "cover",
                        }}
                        alt=""
                        onError={(event) => {
                          event.currentTarget.setAttribute(
                            "src",
                            "/Assets/logo192.png"
                          );
                        }}
                      />
                    </Col>
                    <Col md={9}>
                      <span className="ms-2">{cat.title}</span>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </>
      )
    );
  };

  // product view
  const productsView = () => {
    return (
      products && (
        <>
          <Row>
            {products.content.map((product) => {
              return (
                <Col key={product.productId} md={4}>
                  <SingleProductCard product={product} />
                </Col>
              );
            })}
          </Row>
        </>
      )
    );
  };

  return (
    <Container fluid className="px-5 pt-5">
      <Row>
        <Col md={3}>{categoryView()}</Col>
        <Col md={9}>{productsView()}</Col>
      </Row>
    </Container>
  );
};

export default Store;
