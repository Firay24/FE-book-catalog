import ModalDetailBook from "@/components/page/modalDetailBook";
import { useBookStore } from "@/store/book.store";
import { Book } from "@/interface/book.interface";
import { convertPrice } from "@/utils/convertPrice";
import { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { useBorrowStore } from "@/store/borrowRequest.store";
import useAuthStore from "@/store/auth.store";
import { BookRequestByUserResponse } from "@/interface/borrowRequest";
import { formatDate } from "@/utils/formatDate";

const HomePage = () => {
  const { books, loading, error, fetchBooks } = useBookStore();
  const { user } = useAuthStore();
  const { borrowRequests, fetchBooksRequest, booksRequests } = useBorrowStore();
  const [detailBook, setDetailBook] = useState<Book | null>(null);

  useEffect(() => {
    fetchBooks();

    if (user) {
      fetchBooksRequest(user.id);
    }
  }, [fetchBooks, borrowRequests, fetchBooksRequest, user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div>
        <h1 className="text-2xl md:text-3xl uppercase font-medium text-center md:text-left">
          List of Books
        </h1>
        <div role="tablist" className="tabs tabs-bordered mt-4">
          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab"
            aria-label="All"
            defaultChecked
          />
          <div role="tabpanel" className="tab-content">
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
                      <div
                        className="hover:cursor-pointer "
                        onClick={() => {
                          const modal = document.getElementById(
                            "my_modal_1"
                          ) as HTMLDialogElement | null;
                          setDetailBook(book);
                          if (modal) {
                            modal.showModal();
                          } else {
                            console.error(
                              "Element with ID 'my_modal_1' not found"
                            );
                          }
                        }}
                      >
                        <h2 className="text-xl hover:text-emerald-600 text-emerald-500 uppercase font-semibold">
                          {book.title}
                        </h2>
                      </div>
                      <p className="text-lg">
                        {book.price && `Rp ${convertPrice(book.price)}`}
                      </p>
                      <div className="block md:flex gap-2 md:justify-center md:items-center">
                        <p className="text-base text-gray-500">
                          {book.releaseYear}
                        </p>
                        <p className="text-xs hidden md:block text-gray-500">
                          <GoDotFill />
                        </p>
                        <p className="text-base text-gray-500">
                          {book.category}
                        </p>
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

          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab"
            aria-label="Borrow"
          />
          <div role="tabpanel" className="tab-content p-10">
            {booksRequests.length > 0 ? (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-5">
                {booksRequests.map((item: BookRequestByUserResponse) => (
                  <div className="grid mt-4 grid-cols-2 md:grid-cols-1 gap-5">
                    <div className="block md:flex md:h-64 justify-center">
                      <div className="w-auto h-auto md:w-48 md:h-64 overflow-hidden rounded-lg bg-gray-200">
                        <img
                          src={item.book.imageUrl}
                          alt={item.book.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="min-h-36 text-left flex flex-col justify-between">
                      <div className="text-left md:text-center">
                        <h2 className="text-xl hover:text-emerald-600 text-emerald-500 uppercase font-semibold">
                          {item.book.title}
                        </h2>
                        <div className="block md:flex gap-2 md:justify-center md:items-center">
                          <p className="text-base text-gray-500">
                            {item.book.releaseYear}
                          </p>
                          <p className="text-xs hidden md:block text-gray-500">
                            <GoDotFill />
                          </p>
                          <p className="text-base text-gray-500">
                            {item.book.category}
                          </p>
                        </div>
                        <p className="text-base text-gray-500">
                          {`Request ${formatDate(item.requestDate)}`}
                        </p>
                        <p className="text-base text-gray-500">
                          {`Accpeted ${
                            item.approvedDate
                              ? formatDate(item.approvedDate)
                              : "-"
                          }`}
                        </p>
                      </div>
                      <div className="text-left md:text-center">
                        <p className="text-sm">Status:</p>
                        <div className="badge">{item.status}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>No books to borrow request</div>
            )}
          </div>
        </div>
      </div>
      <dialog id="my_modal_1" className="modal">
        <ModalDetailBook book={detailBook} />
      </dialog>
    </>
  );
};

export default HomePage;
