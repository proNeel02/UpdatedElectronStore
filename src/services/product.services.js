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
export const addProductImage = (file, productId) =>{
  

   const formData = new FormData();
   formData.append('productImage',file)


  return privateAxios.post(`/products/image/${productId}`,formData)
  .then( (response) => response.data); 
}