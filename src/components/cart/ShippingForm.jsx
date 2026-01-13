import React, { useEffect } from "react";
import { useCart } from "../../contextData/useCart";

const ShippingForm = ({ shippingData, handleChange, setShippingData, errors = {} }) => {
    const {userData}=useCart()
    useEffect(() => {
  if (userData?.user) {
    setShippingData((prev) => ({
      ...prev,
      fullName: prev.fullName || userData.user.name || "",
      phone: prev.phone || userData.user.email || "",
    }));
  }
}, [userData]);

  return (
    <div className="space-y-4 mb-6">
      <h3 className="text-xl font-bold">Shipping Address</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          {" "}
          <label className="block font-medium mb-1">
            First Name<span className="text-red-500"> *</span>
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="First Name"
            value={shippingData.fullName || ""}
            onChange={handleChange}
            className={`w-full p-2 border rounded `}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
          )}
          
        </div>
        <div>
          {" "}
          <label className="block font-medium mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={shippingData.lastName || ""}
            onChange={handleChange}
            className={`w-full p-2 border rounded `}
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          {" "}
          <label className="block font-medium mb-1">
            Contact<span className="text-red-500"> *</span>
          </label>
          <input
            type="text"
            name="phone"
            placeholder="Email & Phone Number"
            value={shippingData.phone}
            onChange={handleChange}
            className={`w-full p-2 border rounded `}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
          
        </div>
        <div>
          {" "}
          <label className="block font-medium mb-1">
            City<span className="text-red-500"> *</span>
          </label>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={shippingData.city}
            onChange={handleChange}
            className={`w-full p-2 border rounded `}
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
          )}
        </div>
      </div>
      <div>
        {" "}
        <label className="block font-medium mb-1">
          Address<span className="text-red-500"> *</span>
        </label>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={shippingData.address}
          onChange={handleChange}
          className={`w-full p-2 border rounded `}
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address}</p>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          {" "}
          <label className="block font-medium mb-1">
            Postal Code<span className="text-red-500"> *</span>
          </label>
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code (optional)"
            value={shippingData.postalCode}
            onChange={handleChange}
            className={`w-full p-2 border rounded `}
          />
          {errors.postalCode && (
            <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
          )}
        </div>
        <div>
          {" "}
          <label className="block font-medium mb-1">Country</label>
          <input
            type="text"
            name="country"
            value={shippingData.country}
            disabled
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingForm;
