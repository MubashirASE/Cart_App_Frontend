import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getAllUserData,
  blockUser,
  unblockUser,
  sendMail,
  getAllUserCart,
} from "../../api/admin";
import { useCart } from "../../contextData/useCart";
import Modal from "../../components/common/popup.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";
import Table from "../../components/common/Table.jsx";
import UserRow from "../../components/admin/UserRow.jsx";
import UserCartModalContent from "../../components/admin/UserCartModalContent.jsx";

const AllUserData = () => {
  const { userData } = useCart();
  const [member, setMember] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCartItems, setSelectedCartItems] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const userData = await getAllUserData();
      setMember(userData.data);

      const cartData = await getAllUserCart();
      setCart(cartData.cart);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBlock = async (userId, currentStatus) => {
    try {
      let res;
      if (!currentStatus) {
        res = await blockUser(userId);
        toast.error(res.message);
      } else {
        res = await unblockUser(userId);
        toast.success(res.message);
      }

      setMember((prev) =>
        prev.map((u) =>
          u._id === userId ? { ...u, isBlocked: !currentStatus } : u
        )
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Error blocking/unblocking user");
    }
  };

  const handleSendMail = async (userId) => {
    try {
      const res = await sendMail(userId);
      toast.success(res.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending mail");
    }
  };

  const tableHeaders = [
    { label: "Name" },
    { label: "Email" },
    { label: "Cart Items" },
    { label: "Action", className: "text-center" },
    { label: "Mail", className: "text-center" },
  ];

  const handleShowCart = (cartItems) => {
    setSelectedCartItems(cartItems);
    setOpenModal(true);
  };

  const renderRow = (user) => {
    const userCart = cart?.filter((c) => c.user === user._id);
    const cartItems = userCart?.[0]?.items || [];

    return (
      <UserRow
        key={user._id}
        user={user}
        cartItems={cartItems}
        onShowCart={handleShowCart}
        onBlock={handleBlock}
        onSendMail={handleSendMail}
        currentUser={userData}
      />
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
          <Table
            headers={tableHeaders}
            data={member || []}
            renderRow={renderRow}
          />
        )}
      </div>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <UserCartModalContent cartItems={selectedCartItems} />
      </Modal>
    </div>
  );
};

export default AllUserData;
