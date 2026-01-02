import API_URL from "./api";

export const placeOrder = async (orderData) => {
  const res = await API_URL.post("/order/placeOrder", orderData);
  return res.data;
};
