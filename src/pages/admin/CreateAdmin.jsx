import React, { useState } from "react";
import { signup } from "../../api/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CreateAdminForm from "../../components/admin/CreateAdminForm.jsx";

const CreateAdmin = ({ closeModal, fetchData }) => {
  const [signupData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
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
    } else if (!/[A-Z]/.test(signupData.password)) {
      newErrors.password = "Password must be at least 1 uppercase";
    } else if (!/[!@#$%^&*(),?":;{}|<>]/.test(signupData.password)) {
      newErrors.password = "Password must be at least 1 special character";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setSignUpData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);

    try {
      const data = await signup(signupData);

      if (data.success) {
        toast.success(data.message || "Admin created successfully!");
        navigate("/admin/adminDetails");
        closeModal();
        if (fetchData) fetchData();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Admin creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CreateAdminForm
      signupData={signupData}
      errors={errors}
      loading={loading}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export default CreateAdmin;