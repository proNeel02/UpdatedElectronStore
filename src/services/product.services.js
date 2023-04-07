//product related api calls
import { privateAxios, publicAxios } from "./axios.service";
// create product with out category
export const createProductWithoutCategory = (product) => {
  return privateAxios
    .post(`/products`, product)
    .then((response) => response.data);
};

// create product with category
export const createProductInCategory = (product, categoryId) => {
  return privateAxios
    .post(`/categories/${categoryId}/products`, product)
    .then((response) => response.data);
};

// add product image
export const addProductImage = (file, productId) => {
  const formData = new FormData();
  formData.append("productImage", file);

  return privateAxios
    .post(`/products/image/${productId}`, formData)
    .then((response) => response.data);
};

// getting all products for the view product page
export const getAllProducts = (
  pageNumber = 0,
  PageSize = 10,
  sortBy = "addedDate",
  sortDir = "asc"
) => {
  return privateAxios
    .get(
      `/products?pageNumber=${pageNumber}&pageSize=${PageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
    )
    .then((response) => response.data);
};

// delete the product from view product
export const deleteProduct = (productId) => {
  return privateAxios
    .delete(`/products/${productId}`)
    .then((response) => response.data);
};

// update product in view product
export const updateProduct = (updatedData, productId) => {
  return privateAxios
    .put(`/products/${productId}`, updatedData)
    .then((response) => {
      return response.data;
    });
};

// updating the category of product in view product section
export const updateProductCategory = (categoryId, productId) => {
  return privateAxios
    .put(`/categories/${categoryId}/products/${productId}`)
    .then((response) => response.data);
};

//search product service
export const serachProduct = (query) => {
  return privateAxios
    .get(`/products/search/${query}`)
    .then((response) => response.data);
};
