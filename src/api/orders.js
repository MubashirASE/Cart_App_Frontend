import API_URL from "./api";

export const placeOrder = async (orderData) => {
  try {
    if(!orderData) throw new Error("Order data not available!");
    const res = await API_URL.post("/order/placeOrder", orderData);
    return res.data;
  } catch (error) {
    throw error || "Failed to place order";
    
  }
};

