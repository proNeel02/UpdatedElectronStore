import { privateAxios, publicAxios } from "./axios.service";

// cart of specific user
export const getCart = async (userId) => {
  const response = await privateAxios.get(`/carts/${userId}`);
  return response.data;
};

// add item to cart

export const addItemToCart = async (userId, productId, quantity) => {
  const response = await privateAxios.post(`/carts/${userId}`, {
    productId,
    quantity,
  });

  return response.data;
};

// clear cart
export const clearCart = async (userId) => {
  const response = await privateAxios.delete(`/carts/${userId}`);

  return response.data;
};

// remove item from the cart
export const removeItemFromTheCart = async (userId, itemId) => {
  const response = await privateAxios.delete(
    `/carts/${userId}/items/${itemId}`
  );
  return response.data;
};
