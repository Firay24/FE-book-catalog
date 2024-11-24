import useAuthStore from "@/store/auth.store";
import { useBorrowStore } from "@/store/borrowRequest.store";
import { useState } from "react";

const ModalBorrowRequest = ({ bookId }: { bookId: string }) => {
  const { user } = useAuthStore();
  const { createBorrowRequest } = useBorrowStore();
  const [days, setDays] = useState<number | null>(null);

  const handleSubmit = () => {
    try {
      if (user && days && bookId) {
        createBorrowRequest({ userId: user.id, bookId: bookId, days: days });
      }
    } catch (error) {
      console.log("Failed to create borrow request.", error);
    } finally {
      setDays(null);
    }
  };

  return (
    <div className="modal-box">
      <h3 className="text-3xl">Borrow Book!</h3>
      <div className="py-4">
        <input
          type="number"
          placeholder="days"
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => setDays(parseInt(e.target.value))}
        />
      </div>
      <div className="modal-action">
        <form method="dialog">
          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              className="btn btn-active btn-primary"
            >
              Submit
            </button>
            <button className="btn">Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalBorrowRequest;
