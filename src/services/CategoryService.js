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
export const deleteAtomCategory = (categoryId) => {
  return privateAxios
    .delete(`/categories/${categoryId}`)
    .then((response) => response.data);
};

// updating category on server
export const updateCategory = (category) => {
  
  return privateAxios
    .put(`/categories/${category.categoryId}`, category)
    .then((response) => response.data);
};
