import { Col, Container,Row } from "react-bootstrap";
// import { getCategories } from "../../services/CategoryService";
import { useState } from "react";
import { useEffect } from "react";
// import { FcHome } from "react-icons/fc";
// import { Link, NavLink } from "react-router-dom";
// import { MdCategory } from "react-icons/md";
import {
  getAllLiveProducts,
  // getAllProducts,
} from "../services/product.services";
import SingleProductCard from "./users/SingleProductCard";
// import InfiniteScroll from "react-infinite-scroll-component";
import CategoryView from "./users/CategoryView";
// import Swal from "sweetalert2";

const Store = () => {
  const [products, setProducts] = useState(undefined);

  // const [currPage, setCurrpage] = useState(0);

  useEffect(() => {
    loadProducts(0, 100, "addedDate", "asc");
  }, []);

  // // loading curr page changes
  useEffect(() => {
    // if (currPage > 0) {
      loadProducts(0, 100, "addedDate", "asc");
    // }
  }, []);

  // // loading next page
  // const loadNextPage = () => {
  //   setCurrpage((currPage) => currPage + 1);
  // };

  const loadProducts = (pageNumber, pageSize, sortBy, sortDir) => {
    getAllLiveProducts(pageNumber, pageSize, sortBy, sortDir)
      .then((serverProductData) => {
        // console.log(serverProductData);

        // if (currPage === 0) {
        setProducts((products) => {
          return {
            ...serverProductData,
          };
        });
        // }
        //  else {
        //   let newArray = serverProductData?.content?.filter((obj1) => {
        //     return !products?.content?.find((obj2) => {
        //       return obj1.productId === obj2.productId;
        //     });
        //   });

        //   setProducts((products) => {
        //     return {
        //       ...serverProductData,
        //       content: [...products?.content, ...newArray],
        //     };
        //   });
        // }
      })
      // getAllProducts(pageNumber, pageSize, sortBy, sortDir)
      //   .then((serverProductData) => {
      //     console.log("server Data = ",serverProductData);
      //     setProducts((products) => {
      //       return {
      //         ...serverProductData,
      //       };
      //     });
      //   })
      .catch((error) => {
        // console.log(error);
        // if (error.code === "ERR_BAD_RESPONSE") {
        //   Swal.fire(
        //     "NetWork Error!",
        //     "Backend Server is Down Please try Later!",
        //     "info"
        //   );
        // }
      });
  };

  // product view
  const productsView = () => {
    return (
      products && (
        <>
          {/* <InfiniteScroll
            dataLength={products?.content?.length}
            next={loadNextPage}
            hasMore={!products.lastPage}
            loader={<h3>Loading More Products...</h3>}
            endMessage={<p>All Products loaded</p>}
            className="text-center"
          > */}
          <Row>
            {products?.content?.map((product) => {
              return (
                <Col key={product.productId} md={4}>
                  <SingleProductCard product={product} />
                </Col>
              );
            })}
          </Row>

          {/* </InfiniteScroll> */}
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
