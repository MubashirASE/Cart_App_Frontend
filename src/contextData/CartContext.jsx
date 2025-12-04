import { createContext, useContext, useState, useEffect } from "react";
import API_URL from "../api/api.js";

const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cart, setCart] = useState();
  const fetchCartItems = async () => {
    try {
      const res = await API_URL.get("/cart/");
      // Safely handle if cart is null/undefined
      const cartData = res.data.cart;
      setCart(cartData);

      if (cartData && cartData.items && cartData.items.length > 0) {
        setCartItems(cartData.items);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      // If error (e.g. 404), clear cart
      setCartItems([]);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const addToCart = (product) => {
    console.log("Adding to cart:", product);


    // Otherwise, add single item logic (if needed, but current Home.jsx passes full list)
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);