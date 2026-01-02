import API_URL from "./api";

export const getAllUsers = async () => {
  const res = await API_URL.get("/user/all-users");
  return res.data;
};

export const getDashboardStats = async () => {
  const res = await API_URL.get("/admin/dashboard-stats");
  return res.data;
};

export const createAdmin = async (adminData) => {
  const res = await API_URL.post("/user/create-admin", adminData);
  return res.data;
};

export const getAdminDetails = async () => {
  const res = await API_URL.get("/user/admin-details");
  return res.data;
};

export const getAllUserData = async () => {
  const res = await API_URL.get("/user/allUserData");
  return res.data;
};

export const getAllAdminData = async () => {
  const res = await API_URL.get("/user/alladminData");
  return res.data;
};

export const blockUser = async (userId) => {
  const res = await API_URL.patch(`/user/userBlocked/${userId}`);
  return res.data;
};

export const unblockUser = async (userId) => {
  const res = await API_URL.patch(`/user/userUnBlocked/${userId}`);
  return res.data;
};

export const sendMail = async (userId) => {
  const res = await API_URL.post(`/user/sendMail/${userId}`);
  return res.data;
};

export const getAllUserCart = async () => {
  const res = await API_URL.get("/cart/allfetchCart");
  return res.data;
};
