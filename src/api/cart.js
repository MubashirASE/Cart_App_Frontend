import API_URL from "./api";

export const removeFromCart = async (productId) => {
  const res = await API_URL.delete(`/cart/delete/${productId}`);
  return res.data;
};

export const updateCartQuantity = async (productId, quantity) => {
  const res = await API_URL.patch(`/cart/update/${productId}`, {
    quantity,
  });
  return res.data;
};
