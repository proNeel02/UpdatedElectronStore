import React, { useState, useEffect } from "react";
import CartContext from "./XCartContext";
import { useContext } from "react";
import UserContext from "./UserContext";
import {
  addItemToCart,
  getCart,
  removeItemFromTheCart,
} from "../../services/CartService";
import { toast } from "react-toastify";
const CartProvider = ({ children }) => {
  const userContext = useContext(UserContext);
  const [cart, setCart] = useState(undefined);

  // loading user cart as this page is render && cart changes
  const loadingUserCart = async (userId) => {
    try {
      const data = await getCart(userId);

      // console.log(data);
      setCart((cart) => {
        console.log("cart befor new = ", cart?.items);

        // let uniqueArray = data?.items?.filter((item, index) => {
        //   return (
        //     index ===
        //     data?.items?.findIndex((obj) => {
        //       return JSON.stringify(obj) === JSON.stringify(item);
        //     })
        //   );
        // });

        // console.log("uniqueArray", uniqueArray);

        return {
          ...data,
          // items: [...uniqueArray],
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
  const addItem = async (productId, quantity, type = "add", page = "") => {
    // if product is present inside cart already
    // we are checking with the help of product id using find array helper function
    // from here we increment count of quantity of product
    // if (
    //   cart?.items?.find((item) => {
    //     return productId === item?.product?.productId;
    //   })
    // ) {
    //   console.log("Matched and return");
    //   return;
    // }

    try {
      const data = await addItemToCart(
        userContext?.userData?.user?.userId,
        productId,
        quantity
      );

      if (page !== "cart") {
        toast.success("Product is added to cart", {
          position: "top-center",
        });
      } else if ((type === "remove" || type === "add") && page === "cart") {
        toast.success("Item quantity Updated", {
          position: "bottom-center",
        });
      }

      console.log(data);

      setCart((cart) => {
        return {
          ...data,
        };
      });
    } catch (error) {
      console.log(error);
      toast.error("Error in adding product in cart");
    }
  };

  // remove item from cart
  const removeItemsFromTheCart = async (itemId) => {
    // if user try to remove the products from the cart and user is not logged in
    // then we check if userId  === undefined then direct the user to the loggin page
    // how can we do it? by using useNavigate() to divert program flow to the loggin page
    try {
      const data = await removeItemFromTheCart(
        userContext?.userData?.user?.userId,
        itemId
      );
      const newArr = cart?.items?.filter((item) => item.cartItemId !== itemId);
      setCart((cart) => {
        return {
          ...cart,
          items: [...newArr],
        };
      });
      toast.success("item removed", {
        position: "bottom-center",
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
        removeItemsFromTheCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;
