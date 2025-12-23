import React, { useEffect, useState } from "react";
import API_URL from "../api/api";
import { FaBoxes, FaChartLine, FaCoins, FaShoppingBag, FaThLarge, FaUsers } from "react-icons/fa";

export const AdminDetailPage = () => {
  const [Data, setData] = useState(0);
  const [product, setProduct] = useState(0);
  const [member, setMember] = useState(0);

  const allfetchData = async () => {
    try {
      const userData = await API_URL.get(`/products/`);
      setData(userData.data.length);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const allMembers = async () => {
    try {
      const userData = await API_URL.get(`/user/allUserData`);
      setMember(userData.data.data.length);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const allfetchProduct = async () => {
    try {
      const userData = await API_URL.get(`/products/userProducts`);
      setProduct(userData.data.total);
    } catch (error) {
      console.error("Error fetching user products:", error);
    }
  };

  useEffect(() => {
    allfetchData();
    allfetchProduct();
    allMembers();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-400 ">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border-none space-y-5">
          <p className="text-sm text-gray-600 gap-3 flex">
            {" "}
            <FaUsers className="text-blue-500" size={20} />
            Total Members
          </p>
          <h3 className="text-xl font-bold mt-1">{member}</h3>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-none space-y-5">
          <p className="text-sm text-gray-600 gap-2 flex ">
            <FaBoxes  className="text-blue-500" size={20}/> 
            Total Products
            </p>
          <h3 className="text-xl font-bold mt-1">{Data}</h3>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-none space-y-5">
          <p className="text-sm text-gray-600 flex gap-2"><FaShoppingBag className="text-blue-500" size={17}/> My Products</p>
          <h3 className="text-xl font-bold mt-1">{product}</h3>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-none space-y-5">
          <p className="text-sm text-gray-600 flex gap-2">
           <FaCoins className="text-blue-500" size={17}/> Total Revenue</p>
          <h3 className="text-xl font-bold mt-1">$0.00</h3>
        </div>
      </div>
    </div>
  );
};

export default AdminDetailPage;
