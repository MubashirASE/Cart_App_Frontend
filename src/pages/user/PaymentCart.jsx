import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { placeOrder } from "../../api/orders";
import { deleteCart } from "../../api/cart";
import { useCart } from "../../contextData/useCart";
import PaymentSummary from "../../components/cart/PaymentSummary";
import PaymentMethodSelector from "../../components/cart/PaymentMethodSelector";
import CardPaymentForm from "../../components/cart/CardPaymentForm";
import CODPayment from "../../components/cart/CODPayment";
import ShippingForm from "../../components/cart/ShippingForm";
import Loader from "../../components/common/Loader";

const UsePaymentCart = () => {
  const { cartItems, userData, cart, setCartItems } = useCart();
  const [cardNumber, setCardNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("CARD");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [shippingData, setShippingData] = useState({
    fullName: "",
    lastName:"",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Pakistan",
  });

  const handleChange = (e) => {
    setShippingData({
      ...shippingData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (cartItems.length > 0) setLoading(false);
  }, [cartItems]);

  const calculateTotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + item.quantity * item.productId.price,
      0
    );
  };
  const validateShipping = () => {
    let newErrors = {};

    if (!shippingData.fullName.trim())
      newErrors.fullName = "First name is required";

    if (!shippingData.phone.trim())
      newErrors.phone = "Contact is required";

    if (!shippingData.city.trim())
      newErrors.city = "City is required";

    if (!shippingData.address.trim())
      newErrors.address = "Address is required";

    if (!shippingData.postalCode.trim())
      newErrors.postalCode = "Postal code is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validateShipping()) return;

    try {
      const orderData = {
        userId: userData?.user?.id,

        paymentMethod,
        items: cartItems.map((item) => ({
          productId: item.productId._id,
          quantity: item.quantity,
        })),
        shippingAddress: shippingData,
        totalAmount: calculateTotal(),
      };

      const data = await placeOrder(orderData);
      toast.success(data.message);

      await deleteCart(cart?._id);
      setCartItems([]);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };


  if (loading) return <div className="flex justify-center items-center h-64">
    <Loader size="lg" text="Loading payment cart..." />
  </div>
  if (cartItems.length === 0) return <p>No items in cart.</p>;

  return (
    <div className="m-15 sm:p-6 md:p-8 ">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">
        {userData?.user?.name || "Guest"}'s Cart
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PaymentSummary cartItems={cartItems} />

        <div className="space-y-4">
          <ShippingForm shippingData={shippingData} setShippingData={setShippingData} handleChange={handleChange} errors={errors} />

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
