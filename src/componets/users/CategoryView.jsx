import React, { useEffect, useState } from "react";
import { getCategories } from "../../services/CategoryService";
import { Col, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
const CategoryView = () => {
  const [categories, setCategories] = useState(undefined);

  useEffect(() => {
    loadAllCategories();
  }, []);

  const loadAllCategories = () => {
    getCategories()
      .then((serverData) => {
        setCategories(() => {
          return {
            ...serverData,
          };
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showAllCategories = () => {
    return (
      <>
        <ListGroup variant="flush" className="sticky-top">
          {categories?.content?.map((cat) => {
            return (
              <ListGroup.Item
                key={cat.categoryId}
                as={Link}
                to={`/store/${cat.categoryId}/${cat.title}`}
              >
                <Row className="d-flex align-items-center">
                  <Col md={4}>
                    {" "}
                    <img
                      src={cat.coverImage}
                      className="img-fluid rounded-circle"
                      style={{
                        height: "50px",
                        width: "50px",
                        objectFit: "contain",
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
                  <Col md={8}>
                    <span className="ms-2">{cat.title}</span>
                  </Col>
                </Row>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </>
    );
  };

  return categories && showAllCategories();
};

export default CategoryView;
