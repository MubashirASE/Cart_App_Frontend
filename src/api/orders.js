import API_URL from "./api";

// export const placeOrder = async (orderData) => {
//   try {
//     if(!orderData) throw new Error("Order data not available!");
//     const res = await API_URL.post("/order/placeOrder", orderData);
//     return res.data;
//   } catch (error) {
//     throw error || "Failed to place order";
    
//   }
// };

export const placeOrder = async (orderData) => {
  try {
    if (!orderData) throw new Error("Order data is required!");
    const res = await API_URL.post("/order/placeOrder", orderData);
    return res.data;
  } catch (error) {
    throw error || error.response?.data?.message || error.message || "Failed to place order";
  }
};

export const getAllOrders = async () => {
  try {
    const res = await API_URL.get("/order/getOrders");
    return res.data;
  } catch (error) {
    throw error || error.response?.data?.message || error.message || "Failed to fetch orders";
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    if (!orderId || !status) throw new Error("Order ID and status are required!");
    const res = await API_URL.patch(`/order/status/${orderId}`, { status });
    return res.data;
  } catch (error) {
    throw error || error.response?.data?.message || error.message || "Failed to update order status";
  }
};

export const getOrderById = async (userId, guestId) => {
  try {
    const res = await API_URL.get(`/order/getOrderById`,{
  params: {
    userId: userId || undefined,
    guestId: guestId || undefined,
  },
});
    return res.data;
  } catch (error) {
    throw error || error.response?.data?.message || error.message || "Failed to fetch order";
  }
};
