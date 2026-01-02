import { createContext, useContext, useState, useEffect } from "react";
import API_URL from "../api/api.js";
import { toast } from "react-toastify";

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

  const setUser = (token, user) => {
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
  }

  const fetchData = () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    setUserData({
      token: token,
      user: user
    });
  };


  const fetchCartItems = async () => {
    if (!userData?.token) return;
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
  };

  useEffect(() => {
    if (userData?.token) {
      fetchCartItems();
    } else {
      setCartItems([]);
    }
  }, [userData?.token]);

  useEffect(() => {
    fetchData()
  }, []);

  const addToCart = (product) => {
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
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        cartItems,
        addToCart,
        setCartItems,
        fetchCartItems,
        userData,
        setUser
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
