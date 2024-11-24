/* eslint-disable @typescript-eslint/no-explicit-any */
// src/stores/bookStore.ts

import { create } from "zustand";
import axios from "axios";

interface Book {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  releaseYear: number;
  price: number;
  totalPage: number;
  thickness: string;
  categoryId: string;
}

interface BookStore {
  books: Book[];
  loading: boolean;
  error: string | null;
  fetchBooks: () => Promise<void>;
}

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
