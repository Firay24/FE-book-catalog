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

export interface BorrowRequestStore {
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
