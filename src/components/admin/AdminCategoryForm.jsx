
import React, { useEffect, useReducer } from "react";
import { createCategory, getAllCategories } from "../../api/categories";
import { toast } from "react-toastify";
import Input from "../common/Input";
import Button from "../common/Button";
import PageHeader from "../common/PageHeader.jsx";

const initialState = {
  name: "",
  image: null,
  preview: "",
  loading: false,
  categories: [],
  selectedParentCategory: "",
  selectedChildCategory: "",
  isActive: true,
  errors: {},
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value, errors: { ...state.errors, [action.field]: "" } };
    case "SET_IMAGE":
      return { ...state, image: action.payload, preview: URL.createObjectURL(action.payload), errors: { ...state.errors, image: "" } };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_PARENT_CATEGORY":
      return { ...state, selectedParentCategory: action.payload, selectedChildCategory: "", errors: { ...state.errors, category: "" } };
    case "SET_CHILD_CATEGORY":
      return { ...state, selectedChildCategory: action.payload, errors: { ...state.errors, category: "" } };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERRORS":
      return { ...state, errors: action.payload };
    case "RESET_FORM":
      return { ...initialState, categories: state.categories };
    default:
      return state;
  }
};

const AdminCategoryForm = ({ closeModal, onCategoryAdded }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { name, image, preview, loading, categories, selectedParentCategory, selectedChildCategory, isActive, errors } = state;

  const parentCategories = categories.filter((cat) => !cat.parent);
  const childCategories = categories.filter(
    (cat) => cat.parent && String(cat.parent._id) === selectedParentCategory
  );

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      dispatch({ type: "SET_CATEGORIES", payload: Array.isArray(data) ? data : [] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) dispatch({ type: "SET_IMAGE", payload: file });
  };

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Category name is required";
    if (!image && !preview) newErrors.image = "Category image is required";
    // if (!selectedParentCategory) newErrors.category = "Parent category is required";
    // else if (childCategories.length > 0 && !selectedChildCategory) newErrors.category = "Child category is required";

    dispatch({ type: "SET_ERRORS", payload: newErrors });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("isActive", isActive ? "true" : "false");

    if (selectedChildCategory) formData.append("parent", selectedChildCategory);
    else if (selectedParentCategory) formData.append("parent", selectedParentCategory);

    if (image) formData.append("image", image);

    dispatch({ type: "SET_LOADING", payload: true });

    try {
      await createCategory(formData);
      toast.success("Category created successfully!");
      onCategoryAdded && onCategoryAdded();
      closeModal();
      dispatch({ type: "RESET_FORM" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating category");
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <div className="p-8 sm:p-8 max-h-[90vh] overflow-y-auto">
      <PageHeader title="Create Category" subtitle="Add new category details below" />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              label="Category Name *"
              type="text"
              value={name}
              placeholder="e.g., Electronics, Fashion, etc."
              onChange={(e) => dispatch({ type: "SET_FIELD", field: "name", value: e.target.value })}
              error={errors.name}
            />

            <div className="mt-4 flex flex-col space-y-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={selectedParentCategory}
                onChange={(e) => dispatch({ type: "SET_PARENT_CATEGORY", payload: e.target.value })}
                className={`w-full px-3 py-2 border rounded-md mb-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.category ? "border-red-500" : "border-gray-300"}`}
              >
                <option value="">-- Select Parent Category --</option>
                {parentCategories.map((parent) => (
                  <option key={parent._id} value={parent._id}>{parent.name}</option>
                ))}
              </select>

              {childCategories.length > 0 && (
                <select
                  value={selectedChildCategory}
                  onChange={(e) => dispatch({ type: "SET_CHILD_CATEGORY", payload: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.category ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">-- Select Child Category --</option>
                  {childCategories.map((child) => (
                    <option key={child._id} value={child._id}>{child.name}</option>
                  ))}
                </select>
              )}

              {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {preview && (
              <div className="w-45 h-40 pt-5">
                <img src={preview} alt="preview" className="w-full h-full object-cover transition-transform duration-300" />
              </div>
            )}
            {errors.image && <p className="text-xs text-red-500 mt-1">{errors.image}</p>}
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category Status</label>
            <p className="text-xs text-gray-500 mt-1">{isActive ? "Category is visible to users" : "Category is hidden from users"}</p>
          </div>
          <button
            type="button"
            onClick={() => dispatch({ type: "SET_FIELD", field: "isActive", value: !isActive })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isActive ? "bg-blue-600" : "bg-gray-300"}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isActive ? "translate-x-6" : "translate-x-1"}`} />
          </button>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" className="flex-1" disabled={loading}>
            {loading ? "Creating..." : "Create Category"}
          </Button>
          <Button type="button" onClick={closeModal} className="flex-1 bg-gray-200 text-gray-700" disabled={loading}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminCategoryForm;
