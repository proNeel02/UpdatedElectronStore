import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { getCategories } from "../../services/CategoryService";
import { useState } from "react";
import { useEffect } from "react";
import { FcHome } from "react-icons/fc";
import { Link, NavLink } from "react-router-dom";
import { MdCategory } from "react-icons/md";
import {
  getAllLiveProducts,
  getAllProducts,
} from "../../services/product.services";
import SingleProductCard from "./users/SingleProductCard";
import InfiniteScroll from "react-infinite-scroll-component";
import CategoryView from "./users/CategoryView";

const Store = () => {
  const [products, setProducts] = useState(undefined);

  const [currPage, setCurrpage] = useState(0);

  useEffect(() => {
    loadProducts(currPage, 9, "addedDate", "decs");
  }, []);

  // loading curr page changes
  useEffect(() => {
    if (currPage > 0) {
      loadProducts(currPage, 9, "addedDate", "decs");
    }
  }, [currPage]);

  // loading next page
  const loadNextPage = () => {
    setCurrpage((currPage) => currPage + 1);
  };

  const loadProducts = (pageNumber, pageSize, sortBy, sortDir) => {
    getAllLiveProducts(pageNumber, pageSize, sortBy, sortDir)
      .then((serverProductData) => {
        // console.log(serverProductData);

        if (currPage === 0) {
          setProducts((products) => {
            return {
              ...serverProductData,
            };
          });
        } else {
          let newArray = serverProductData?.content?.filter((obj1) => {
            return !products?.content?.find((obj2) => {
              return obj1.productId === obj2.productId;
            });
          });

          setProducts((products) => {
            return {
              ...serverProductData,
              content: [...products?.content, ...newArray],
            };
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
                    product.live && (
                      <Col key={product.productId} md={4}>
                        <SingleProductCard product={product} />
                      </Col>
                    )
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
    <Container fluid className="px-5 pt-5">
      <Row>
        <Col md={2}>{<CategoryView />}</Col>
        <Col md={10}>{productsView()}</Col>
      </Row>
    </Container>
  );
};
export default Store;
