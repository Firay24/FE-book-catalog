import { create } from "zustand";

const useCounterStore = create((set) => ({
  count: 0, // Initial state
  increment: () => set((state) => ({ count: state.count + 1 })), // Action
  decrement: () => set((state) => ({ count: state.count - 1 })), // Action
}));

export default useCounterStore;
