import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API_URL from "../api/api";
import { useCart } from "../contextData/CartContext";
import { FaPaperPlane, FaShoppingBag, FaUserCheck, FaUserSlash } from "react-icons/fa";
import { MdRemoveShoppingCart, MdSend, MdShoppingCart } from "react-icons/md";
import Modal from "../components/popup";

export const AdminUserData = () => {
  const { userData } = useCart();
  const [member, setMember] = useState([]);
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setloading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCartItems, setSelectedCartItems] = useState([]);

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
        toast.error(res.data.message);
      } else {
        res = await API_URL.patch(`/user/userUnBlocked/${userId}`);
        toast.success(res.data.message);
      }

      setMember((prev) =>
        prev.map((u) =>
          u._id === userId ? { ...u, isBlocked: !currentStatus } : u
        )
      );
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleSendMail = async (userId) => {
    try {
      const res = await API_URL.post(`/user/sendMail/${userId}`);
      toast.success(res.data.message);

      // setMember((prev) =>
      //   prev.map((u) =>
      //     u._id === userId ? { ...u, isBlocked: !currentStatus } : u
      //   )
      // );
    } catch (error) {
      toast.error(error.response.data.message);
      setIsloading(false);
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
  }, [cart]);
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">All User Details</h1>

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
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Cart Items
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Action
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Mail
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {member?.map((user) => {
                  const userCart = cart?.filter((c) => c.user === user._id);
                  const cartItems = userCart?.[0]?.items || [];

                  return (
                    <tr
                      key={user._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {cartItems.length > 0 ? (
                            <div className="space-y-1">
                              <MdShoppingCart
                                className="w-5 h-5 text-amber-500"
                                title="Has items in cart"
                                onClick={() => {
                                  setSelectedCartItems(cartItems);
                                  setOpenModal(true);
                                }}
                              />
                              {cartItems.map((item) => (
                                <div
                                  key={item._id}
                                  className="flex items-center space-x-2"
                                >
                                  {/* //   <span className="font-medium text-blue-600">
                                //     {item.productId?.name}
                                //   </span>
                                //   <span className="text-gray-400 text-xs">
                                //     x{item.quantity}
                                //   </span> */}
                                  {/* <FiShoppingCart
                                    className="w-5 h-5 text-amber-500"
                                    title="Has items in cart"
                                  /> */}

                                  <Modal
                                    open={openModal}
                                    onClose={() => setOpenModal(false)}
                                  >
                                    <div className="bg-white overflow-y-auto">
                                      <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="">
                                          <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                              Image
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                              Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                              Serial No.
                                            </th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                                              Quantity
                                            </th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                                              Price
                                            </th>
                                          </tr>
                                        </thead>

                                        <tbody className="bg-white divide-y divide-gray-200">
                                          {selectedCartItems.map((item) => (
                                            <tr
                                              key={item._id}
                                              className="hover:bg-gray-50"
                                            >
                                              <td className="px-6 py-4 whitespace-nowrap">
                                                <img
                                                  src={`http://localhost:3001${item.productId?.image}`}
                                                  alt={item.productId?.name}
                                                  className="w-14 h-14 object-cover rounded-lg"
                                                />
                                              </td>

                                              <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900 truncate w-40">
                                                  {item.productId?.name}
                                                </div>
                                              </td>

                                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {item.productId?.serial_number}
                                              </td>

                                              <td className="px-6 py-4 whitespace-nowrap text-center">
                                                {item.quantity}
                                              </td>

                                              <td className="px-6 py-4 whitespace-nowrap text-center font-semibold text-blue-600">
                                                ${item.productId?.price}
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </Modal>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-400 italic">
                              <MdRemoveShoppingCart
                                className="w-5 h-5 text-gray-400"
                                title="Empty cart"
                              />
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {userData.isBlocked !== true ? (
                          <button
                            onClick={() =>
                              handleBlock(user._id, user.isBlocked)
                            }
                            className={`inline-flex items-center px-1.5 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors
                            ${user.isBlocked
                                ? "bg-red-100 hover:bg-red-200 "
                                : "bg-green-100 hover:bg-green-200 "
                              }`}
                          >
                            {user.isBlocked ? (
                              <FaUserSlash size={15} className="text-red-600" />
                            ) : (
                              <FaUserCheck
                                size={15}
                                className="text-green-600"
                              />
                            )}
                          </button>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Restricted
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {user.isBlocked !== true ? (
                          <button
                            disabled={true}
                            onClick={() => handleSendMail(user._id)}
                            className="inline-flex items-center px-1.5 py-1.5 rounded-full text-xs font-medium"
                          >
                            <FaPaperPlane className="w-5 h-5 text-gray-200" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleSendMail(user._id)}
                            className="inline-flex items-center px-1.5 py-1.5 rounded-full text-xs font-medium "
                          >
                            <FaPaperPlane className="w-5 h-5 text-gray-500" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUserData;
