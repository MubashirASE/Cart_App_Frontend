import React, { useEffect, useState } from "react";
import { getMyProducts, deleteProduct } from "../../../api/products";
import { toast } from "react-toastify";
import { useCart } from "../../../contextData/useCart";
import Modal from "../../../components/common/popup.jsx";
import AdminCreateProduct from "./CreateProduct.jsx";
import AdminUpdateProduct from "./UpdateProduct.jsx";
import PageHeader from "../../../components/common/PageHeader.jsx";
import Button from "../../../components/common/Button.jsx";
import ProductTable from "../../../components/admin/ProductTable.jsx";

const MyProduct = () => {
  const { userData } = useCart();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAllProducts, setShowAllProducts] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getMyProducts();
      const filtered = showAllProducts
        ? res
        : res.filter((e) => e.user._id === userData?.user?.id);
      setData(filtered);
    } catch (err) {
      console.error(err);
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

  const handleDelete = async (product) => {
    try {
      const res = await deleteProduct(product._id);
      toast.success(res.message || "Product deleted successfully!");
      fetchProducts();
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

export default MyProduct;
