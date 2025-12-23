import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contextData/CartContext";

const VerifySuccess = () => {
  const navigate = useNavigate();
  const { setUser } = useCart();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const userData = JSON.parse(localStorage.getItem("tempUserData")); // optional, if backend sends user info
    if (token) {
      setUser(token, userData); // save token & user info in context
      navigate("/home"); // redirect to home page
    }
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <h2 className="text-2xl font-bold text-blue-500">Email verified! Redirecting...</h2>
    </div>
  );
};

export default VerifySuccess;
