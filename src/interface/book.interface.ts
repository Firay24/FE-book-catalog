export interface Book {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  releaseYear: number;
  price: number;
  totalPage: number;
  thickness: string;
  categoryId: string;
  category: string;
  request: boolean;
  status?: "AVAILABLE" | "BORROWED";
}

export interface BookStore {
  books: Book[];
  loading: boolean;
  error: string | null;
  fetchBooks: () => Promise<void>;
}
