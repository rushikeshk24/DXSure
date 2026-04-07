import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: (data) => api.post("/auth/login", data),
};

export const dashboardApi = {
  getSummary: () => api.get("/dashboard/summary"),
};

export const userApi = {
  getAll: () => api.get("/users"),
  create: (data) => api.post("/users", data),
};

export const recordApi = {
  getAll: (params) => api.get("/records", { params }),
};

export const ticketApi = {
  getAll: () => api.get("/tickets"),
  create: (data) => api.post("/tickets", data),
};

export const dayPlanApi = {
  getAll: () => api.get("/dayplan"),
  create: (data) => api.post("/dayplan", data),
};

export const clientApi = {
  getAll: (params) => api.get("/clients", { params }),
  create: (data) => api.post("/clients", data),
  update: (id, data) => api.put(`/clients/${id}`, data),
};

export const paymentApi = {
  getAll: (params) => api.get("/payments", { params }),
  create: (data) => api.post("/payments", data),
};

export const vendorApi = {
  getAll: () => api.get("/vendors"),
  create: (data) => api.post("/vendors", data),
};

export const expenseApi = {
  getAll: () => api.get("/expenses"),
  create: (data) => api.post("/expenses", data),
};
