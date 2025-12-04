
import { useEffect, useState } from "react";
import { useCart } from "../contextData/CartContext.jsx";
import { toast } from "react-toastify";
import API_URL from "../api/api.js";

const Cart = () => {
  const { fetchCartItems, cart, cartItems, setCartItems } = useCart();
  const [Data, setData] = useState([]);



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
      console.error(error);
      toast.error("Failed to remove from cart");
    }
  };

  const increaseValue = (id) => {
    setCartItems((prevData) =>
      prevData.map((item) => {
        if(item.productId._id===id){
          console.log(item.productId.quantity);
        const items=item?.productId
        const quantity = items.quantity - item.quantity;
        console.log(quantity);
        if (quantity >= 1) {
          return { ...item, quantity: item.quantity + 1 };
        }
        }
                return item;

      })
    );
  };

  const decreaseValue = (id) => {
    setCartItems((preData) =>
      preData.map((item) => {
        if(item.productId._id===id){

        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
      }
        return item;
      })
    );
  };

  useEffect(() => {
    console.log("CartItems>>>>>>", cartItems);
  }, [cartItems]);

  const checkOut = async () => {
    console.log("cart", cart);
    console.log("cart", cart._id);

    // await API_URL.patch(`/product/update`, ele.product);
    const data = await API_URL.delete(`/cart/deleteCart/${cart._id}`);
    console.log("data", data.data.success);
    if (data.data.success === true) {
      fetchCartItems()
      toast.success("Checkout completed successfully!", {
        style: {
          color: "green",
          fontWeight: "400",
          fontSize: "17px",
          background: "#F7F7F7",
        }
      })
    }
  };



  return (
    <div className="">
      <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 gap-2 cart-item">
        <div className="title-col">Name</div>
        <div className="price-col">Price</div>
        <div className="quantity-col">Quantity</div>
        <div className="stock-col">Total Quantity</div>
      </div>

      <div className="gap-60">
        {cartItems.length === 0 ? (
          <h2>No items in cart</h2>
        ) : (
          cartItems
            .map((ele) => (

              <div className="cart-item" key={ele?._id || Math.random()}>
                <div className="title-col">{ele?.productId?.name || "Unknown Product"}</div>
                <div className="price-col">${ele.productId?.price || 0}</div>
                <div className="quantity-col">
                  <button onClick={() => decreaseValue(ele.productId?._id)}>-</button>
                  {ele.quantity}
                  <button onClick={() => increaseValue(ele.productId?._id)}>+</button>
                </div>
                <div className="stock-col">
                  {(ele.productId?.quantity || 0) - ele.quantity <= 0 ? (
                    <span style={{ color: "red" }}>Out of stock</span>
                  ) : (
                    <span className="text-green-600 text-sm">In stock</span>
                  )}
                </div>
                <button
                  className="remove-btn w-5"
                  onClick={() => removeFromCart(ele?._id)}
                >
                  x
                </button>
              </div>
            ))
        )}
      </div>

      <button
        onClick={() => {
          checkOut();
        }}
        className="checkout-btn"
      >
        CheckOut
      </button>
    </div>
  );
};

export default Cart;
