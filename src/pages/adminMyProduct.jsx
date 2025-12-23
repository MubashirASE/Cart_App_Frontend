import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contextData/CartContext.jsx";
import { toast } from "react-toastify";
import API_URL from "../api/api.js";
import Modal from "../components/popup.jsx";
import AdminCreateProduct from "./AdminCreateProduct.jsx";
import AdminUpdateProduct from "./AdminUpdateProduct.jsx";
import { BiPencil } from "react-icons/bi";
import { BsTrash2 } from "react-icons/bs";

const AdminMyProduct = () => {
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
  }, [userData, showAllProducts]);

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

  return (
    <div className="min-h-screen py-12 px-4 bg-gray-50">
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-blue-600">My Products</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage all your products below
          </p>
        </div>
        <div className="space-x-4">
          <button
            onClick={() => setOpenCreateModal(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            Add Product
          </button>
          <button
            onClick={() => setShowAllProducts(!showAllProducts)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            {showAllProducts ? "My Products" : "All Products"}
          </button>
        </div>
      </div>

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

      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
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
                  {(!showAllProducts || userData?.user?.role === "superAdmin") && (
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((ele) => (
                  <tr key={ele._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={ele.image}
                        alt={ele.name}
                        className="w-16 h-16 object-cover rounded-lg"
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
                    {(!showAllProducts || userData?.user?.role === "superAdmin") && (
                      <td className="px-6 py-4 text-center space-x-2">
                        <button
                          onClick={() => handleEdit(ele)}
                          className="inline-flex items-center px-2 py-2 text-sm font-medium text-blue-600 bg-blue-100 hover:bg-blue-200 rounded-lg"
                        >
                          <BiPencil />
                        </button>

                        <button
                          onClick={() => handleDelete(ele)}
                          className="inline-flex items-center px-2 py-2 text-sm font-medium text-red-500 bg-red-100 hover:bg-red-200 rounded-lg"
                        >
                          <BsTrash2 />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMyProduct;
