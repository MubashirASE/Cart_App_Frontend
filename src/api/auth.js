import API_URL from "./api";

export const login = async (credentials) => {
  const res = await API_URL.post("/user/login", credentials);
  return res.data;
};

export const signup = async (userData) => {
  const res = await API_URL.post("/user/signup", userData);
  return res.data;
};

export const verifyOtp = async (email, otp) => {
  const res = await API_URL.post("/user/verify-otp", { email, otp });
  return res.data;
};

export const resendVerification = async (email) => {
  const res = await API_URL.post("/user/resend-verification", { email });
  return res.data;
};
