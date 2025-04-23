import axios from "axios";
import { store } from "../redux/store";

// Dùng biến môi trường đúng cho Vite
const API_BASE = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE,
  // bạn có thể thêm headers chung ở đây:
  // headers: { "Content-Type": "application/json" }
});

// Thêm interceptor để tự động gắn token từ Redux persist
api.interceptors.request.use((config) => {
  const token = store.getState().user?.userInfo?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default api;
