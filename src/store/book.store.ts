/* eslint-disable @typescript-eslint/no-explicit-any */
// src/stores/bookStore.ts

import { create } from "zustand";
import axios from "axios";
import { BookStore } from "@/interface/book.interface";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useBookStore = create<BookStore>((set: any) => ({
  books: [],
  loading: false,
  error: null,
  fetchBooks: async () => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseUrl}/books`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ books: response.data.data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));
