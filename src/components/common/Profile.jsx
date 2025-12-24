import React, { useState, useEffect } from "react";
import { useCart } from "../../contextData/CartContext";
import { toast } from "react-toastify";
import API_URL from "../../api/api";

const ProfilePage = () => {
  const { userData, setUser } = useCart();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userData?.user) {
      setName(userData.user.name || "");
      setEmail(userData.user.email || "");
    }
  }, [userData]);

  const handleUpdate = async () => {
    if (newPassword && newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await API_URL.patch("/user/updateProfile", {
        name,
        email,
        currentPassword,
        newPassword,
      });
      setUser(userData.token, { ...userData.user, name, email });

      toast.success(res.data.message);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

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
              className="p-2 border rounded-md border-none bg-gray-50"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border rounded-md border-none bg-gray-50"
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="font-medium">Change Password</label>
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="p-2 border rounded-md w-full border-none bg-gray-50"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="p-2 border rounded-md w-full border-none bg-gray-50"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="p-2 border rounded-md w-full border-none bg-gray-50"
          />
        </div>

        <button
          onClick={handleUpdate}
          className={`w-full py-2 px-4 text-white font-semibold rounded-md ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
