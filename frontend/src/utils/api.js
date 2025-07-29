import axios, { authGet, authPost, authPut, authDelete } from "./axios"

// Auth API calls
export const authAPI = {
  login: (credentials) => axios.post("/api/auth/login", credentials),
  register: (userData) => axios.post("/api/auth/register", userData),
  getProfile: () => authGet("/api/auth/me"),
  logout: () => authPost("/api/auth/logout"),
}

// Transaction API calls
export const transactionAPI = {
  getAll: (params = {}) => authGet("/api/transactions", { params }),
  getById: (id) => authGet(`/api/transactions/${id}`),
  create: (data) => authPost("/api/transactions", data),
  update: (id, data) => authPut(`/api/transactions/${id}`, data),
  delete: (id) => authDelete(`/api/transactions/${id}`),
  getCategories: () => authGet("/api/transactions/categories"),
  getPaymentMethods: () => authGet("/api/transactions/payment-methods"),
}

// User API calls
export const userAPI = {
  getProfile: () => authGet("/api/users/profile"),
  updateProfile: (data) => authPut("/api/users/profile", data),
  changePassword: (data) => authPost("/api/users/change-password", data),
  deleteAccount: () => authDelete("/api/users/account"),
}

// Reports API calls
export const reportsAPI = {
  getSummary: (params = {}) => authGet("/api/reports/summary", { params }),
  getCategoryBreakdown: (params = {}) => authGet("/api/reports/categories", { params }),
  getMonthlyTrends: (params = {}) => authGet("/api/reports/monthly", { params }),
  getDailyExpenses: (params = {}) => authGet("/api/reports/daily", { params }),
}

// Export all APIs
export default {
  auth: authAPI,
  transactions: transactionAPI,
  users: userAPI,
  reports: reportsAPI,
}
