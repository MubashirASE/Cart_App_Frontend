import API_URL from "./api";

export const getAllUsers = async () => {
  try {
    const res = await API_URL.get("/user/all-users");
    return res.data;
  } catch (error) {
      throw error || error.response?.data?.message || error.message || "Failed to fetch users";
    
  }
};

export const getDashboardStats = async () => {
  try {
    const res = await API_URL.get("/admin/dashboard");
    return res.data;
  } catch (error) {
      throw error || error.response?.data?.message || error.message || "Failed to fetch dashboard stats";
   
  }
};

export const createAdmin = async (adminData) => {
  try {
      if(!adminData.email || !adminData.password) throw new Error("Email and Password are required!");
    const res = await API_URL.post("/user/createadmin", adminData);
    return res.data;
  } catch (error) {
      throw error || error.response?.data?.message || error.message || "Failed to create admin";
    
  }
};

export const getAdminDetails = async () => {
  try {
    const res = await API_URL.get("/user/admin-details");
    return res.data;
  } catch (error) {
      throw error || error.response?.data?.message || error.message || "Failed to fetch admin details";
   
  }
};

export const getAllUserData = async () => {
  try {
    const res = await API_URL.get("/user/allUserData");
    return res.data;
  } catch (error) {
      throw error || error.response?.data?.message || error.message || "Failed to fetch all user data";
  }
};
export const getAllAdminData = async () => {
  try {
    const res = await API_URL.get("/user/alladminData");
    return res.data;
  } catch (error) {
      throw error || error.response?.data?.message || error.message || "Failed to fetch all admin data";
    
  }
};

export const blockUser = async (userId) => {
  try {
      if(!userId) throw new Error("User ID not available!");
    const res = await API_URL.patch(`/user/userBlocked/${userId}`);
    return res.data;
  } catch (error) {
     throw error || error.response?.data?.message || error.message || "Failed to block user";
    
  }
};

export const unblockUser = async (userId) => {
  try {
      if(!userId) throw new Error("User ID not available!");
    const res = await API_URL.patch(`/user/userUnBlocked/${userId}`);
    return res.data;
  } catch (error) {
      throw error || error.response?.data?.message || error.message || "Failed to unblock user";
    
  }
};

export const sendMail = async (userId) => {
  try {
      if(!userId) throw new Error("User ID not available!");
    const res = await API_URL.post(`/user/sendMail/${userId}`);
    return res.data;
  } catch (error) {
      throw error ||error.response?.data?.message || error.message || "Failed to send mail";
    
  }
};

export const getAllUserCart = async () => {
  try {
    const res = await API_URL.get("/cart/allfetchCart");
    return res.data;
  } catch (error) {
      throw error || error.response?.data?.message || error.message || "Failed to fetch all user carts";
  }
};

