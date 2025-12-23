import { useState, useEffect } from "react";
import API_URL from "../api/api.js";
import { toast } from "react-toastify";

const AdminUpdateProduct = ({ closeModal, onProductAdded, productData }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [selectedParentCategory, setSelectedParentCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState([]);
  const [loading, setloading] = useState(false);

  const parentCategories = categories.filter((cat) => !cat.parent);
  console.log("parentCategories", parentCategories);
  const childCategories = categories.filter(
    (cat) => cat.parent && String(cat.parent._id) === selectedParentCategory
  );
  console.log("childCategories", childCategories, selectedParentCategory);

  useEffect(() => {
    if (productData) {
      setName(productData.name);
      setPrice(productData.price);
      setQuantity(productData.quantity);
      setPreview(`${productData.image}`);
          if (productData.category?.parent) {
      setSelectedParentCategory(productData.category.parent._id);
      setSelectedCategory(productData.category._id);
    }

    }
  }, [productData]);

  const handleUpdate = async () => {
  try {
    if (!selectedCategory) {
      toast.error("Please select a category");
      return;
    }

    const formData = new FormData();
    formData.append("id", productData._id);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("category", selectedCategory);

    if (image) {
      formData.append("image", image);
    }

    const res = await API_URL.patch("/products/update", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    toast.success(res.data.message);
    closeModal();
    onProductAdded?.();
  } catch (error) {
    toast.error(error.response?.data?.message || "Error updating product");
  }
};

  const fetchCategories = async () => {
    setloading(true);
    try {
      const data = await API_URL.get("/category/user/all");
      console.log(data.data.categories);
      setCategories(
        Array.isArray(data.data.categories) ? data.data.categories : []
      );
    } catch (error) {
      toast.error(error.message || "Error fetching categories");
      console.error("Error fetching categories:", error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="p-5">
      <div className="flex justify-center items-center flex-col pb-5">
        <h1 className="text-3xl font-extrabold text-blue-600">
          Update Product
        </h1>
        <p className="mt-2 text-sm text-gray-400">
          Modify product details below
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full ">
        <div className="space-y-4 rounded-lg">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 ">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-white bg-gray-100 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm  font-bold text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 border border-white bg-gray-100 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm  font-bold text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3 py-2 border border-white bg-gray-100 rounded-md"
            />
          </div>
           <div className="flex flex-col ">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={selectedParentCategory}
                  onChange={(e) => {
                    setSelectedParentCategory(e.target.value);
                    setSelectedCategory("");
                  }}
                  className="border border-gray-300 px-3 py-2 rounded-md mb-2"
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
                    className="border border-gray-300 px-3 py-2 rounded-md"
                  >
                    <option value="">-- Select Child Category --</option>
                    {childCategories.map((child) => (
                      <option key={child._id} value={child._id}>
                        {child.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Image
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-70 h-60 object-cover rounded-lg border-none"
            />
          )}
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={handleUpdate}
          className="col-span-1 md:col-span-2 mt-4 w-100 py-2 px-8 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Update Product
        </button>
      </div>
    </div>
  );
};

export default AdminUpdateProduct;
