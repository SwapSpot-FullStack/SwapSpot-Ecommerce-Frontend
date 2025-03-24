import axios from "axios";

const instance = axios.create({
  baseURL: "https://swapspot-ecommerce-backend.onrender.com/api/users",
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
