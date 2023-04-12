import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleCategoryObjectUsingCategoryId } from "../../../services/CategoryService";
import { Card, Col, Container, Row } from "react-bootstrap";

const CategoryStorePage = () => {
  const { categoryId } = useParams();
  const [currPage, setCurrpage] = useState(0);
  const [products, setProducts] = useState(undefined);

  useEffect(() => {
    loadCategoryUsingCategotyId(currPage, 100, "addedDate", "desc");
  }, []);

  const loadCategoryUsingCategotyId = (
    pageNumber = 0,
    PageSize = 10,
    sortBy = "addedDate",
    sortDir = "asc"
  ) => {
    getSingleCategoryObjectUsingCategoryId(
      categoryId,
      currPage,
      100,
      sortBy,
      sortDir
    )
      .then((catServer) => {
        console.log(catServer);

        setProducts((category) => {
          return {
            ...catServer,
          };
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const SingleCategoryDetails = () => {
    return (
      <Container fluid className="text-center">
        <Card className="mt-4 border-0">
          <Card.Body>
            <Row className="d-flex align-items-center">
              <Col>
                <h1>Hello</h1>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    );
  };

  return setProducts && SingleCategoryDetails();
};

export default CategoryStorePage;
