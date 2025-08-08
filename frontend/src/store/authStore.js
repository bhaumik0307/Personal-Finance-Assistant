import { create } from "zustand"
import axios from "../utils/axios"

const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  error: "",
  authLoading: false,

  // Check authentication status
  checkAuth: async (navigate) => {
    set({ loading: true })
    try {
      const response = await axios.get("/auth/me")
      set({ user: response.data, loading: false })
      if (navigate) navigate("/all-transactions")
    } catch (error) {
      set({ user: null, loading: false })
    }
  },

  // Fetch current user (without navigation)
  fetchCurrentUser: async () => {
    set({ loading: true, error: "" })
    try {
      const response = await axios.get("/auth/me")
      set({ user: response.data, loading: false })
      return response.data
    } catch (error) {
      console.error("Failed to fetch current user:", error)
      set({
        user: null,
        loading: false,
        error: error.response?.data?.message || "Failed to fetch user data",
      })
      throw error
    }
  },

  // Google login
  loginWithGoogle: () => {
    set({ authLoading: true, error: "" })
    try {
      window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`
    } catch (error) {
      set({ error: "Failed to initiate Google login. Please try again.", authLoading: false })
    }
  },

  // Logout function
  logout: async () => {
    set({ loading: true })
    try {
      // Optional: Call logout endpoint on server
      await axios.post("/auth/logout")
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      set({ user: null, loading: false })
    }
  },

  // Clear error
  clearError: () => set({ error: "" }),

  // Set user manually (useful for login callbacks)
  setUser: (userData) => set({ user: userData, loading: false }),
}))

export default useAuthStore
