import React, { useEffect, useState } from "react";
import { getProducts } from "../../../api/products";
import ProductTable from "../../../components/admin/ProductTable.jsx";

const AllProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getProducts();
      setData(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="spinner"></div>
        </div>
      ) : data.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <h2 className="text-gray-500 text-xl font-semibold">
            No Items Found
          </h2>
        </div>
      ) : (
        <ProductTable
          products={data}
          showActions={false}
        />
      )}
    </div>
  );
};

export default AllProduct;
