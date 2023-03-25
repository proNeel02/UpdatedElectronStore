import { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
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
        toast.error("fetching categories error!!");
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
      <Container className="text-center">
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
              />
            );
          })
        : ShowNull()}
    </>
  );
};

export default ViewCategories;
