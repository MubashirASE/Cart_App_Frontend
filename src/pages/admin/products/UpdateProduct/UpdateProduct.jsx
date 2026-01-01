import React from "react";
import Input from "../../../../components/common/Input";
import Button from "../../../../components/common/Button";
import SkeletonLoader from "../../../../components/common/SkeletonLoader";
import useUpdateProduct from "../../../../hooks/useUpdateProduct";

const UpdateProduct = ({ closeModal, onProductAdded, productData }) => {
  const {
    loading,
    name,
    setName,
    price,
    setPrice,
    quantity,
    setQuantity,
    serial_number,
    setSerialNumber,
    preview,
    parentCategories,
    childCategories,
    selectedParentCategory,
    setSelectedParentCategory,
    selectedCategory,
    setSelectedCategory,
    handleImageChange,
    handleUpdate,
  } = useUpdateProduct(closeModal, onProductAdded, productData);

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="p-4">
      <div className="flex justify-center items-center flex-col pb-5">
        <h1 className="text-3xl font-extrabold text-blue-600">Update Product</h1>
        <p className="mt-2 text-sm text-gray-400">Modify product details below</p>
            </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
        <div className="space-y-2">
          <Input label="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          <Input label="Quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          <Input label="Serial Number" type="text" value={serial_number} onChange={(e) => setSerialNumber(e.target.value)} />

              <div className="flex flex-col mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={selectedParentCategory}
                  onChange={(e) => {
                    setSelectedParentCategory(e.target.value);
                    setSelectedCategory("");
                  }}
                  className="border border-gray-300 px-3 py-2 rounded-md mb-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">-- Select Parent Category --</option>
                  {parentCategories.map((parent) => (
                <option key={parent._id} value={parent._id}>{parent.name}</option>
                  ))}
                </select>

                {childCategories.length > 0 && (
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">-- Select Child Category --</option>
                    {childCategories.map((child) => (
                  <option key={child._id} value={child._id}>{child.name}</option>
                    ))}
                  </select>
                )}
            </div>
          </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {preview && <img src={preview} alt="preview" className="w-70 h-60 object-cover rounded-lg" />}
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <button onClick={handleUpdate} className="w-full md:w-1/2 py-2 px-8 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg" >
          Update Product
        </button>
      </div>
    </div>
  );
};

export default UpdateProduct;
