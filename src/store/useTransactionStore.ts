import { create } from "zustand";
import { persist } from "zustand/middleware";
// import localforage from "localforage";
import { TransactionStore } from "../types";

export const useTransactionStore = create<TransactionStore>()(
  persist(
    (set, get) => ({
      transactions: [],
      lastAddedTransaction: null, // Track last added transaction

      filters: {
        type: "all", // "all", "deposit", "withdrawal"
        startDate: "",
        endDate: "",
        description: "",
      },

      currentPage: 1, // ✅ Track current page
      transactionsPerPage: 1, // ✅ Set default items per page
      setTransactionPerPage: (perPage: number) => set(() => ({ transactionsPerPage: perPage })),

      setFilters: (filters) =>
        set((state) => ({
          filters: { ...state.filters, ...filters },
          currentPage: 1,
        })), // Reset to first page when filters change

      setCurrentPage: (page: number) => set(() => ({ currentPage: page })),

      getFilteredTransactions: () => {
        const { transactions, filters, currentPage, transactionsPerPage } = get();
        const filteredTransactions = transactions.filter((transaction) => {
          if (filters.type !== "all" && transaction.type !== filters.type) return false;
          if (filters.startDate && new Date(transaction.date) < new Date(filters.startDate)) return false;
          if (filters.endDate && new Date(transaction.date) > new Date(filters.endDate)) return false;
          if (
            filters.description &&
            !transaction.description.toLowerCase().includes(filters.description.toLowerCase())
          ) {
            return false;
          }
          return true;
        });

        // ✅ Apply pagination: slice transactions based on current page
        const startIndex = (currentPage - 1) * transactionsPerPage;
        const endIndex = startIndex + transactionsPerPage;
        return filteredTransactions.slice(startIndex, endIndex);
      },

      getTotalFilteredTransactions: () => {
        const { transactions, filters } = get();
        return transactions.filter((transaction) => {
          if (filters.type !== "all" && transaction.type !== filters.type) return false;
          if (filters.startDate && new Date(transaction.date) < new Date(filters.startDate)) return false;
          if (filters.endDate && new Date(transaction.date) > new Date(filters.endDate)) return false;
          if (
            filters.description &&
            !transaction.description.toLowerCase().includes(filters.description.toLowerCase())
          ) {
            return false;
          }
          return true;
        }).length;
      },

      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [...state.transactions, transaction],
          lastAddedTransaction: transaction, // Store the last added transaction
        })),

      removeTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      resetTransactions: () =>
        set(() => {
          localStorage.removeItem("transactions");
          return { transactions: [], lastAddedTransaction: null };
        }),

      undoLastTransaction: () =>
        set((state) => {
          if (!state.lastAddedTransaction) return state;

          return {
            transactions: state.transactions.filter(
              (t) => t.id !== state.lastAddedTransaction!.id
            ),
            lastAddedTransaction: null,
          };
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

      editingTransactionId: null,
      setEditingTransactionId: (id: string | null) =>
        set(() => ({ editingTransactionId: id })),

      duplicatingTransaction: null,
      setDuplicatingTransaction: (transaction) =>
        set(() => ({ duplicatingTransaction: transaction })),
    }),
    {
      name: "transactions",
    }
  )
);
