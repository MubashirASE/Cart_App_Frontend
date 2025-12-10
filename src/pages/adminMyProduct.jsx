import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contextData/CartContext.jsx";
import { toast } from "react-toastify";
import API_URL from "../api/api.js";

const AdminMyProduct = () => {
  const { userData } = useCart();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await API_URL.get("/products/");
      const filtered = res.data.filter(e => e.user._id === userData?.user?.id);
      setData(filtered);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const updateProd = (ele) => {
    navigate("/admin/adminUpdateProduct", { state: ele });
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between">       
        <h1 className="text-2xl font-bold text-gray-800 ">My Products</h1>
         <button
                        onClick={() => updateProd()}
                        className="inline-flex items-center px-2 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm focus:outline-none "
                      >
                        Add Product
                      </button>
</div>
     
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="spinner"></div>
        </div>
      ) : data.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <h2 className="text-gray-500 text-xl font-semibold">No Items Found</h2>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">

              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Serial No.
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {data?.map((ele) => (
                  <tr key={ele._id} className="hover:bg-gray-50">
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={`http://localhost:3001${ele.image}`}
                        alt={ele.name}
                        className="w-14 h-14 object-cover rounded-lg border-none"
                      />
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 truncate w-40">
                        {ele.name}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {ele.serial_number}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {ele.quantity}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-center font-semibold text-blue-600">
                      ${ele.price}
                    </td>

                    <td className="px-6 py-4 text-center whitespace-nowrap space-x-2">
                      <button
                        onClick={() => updateProd(ele)}
                        className="inline-flex items-center px-2 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-sm focus:outline-none"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => updateProd(ele)}
                        className="inline-flex items-center px-2 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm focus:outline-none"
                      >
                        Delete 
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMyProduct;
