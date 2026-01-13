import { getAllOrders, updateOrderStatus } from "../../api/orders.js";
import Modal from "../../components/common/popup.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";
import Table from "../../components/common/Table.jsx";
import OrderRow from "../../components/admin/OrderRow.jsx";
import OrderDetailsModal from "../../components/admin/OrderDetailsModal.jsx";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const orderData = await getAllOrders();
      console.log("Fetched Orders:", orderData);
      setOrders(Array.isArray(orderData) ? orderData : orderData.orders || []);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateStatus = async (orderId, newStatus) => {
    console.log(orderId, newStatus);
    try {
      await updateOrderStatus(orderId, newStatus);
      toast.success(`Order status updated to ${newStatus}`);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, orderStatus: newStatus } : order
        )
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setOpenModal(true);
  };

  const tableHeaders = [
    { label: "Name" },
    { label: "Contact" },
    { label: "Total Amount" },
    { label: "Method", className: "text-center" },
    { label: "Status" },
    { label: "Date" },
    { label: "Actions", className: "text-center" },
  ];

  const renderRow = (order) => (
    <OrderRow
      key={order._id}
      order={order}
      onViewDetails={handleViewDetails}
      onUpdateStatus={handleUpdateStatus}
    />
  );

  return (
    <div className="p-4 md:p-8 space-y-6">

      <PageHeader title="Order Management" />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="spinner "></div>
          </div>
        ) : (
          <Table headers={tableHeaders} data={orders} renderRow={renderRow} />
        )}
      </div>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setOpenModal(false)}
        />
      </Modal>
    </div>
  );
};

export default AdminOrder;
