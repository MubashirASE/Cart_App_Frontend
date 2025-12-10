import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../contextData/CartContext.jsx";
import { toast } from "react-toastify";
import API_URL from "../api/api.js";
const AdminAllProduct= () => {
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

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.map((ele) => (
            <div
              key={ele._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col"
            >
              <div className="relative group">
                <img
                  src={`http://localhost:3001${ele.image}`}
                  alt={ele.name}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
              </div>

              <div className="p-4 flex-grow flex flex-col">
                <h3 className="font-semibold text-lg text-gray-800 truncate mb-1" title={ele.name}>
                  {ele.name}
                </h3>
                <p className="text-sm text-gray-500 mb-3 truncate">
                  <span className="font-medium">Serial:</span> {ele.serial_number}
                </p>

                <div className="mt-auto flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Qty:</span> {ele.quantity}
                  </div>
                  <div className="text-lg font-bold text-blue-600">
                    ${ele.price}
                  </div>
                </div>

                
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

  );
};

export default AdminAllProduct;