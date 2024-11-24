import { create } from "zustand";
import axios from "axios";
import { AuthState } from "../interface/auth.interface";

const baseUrl = process.env.REACT_APP_BASE_URL;

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
      const { cookie, findUser } = response.data;
      set({ user: findUser, token: cookie, isAuthenticated: true });
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },

  // logout
  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
  },

  // current user
  fetchCurrentUser: async (token) => {
    try {
      const response = await axios.get("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        user: response.data,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error("Failed to fetch current user:", error);
      set({ user: null, isAuthenticated: false });
    }
  },
}));

export default useAuthStore;
