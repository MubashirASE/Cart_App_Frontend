import React, { useEffect, useState } from "react";
import { getMyProducts, deleteProduct } from "../../api/products";
import { toast } from "react-toastify";
import { useCart } from "../../contextData/useCart";
import Modal from "../../components/common/popup.jsx";
import AdminCreateProduct from "../../components/admin/CreateProduct.jsx";
import AdminUpdateProduct from "../../components/admin/UpdateProduct.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";
import Button from "../../components/common/Button.jsx";
import ProductTable from "../../components/admin/ProductTable.jsx";
import ConfirmationModal from "../../components/common/ConfirmationModal.jsx";

const AdminProduct = () => {
  const { userData } = useCart();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getMyProducts();
      const filtered = showAllProducts
        ? res
        : res.filter((e) => e.user._id === userData?.user?.id);
      setData(filtered);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData?.user?.id) fetchProducts();
  }, [showAllProducts, userData?.user?.id]);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpenUpdateModal(true);
  };

  const handleDelete = (product) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    try {
      const res = await deleteProduct(productToDelete._id);
      toast.success(res.message || "Product deleted successfully!");
      fetchProducts();
      setDeleteModalOpen(false);
      setProductToDelete(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting product");
    }
  };

  return (
    <div className="min-h-screen py-8 px-8 bg-gray-50">
      <PageHeader
        title="My Products"
        subtitle="Manage all your products below"
        action={
          <div className="space-x-4">
            <Button onClick={() => setOpenCreateModal(true)}>
              Add Product
            </Button>
            <Button onClick={() => setShowAllProducts(!showAllProducts)}>
              {showAllProducts ? "My Products" : "All Products"}
            </Button>
          </div>
        }
      />

      <Modal open={openCreateModal} onClose={() => setOpenCreateModal(false)}>
        <AdminCreateProduct
          closeModal={() => setOpenCreateModal(false)}
          onProductAdded={fetchProducts}
        />
      </Modal>

      <Modal open={openUpdateModal} onClose={() => setOpenUpdateModal(false)}>
        {selectedProduct && (
          <AdminUpdateProduct
            productData={selectedProduct}
            closeModal={() => setOpenUpdateModal(false)}
            onProductAdded={fetchProducts}
          />
        )}
      </Modal>

      <ConfirmationModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Product"
        message="Are you sure you want to delete this product?"
        itemName={productToDelete?.name}
      />

      <div className=" bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
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
            onEdit={handleEdit}
            onDelete={handleDelete}
            showActions={!showAllProducts}
            userData={userData}
          />
        )}
      </div>
    </div>
  );
};

export default AdminProduct;
