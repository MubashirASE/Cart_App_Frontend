import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, signup } from "../api/auth";
import { useCart } from "../contextData/useCart";

export const useAuth = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignUpData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { setUser } = useCart();
  const navigate = useNavigate();

  const validateLoginForm = () => {
    let newErrors = {};
    if (!loginData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!loginData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignupForm = () => {
    let newErrors = {};
    if (!signupData.name) {
      newErrors.name = "Name is required";
    }
    if (!signupData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!signupData.password) {
      newErrors.password = "Password is required";
    } else if (signupData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateLoginForm()) return;
    setLoading(true);
    try {
      const data = await login(loginData);
      if (data.success) {
        setUser(data.token, data.userData);
        toast.success(data.message);
        navigate(data.userData.role === "user" ? "/" : "/admin");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!validateSignupForm()) return;
    setLoading(true);
    try {
      const data = await signup(signupData);
      if (data.success) {
        if (signupData.role === "user") {
          setUser(data.token, data.userData);
          toast.success(data.message);
          navigate("/");
        } else {
          toast.success(data.message);
          navigate("/verify", { state: { email: signupData.email } });
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    loginData,
    setLoginData,
    signupData,
    setSignUpData,
    errors,
    loading,
    handleLogin,
    handleSignup,
  };
};
