import React from "react";
import Modal from "../../../../components/common/popup.jsx";
import AdminCreateProduct from "../CreateProduct/CreateProduct.jsx";
import AdminUpdateProduct from "../UpdateProduct/UpdateProduct.jsx";
import { BiPencil } from "react-icons/bi";
import { BsTrash2 } from "react-icons/bs";
import useMyProduct from "../../../../hooks/useMyProduct";
import PageHeader from "../../../../components/common/PageHeader.jsx";
import Table from "../../../../components/common/Table.jsx";
import Button from "../../../../components/common/Button.jsx";
import IconButton from "../../../../components/common/IconButton.jsx";

const MyProduct = () => {
  const {
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
  } = useMyProduct();

  const tableHeaders = [
    { label: "Image" },
    { label: "Name" },
    { label: "Serial No." },
    { label: "Quantity", className: "text-center" },
    { label: "Price", className: "text-center" },
    ...((!showAllProducts || userData?.user?.role === "superAdmin")
      ? [{ label: "Action", className: "text-center" }]
      : []),
  ];

  const renderRow = (ele) => (
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
          <IconButton
            onClick={() => handleEdit(ele)}
            icon={BiPencil}
            variant="primary"
          />
          <IconButton
            onClick={() => handleDelete(ele)}
            icon={BsTrash2}
            variant="danger"
          />
        </td>
      )}
    </tr>
  );

  return (
    <div className="min-h-screen py-12 px-4 bg-gray-50">
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
          <Table
            headers={tableHeaders}
            data={data}
            renderRow={renderRow}
          />
        )}
      </div>
    </div>
  );
};

export default MyProduct;
