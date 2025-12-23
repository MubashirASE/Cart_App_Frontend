import React, { useEffect, useState } from "react";
import API_URL from "../api/api";
// import axiosInstance from "../api/axiosInstance";

export const AdminDetailPage = () => {
  const [Data, setData] = useState();
  const [product, setProduct] = useState();
  const [member,setMember]=useState()
  const allfetchData = async () => {

    const userData = await API_URL.get(`/products/`);
    const result = userData.data;
    console.log(result);
    setData(result.length);
  };
  const allActiveTeam=async()=>{

    const userData = await API_URL.get(`/user/allUserData`);
    const data = userData.data.data;
    console.log(data)
    setMember(data.length)
  }
const allfetchProduct = async () => {

    const userData = await API_URL.get(`/products/userProducts`);
    const result = userData.data;
    console.log(result);
    setProduct(result.total);
  };
  useEffect(() => {
    allfetchData();
    allfetchProduct();
    allActiveTeam()
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8 bg-gray-50">
      <div className="flex flex-col justify-between items-center p-6 bg-white shadow-md rounded-2xl border border-blue-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        <div className="text-lg font-semibold text-blue-600">Total Members</div>
        <div className="text-4xl font-bold text-gray-800 mt-2">{member}</div>
      </div>

      <div className="flex flex-col justify-between items-center p-6 bg-white shadow-md rounded-2xl border border-blue-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        <div className="text-lg font-semibold text-blue-600">Total Products</div>
        <div className="text-4xl font-bold text-gray-800 mt-2">{Data}</div>
      </div>

      <div className="flex flex-col justify-between p-6 bg-white shadow-md rounded-2xl border border-blue-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        <div className="text-lg font-semibold text-blue-600 mb-3">My Products</div>
        <div className="space-y-2">
          <div className="flex justify-between text-gray-700">
            <span className="font-semibold text-blue-500">{product}</span>
          </div>
          
        </div>
      </div>

      <div className="flex flex-col justify-center items-center p-6 bg-white shadow-md rounded-2xl border border-blue-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        <div className="text-lg font-semibold text-blue-600">Total Amount</div>
        <div className="text-gray-500 text-sm mt-1">(Details coming soon)</div>
      </div>
    </div>
  );
};

export default AdminDetailPage;