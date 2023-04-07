import { privateAxios } from "./axios.service";
/// all the functions related to orders

// get Orders  with async await
export const getAllOrders = async (pageNumber, pageSize, sortBy, sortDir) => {
  let result = await privateAxios.get(`/orders?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`);
  return result.data;
};

// update Orders

// get order of users
