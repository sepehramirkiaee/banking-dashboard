import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import localforage from "localforage";
import { TransactionStore } from "../types";

export const useTransactionStore = create<TransactionStore>()(
  persist(
    (set) => ({
      transactions: [],

      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [...state.transactions, transaction],
        })),

      removeTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      resetTransactions: () =>
        set(() => {
          localforage.removeItem("transactions"); // Clear from IndexedDB
          return { transactions: [] };
        }),
    }),
    {
      name: "transactions", // Storage key
      storage: createJSONStorage(() => localforage), // Uses IndexedDB
    }
  )
);