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
  const navigate=useNavigate()
  useEffect(() => {
    if (cartItems.length > 0) {
      setLoading(false);
    }
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
        items: cartItems.map(item => ({
          productId: item.productId._id,
          quantity: item.quantity
        })),
        totalAmount: calculateTotal(),
        // optionally include card info if needed
      };

      const res = await API_URL.post("/order/placeOrder", orderData);
      if (res.data.success) {
        toast.success("Order placed successfully!");
        navigate("/")
      } else {
        toast.error("Failed to place order");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  if (loading) return <div>Loading...</div>;

  if (cartItems.length === 0) return <p>No items in cart.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">
        {userData?.user?.name}'s Cart
      </h2>

      <div className="space-y-4 grid-cols-2 flex">
        <div className="w-full p-5">
          {cartItems.map((item) => (
            <div key={item._id} className="flex justify-between p-4 rounded">
              <div>
                <p className="font-semibold">{item.productId.name}</p>
                <p>Price: ${item.productId.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div>
                <p>Total: ${item.quantity * item.productId.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full p-5 space-y-4">
          <div className="flex gap-4 mb-4">
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

          {paymentMethod === "CARD" ? (
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="1234 5678 9012 3456"
                  required
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
                  className="w-full border px-3 py-2 rounded"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block font-medium mb-1">Expiry Date</label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    placeholder="MM/YY"
                    required
                  />
                </div>

                <div className="flex-1">
                  <label className="block font-medium mb-1">CVV</label>
                  <input
                    type="password"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    placeholder="123"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-between mt-4 p-4 bg-gray-100 rounded">
                <p className="font-bold">Grand Total:</p>
                <p className="font-bold">${calculateTotal()}</p>
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
              <div className="p-4 bg-gray-100 rounded flex justify-between">
                <p className="font-bold">Grand Total:</p>
                <p className="font-bold">${calculateTotal()}</p>
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
