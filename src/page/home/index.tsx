import { useBookStore } from "@/store/book.store";
import { convertPrice } from "@/utils/convertPrice";
import { useEffect } from "react";
import { GoDotFill } from "react-icons/go";

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
      <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-5">
        {books.map((book) => (
          <div className="grid mt-4 grid-cols-2 md:grid-cols-1 gap-5">
            <div className="block md:flex md:h-64 justify-center">
              <div className="w-auto h-auto md:w-48 md:h-64 overflow-hidden rounded-lg bg-gray-200">
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="min-h-36 text-left flex flex-col justify-between">
              <div className="text-left md:text-center">
                <h2 className="text-xl text-emerald-500 uppercase font-semibold">
                  {book.title}
                </h2>
                <p className="text-lg">
                  {book.price && `Rp ${convertPrice(book.price)}`}
                </p>
                <div className="block md:flex gap-2 md:justify-center md:items-center">
                  <p className="text-base text-gray-500">
                    {book.totalPage} page
                  </p>
                  <p className="text-xs hidden md:block text-gray-500">
                    <GoDotFill />
                  </p>
                  <p className="text-base text-gray-500">{book.releaseYear}</p>
                </div>
              </div>
              <div className="text-left md:text-center">
                <p className="text-sm">Deskripsi:</p>
                <p className="text-sm line-clamp-4 md:line-clamp-2">
                  {book.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
