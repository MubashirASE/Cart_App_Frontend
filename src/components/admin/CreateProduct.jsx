import React, { useEffect, useReducer } from "react";
import { createProduct } from "../../api/products";
import { getAllCategories } from "../../api/categories";
import { toast } from "react-toastify";
import Input from "../common/Input";
import Button from "../common/Button";
import PageHeader from "../common/PageHeader.jsx";

const initialState = {
  name: "",
  price: "",
  quantity: "",
  serial_number: "",
  image: "",
  preview: "",
  loading: false,
  categories: [],
  selectedParentCategory: "",
  selectedCategory: "",
  errors: {},
};

const formReducer = (state, action) => {
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
        selectedCategory: "",
        errors: { ...state.errors, category: "" },
      };
    case "SET_CHILD_CATEGORY":
      return {
        ...state,
        selectedCategory: action.payload,
        errors: { ...state.errors, category: "" },
      };
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

const CreateProduct = ({ closeModal, onProductAdded }) => {
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
    errors,
  } = state;

  const parentCategories = categories.filter((cat) => !cat.parent);
  const childCategories = categories.filter(
    (cat) => cat.parent && String(cat.parent._id) === selectedParentCategory
  );

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Product name is required";
    if (!price) newErrors.price = "Price is required";
    else if (Number(price) <= 0)
      newErrors.price = "Price must be greater than 0";
    if (!quantity) newErrors.quantity = "Quantity is required";
    else if (Number(quantity) <= 0)
      newErrors.quantity = "Quantity must be greater than 0";
    if (!serial_number) newErrors.serial_number = "Serial number is required";
    if (!image) newErrors.image = "Product image is required";

    if (!selectedParentCategory) {
      newErrors.category = "Category is required";
    } else if (childCategories.length > 0 && !selectedCategory) {
      newErrors.category = "Sub-category is required";
    }

    dispatch({ type: "SET_ERRORS", payload: newErrors });
    return Object.keys(newErrors).length === 0;
  };

  const createdProduct = async (Data) => {
    try {
      const formData = new FormData();
      formData.append("name", Data.name);
      formData.append("price", Data.price);
      formData.append("quantity", Data.quantity);
      formData.append("serial_number", Data.serial_number);
      formData.append("category", Data.selectedCategory);
      formData.append("image", Data.image);

      dispatch({ type: "SET_LOADING", payload: true });

      await createProduct(formData);

      toast.success("Product Created Successfully!");
      closeModal();
      if (onProductAdded) onProductAdded();

      dispatch({ type: "SET_LOADING", payload: false });
      dispatch({ type: "RESET_FORM" });
    } catch (error) {
      dispatch({ type: "SET_LOADING", payload: false });
      toast.error(error.response?.data?.message || "Error creating product");
    }
  };

  const display = () => {
    if (!validate()) return;

    const Data = {
      name,
      price,
      quantity,
      image,
      serial_number,
      selectedCategory: selectedCategory || selectedParentCategory,
    };
    createdProduct(Data);
  };

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      dispatch({
        type: "SET_CATEGORIES",
        payload: Array.isArray(data) ? data : [],
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch({ type: "SET_IMAGE", payload: file });
    }
  };

  const setName = (value) =>
    dispatch({ type: "SET_FIELD", field: "name", value });
  const setPrice = (value) =>
    dispatch({ type: "SET_FIELD", field: "price", value });
  const setQuantity = (value) =>
    dispatch({ type: "SET_FIELD", field: "quantity", value });
  const setSerial_number = (value) =>
    dispatch({ type: "SET_FIELD", field: "serial_number", value });
  const setSelectedParentCategory = (value) =>
    dispatch({ type: "SET_PARENT_CATEGORY", payload: value });
  const setSelectedCategory = (value) =>
    dispatch({ type: "SET_CHILD_CATEGORY", payload: value });

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
