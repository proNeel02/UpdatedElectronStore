import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCategories } from "../../../services/CategoryService";
import CategoryAtomicView from "../users/CategoryAtomicView";

const ViewCategories = () => {
  //below array
  // showes that array can contains componets also
  // we know that component is a java script object...
  //Yes i figured it out!!.
  // let array = [<CategoryAtomicView />]

  // this data is comming from server
  // store it in the categoriesData
  const [categoriesDataArray, setcategoiesDataArray] = useState({
    category: [],
  });

  //this below state is used for showing request is made to the server
  // and and some wait for response from the server
  const [isLoading, setLoading] = useState(false);

  //using useffect() for we want to set categoriesData or to make server request as soon as
  //ViewCategories componets is loaded
  // we want that request to the server happen only once so we use empty dendency array with useEffect
  // as second argumnet..
  //  we make server request inside userEffect it self

  useEffect(() => {
    setLoading(() => true);
    getCategories()
      .then((data) => {
        console.log(data.content);
        toast.success("fetching categories successfully!!");
        setcategoiesDataArray((oldCategoryData) => {
          return {
            category: data.content,
          };
        });
      })
      .catch((error) => {
        console.log(error);
        toast.success("fetching categories error!!");
        setcategoiesDataArray((oldCategoryData) => {
          return {
            category: [],
          };
        });
      })
      .finally(() => {
        setLoading(() => false);
      });
  }, []);

  return (
    <>
      <CategoryAtomicView Array={categoriesDataArray?.category} />
    </>
  );
};

export default ViewCategories;
