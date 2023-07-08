import { useEffect } from "react";
import { getAllUsers } from "../../services/user.services";
import { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import SingleUserView from "../users/SingleUserView";
import InfiniteScroll from "react-infinite-scroll-component";
import { User_Load } from "../../services/helper.service";

const AdminUsers = () => {
  const [userData, setUserData] = useState(undefined);

  // pagination
  const [currentPage, setCureentPage] = useState(0);

  // take cares of infinite scrolling
  // When ever user scrolls the page and currentpage get updated
  // then useEffects runs and calls function
  // and lodes data

  useEffect(() => {
    if (currentPage > 0) {
      helpergetAllUsers(currentPage, User_Load, "name", "asc");
    }
  }, [currentPage]);

  // useeffet for getting all uses from the server
  useEffect(() => {
    helpergetAllUsers(0, User_Load, "name", "asc");
  }, []);

  const helpergetAllUsers = (pageNumber, pageSize, sortBy, sortDir) => {
    getAllUsers(pageNumber, pageSize, sortBy, sortDir)
      .then((dataFromServer) => {
        if (currentPage === 0) {
          setUserData((userData) => {
            return {
              ...dataFromServer,
            };
          });
        } else {
          setUserData((userData) => {
            //solving repeated user problem and key duplication
            // collecting non-duplicated data inside an newArray object
            let newArray = dataFromServer?.content?.filter((obj1) => {
              return !userData?.content?.some((obj2) => {
                return obj2.userId === obj1.userId;
              });
            });

            return {
              ...dataFromServer,
              content: [...userData.content, ...newArray],
            };
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadNextPage = () => {
    setCureentPage((currentPage) => {
      return currentPage + 1;
    });
  };

  // making a function
  const userView = () => {
    return (
      <>
        <Container fluid>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <h3 className="text-muted"> User List</h3>

                  <InfiniteScroll
                    dataLength={userData.content.length}
                    next={loadNextPage}
                    hasMore={!userData.lastPage}
                    loader={<h3 className="text-center my-3">Loading...</h3>}
                    endMessage={
                      <p className="text-center py-3 text-muted">
                        All Users Loaded
                      </p>
                    }
                  >
                    {userData?.content?.map((user) => {
                      return <SingleUserView key={user?.userId} user={user} />;
                    })}
                  </InfiniteScroll>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  };

  return <>{userData && userView()}</>;
};

export default AdminUsers;
