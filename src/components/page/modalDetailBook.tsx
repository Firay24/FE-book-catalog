import { Book } from "@/interface/book.interface";
import { convertPrice } from "@/utils/convertPrice";
import ModalBorrowRequest from "./modalBorrowRequest";

interface ModalDetailBookProps {
  book: Book | null;
}

const ModalDetailBook: React.FC<ModalDetailBookProps> = ({ book }) => {
  return (
    <div className="modal-box">
      <h3 className="text-3xl">Detail Book!</h3>
      <div className="py-4">
        {book ? (
          <div className="flex flex-col gap-4 items-center justify-center">
            <div className="flex md:h-64 justify-center">
              <div className="w-3/4 h-auto md:w-48 md:h-64 overflow-hidden rounded-lg bg-gray-200">
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <p className="font-semibold text-emerald-500 text-3xl uppercase">
              {book.title}
            </p>
            <div className="flex flex-col w-full md:w-1/2 ">
              <div className="flex justify-between">
                <p className="text-gray-500">Price</p>
                <p>{book.price ? `Rp ${convertPrice(book.price)}` : ""}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-500">Totalpage</p>
                <p>{book.totalPage}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-500">Category</p>
                <p>{book.category}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-500">Release Year</p>
                <p>{book.releaseYear}</p>
              </div>
            </div>
            <div className="w-full md:w-3/4 text-left">
              <p>{book.description}</p>
            </div>
          </div>
        ) : (
          <p>No book details available.</p>
        )}
      </div>
      <div className="modal-action">
        <form method="dialog">
          <div className="flex gap-4">
            <button
              onClick={() => {
                const modal = document.getElementById(
                  "modalRequest"
                ) as HTMLDialogElement | null;
                if (modal) {
                  modal.showModal();
                } else {
                  console.error("Element with ID 'my_modal_1' not found");
                }
              }}
              className="btn btn-active btn-primary"
              disabled={book?.request}
            >
              Borrow
            </button>
            <button className="btn">Close</button>
          </div>
        </form>
      </div>
      <dialog id="modalRequest" className="modal">
        <ModalBorrowRequest bookId={book?.id ?? ""} />
      </dialog>
    </div>
  );
};

export default ModalDetailBook;
