import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { removeFromCart, updateCartQuantity } from "../../api/cart";
import { useCart } from "../../contextData/useCart";
import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";

const Cart = () => {
  const { cartItems, setCartItems, fetchCartItems } = useCart();
  const navigate = useNavigate();

  const handleRemoveFromCart = async (productId) => {
    try {
      await removeFromCart(productId);
      setCartItems((prev) => prev.filter((item) => item?._id !== productId));
      toast.success("Removed from cart", {
        style: {
          color: "green",
          fontWeight: "600",
          fontSize: "17px",
          background: "#F7F7F7",
        },
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting product");
      
    }
  };

  const increaseValue = async (id) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.productId._id === id) {
          const available = item.productId.quantity - item.quantity;
          if (available >= 1) {
            updateCartQuantity(item.productId._id, item.quantity + 1);
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
          updateCartQuantity(item.productId._id, item.quantity - 1);
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
      navigate("/payment-cart");
    } catch (err) {
      toast.error(err.response?.data?.message );
      
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Shopping Cart</h2>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-10">
        <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-100 font-medium text-gray-500 text-sm uppercase tracking-wider">
          <div className="col-span-5">Product</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-3 text-center">Quantity</div>
          <div className="col-span-2 text-center">Total</div>
        </div>

        <div className="divide-y divide-gray-100">
          {cartItems.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p className="text-lg text-red-500">Your cart is empty</p>
            </div>
          ) : (
            cartItems.map((ele) => (
              <CartItem
                key={ele?._id || Math.random()}
                item={ele}
                increaseValue={increaseValue}
                decreaseValue={decreaseValue}
                removeFromCart={handleRemoveFromCart}
              />
            ))
          )}
        </div>
      </div>

      <CartSummary cartItems={cartItems} checkOut={checkOut} />
    </div>
  );
};

export default Cart;
