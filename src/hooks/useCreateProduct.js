import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../api/api";
import { toast } from "react-toastify";

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
        errors: { ...state.errors, [action.field]: "" }, // Clear error on change
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

const useCreateProduct = (closeModal, onProductAdded) => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const navigate = useNavigate();

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
    else if (Number(price) <= 0) newErrors.price = "Price must be greater than 0";
    if (!quantity) newErrors.quantity = "Quantity is required";
    else if (Number(quantity) <= 0) newErrors.quantity = "Quantity must be greater than 0";
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

      const res = await API_URL.post("/products/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res.data);

      toast.success("Product Created Successfully!");
      closeModal();
      if (onProductAdded) onProductAdded();

      dispatch({ type: "SET_LOADING", payload: false });
      dispatch({ type: "RESET_FORM" });
      return res.data;
    } catch (error) {
      dispatch({ type: "SET_LOADING", payload: false });
      toast.error(error.response?.data?.message || "Error creating product");
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await API_URL.get("/category/user/all");
      dispatch({
        type: "SET_CATEGORIES",
        payload: Array.isArray(data.data.categories)
          ? data.data.categories
          : [],
      });
    } catch (error) {
      toast.error(error.message || "Error fetching categories");
      console.error("Error fetching categories:", error);
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

  const setName = (value) => dispatch({ type: "SET_FIELD", field: "name", value });
  const setPrice = (value) => dispatch({ type: "SET_FIELD", field: "price", value });
  const setQuantity = (value) => dispatch({ type: "SET_FIELD", field: "quantity", value });
  const setSerial_number = (value) => dispatch({ type: "SET_FIELD", field: "serial_number", value });
  const setSelectedParentCategory = (value) => dispatch({ type: "SET_PARENT_CATEGORY", payload: value });
  const setSelectedCategory = (value) => dispatch({ type: "SET_CHILD_CATEGORY", payload: value });

  return {
    name,
    setName,
    price,
    setPrice,
    quantity,
    setQuantity,
    serial_number,
    setSerial_number,
    image,
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
  };
};

export default useCreateProduct;
