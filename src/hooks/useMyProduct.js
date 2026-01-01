import { useEffect, useState } from "react";
import API_URL from "../api/api.js";
import { toast } from "react-toastify";
import { useCart } from "../contextData/CartContext.jsx";

const useMyProduct = () => {
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
      const res = await API_URL.get("/products/");
      const filtered = showAllProducts
        ? res.data
        : res.data.filter((e) => e.user._id === userData?.user?.id);
      setData(filtered);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData?.user?.id) fetchProducts();
  }, [showAllProducts]);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpenUpdateModal(true);
  };

  const handleDelete = async (product) => {
    try {
      const res = await API_URL.delete(`/products/delete/${product._id}`);
      toast.success(res.data.message);
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting product");
    }
  };

  return {
    data,
    loading,
    openCreateModal,
    setOpenCreateModal,
    openUpdateModal,
    setOpenUpdateModal,
    selectedProduct,
    showAllProducts,
    setShowAllProducts,
    fetchProducts,
    handleEdit,
    handleDelete,
    userData,
  };
};

export default useMyProduct;
