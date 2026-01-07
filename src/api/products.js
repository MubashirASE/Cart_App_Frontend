import API_URL from "./api";

export const getProducts = async () => {
  try {
    const res = await API_URL.get("/products/");
    return res.data;
  } catch (error) {
    throw error || error.response?.data?.message || error.message || "Failed to fetch products";
   
  }
};

export const addProductToCart = async (productId) => {
  try {
      if(!productId) throw new Error("Product ID not available!");
    const res = await API_URL.post(`/cart/add/${productId}`);
    return res.data;
  } catch (error) {
    throw error || error.response?.data?.message || error.message || "Failed to add to cart";
    
  }
};

export const filterProducts = async (categoryIds) => {
  try {
    if(!categoryIds) throw new Error("Category IDs not available!");
    const res = await API_URL.post(`/products/filter`, {
      categoryIds,
    });
    return res.data;
  } catch (error) {
    throw error || error.response?.data?.message || error.message || "Failed to filter products";
   
  }
};

export const createProduct = async (formData) => {
  try {
      if(!formData) throw new Error("All fields is required!");

    const res = await API_URL.post("/products/add", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    throw error || error.response?.data?.message || error.message || "Failed to create product";
  
  }
};

export const updateProduct = async (formData) => {
  try {
      if(!formData) throw new Error("All fields is required!");

    const res = await API_URL.patch("/products/update", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    throw error || error.response?.data?.message || error.message || "Failed to update product";
    
  }
};

export const deleteProduct = async (productId) => {
  try {
    
    const res = await API_URL.delete(`/products/delete/${productId}`);
    return res.data;
  } catch (error) {
    throw error || error.response?.data?.message || "Failed to delete product";
    
  }
};

export const getMyProducts = async () => {
  try {
    const res = await API_URL.get("/products/");
    return res.data;
  } catch (error) {
    throw error || error.response?.data?.message || "Failed to fetch my products";
    
  }
};

