import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBoxes, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../../contextData/CartContext";
import { toast } from "react-toastify";
import API_URL from "../../../api/api";
const AllProduct= () => {
  const { userData } = useCart();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await API_URL.get("/products/");
      console.log(userData?.user.id)
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const Cart = async (productId,) => {
    try {
      console.log(productId);
      const res = await API_URL.post(`/cart/add/${productId}`);

      console.log("res", res.data.cart.items);

      toast.success(res.data.message, {
        style: {
          color: "#306dfd",
          fontWeight: "600",
          fontSize: "17px",
          background: "#F7F7F7",
        },
      });
      return res.data.cart.items;
    } catch (error) {
      toast.error(error.response.data.message);
    };
  }



  const updateProd = (ele) => {
    navigate("/admin/adminUpdateProduct", { state: ele });
  };
  useEffect(() => {
    setloading(true);
    if (data?.length > 0) {
      setloading(false);
    }
  }, [data])
  return (
<div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
  {loading ? (
    <div className="flex justify-center items-center h-64">
      <div className="spinner-icon">
        <FaBoxes size={50} color="#1D4ED8" />
      </div>
    </div>
  ) : data.length === 0 ? (
    <div className="flex justify-center items-center h-64">
      <h2 className="text-gray-500 text-xl font-semibold">No Items Found</h2>
    </div>
  ) : (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial No.</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((ele) => (
            <tr key={ele._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <img
                  src={`http://localhost:3001${ele.image}`}
                  alt={ele.name}
                  className="w-16 h-16 object-cover rounded-lg border-none"
                />
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900 truncate w-40">{ele.name}</div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ele.serial_number}</td>

              <td className="px-6 py-4 whitespace-nowrap text-center">{ele.quantity}</td>

              <td className="px-6 py-4 whitespace-nowrap text-center font-semibold text-blue-600">${ele.price}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

  );
};

export default AllProduct;