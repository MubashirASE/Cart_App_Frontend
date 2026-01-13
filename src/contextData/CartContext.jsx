import { useState, useEffect, useCallback } from "react";
import API_URL from "../api/api.js";
import { getOrderById } from "../api/orders.js";

import { CartContext } from "./useCart";
const userJson = localStorage.getItem("user")
const initialStates = {
  token: localStorage.getItem("token") ?? null,
  user: userJson ? JSON.parse(userJson) : null
}


export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cart, setCart] = useState();
  const [userData, setUserData] = useState(initialStates);
  const [orders, setOrders] = useState([]);
  const setUser = useCallback((token, user) => {
    console.log(token, user)
    setUserData({
      token,
      user
    })
    if (token) {
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

    } else {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    }
  }, []);
  
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserData({ token: null, user: null });
    setCartItems([]);
  }, []);

  const fetchData = useCallback(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    setUserData({
      token: token,
      user: user
    });
  }, []);


  const fetchCartItems = useCallback(async () => {
    // Allowed without token now (guest mode)
    try {
      const res = await API_URL.get("/cart/");
      const cartData = res.data.cart;
      setCart(cartData);

      if (cartData && cartData.items && cartData.items.length > 0) {
        setCartItems(cartData.items);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setCartItems([]);
    }
  }, []);
 
  const getOrders = async () => {
  // const userId = userData?.user?._id;
  const guestId = localStorage.getItem("guestId");
  const user = localStorage.getItem("user");
  const userId=user?.id || undefined
  try {
    const res = await getOrderById(userId, guestId);
    setOrders(res.orders);
    console.log("Orders:", res);
    console.log("Orders:>>>>", orders)
  } catch (err) {
    console.error("Error fetching orders:", err);
  }
};

  useEffect(() => {
    fetchCartItems();
    getOrders()
  }, [fetchCartItems]);
  
  useEffect(() => {
    fetchData()
  }, [fetchData]);

  const addToCart = useCallback((product) => {
    console.log("Adding to cart:", product);
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find(
        (item) => item.product._id === product.product._id
      );
      if (!existingItem) {
        return [...prevCartItems, product];
      }
      if (existingItem.quantity < existingItem.product.quantity) {
        return prevCartItems.map((item) =>
          item.product._id === product.product._id
            ? { ...item, quantity: product.quantity }
            : item
        );
      }
      return prevCartItems;
    });
  }, []);


  return (
    <CartContext.Provider
      value={{
        cart,
        cartItems,
        addToCart,
        setCartItems,
        fetchCartItems,
        userData,
        setUser,
        orders,
        getOrders,
        logout
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
