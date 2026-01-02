import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyOtp, resendVerification } from "../../api/auth";
import { useCart } from "../../contextData/useCart";
import VerifyForm from "../../components/auth/VerifyForm";

const VerifyPage = () => {
  const { setUser } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!email || !otp) return toast.error("Email and OTP are required!");
    setLoading(true);
    try {
      const data = await verifyOtp(email, otp);
      if (data.success) {
        setUser(data.token, data.userData);
        toast.success(data.message);
        navigate(data.userData.role === "user" ? "/" : "/admin");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return toast.error("Email not available!");
    try {
      const data = await resendVerification(email);
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="p-8 rounded-xl shadow-md w-96 bg-white">
        <VerifyForm
          email={email}
          otp={otp}
          setOtp={setOtp}
          loading={loading}
          handleVerify={handleVerify}
          handleResend={handleResend}
        />
      </div>
    </div>
  );
};

export default VerifyPage;
