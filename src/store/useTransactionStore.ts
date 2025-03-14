import { create } from "zustand";
import { persist } from "zustand/middleware";
// import localforage from "localforage";
import { TransactionStore } from "../types";
import Papa from "papaparse";

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

        // ✅ Sort transactions before pagination
        const sortedTransactions = [...filteredTransactions].sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();

          // If dates are the same, compare by `createdAt` timestamp
          if (dateA === dateB) {
            return b.createdAt - a.createdAt; // Ensures newer transactions appear first
          }

          return dateB - dateA;
        });

        // ✅ Apply pagination: slice transactions based on current page
        const startIndex = (currentPage - 1) * transactionsPerPage;
        const endIndex = startIndex + transactionsPerPage;
        return sortedTransactions.slice(startIndex, endIndex);
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

      exportTransactionsAsCSV: () => {
        const { getFilteredTransactions } = get();
        const filteredTransactions = getFilteredTransactions();
      
        if (filteredTransactions.length === 0) {
          alert("No transactions to export based on current filters.");
          return;
        }
      
        // ✅ Convert transactions to CSV format
        const csvData = filteredTransactions.map(({ date, amount, description, type }) => ({
          Date: new Date(date).toISOString().split("T")[0], // Format date as YYYY-MM-DD
          Amount: type === "withdrawal" ? `-${Math.abs(amount).toFixed(2)}` : amount.toFixed(2), // ✅ Ensure Withdrawals have "-"
          Description: description,
          Type: type.charAt(0).toUpperCase() + type.slice(1), // Capitalize first letter (Deposit, Withdrawal)
        }));
      
        // ✅ Convert JSON to CSV format
        const csvString = Papa.unparse(csvData);
      
        // ✅ Generate filename with correct local time
        const now = new Date();
        const localDateTime = now.toLocaleString("en-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // ✅ Use user's local timezone
        });
      
        // ✅ Format the filename correctly
        const formattedDateTime = localDateTime.replace(/[/,:\s]/g, "-"); // Replace problematic characters
        const filename = `transactions_${formattedDateTime}.csv`;
      
        // ✅ Trigger CSV file download
        const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }),
    {
      name: "transactions",
    }
  )
);
