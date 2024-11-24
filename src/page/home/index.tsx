import useAuthStore from "@/store/auth.store";
import { useBookStore } from "@/store/book.store";
import React, { useEffect } from "react";

const HomePage = () => {
  const { books, loading, error, fetchBooks } = useBookStore();
  const { isAuthenticated } = useAuthStore();
  console.log(isAuthenticated);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>List of Books</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <h2>{book.title}</h2>
            <p>{book.description}</p>
            <img src={book.imageUrl} alt={book.title} />
            <p>Release Year: {book.releaseYear}</p>
            <p>Price: ${book.price}</p>
            <p>Total Pages: {book.totalPage}</p>
            <p>Thickness: {book.thickness}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
