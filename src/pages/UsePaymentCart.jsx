import React, { useEffect, useState } from "react";
import { useCart } from "../contextData/CartContext";
import { toast } from "react-toastify";
import API_URL from "../api/api";
import { useNavigate } from "react-router-dom";

const UsePaymentCart = () => {
  const { cartItems, userData } = useCart();
  const [cardNumber, setCardNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("CARD");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length > 0) setLoading(false);
  }, [cartItems]);

  const calculateTotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + item.quantity * item.productId.price,
      0
    );
  };

  const handlePlaceOrder = async (e) => {
    e && e.preventDefault();
    try {
      const orderData = {
        userId: userData?.user?._id,
        paymentMethod,
        items: cartItems.map((item) => ({
          productId: item.productId._id,
          quantity: item.quantity,
        })),
        totalAmount: calculateTotal(),
      };
      const res = await API_URL.post("/order/placeOrder", orderData);
      if (res.data.success) {
        toast.success("Order placed successfully!");
        navigate("/");
      } else toast.error("Failed to place order");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (cartItems.length === 0) return <p>No items in cart.</p>;

  return (
    <div className="m-15 sm:p-6 md:p-8 ">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">
        {userData?.user?.name}'s Cart
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded shadow"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.productId?.image}
                  alt={item.productId?.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <p className="font-semibold">{item.productId.name}</p>
                  <p>Price: ${item.productId.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>
              <p className="mt-2 sm:mt-0 font-bold">
                Total: ${item.quantity * item.productId.price}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setPaymentMethod("CARD")}
              className={`px-4 py-2 rounded font-semibold ${
                paymentMethod === "CARD"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Pay by Card
            </button>
            <button
              onClick={() => setPaymentMethod("COD")}
              className={`px-4 py-2 rounded font-semibold ${
                paymentMethod === "COD"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Cash on Delivery
            </button>
          </div>

          {/* Card Payment Form */}
          {paymentMethod === "CARD" ? (
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">
                  Account Holder Name
                </label>
                <input
                  type="text"
                  value={accountHolder}
                  onChange={(e) => setAccountHolder(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1">Expiry Date</label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    placeholder="MM/YY"
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">CVV</label>
                  <input
                    type="password"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="123"
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
              </div>

              <div className="flex justify-between p-4 bg-gray-100 rounded font-bold">
                <p>Grand Total:</p>
                <p>${calculateTotal()}</p>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold"
              >
                Pay & Place Order
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between p-4 bg-gray-100 rounded font-bold">
                <p>Grand Total:</p>
                <p>${calculateTotal()}</p>
              </div>
              <button
                onClick={handlePlaceOrder}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md font-semibold"
              >
                Place Order (Cash on Delivery)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsePaymentCart;
