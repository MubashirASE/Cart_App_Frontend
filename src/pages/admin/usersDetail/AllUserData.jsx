import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API_URL from "../../../api/api";
import { useCart } from "../../../contextData/CartContext";
import { FaPaperPlane, FaUserCheck, FaUserSlash } from "react-icons/fa";
import { MdRemoveShoppingCart, MdShoppingCart } from "react-icons/md";
import Modal from "../../../components/common/popup.jsx";
import PageHeader from "../../../components/common/PageHeader.jsx";
import Table from "../../../components/common/Table.jsx";
import IconButton from "../../../components/common/IconButton.jsx";

const AllUserData = () => {
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
      setCart(cartData.data.cart);
    } catch (error) {
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
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    allfetchData();
  }, []);

  useEffect(() => {
    setloading(true);
    if (cart?.length > 0 || member?.length > 0) {
      setloading(false);
    }
  }, [cart, member]);

  const tableHeaders = [
    { label: "Name" },
    { label: "Email" },
    { label: "Cart Items" },
    { label: "Action", className: "text-center" },
    { label: "Mail", className: "text-center" },
  ];

  const renderRow = (user) => {
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
                <MdShoppingCart
                  className="w-5 h-5 text-amber-500 cursor-pointer"
                  title="Has items in cart"
                  onClick={() => {
                    setSelectedCartItems(cartItems);
                    setOpenModal(true);
                  }}
                />
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
            <IconButton
              onClick={() => handleBlock(user._id, user.isBlocked)}
              icon={user.isBlocked ? FaUserSlash : FaUserCheck}
              variant={user.isBlocked ? "danger" : "success"}
              className="rounded-full"
              title={user.isBlocked ? "Unblock User" : "Block User"}
            />
          ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              Restricted
            </span>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-center">
          <IconButton
            onClick={() => handleSendMail(user._id)}
            icon={FaPaperPlane}
            variant={user.isBlocked ? "primary" : "secondary"}
            disabled={user.isBlocked !== true}
            className={`rounded-full ${user.isBlocked !== true ? "opacity-30 cursor-not-allowed" : ""}`}
            title="Send Mail"
          />
        </td>
      </tr>
    );
  };

  return (
    <div className="p-8 space-y-6">
      <PageHeader title="All User Details" />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="spinner"></div>
          </div>
        ) : (
          <Table headers={tableHeaders} data={member || []} renderRow={renderRow} />
        )}
      </div>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div className="bg-white overflow-y-auto max-h-[80vh]">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Cart Items</h2>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Serial No.</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Qty</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Price</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {selectedCartItems.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={item.productId?.image}
                      alt={item.productId?.name}
                      className="w-12 h-12 object-cover rounded-lg"
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
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
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
  );
};

export default AllUserData;
