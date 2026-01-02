import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { placeOrder } from "../../api/orders";
import { useCart } from "../../contextData/useCart";
import PaymentSummary from "../../components/cart/PaymentSummary";
import PaymentMethodSelector from "../../components/cart/PaymentMethodSelector";
import CardPaymentForm from "../../components/cart/CardPaymentForm";
import CODPayment from "../../components/cart/CODPayment";

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
    if (e) e.preventDefault();
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
      const data = await placeOrder(orderData);
      if (data.success) {
        toast.success("Order placed successfully!");
        navigate("/");
      } else {
        toast.error("Failed to place order");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
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
        <PaymentSummary cartItems={cartItems} />

        <div className="space-y-4">
          <PaymentMethodSelector
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />

          {paymentMethod === "CARD" ? (
            <CardPaymentForm
              cardNumber={cardNumber}
              setCardNumber={setCardNumber}
              accountHolder={accountHolder}
              setAccountHolder={setAccountHolder}
              expiryDate={expiryDate}
              setExpiryDate={setExpiryDate}
              cvv={cvv}
              setCvv={setCvv}
              calculateTotal={calculateTotal}
              handlePlaceOrder={handlePlaceOrder}
            />
          ) : (
            <CODPayment
              calculateTotal={calculateTotal}
              handlePlaceOrder={handlePlaceOrder}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UsePaymentCart;
