/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import {
  BorrowRequest,
  BorrowRequestDto,
  BorrowRequestStore,
} from "@/interface/borrowRequest";
import { Book } from "@/interface/book.interface";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useBorrowStore = create<BorrowRequestStore>((set) => ({
  borrowRequests: [],
  books: [],
  booksRequests: [],

  setBooks: (books: Book[]) => set({ books }),
  setBorrowRequests: (requests) => set({ borrowRequests: requests }),

  fetchBooksRequest: async (userId: string) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${baseUrl}/book/request/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ booksRequests: response.data.data });
    } catch (error) {
      console.error("Failed to fetch borrow requests:", error);
    }
  },

  createBorrowRequest: async (request: BorrowRequestDto) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${baseUrl}/book/request`,
        { UserId: request.userId, BookId: request.bookId, Days: request.days },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 201) {
        set((state) => ({
          borrowRequests: [...state.borrowRequests, response.data.data],
        }));
      }
    } catch (error) {
      console.error("Failed to create borrow request:", error);
    }
  },

  // Action to update a borrow request status
  updateBorrowRequestStatus: async (requestId: string, status: string) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${baseUrl}/book/request/${requestId}`,
        { Status: status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        set((state) => ({
          borrowRequests: [...state.borrowRequests, response.data],
        }));
      }
    } catch (error) {
      console.error("Failed to update borrow request status:", error);
    }
  },

  // Action to add a borrow request to the state (local only)
  addBorrowRequest: (borrowRequest: BorrowRequest) => {
    set((state) => ({
      borrowRequests: [...state.borrowRequests, borrowRequest],
    }));
  },
}));
