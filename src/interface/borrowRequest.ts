import { Book } from "./book.interface";

export interface BorrowRequest {
  Id: string;
  UserId: string;
  BookId: string;
  Status: "PENDING" | "ACCEPTED" | "REJECTED";
  Days: number;
  RequestDate: string;
  Approved?: string;
}

export interface BookRequestByUserResponse {
  id: string;
  userId: string;
  bookId: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  days: number;
  requestDate: string;
  approvedDate: string;
  category: string;
  book: Book;
}

export interface BorrowRequestStore {
  fetchBooksRequest: (userId: string) => void;
  booksRequests: BookRequestByUserResponse[];
  borrowRequests: BorrowRequest[];
  books: Book[];
  createBorrowRequest: (borrowRequest: BorrowRequestDto) => void;
  updateBorrowRequestStatus: (
    requestId: string,
    status: BorrowRequest["Status"]
  ) => void;
  setBooks: (books: Book[]) => void;
  setBorrowRequests: (requests: BorrowRequest[]) => void;
}

export interface BorrowRequestDto {
  userId: string;
  bookId: string;
  days: number;
}
