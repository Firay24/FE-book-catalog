import { create } from "zustand";
import axios from "axios";
import { AuthState } from "../interface/auth.interface";

const baseUrl = import.meta.env.VITE_BASE_URL;

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  // login
  login: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${baseUrl}/login`, {
        Email: email,
        Password: password,
      });

      const { cookie, data } = response.data;
      const tokenPart = cookie.split("Authorization=")[1];

      const token = tokenPart.split(";")[0];
      localStorage.setItem("token", token);

      // First update the state with user and token
      set({
        user: data,
        token: token,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },

  // logout
  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
    localStorage.removeItem("token");
  },

  // fetch current user
  fetchCurrentUser: async (token) => {
    try {
      const response = await axios.get(`${baseUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        user: response.data.data,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error("Failed to fetch current user:", error);
      set({ user: null, isAuthenticated: false });
    }
  },
}));

export default useAuthStore;
