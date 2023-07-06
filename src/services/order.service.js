import { privateAxios } from "./axios.service";
/// all the functions related to orders

// get Orders  with async await
export const getAllOrders = async (pageNumber, pageSize, sortBy, sortDir) => {
  let result = await privateAxios.get(`/orders`);
  return result.data;
};

//  create Order
export const createOrder = async (orderDetails) => {
  const result = await privateAxios.post("/orders", orderDetails);
  return result.data;
};

// get order of users
export const getOrdersOfUsers = async (userId) => {
  const result = await privateAxios.get(`/orders/users/${userId}`);
  return result.data;
};
