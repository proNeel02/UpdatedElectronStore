import { privateAxios } from "./axios.service";

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
