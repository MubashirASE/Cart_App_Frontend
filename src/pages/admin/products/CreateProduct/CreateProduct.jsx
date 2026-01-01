import React from "react";
import Input from "../../../../components/common/Input";
import Button from "../../../../components/common/Button";
import useCreateProduct from "../../../../hooks/useCreateProduct";
import PageHeader from "../../../../components/common/PageHeader.jsx";

const CreateProduct = ({ closeModal, onProductAdded }) => {
  const {
    name,
    setName,
    price,
    setPrice,
    quantity,
    setQuantity,
    serial_number,
    setSerial_number,
    loading,
    preview,
    parentCategories,
    childCategories,
    selectedParentCategory,
    setSelectedParentCategory,
    selectedCategory,
    setSelectedCategory,
    handleImageChange,
    display,
    errors,
  } = useCreateProduct(closeModal, onProductAdded);

  return (
    <div className="">
      <div className="space-y-8 p-4">
        <PageHeader
          title="Create Product"
          subtitle="Add new product details below"
        />

        <div className="mt-8 space-y-6">
          <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Image
              </label>
              <input
                type="file"
                onChange={handleImageChange}
                className={`block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100 `}
              />
              {errors.image && <p className="mt-1 text-xs text-red-500">{errors.image}</p>}
              {preview && (
                <div className="w-45 h-40 pt-5">
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full h-full object-cover justify-center transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
            </div>
            <div>
              <Input
                label="Name"
                type="text"
                value={name}
                placeholder="Product name"
                onChange={(e) => setName(e.target.value)}
                error={errors.name}
              />

              <Input
                label="Price"
                type="number"
                value={price}
                placeholder="Enter price"
                onChange={(e) => setPrice(e.target.value)}
                error={errors.price}
              />

              <Input
                label="Quantity"
                type="number"
                value={quantity}
                placeholder="Enter quantity"
                onChange={(e) => setQuantity(e.target.value)}
                error={errors.quantity}
              />

              <Input
                label="Serial Number"
                type="number"
                value={serial_number}
                placeholder="Enter serial number"
                onChange={(e) => setSerial_number(e.target.value)}
                error={errors.serial_number}
              />

              <div className="flex flex-col mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={selectedParentCategory}
                  onChange={(e) => {
                    setSelectedParentCategory(e.target.value);
                    setSelectedCategory("");
                  }}
                  className={`border px-3 py-2 rounded-md mb-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500  border-gray-300`}
                >
                  <option value="">-- Select Parent Category --</option>
                  {parentCategories.map((parent) => (
                    <option key={parent._id} value={parent._id}>
                      {parent.name}
                    </option>
                  ))}
                </select>

                {childCategories.length > 0 && (
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className={`border px-3 py-2 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.category ? "border-red-500" : "border-gray-300"}`}
                  >
                    <option value="">-- Select Child Category --</option>
                    {childCategories.map((child) => (
                      <option key={child._id} value={child._id}>
                        {child.name}
                      </option>
                    ))}
                  </select>
                )}
                {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category}</p>}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={display}
              className="col-span-1 md:col-span-2 mt-4 w-100 py-2 px-8 shadow-md"
            >
              {loading === true ? "Creating..." : "Create Product"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
