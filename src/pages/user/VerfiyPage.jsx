import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../contextData/CartContext";
import API_URL from "../../api/api";
import { toast } from "react-toastify";

const VerifyPage = () => {
  const { setUser } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");

  const handleVerify = async () => {
    if (!email || !otp) return toast.error("Email and OTP are required!");

    try {
      const response = await API_URL.post("/user/verify-otp", { email, otp });
      if (response.data.success) {
        setUser(response.data.token, response.data.userData);
        console.log(response.data.userData.role)
        if(response.data.userData.role === 'user'){
          toast.success(response.data.message);
        navigate("/");
        }else{
        toast.success(response.data.message);
          navigate("/admin");
        }
        
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Verification failed. Invalid OTP.");
    }
  };

  const handleResend = async () => {
    if (!email) return toast.error("Email not available!");

    try {
      const response = await API_URL.post("/user/resend-verification", { email });
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to resend verification email.");
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="p-8 rounded-xl shadow-md w-96 bg-white">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-blue-500">Verify Your Email</h2>
          <p className="text-gray-600">Enter the OTP sent to your email.</p>

          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6-digit OTP"
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring focus:ring-blue-300 outline-none text-center tracking-widest text-lg"
            maxLength={6}
          />

          <button
            onClick={handleVerify}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Verify OTP
          </button>

          <div className="pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600 mb-2">Didn't receive the code?</p>
            <button
              onClick={handleResend}
              className="text-blue-500 hover:underline text-sm"
            >
              Resend OTP
            </button>
          </div>

          <p className="text-xs text-gray-400 mt-2">{email}</p>
        </div>
      </div>
    </div>
  );
}

export default VerifyPage;
