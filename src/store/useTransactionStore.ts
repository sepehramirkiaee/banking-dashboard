import { create } from "zustand";
import { persist } from "zustand/middleware";
// import localforage from "localforage";
import { TransactionStore } from "../types";

export const useTransactionStore = create<TransactionStore>()(
  persist(
    (set, get) => ({
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
          localStorage.removeItem("transactions");
          return { transactions: [] };
        }), 

      // Computed Value
      getTotalBalance: () => {
        const { transactions } = get();
        const totalIncome = transactions
          .filter((t) => t.type === "deposit")
          .reduce((acc, t) => acc + t.amount, 0);

        const totalExpenses = transactions
          .filter((t) => t.type === "withdrawal")
          .reduce((acc, t) => acc + Math.abs(t.amount), 0);

        return totalIncome - totalExpenses;
      },
    }),
    {
      name: "transactions",
      // storage: createJSONStorage(() => localforage),
    }
  )
);