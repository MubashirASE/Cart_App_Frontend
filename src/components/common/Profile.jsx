import React, { useState, useEffect } from "react";
import { useCart } from "../../contextData/useCart";
import { toast } from "react-toastify";
import API_URL from "../../api/api";
import "react-toastify/dist/ReactToastify.css";

const ProfilePage = () => {
  const { userData } = useCart();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (userData?.user) {
      setName(userData.user.name || "");
      setEmail(userData.user.email || "");
    }
  }, [userData]);

  const validateProfileForm = () => {
    let newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";

    if (currentPassword || newPassword || confirmPassword) {
      if (!currentPassword) {
        newErrors.currentPassword = "Current password is required";
      } else if (currentPassword.length < 8) {
        newErrors.currentPassword =
          "Current password must be at least 8 characters long";
      } else if (!/[A-Z]/.test(currentPassword)) {
        newErrors.currentPassword =
          "Current password must be at least 1 uppercase";
      } else if (!/[!@#$%^&*(),?":;{}|<>]/.test(currentPassword)) {
        newErrors.currentPassword =
          "Current password must be at least 1 special character";
      }

      if (!newPassword) newErrors.newPassword = "New password is required";
      else if (newPassword.length < 8) {
        newErrors.newPassword =
          "New password  must be at least 8 characters long";
      } else if (!/[A-Z]/.test(newPassword)) {
        newErrors.newPassword = "New password  must be at least 1 uppercase";
      } else if (!/[!@#$%^&*(),?":;{}|<>]/.test(newPassword)) {
        newErrors.newPassword =
          "New password  must be at least 1 special character";
      }

      if (!confirmPassword)
        newErrors.confirmPassword = "Please confirm your new password";
      else if (confirmPassword.length < 8) {
        newErrors.confirmPassword =
          "Confirm password  must be at least 8 characters long";
      } else if (!/[A-Z]/.test(confirmPassword)) {
        newErrors.confirmPassword =
          "Confirm password  must be at least 1 uppercase";
      } else if (!/[!@#$%^&*(),?":;{}|<>]/.test(confirmPassword)) {
        newErrors.confirmPassword =
          "Confirm password  must be at least 1 special character";
      }

      if (newPassword && confirmPassword && newPassword !== confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validateProfileForm()) return;

    let payload = { name, email };
    if (currentPassword && newPassword) {
      payload = { ...payload, currentPassword, newPassword };
    }

    setLoading(true);
    try {
      const res = await API_URL.patch("/user/updateProfile", payload);
      toast.success(res.data.message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setErrors({});
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const hasChanges =
    name !== (userData?.user?.name || "") ||
    email !== (userData?.user?.email || "") ||
    currentPassword ||
    newPassword ||
    confirmPassword;

  return (
    <div className="min-h-screen flex justify-center items-center p-6 bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl space-y-6">
        <div className="flex items-center space-x-2 text-2xl text-blue-500 font-semibold">
          <span>Edit Your Profile</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 border rounded-md border-gray-300 bg-gray-50"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border rounded-md border-gray-300 bg-gray-50"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <label className="font-medium">Change Password</label>

          <div className="flex flex-col">
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="p-2 border rounded-md border-gray-300 bg-gray-50 w-full"
            />
            {errors.currentPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.currentPassword}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="p-2 border rounded-md border-gray-300 bg-gray-50 w-full"
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
            )}
          </div>

          <div className="flex flex-col">
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="p-2 border rounded-md border-gray-300 bg-gray-50 w-full"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>

        <button
          onClick={handleUpdate}
          disabled={loading || !hasChanges}
          className={`w-full py-2 px-4 text-white font-semibold rounded-md ${
            loading || !hasChanges
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
