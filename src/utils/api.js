import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});
// :white_check_mark: Request Interceptor
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("agentToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
