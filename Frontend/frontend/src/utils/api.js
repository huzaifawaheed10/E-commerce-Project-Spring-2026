import axios from "axios";

const API = axios.create({ baseURL: "https://e-commerce-project-spring-2026-production.up.railway.app/api" });

// Attach token to every request
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("userInfo") || "null");
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// Auth
export const register = (data) => API.post("/auth/register", data);
export const login    = (data) => API.post("/auth/login", data);
export const getMe    = ()     => API.get("/auth/me");

// Products
export const getProducts        = (params) => API.get("/products", { params });
export const getProductById     = (id)     => API.get(`/products/${id}`);
export const getFeaturedProducts = ()      => API.get("/products/featured");
export const createProduct      = (data)   => API.post("/products", data);
export const updateProduct      = (id, data) => API.put(`/products/${id}`, data);
export const deleteProduct      = (id)     => API.delete(`/products/${id}`);

export default API;