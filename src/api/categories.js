import API_URL from "./api";

export const getAllCategories = async () => {
  try {
    const res = await API_URL.get("/category/user/all");
    return res.data.categories;
  } catch (error) {
    throw error || error.response?.data?.message || error.message || "Failed to fetch categories";
  
  }
};

export const getAllAdminCategories = async () => {
  try {
    const res = await API_URL.get("/category/admin/all");
    return res.data.categories;
  } catch (error) {
    throw error || error.response?.data?.message || error.message || "Failed to fetch admin categories";
   
  }
};

export const createCategory = async (formData) => {
  
  try {
    if(!formData) throw new Error("All fields is required!");
    const res = await API_URL.post("/category", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    throw error || error.response?.data?.message || error.message || "Failed to create category";    
  }
};

export const updateCategory = async (categoryId, formData) => {
  try {
      if(!categoryId || !formData) throw new Error("Category ID and all fields is required!");
    const res = await API_URL.patch(`/category/${categoryId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    throw error || error.response?.data?.message || error.message || "Failed to update category";
   
  }
};

export const deleteCategory = async (categoryId) => {
  try {
      if(!categoryId) throw new Error("Category ID not available!");
    const res = await API_URL.delete(`/category/${categoryId}`);
    return res.data;
  } catch (error) {
    throw error || error.response?.data?.message || error.message || "Failed to delete category";
   
  }
};

export const toggleCategoryStatus = async (categoryId) => {
  try {
      if(!categoryId) throw new Error("Category ID not available!");
    const res = await API_URL.patch(`/category/${categoryId}/disable`);
    return res.data;
  } catch (error) {
    throw error || error.response?.data?.message || error.message || "Failed to toggle category status";
   
  }
};

