import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API_URL from "../api/api";
import { useCart } from "../contextData/CartContext";

export const AdminUserData = () => {
  const { userData } = useCart()
  const [member, setMember] = useState([]);
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState([]);
    const [loading, setloading] = useState(false);
  
  const allfetchData = async () => {
    try {
      const userData = await API_URL.get(`/user/allUserData`);
      setMember(userData.data.data);

      const productData = await API_URL.get(`/products/userProducts`);
      setProduct(productData.data.products);

      const cartData = await API_URL.get(`/cart/allfetchCart`);
      console.log(cartData.data.cart);
      setCart(cartData.data.cart);
    } catch (error) {
      // toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const handleBlock = async (userId, currentStatus) => {
    try {
      let res;
      if (!currentStatus) {
        res = await API_URL.patch(`/user/userBlocked/${userId}`);
      } else {
        res = await API_URL.patch(`/user/userUnBlocked/${userId}`);
      }

      toast.success(res.data.message);

      setMember((prev) =>
        prev.map((u) =>
          u._id === userId ? { ...u, isBlocked: !currentStatus } : u
        )
      );
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    allfetchData();
  }, []);
useEffect(() => {
    setloading(true);
    if (cart?.length > 0) {
      setloading(false);
    }
  }, [cart])
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">
        All User Details
      </h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="spinner"></div>
        </div>
      ) : (

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cart Items
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {member?.map((user) => {
                const userCart = cart?.filter((c) => c.user === user._id);
                const cartItems = userCart?.[0]?.items || [];

                return (
                  <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {cartItems.length > 0 ? (
                          <div className="space-y-1">
                            {cartItems.map((item) => (
                              <div key={item._id} className="flex items-center space-x-2">
                                <span className="font-medium text-blue-600">{item.productId?.name}</span>
                                <span className="text-gray-400 text-xs">x{item.quantity}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-400 italic">Empty Cart</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {userData.isBlocked !== true ? (
                        <button
                          onClick={() => handleBlock(user._id, user.isBlocked)}
                          className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors
                            ${user.isBlocked
                              ? "bg-green-600 hover:bg-green-700 focus:ring-green-500"
                              : "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                            }`}
                        >
                          {user.isBlocked ? "Unblock User" : "Block User"}
                        </button>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Restricted
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>)}
      </div>
    </div>
  );
};

export default AdminUserData;