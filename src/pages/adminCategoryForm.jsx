import { useState } from "react";
import { toast } from "react-toastify";
import API_URL from "../api/api"; 

const AdminCategoryForm = ({
  closeModal,
  onCategoryAdded, 
  categoryData = null,
  allCategories = [],
}) => {
  const [name, setName] = useState(categoryData?.name || "");
  const [parent, setParent] = useState(categoryData?.parent?._id || "");
  const [isActive, setIsActive] = useState(categoryData?.isActive ?? true);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const isEditMode = !!categoryData;

  const availableParents = allCategories.filter((cat) => {
    if (!categoryData) return true;
    if (cat._id === categoryData._id) return false;
    let currentParent = cat.parent;
    while (currentParent) {
      if (currentParent._id === categoryData._id) return false;
      currentParent = currentParent.parent;
    }
    return true;
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name.trim());
    if (parent) formData.append("parent", parent);
    formData.append("isActive", isActive);
    if (image) formData.append("image", image);

    setLoading(true);
    try {
      if (isEditMode) {
        await API_URL.patch(`/category/${categoryData._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Category updated successfully!");
      } else {
        await API_URL.post("/category", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Category created successfully!");
      }
      onCategoryAdded && onCategoryAdded();
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error saving category");
      console.error("Category Form Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 sm:p-8 max-h-[90vh] overflow-y-auto">
      <div className="mb-6 ">
        <h1 className="text-center text-3xl font-extrabold text-blue-600">
          {isEditMode ? "Edit Category" : "Create Category"}
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          {isEditMode
            ? "Update category details below"
            : "Add new category details below"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category Name *
              </label>
              <input
                type="text"
                value={name}
                placeholder="e.g., Electronics, Fashion, etc."
                onChange={(e) => setName(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 
              border border-gray-300 placeholder-gray-400 text-gray-900 
              rounded-md focus:outline-none focus:ring-blue-500 
              focus:border-blue-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Parent Category
              </label>
              <select
                value={parent}
                onChange={(e) => setParent(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 
              border border-gray-300 text-gray-900 
              rounded-md focus:outline-none focus:ring-blue-500 
              focus:border-blue-500 sm:text-sm"
              >
                <option value="">None (Root Category)</option>
                {availableParents.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.parent ? `${cat.parent.name} → ` : ""}
                    {cat.name}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-gray-500">
                Leave empty to create a root category
              </p>
            </div>
          </div>
          <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category Image
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
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category Status
            </label>
            <p className="text-xs text-gray-500 mt-1">
              {isActive
                ? "Category is visible to users"
                : "Category is hidden from users"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsActive(!isActive)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isActive ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isActive ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-2 px-4 border border-transparent text-sm font-medium 
              rounded-md text-white bg-blue-600 hover:bg-blue-700 
              focus:outline-none focus:ring-2 focus:ring-offset-2 
              focus:ring-blue-500 transition-colors disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : isEditMode
              ? "Update Category"
              : "Create Category"}
          </button>
          <button
            type="button"
            onClick={closeModal}
            disabled={loading}
            className="flex-1 py-2 px-4 border border-gray-300 text-sm font-medium 
              rounded-md text-gray-700 bg-white hover:bg-gray-50 
              focus:outline-none focus:ring-2 focus:ring-offset-2 
              focus:ring-blue-500 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminCategoryForm;
