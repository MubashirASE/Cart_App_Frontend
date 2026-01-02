import API_URL from "./api";

export const getProducts = async () => {
  const res = await API_URL.get("/products/");
  return res.data;
};

export const addProductToCart = async (productId) => {
  const res = await API_URL.post(`/cart/add/${productId}`);
  return res.data;
};

export const filterProducts = async (categoryIds) => {
  const res = await API_URL.post(`/products/filter`, {
    categoryIds,
  });
  return res.data;
};

export const createProduct = async (formData) => {
  const res = await API_URL.post("/products/add", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updateProduct = async (formData) => {
  const res = await API_URL.patch("/products/update", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteProduct = async (productId) => {
  const res = await API_URL.delete(`/products/delete/${productId}`);
  return res.data;
};

export const getMyProducts = async () => {
  const res = await API_URL.get("/products/");
  return res.data;
};
