import { useBookStore } from "@/store/book.store";
import { convertPrice } from "@/utils/convertPrice";
import { useEffect } from "react";

const HomePage = () => {
  const { books, loading, error, fetchBooks } = useBookStore();

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
      <h1 className="text-2xl md:text-3xl uppercase font-medium text-center md:text-left">
        List of Books
      </h1>
      <div className="mt-4">
        {books.map((book) => (
          <div className="grid mt-4 grid-cols-2 gap-3">
            <img src={book.imageUrl} alt={book.title} />
            <div className="text-left flex flex-col justify-between">
              <div>
                <h2 className="text-xl text-emerald-500 uppercase font-semibold">
                  {book.title}
                </h2>
                <p className="text-lg">
                  {book.price && `Rp ${convertPrice(book.price)}`}
                  <p className="text-base text-gray-500">
                    {book.totalPage} page
                  </p>
                </p>
                <p className="text-base text-gray-500">{book.releaseYear}</p>
              </div>
              <div>
                <p className="text-sm">Deskripsi:</p>
                <p className="text-sm line-clamp-5">{book.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
