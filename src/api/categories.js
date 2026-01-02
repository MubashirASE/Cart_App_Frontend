import API_URL from "./api";

export const getAllCategories = async () => {
  const res = await API_URL.get("/category/user/all");
  return res.data.categories;
};

export const getAllAdminCategories = async () => {
  const res = await API_URL.get("/category/admin/all");
  return res.data.categories;
};

export const createCategory = async (formData) => {
  const res = await API_URL.post("/category", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updateCategory = async (categoryId, formData) => {
  const res = await API_URL.patch(`/category/${categoryId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteCategory = async (categoryId) => {
  const res = await API_URL.delete(`/category/${categoryId}`);
  return res.data;
};

export const toggleCategoryStatus = async (categoryId) => {
  const res = await API_URL.patch(`/category/${categoryId}/disable`);
  return res.data;
};
