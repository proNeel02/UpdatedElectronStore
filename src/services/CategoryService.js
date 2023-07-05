import { privateAxios, publicAxios } from "./axios.service";

//get all saved categories from the server
export const getCategories = () => {
  return privateAxios.get(`/categories`).then((response) => response.data);
};

//add category to server
export const addCategory = (category) => {
  return privateAxios
    .post(`/categories`, category)
    .then((response) => response.data);
};

// delete category from server
export const deleteAtomCategory = async (categoryId) => {
  console.log("deleteAtomicCategory from category Services ===> ", categoryId);
  // return privateAxios
  //   .delete(`/categories/${categoryId}`)
  //   .then((response) => response.data);
  const result = await privateAxios.delete(`/categories/${categoryId}`);
  return result.data;
};

// updating category on server
export const updateCategory = (category) => {
  return privateAxios
    .put(`/categories/${category.categoryId}`, category)
    .then((response) => response.data);
};

// get category object using cahtegory id
export const getSingleCategoryObjectUsingCategoryId = (
  categoryId,
  pageNumber = 0,
  PageSize = 10,
  sortBy = "addedDate",
  sortDir = "asc"
) => {
  return privateAxios
    .get(
      `/categories/${categoryId}/products?pageNumber=${pageNumber}&pageSize=${PageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
    )
    .then((response) => response.data);
};
