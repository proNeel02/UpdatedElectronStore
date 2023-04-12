import React from "react";

export const BASE_URL = `http://localhost:9090`;

// Orders show at a time
export const ADMIN_ORDERS_PAGE = 1000;
// product show at a time is 10
export const Product_Pages = 10;
// user loading a time is 5
export const User_Load = 5;

// store page product size
export const STORE_PAGE_PRODUCT_SIZE = 100;
// making info useble for image
export const getProductImageUrl = (productId) => {
  return `${BASE_URL}/products/image/${productId}`;
};

//for formating date so we can use this any where we want
// so we defined this function in helper or most of the functions
export const formatDate = (timeInLong) => {
  return new Date(timeInLong).toLocaleString();
};

// getting category image Url from the server
// not need
// export const getCategoryImageUrl = (categoryId) => {
//   return `${BASE_URL}/categories/image/${categoryId}`;
// };
