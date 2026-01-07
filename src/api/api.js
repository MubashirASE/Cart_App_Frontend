import axios from "axios";


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
  }

  return config;
});

// API_URL.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err.response?.status === 401) {
//       localStorage.clear();
//       window.location.replace("/login");
//     }
//     return Promise.reject(err);
//   }
// );



export default API_URL;

// import axios from "axios";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// const axiosInstance = axios.create({
//   baseURL: BASE_URL, // Backend base URL
//   headers: {
//     "ngrok-skip-browser-warning": "true",
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
//   },
// });

// // Request interceptor
// axiosInstance.interceptors.request.use(
//   async (config) => {
//     const token = localStorage.getItem("jwt-token");
//     if (token && token !== "undefined") {
//       config.headers = config.headers || {};
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor


// export default axiosInstance;

// // + GET
// export const get = (url, config) => axiosInstance.get(url, config);

// // + POST
// export const post = (url, data, config) =>
//   axiosInstance.post(url, data, config);

// // + PATCH
// export const patch = (url, data, config) =>
//   axiosInstance.patch(url, data, config);

// // + DELETE
// export const del = (url, config) => axiosInstance.delete(url, config);
