import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleCategoryObjectUsingCategoryId } from "../../services/CategoryService";
import { Col, Container, Row } from "react-bootstrap";
import { STORE_PAGE_PRODUCT_SIZE } from "../../services/helper.service";
import InfiniteScroll from "react-infinite-scroll-component";
import SingleProductCard from "./SingleProductCard";
import CategoryView from "./CategoryView";

const CategoryStorePage = () => {
  const { categoryId } = useParams();

  const [currPage, setCurrpage] = useState(0);
  const [products, setProducts] = useState(undefined);


  useEffect(() => {
    loadproductsOfCategories(
      currPage,
      STORE_PAGE_PRODUCT_SIZE,
      "addedDate",
      "desc"
    );
  }, [categoryId]);

  // loading curr page changes
  useEffect(() => {
    if (currPage > 0) {
      loadproductsOfCategories(
        currPage,
        STORE_PAGE_PRODUCT_SIZE,
        "addedDate",
        "decs"
      );
    }
  }, [currPage]);

  const loadproductsOfCategories = (
    currPage,
    STORE_PAGE_PRODUCT_SIZE,
    sortBy,
    sortDir
  ) => {
    getSingleCategoryObjectUsingCategoryId(
      categoryId,
      currPage,
      STORE_PAGE_PRODUCT_SIZE,
      sortBy,
      sortDir
    )
      .then((serverData) => {

        if (currPage === 0) {
          setProducts((products) => {
            return {
              ...serverData,
            };
          });
        } else {
          let newArray = serverData?.content?.filter((obj1) => {
            return !products?.content?.find((obj2) => {
              return obj1.productId === obj2.productId;
            });
          });

          setProducts((products) => {
            return {
              ...serverData,
              content: [...products?.content, ...newArray],
            };
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // loading next page
  const loadNextPage = () => {
    setCurrpage((currPage) => currPage + 1);
  };

  // product view
  const productsView = () => {
    return (
      products && (
        <>
          <InfiniteScroll
            dataLength={products?.content?.length}
            next={loadNextPage}
            hasMore={!products.lastPage}
            loader={<h3>Loading More Products...</h3>}
            endMessage={<p>All Products loaded</p>}
            className="text-center"
          >
            <Container>
              <Row>
                {products.content.map((product) => {
                  return (
                    <Col key={product.productId} md={4}>
                      <SingleProductCard product={product} />
                    </Col>
                  );
                })}
              </Row>
            </Container>
          </InfiniteScroll>
        </>
      )
    );
  };

  return (
    <>
      <Container className="px-5 pt-5" fluid>
        <Row>
          <Col md={2}>
            <CategoryView />
          </Col>
          <Col md={10}>
            {products?.content?.length > 0 ? (
              productsView()
            ) : (
              <h3 className="text-center mt-5">No Products In This Category</h3>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CategoryStorePage;
