import React, { useState } from "react";
import { toast } from "react-toastify";
import CreateAdminForm from "./CreateAdminForm.jsx";
import { createAdmin } from "../../api/admin.js";

const CreateAdmin = ({ closeModal, fetchData }) => {
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let newErrors = {};
    if (!adminData.name) {
      newErrors.name = "Name is required";
    }
    if (!adminData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(adminData.email)) {
      newErrors.email = "Email address is invalid";
    }

    if (!adminData.password) {
      newErrors.password = "Password is required";
    } else if (adminData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (!/[A-Z]/.test(adminData.password)) {
      newErrors.password = "Password must be at least 1 uppercase";
    } else if (!/[!@#$%^&*(),?":;{}|<>]/.test(adminData.password)) {
      newErrors.password = "Password must be at least 1 special character";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setAdminData({
      ...adminData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);

    try {
       await createAdmin(adminData);
      toast.success("Admin created successfully!");
      closeModal();
        fetchData()
      
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Admin creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CreateAdminForm
      adminData={adminData}
      errors={errors}
      loading={loading}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export default CreateAdmin;