
import { useEffect, useState } from "react";
import { useCart } from "../../contextData/CartContext.jsx";
import { toast } from "react-toastify";
import API_URL from "../../api/api";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, cartItems, setCartItems ,fetchCartItems} = useCart();
  const [Data, setData] = useState([]);
  const navigate = useNavigate();


  const removeFromCart = async (productId) => {

    try {
      console.log(productId);
      await API_URL.delete(`/cart/delete/${productId}`);

      setCartItems((prev) =>
        prev.filter((item) => item?._id !== productId)
      );

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
            quantity: item.quantity + 1
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
          quantity: item.quantity - 1
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
      navigate('/usePaymentCart')
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
    console.log(cartItems)
    
  }, [cartItems])

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
              <div key={ele?._id || Math.random()} className="p-4 md:grid md:grid-cols-12 md:gap-4 md:items-center flex flex-col ">
                <div className="col-span-5 font-medium text-gray-900 flex items-center justify-between md:justify-start">
                  <span className="md:hidden text-gray-500 text-sm">Product:</span>
                  <span className="truncate">{ele?.productId?.name || "Unknown Product"}</span>
                </div>

                <div className="col-span-2 text-center md:text-center flex items-center justify-between md:justify-center">
                  <span className="md:hidden text-gray-500 text-sm">Price:</span>
                  <span className="text-gray-900">${ele.productId?.price || 0}</span>
                </div>

                <div className="col-span-3 flex items-center justify-between md:justify-center">
                  <span className="md:hidden text-gray-500 text-sm">Quantity:</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => decreaseValue(ele.productId?._id)}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium">{ele.quantity}</span>
                    <button
                      onClick={() => increaseValue(ele.productId?._id)}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="col-span-2 flex items-center justify-between md:justify-center space-x-4">
                  <div className="text-sm">
                    {(ele.productId?.quantity || 0) - ele.quantity <= 0 ? (
                      <span className="text-red-500 font-medium">Out of stock</span>
                    ) : (
                      <span className="text-green-600 font-medium">In stock</span>
                    )}
                  </div>
                  <button
                    onClick={() => removeFromCart(ele?._id)}
                    className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-full hover:bg-red-50"
                    title="Remove item"
                  >
                    x
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {cartItems.length > 0 && (
        <div className="mt-12 flex justify-end">
          <button
            onClick={() => {
              checkOut();
            }}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm text-lg"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
