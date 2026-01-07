import React, { useReducer, useEffect } from "react";
import { updateProduct } from "../../api/products";
import { getAllCategories } from "../../api/categories";
import { toast } from "react-toastify";
import Input from "../common/Input";
import SkeletonLoader from "../common/SkeletonLoader";

const initialState = {
  name: "",
  price: "",
  quantity: "",
  serial_number: "",
  image: null,
  preview: "",
  loading: true,
  categories: [],
  selectedParentCategory: "",
  selectedCategory: "",
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_IMAGE":
      return {
        ...state,
        image: action.payload,
        preview: URL.createObjectURL(action.payload),
      };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_PARENT_CATEGORY":
      return {
        ...state,
        selectedParentCategory: action.payload,
        selectedCategory: "",
      };
    case "SET_CHILD_CATEGORY":
      return { ...state, selectedCategory: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "INITIALIZE_FORM":
      return {
        ...state,
        name: action.payload.name || "",
        price: action.payload.price || "",
        quantity: action.payload.quantity || "",
        serial_number: action.payload.serial_number || "",
        preview: action.payload.image || "",
      };
    case "SET_CATEGORY_SELECTION":
      return {
        ...state,
        selectedParentCategory: action.payload.parent,
        selectedCategory: action.payload.child,
      };
    default:
      return state;
  }
};

const UpdateProduct = ({ closeModal, onProductAdded, productData }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const {
    name,
    price,
    quantity,
    serial_number,
    image,
    preview,
    loading,
    categories,
    selectedParentCategory,
    selectedCategory,
  } = state;

  const parentCategories = categories.filter((cat) => !cat.parent);
  const childCategories = categories.filter(
    (cat) => String(cat.parent?._id || cat.parent) === selectedParentCategory
  );

  useEffect(() => {
    if (productData) {
      dispatch({ type: "INITIALIZE_FORM", payload: productData });
    }
  }, [productData]);

  useEffect(() => {
    if (!productData || categories.length === 0) return;

    const catId = productData.category?._id || productData.category;
    const fullCategory = categories.find((c) => c._id === catId);
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
  }, [productData, categories]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        dispatch({
          type: "SET_CATEGORIES",
          payload: data || [],
        });
      } catch (error) {
        toast.error("Error fetching categories", error);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch({ type: "SET_IMAGE", payload: file });
    }
  };

  const handleUpdate = async () => {
    try {
      const finalCategory = selectedCategory || selectedParentCategory;
      if (!finalCategory) {
        toast.error("Please select a category");
        return;
      }

      const formData = new FormData();
      formData.append("id", productData._id);
      formData.append("name", name);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("serial_number", serial_number);
      formData.append("category", finalCategory);

      if (image) formData.append("image", image);

      const res = await updateProduct(formData);

      toast.success(res.message || "Product updated successfully!");
      closeModal();
      onProductAdded?.();
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  const setName = (value) =>
    dispatch({ type: "SET_FIELD", field: "name", value });
  const setPrice = (value) =>
    dispatch({ type: "SET_FIELD", field: "price", value });
  const setQuantity = (value) =>
    dispatch({ type: "SET_FIELD", field: "quantity", value });
  const setSerialNumber = (value) =>
    dispatch({ type: "SET_FIELD", field: "serial_number", value });
  const setSelectedParentCategory = (value) =>
    dispatch({ type: "SET_PARENT_CATEGORY", payload: value });
  const setSelectedCategory = (value) =>
    dispatch({ type: "SET_CHILD_CATEGORY", payload: value });

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="p-4">
      <div className="flex justify-center items-center flex-col pb-5">
        <h1 className="text-3xl font-extrabold text-blue-600">
          Update Product
        </h1>
        <p className="mt-2 text-sm text-gray-400">
          Modify product details below
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
        <div className="space-y-2">
          <Input
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <Input
            label="Serial Number"
            type="text"
            value={serial_number}
            onChange={(e) => setSerialNumber(e.target.value)}
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
              className="border border-gray-300 px-3 py-2 rounded-md mb-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Image
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-70 h-60 object-cover rounded-lg"
            />
          )}
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={handleUpdate}
          className="w-full md:w-1/2 py-2 px-8 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
        >
          Update Product
        </button>
      </div>
    </div>
  );
};

export default UpdateProduct;
