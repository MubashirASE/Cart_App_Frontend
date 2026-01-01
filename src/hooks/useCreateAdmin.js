import { useState } from "react";
import API_URL from "../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useCreateAdmin = ({closeModal , fetchData}) => {
   const [signupData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin"
  })
  const [errors, setErrors] = useState({});
  const [loading, setloading] = useState(false);
  const navigate = useNavigate()
  const validateForm = () => {
    let newErrors = {};
    if (!signupData.name) {
      newErrors.name = 'Email is required';
    }
    if (!signupData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
      newErrors.email = 'Email address is invalid';
    }

    if (!signupData.password) {
      newErrors.password = 'Password is required';
    } else if (signupData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/[A-Z]/.test(signupData.password)) {
      newErrors.password = 'Password must be at least 1 uppercase';
    } else if (!/[!@#$%^&*(),?":;{}|<>]/.test(signupData.password)) {
      newErrors.password = 'Password must be at least 1 special character';
    }

    setErrors(newErrors);
    console.log(errors)
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setSignUpData({
      ...signupData,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async () => {
    if (!validateForm()) return;
    setloading(true)

    try {
      const response = await API_URL.post("/user/signup", signupData);
      const data = response.data;

      if (data.success) {
        navigate("/admin/adminDetails");
      } else {
        toast.error(data.message);
      }
      closeModal()
      fetchData()
    } catch (err) {
      console.error(err);
      toast.error("Admin created failed, please try again.");
    }
  }

  return {
    loading,
    signupData,
    errors,
    handleChange,
    handleSubmit
  };
};

export default useCreateAdmin;
