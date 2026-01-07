import API_URL from "./api";

export const login = async (credentials) => {
  try {
    if(!credentials.email || !credentials.password) throw new Error("Email and Password are required!");
    const res = await API_URL.post("/user/login", credentials);
    return res.data;
  } catch (error) {
    throw error || error.response?.data?.message || error.message || "Login failed";
   
  }
};

export const signup = async (userData) => {
  try {
      if(!userData.email || !userData.password) throw new Error("Email and Password are required!");
    const res = await API_URL.post("/user/signup", userData);
    return res.data;
  } catch (error) {
    throw error || error.response?.data?.message || error.message || "Signup failed";
    
  }
};

export const verifyOtp = async (email, otp) => {
  try {
      if(!email || !otp) throw new Error("Email and OTP are required!");
    const res = await API_URL.post("/user/verify-otp", { email, otp });
    return res.data;
  } catch (error) {
    throw error || error.response?.data?.message || error.message || "OTP verification failed";
   
  }
};

export const resendVerification = async (email) => {
  try {
      if(!email) throw new Error("Email not available!");
    const res = await API_URL.post("/user/resend-verification", { email });
    return res.data;
  } catch (error) {
    throw error || error.response?.data?.message || error.message || "Failed to resend verification";
    
  }
};

