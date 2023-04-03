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
export const deleteProduct=(productId)=>{

   return privateAxios.delete(`/products/${productId}`)
   .then( (response) => response.data);
}