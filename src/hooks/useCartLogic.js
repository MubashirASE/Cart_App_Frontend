import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API_URL from "../api/api";
import { useCart } from "../contextData/CartContext.jsx";

const useCartLogic = () => {
  const { cart, cartItems, setCartItems, fetchCartItems } = useCart();
  const navigate = useNavigate();

  const removeFromCart = async (productId) => {
    try {
      console.log(productId);
      await API_URL.delete(`/cart/delete/${productId}`);

      setCartItems((prev) => prev.filter((item) => item?._id !== productId));

      toast.success("Removed from cart", {
        style: {
          color: "green",
          fontWeight: "600",
          fontSize: "17px",
          background: "#F7F7F7",
        },
      });
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error(error.response.data.message);
      }
    }
  };

  const increaseValue = async (id) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.productId._id === id) {
          const available = item.productId.quantity - item.quantity;

          if (available >= 1) {
            API_URL.patch(`/cart/update/${item.productId._id}`, {
              quantity: item.quantity + 1,
            });

            return { ...item, quantity: item.quantity + 1 };
          }
        }
        return item;
      })
    );
  };

  const decreaseValue = async (id) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.productId._id === id && item.quantity > 1) {
          API_URL.patch(`/cart/update/${item.productId._id}`, {
            quantity: item.quantity - 1,
          });

          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
    );
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const checkOut = async () => {
    try {
      console.log("cart", cart);
      console.log("cart", cart._id);
      // await API_URL.patch(`/product/update`, ele.product);
      // const data = await API_URL.delete(`/cart/deleteCart/${cart._id}`);
      // console.log("data", data.data.success);
      navigate("/usePaymentCart");
      // if (data.data.success === true) {
      //   fetchCartItems()
      //   toast.success("Checkout completed successfully!", {
      //     style: {
      //       color: "green",
      //       fontWeight: "400",
      //       fontSize: "17px",
      //       background: "#F7F7F7",
      //     }
      //   })
      // }
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);
  return {
    cart,
    cartItems,
    removeFromCart,
    increaseValue,
    decreaseValue,
    checkOut,
  };
};

export default useCartLogic;
