import { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  deleteAtomCategory,
  getCategories,
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
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    alert("Update button Clicked!!");
  };

  // Model view function for showing clicked category
  const ModelView = () => {
    return (
      <>
        <Modal animation={false} show={show} onHide={handleClose}>
          <Modal.Header>
            <Container className="mb-2 p-1">

            <Row className="mb-">
                <Col md={12}>
                  <Modal.Title>{selectedCategory.title}</Modal.Title>
                </Col>
              </Row>


              <Row>
                <Col md={12}>
                  <img
                    src={selectedCategory.coverImage}
                    style={{
                      width: "400px",
                      height: "400px",
                      objectFit: "contain",
                    }}
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
            <Button variant="primary" onClick={handleClose}>
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
    </>
  );
};

export default ViewCategories;
