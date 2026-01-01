import { useReducer, useEffect } from "react";
import API_URL from "../api/api";
import { toast } from "react-toastify";

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

const useUpdateProduct = (closeModal, onProductAdded, productData) => {
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
    if (productData && categories.length > 0) {
      const catId = productData.category?._id || productData.category;
      const fullCategory = categories.find((c) => c._id === catId);

      if (fullCategory) {
        if (fullCategory.parent) {
          const parentId = fullCategory.parent._id || fullCategory.parent;
          dispatch({
            type: "SET_CATEGORY_SELECTION",
            payload: { parent: parentId, child: fullCategory._id },
          });
        } else {
          dispatch({
            type: "SET_CATEGORY_SELECTION",
            payload: { parent: fullCategory._id, child: "" },
          });
        }
      }
    }
  }, [productData, categories]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API_URL.get("/category/user/all");
        dispatch({
          type: "SET_CATEGORIES",
          payload: res.data.categories || [],
        });
      } catch (error) {
        toast.error("Error fetching categories");
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

      const res = await API_URL.patch("/products/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(res.data.message);
      closeModal();
      onProductAdded?.();
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  const setName = (value) => dispatch({ type: "SET_FIELD", field: "name", value });
  const setPrice = (value) => dispatch({ type: "SET_FIELD", field: "price", value });
  const setQuantity = (value) => dispatch({ type: "SET_FIELD", field: "quantity", value });
  const setSerialNumber = (value) => dispatch({ type: "SET_FIELD", field: "serial_number", value });
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
    loading,
  };
};

export default useUpdateProduct;
