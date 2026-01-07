import React, { useReducer, useEffect } from "react";
import { getAllCategories, updateCategory } from "../../api/categories";
import { toast } from "react-toastify";
import PageHeader from "../common/PageHeader";
import Input from "../common/Input";
import Button from "../common/Button";
import SkeletonLoader from "../common/SkeletonLoader";

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

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
        errors: { ...state.errors, [action.field]: "" },
      };

    case "SET_IMAGE":
      return {
        ...state,
        image: action.payload,
        preview: URL.createObjectURL(action.payload),
        errors: { ...state.errors, image: "" },
      };

    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };

    case "SET_PARENT_CATEGORY":
      return {
        ...state,
        selectedParentCategory: action.payload,
        selectedChildCategory: "",
        errors: { ...state.errors, category: "" },
      };

    case "SET_CHILD_CATEGORY":
      return {
        ...state,
        selectedChildCategory: action.payload,
        errors: { ...state.errors, category: "" },
      };

    case "INIT_FORM":
      return {
        ...state,
        name: action.payload.name || "",
        preview: action.payload.image || "",
        isActive: action.payload.isActive ?? true,
        selectedParentCategory: action.payload.parent?.parent
          ? action.payload.parent.parent
          : action.payload.parent?._id || "",
        selectedChildCategory: action.payload.parent?.parent
          ? action.payload.parent._id
          : "",
      };

    case "SET_ERRORS":
      return { ...state, errors: action.payload };

    case "SET_LOADING":
      return { ...state, loading: action.payload };

    default:
      return state;
  }
};

const UpdateCategoryForm = ({ categoryData, closeModal, onCategoryAdded }) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    categories: [],
    loading: true,
  });

  const {
    name,
    image,
    preview,
    loading,
    categories,
    selectedParentCategory,
    selectedChildCategory,
    isActive,
    errors,
  } = state;

  const parentCategories = categories.filter((c) => !c.parent);
  const childCategories = categories.filter(
    (c) => c.parent && String(c.parent._id) === selectedParentCategory
  );

  useEffect(() => {
    if (categoryData) {
      dispatch({ type: "INIT_FORM", payload: categoryData });
    }
  }, [categoryData]);

  useEffect(() => {
    if (!categoryData || categories.length === 0) return;

    const categoryId = categoryData._id;
    const fullCategory = categories.find((c) => c._id === categoryId);
    console.log(fullCategory);
    if (!fullCategory) return;

    if (fullCategory.parent) {
      const parentId = fullCategory.parent._id || fullCategory.parent;
      dispatch({
        type: "SET_PARENT_CATEGORY",
        payload: parentId,
      });
      dispatch({
        type: "SET_CHILD_CATEGORY",
        payload: fullCategory._id,
      });
    } else {
      dispatch({
        type: "SET_PARENT_CATEGORY",
        payload: fullCategory._id,
      });
      dispatch({
        type: "SET_CHILD_CATEGORY",
        payload: "",
      });
    }
  }, [categoryData, categories]);
  useEffect(() => {
    dispatch({ type: "SET_LOADING", payload: true });

    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        dispatch({ type: "SET_CATEGORIES", payload: data || [] });
      } catch (error) {
        toast.error("Error fetching categories", error);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };
    fetchCategories();
  }, []);

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = "Category name is required";

    if (!selectedParentCategory) {
      errs.category = "Parent category is required";
    }

    dispatch({ type: "SET_ERRORS", payload: errs });
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("parent", selectedChildCategory || selectedParentCategory);
    formData.append("isActive", isActive ? "true" : "false");
    if (image) formData.append("image", image);

    try {
      dispatch({ type: "SET_LOADING", payload: true });
      await updateCategory(categoryData._id, formData);
      toast.success("Category updated successfully");
      onCategoryAdded?.();
      closeModal();
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="p-8 sm:p-8 overflow-y-auto">
      <PageHeader
        title="Update Category"
        subtitle="Update category details below"
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              label="Category Name *"
              type="text"
              value={name}
              placeholder="e.g., Electronics, Fashion, etc."
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "name",
                  value: e.target.value,
                })
              }
              error={errors.name}
            />

            <div className="mt-4 flex flex-col space-y-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>

              <select
                value={selectedParentCategory}
                onChange={(e) =>
                  dispatch({
                    type: "SET_PARENT_CATEGORY",
                    payload: e.target.value,
                  })
                }
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                  errors.category ? "border-red-500" : "border-gray-300"
                }`}
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
                  value={selectedChildCategory}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_CHILD_CATEGORY",
                      payload: e.target.value,
                    })
                  }
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">-- Select Child Category --</option>
                  {childCategories.map((child) => (
                    <option key={child._id} value={child._id}>
                      {child.name}
                    </option>
                  ))}
                </select>
              )}

              {errors.category && (
                <p className="text-xs text-red-500 mt-1">{errors.category}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Image
            </label>
            <input
              type="file"
              onChange={(e) =>
                dispatch({
                  type: "SET_IMAGE",
                  payload: e.target.files[0],
                })
              }
              className="block w-full text-sm text-gray-500"
            />

            {preview && (
              <div className="w-45 h-40 pt-5">
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {errors.image && (
              <p className="text-xs text-red-500 mt-1">{errors.image}</p>
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
            onClick={() =>
              dispatch({
                type: "SET_FIELD",
                field: "isActive",
                value: !isActive,
              })
            }
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
          <Button type="submit" className="flex-1" disabled={loading}>
            {loading ? "Updating..." : "Update Category"}
          </Button>
          <Button
            type="button"
            onClick={closeModal}
            className="flex-1 bg-gray-200 text-gray-700"
            disabled={loading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCategoryForm;
