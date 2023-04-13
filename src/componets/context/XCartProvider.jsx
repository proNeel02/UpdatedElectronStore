import React, { useState } from "react";
import CartContext from "./XCartContext";
import { useContext } from "react";
import UserContext from "./UserContext";

import { useEffect } from "react";
import { addItemToCart, getCart } from "../../services/CartService";
import { toast } from "react-toastify";

const CartProvider = ({ children }) => {
  const userContext = useContext(UserContext);
  const [cart, setCart] = useState(undefined);

  // loading user cart as this page is render && cart changes
  const loadingUserCart = async (userId) => {
    console.log("userId = ", userId);
    try {
      const data = await getCart(userId);
      console.log("cartConextProvider = ", data);
      setCart((cart) => {
        return {
          ...data,
        };
      });
    } catch (error) {
      console.log(error);
      setCart((cart) => {
        return {
          items: [],
        };
      });
    }
  };

  useEffect(() => {
    // get user cart
    if (userContext?.isLogin) {
      loadingUserCart(userContext?.userData?.user?.userId);
    }
  }, [userContext?.isLogin, userContext?.userData?.user?.userId]);

  // add item to cart
  const addItem = async (productId,quantity) => {
    try {
      const data = await addItemToCart(
        userContext?.userData?.user?.userId,
        productId,
        quantity
      );
      console.log(data);

      setCart((cart) => {
        return {
          ...data,
        };
      });
      toast.success('Item Added To Cart');
    } catch (error) {
      console.log(error);
      toast.error("Error in adding product in cart");
    }
  };

  
  // remove item from cart
  const removeItemFromTheCart = async (itemId) => {
    try {
      const data = await removeItemFromTheCart(
        userContext?.userData?.user?.userId,
        itemId
      );

      setCart((cart) => {
        return {
          items: [...cart?.items?.filter()],
        };
      });
    } catch (error) {
      console.log(error);
      toast.error("Unable to remove Item from Cart");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addItem,
        removeItemFromTheCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
