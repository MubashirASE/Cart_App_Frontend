import React, { useEffect, useState } from "react";
import { FaBoxes, FaCoins, FaShoppingBag, FaUsers } from "react-icons/fa";
import { getProducts, getMyProducts } from "../../api/products";
import { getAllUserData } from "../../api/admin";
import PageHeader from "../../components/common/PageHeader.jsx";
import Card from "../../components/common/Card.jsx";

export const AdminDetailPage = () => {
  const [Data, setData] = useState(0);
  const [product, setProduct] = useState(0);
  const [member, setMember] = useState(0);

  const fetchStats = async () => {
    try {
      const products = await getProducts();
      setData(products.length);

      const myProducts = await getMyProducts();
      setProduct(myProducts.length);

      const userData = await getAllUserData();
      setMember(userData.data.length);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="space-y-6 p-8">
      <PageHeader title="Dashboard Overview" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 space-y-5 border-none shadow">
          <p className="text-sm text-gray-600 gap-3 flex">
            {" "}
            <FaUsers className="text-blue-500" size={20} />
            Total Members
          </p>
          <h3 className="text-xl font-bold mt-1">{member}</h3>
        </Card>

        <Card className="p-6 space-y-5 border-none shadow">
          <p className="text-sm text-gray-600 gap-2 flex ">
            <FaBoxes className="text-blue-500" size={20} />
            Total Products
          </p>
          <h3 className="text-xl font-bold mt-1">{Data}</h3>
        </Card>

        <Card className="p-6 space-y-5 border-none shadow">
          <p className="text-sm text-gray-600 flex gap-2"><FaShoppingBag className="text-blue-500" size={17} /> My Products</p>
          <h3 className="text-xl font-bold mt-1">{product}</h3>
        </Card>

        <Card className="p-6 space-y-5 border-none shadow">
          <p className="text-sm text-gray-600 flex gap-2">
            <FaCoins className="text-blue-500" size={17} /> Total Revenue</p>
          <h3 className="text-xl font-bold mt-1">$0.00</h3>
        </Card>
      </div>
    </div>
  );
};

export default AdminDetailPage;
