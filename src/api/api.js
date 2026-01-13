import axios from "axios";

const getGuestId = () => {
  let guestId = localStorage.getItem("guestId");
  if (!guestId) {
    guestId = "guest_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
    localStorage.setItem("guestId", guestId);
  }
  return guestId;
};

const API_URL = axios.create({
  baseURL: "http://localhost:3001",
});

let responseInterceptor = null;
let isHandling401 = false;

export const setupInterceptor = (navigate, logout) => {
  if (responseInterceptor !== null) {
    API_URL.interceptors.response.eject(responseInterceptor);
  }
  console.log("responseInterceptor", responseInterceptor);

  responseInterceptor = API_URL.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401) {
        if (!isHandling401 && window.location.pathname !== "/login") {
          logout();
          navigate("/login");
          
        }
      }
      return Promise.reject(err);
    }
  );
};
API_URL.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    config.headers['x-guest-id'] = getGuestId(); 
  }

  return config;
});

export default API_URL;
