import React, { useEffect, useState } from "react";
import { getAllAdminData, blockUser, unblockUser } from "../../api/admin";
import { getProducts } from "../../api/products";
import { toast } from "react-toastify";
import Modal from "../../components/common/popup.jsx";
import CreateAdmin from "../../components/admin/CreateAdmin.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";
import Table from "../../components/common/Table.jsx";
import Button from "../../components/common/Button.jsx";
import AdminRow from "../../components/admin/AdminRow.jsx";

const AdminDetails = () => {
  const [product, setProduct] = useState();
  const [member, setMember] = useState();
  const [loading, setLoading] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const fetchData = async () => {
    try {
      const adminData = await getAllAdminData();
      setMember(adminData.data);
      const products = await getProducts();
      setProduct(products);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting product");
    }
  };
  const handleBlock = async (userId, currentStatus) => {
    try {
      let res;
      if (!currentStatus) {
        res = await blockUser(userId);
        console.log(res)
        toast.error("Admin Blocked Successfully!");
      } else {
        res = await unblockUser(userId);
        toast.success("Admin Unblocked Successfully!");
      }

      setMember((prev) =>
        prev.map((u) =>
          u._id === userId ? { ...u, isBlocked: !currentStatus } : u
        )
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setLoading(true);
    if (product?.length > 0) {
      setLoading(false);
    }
  }, [product]);

  const tableHeaders = [
    { label: "Name" },
    { label: "Email" },
    { label: "Total Products", className: "text-center" },
    { label: "Product Names" },
    { label: "Action", className: "text-center" },
  ];

  const renderRow = (admin) => (
    <AdminRow
      key={admin._id}
      admin={admin}
      products={product}
      onBlock={handleBlock}
    />
  );

  return (
    <div className="p-8 space-y-6">
      <PageHeader
        title="All Admins Details"
        action={
          <Button onClick={() => setOpenCreateModal(true)}>
            Add Admin
          </Button>
        }
      />
      <Modal open={openCreateModal} onClose={() => setOpenCreateModal(false)}>
        <CreateAdmin
          closeModal={() => setOpenCreateModal(false)}
          fetchData={fetchData}
        />
      </Modal>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="spinner "></div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <Table
            headers={tableHeaders}
            data={member || []}
            renderRow={renderRow}
          />
        </div>
      )}
    </div>
  );
};

export default AdminDetails;
