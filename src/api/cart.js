import API_URL from "./api";
import { toast } from "react-toastify";

export const removeFromCart = async (productId) => {
  try {
      if(!productId) throw new Error("Product ID not available!");
    const res = await API_URL.delete(`/cart/delete/${productId}`);
    return res.data;
  } catch (error) {
    throw error || error.response?.data?.message || error.message || "Failed to remove from cart";
  
  }
};

export const updateCartQuantity = async (productId, quantity) => {
  try {
      if(!productId || !quantity) throw new Error("Product ID & Quantity not available!");
    const res = await API_URL.patch(`/cart/update/${productId}`, {
      quantity,
    });
    return res.data;
  } catch (error) {
    throw error || error.response?.data?.message || error.message || "Failed to update quantity";
    
  }
};

