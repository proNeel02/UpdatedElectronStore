import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
// import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  deleteAtomCategory,
  getCategories,
  updateCategory,
} from "../../../services/CategoryService";
import CategoryAtomicView from "../users/CategoryAtomicView";

const ViewCategories = () => {
  //below array
  // showes that array can contains componets also
  // we know that component is a java script object...
  //Yes i figured it out!!.
  // let array = [<CategoryAtomicView />]

  const [selectedCategory, setSelectedCategory] = useState(undefined);

  // this state is related with modal
  // related with ModelView function
  // handle view button modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // this state is related with modal
  // related with ModalUpdate function
  // handle update button modal
  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  // this data is comming from server
  // store it in the categoriesData
  const [categoriesData, setcategoiesData] = useState({
    category: [],
  });

  //this below state is used for showing request is made to the server
  // and and some wait for response from the server
  // we will show loder to show server is acting on request
  // and the activity of that loader controlled by varible called isLoading
  const [isLoading, setLoading] = useState(false);

  // this below function fetchCategoryList fetch categories from the server and setting state of categoriesDataArray varible
  // due to that categories display on screen
  // so this fetchCategoryList function mainly used at two places as soon as page loades that means inside useEffet()
  // and deleteCategory fuction when category get deleted from server it call fetchCategoryList function to fetch category
  // data from server.....
  const fetchCategoryList = () => {
    getCategories()
      .then((data) => {
        // console.log(data.content);
        // toast.success("fetching categories successfully!!");
        setcategoiesData((oldCategoryData) => {
          return {
            category: data.content,
          };
        });
      })
      .catch((error) => {
        console.log(error);
        // toast.error("fetching categories error!!");
        setcategoiesData((oldCategoryData) => {
          return {
            category: [],
          };
        });
      })
      .finally(() => {
        setLoading(() => false);
      });
  };

  //using useffect() for we want to set categoriesData or to make server request as soon as
  //ViewCategories componets is loaded
  // we want that request to the server happen only once so we use empty dendency array with useEffect
  // as second argumnet..
  //  we make server request inside userEffect it self

  useEffect(() => {
    setLoading(() => true);
    fetchCategoryList();
  }, []);

  // here we sending delete function to the child (CategoryAtomicView) and get categoryId from child(CategoryAtomicView)
  // by pasiing deleteCategory fuction as prop
  // but we use deleteCatMain
  const deleteCategory = (categoryId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // making an api call for delete the category
        deleteAtomCategory(categoryId)
          .then((Serverdata) => {
            console.log(Serverdata);
            fetchCategoryList();
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          })
          .catch((error) => {
            console.log(error);
            toast.error("Error While Deleting Category!!");
          });
      }
    });
  };

  // this function ShowNull calls when the categories
  // on thne server is zero
  // or category array in categoriesData is length is zero
  const ShowNull = () => {
    return (
      <>
        <h1 className="text-center">No categories in database!!</h1>
      </>
    );
  };

  // this handleSpinner function contains growing effect animation
  // this handleSpinner active until data base fetch data..
  // Nice.....
  const handleSpinner = () => {
    return (
      <Container className="text-center p-5">
        <Spinner className="me-2" animation="grow" variant="primary" />
        <Spinner className="me-2" animation="grow" variant="secondary" />
        <Spinner className="me-2" animation="grow" variant="success" />
        <Spinner className="me-2" animation="grow" variant="danger" />
        <Spinner className="me-2" animation="grow" variant="warning" />
        <Spinner className="me-2" animation="grow" variant="info" />
        <Spinner className="me-2" animation="grow" variant="light" />
        <Spinner animation="grow" variant="dark" />
      </Container>
    );
  };

  // handle view button of category
  // handle by view button passing as prop
  // as View to the CategoryAtomicView component

  const handleView = (category) => {
    setSelectedCategory((oldCatObj) => {
      return category;
    });
    handleShow();
  };

  // handle update butoon of category
  // handle by Update button passing as prop
  // as Update to the CategoryAtomicView component
  const handleUpdate = (category) => {
    setSelectedCategory((oldCatObj) => {
      return category;
    });
    handleShowUpdate();
  };

  // Model view function for showing clicked category
  const ModelView = () => {
    return (
      <>
        <Modal centered animation={false} show={show} onHide={handleClose}>
          <Modal.Header>
            <Container className="mb-2 p-1 text-center">
              <Row>
                <Col md={12}>
                  <Modal.Title>{selectedCategory.title}</Modal.Title>
                </Col>
              </Row>

              <Row>
                <Col md={12}>
                  <img
                    src={selectedCategory.coverImage}
                    // style={{
                    //   width: "400px",
                    //   height: "400px",
                    //   objectFit: "contain",
                    // }}
                    className="img-fluid"
                    alt=""
                  />
                </Col>
              </Row>
            </Container>
          </Modal.Header>
          <Modal.Body>{selectedCategory.description}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  // handleChange function handeling update which is comming from
  // by clicking update button
  // handing field values
  const handleChange = (event, property) => {
    setSelectedCategory((oldCategory) => {
      return {
        ...oldCategory,
        [property]: event.target.value,
      };
    });
  };

  // handleUpdateCategory function update category in database
  const handleUpdateCategory = (event) => {
    event.preventDefault();

    if (
      selectedCategory.title === undefined ||
      selectedCategory.title.trim() === ""
    ) {
      toast.error("title required!!");
      return;
    }

    if (
      selectedCategory.description === undefined ||
      selectedCategory.description.trim() === ""
    ) {
      toast.error("description required!!");
      return;
    }

    if (
      selectedCategory.coverImage === undefined ||
      selectedCategory.coverImage.trim() === ""
    ) {
      toast.error("Url required!!");
      return;
    }

    console.dir(selectedCategory);
    updateCategory(selectedCategory)
      .then((ServerResponse) => {
        console.dir(ServerResponse);
        toast.success("Update Successful!!");
        fetchCategoryList();
        handleCloseUpdate();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Update Failed!!");
      });
  };

  // Model Update function for Update clicked category
  const ModalUpdate = () => {
    return (
      <>
        <Modal animation={false} show={showUpdate} onHide={handleCloseUpdate}>
          <Modal.Header>
            <Modal.Title>{selectedCategory.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <FormGroup>
                <Form.Label>Category Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter here"
                  value={selectedCategory.title}
                  onChange={(event) => {
                    return handleChange(event, "title");
                  }}
                />
              </FormGroup>

              <FormGroup className="mt-3">
                <Form.Label>Category Description</Form.Label>
                <Form.Control
                  as={"textarea"}
                  rows={8}
                  placeholder="description"
                  value={selectedCategory.description}
                  onChange={(event) => {
                    return handleChange(event, "description");
                  }}
                />
              </FormGroup>

              <FormGroup>
                <Container className="text-center py-3">
                  <img
                    src={selectedCategory.coverImage}
                    className="img-fluid"
                  />
                </Container>
                <Form.Label>Category Image Url</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter here"
                  value={selectedCategory.coverImage}
                  onChange={(event) => {
                    return handleChange(event, "coverImage");
                  }}
                />
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUpdate}>
              Close
            </Button>

            <Button variant="success" onClick={handleUpdateCategory}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  return (
    <>
      {isLoading
        ? handleSpinner()
        : categoriesData.category.length > 0
        ? categoriesData?.category?.map((obj) => {
            return (
              <CategoryAtomicView
                key={obj.categoryId}
                obj={obj}
                deleteCatMain={deleteCategory}
                Update={handleUpdate}
                View={handleView}
              />
            );
          })
        : ShowNull()}

      {selectedCategory ? ModelView() : ""}
      {selectedCategory ? ModalUpdate() : ""}
    </>
  );
};

export default ViewCategories;
