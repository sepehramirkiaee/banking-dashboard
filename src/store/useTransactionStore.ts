import { create } from "zustand";
import { persist } from "zustand/middleware";
import Papa from "papaparse";
import {
  CSVTransactionRow,
  Transaction,
  TransactionStore,
  TransactionType,
} from "../types";
import { sortTransactions } from "../utils/transaction";

export const useTransactionStore = create<TransactionStore>()(
  persist(
    (set, get) => ({
      /* ==========================
       * Transactions Management
       * ========================== */
      transactions: [],
      lastAddedTransaction: null,

      editingTransactionId: null,
      duplicatingTransaction: null,

      addTransaction: (transaction, notify) => {
        set((state) => ({
          transactions: [...state.transactions, transaction],
          lastAddedTransaction: transaction,
        }));
        notify("Transaction added successfully!", "success");
      },

      removeTransaction: (id, notify) => {
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        }));
        notify("Transaction removed successfully!", "success");
      },

      updateTransaction: (updatedTransaction, notify) => {
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === updatedTransaction.id ? updatedTransaction : t
          ),
        }));
        notify("Transaction updated successfully!", "success");
      },

      resetTransactions: () =>
        set(() => ({
          transactions: [],
          lastAddedTransaction: null,
        })),

      clearLastAddedTransaction: () =>
        set(() => ({ lastAddedTransaction: null })),

      undoLastTransaction: (notify) => {
        set((state) => {
          if (!state.lastAddedTransaction) return state;
          return {
            transactions: state.transactions.filter(
              (t) => t.id !== state.lastAddedTransaction!.id
            ),
            lastAddedTransaction: null,
          };
        });
        notify("Last transaction undone!", "success");
      },

      /* ==========================
       * Filtering & Pagination
       * ========================== */
      filters: {
        type: "all",
        startDate: "",
        endDate: "",
        description: "",
      },

      currentPage: 1,
      transactionsPerPage: 20,

      setFilters: (filters) =>
        set((state) => ({
          filters: { ...state.filters, ...filters },
          currentPage: 1,
        })),

      setCurrentPage: (page: number) => set(() => ({ currentPage: page })),

      setEditingTransactionId: (
        id: `${string}-${string}-${string}-${string}-${string}` | null
      ) => set(() => ({ editingTransactionId: id })),

      setDuplicatingTransaction: (transaction: Transaction | null) =>
        set(() => ({ duplicatingTransaction: transaction })),

      setTransactionPerPage: (perPage: number) =>
        set(() => ({ transactionsPerPage: perPage })),

      isFilterActive: () => {
        const { filters } = get();
        return (
          JSON.stringify(filters) !==
          JSON.stringify({
            type: "all",
            startDate: "",
            endDate: "",
            description: "",
          })
        );
      },

      getFilteredTransactions: () => {
        const { transactions, filters, currentPage, transactionsPerPage } =
          get();
        const filteredTransactions = transactions.filter((transaction) => {
          if (filters.type !== "all" && transaction.type !== filters.type)
            return false;
          if (
            filters.startDate &&
            new Date(transaction.date) < new Date(filters.startDate)
          )
            return false;
          if (
            filters.endDate &&
            new Date(transaction.date) > new Date(filters.endDate)
          )
            return false;
          if (
            filters.description &&
            !transaction.description
              .toLowerCase()
              .includes(filters.description.toLowerCase())
          ) {
            return false;
          }
          return true;
        });

        // Sort and paginate
        const sortedTransactions = sortTransactions(filteredTransactions);
        const startIndex = (currentPage - 1) * transactionsPerPage;
        const endIndex = startIndex + transactionsPerPage;
        return sortedTransactions.slice(startIndex, endIndex);
      },

      getTotalFilteredTransactions: () => {
        const { transactions, filters } = get();
        return transactions.filter((transaction) => {
          if (filters.type !== "all" && transaction.type !== filters.type)
            return false;
          if (
            filters.startDate &&
            new Date(transaction.date) < new Date(filters.startDate)
          )
            return false;
          if (
            filters.endDate &&
            new Date(transaction.date) > new Date(filters.endDate)
          )
            return false;
          if (
            filters.description &&
            !transaction.description
              .toLowerCase()
              .includes(filters.description.toLowerCase())
          ) {
            return false;
          }
          return true;
        }).length;
      },

      /* ==========================
       * Computed Values
       * ========================== */
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

      /* ==========================
       * CSV Import & Export
       * ========================== */
      exportTransactionsAsCSV: (notify) => {
        const { getFilteredTransactions } = get();
        const filteredTransactions = getFilteredTransactions();

        if (filteredTransactions.length === 0) {
          notify(
            "No transactions to export based on current filters.",
            "error"
          );
          return;
        }

        const csvData = filteredTransactions.map(
          ({ date, amount, description, type }) => ({
            Date: new Date(date).toISOString().split("T")[0],
            Amount:
              type === "withdrawal"
                ? `-${Math.abs(amount).toFixed(2)}`
                : amount.toFixed(2),
            Description: description,
            Type: type.charAt(0).toUpperCase() + type.slice(1),
          })
        );

        const csvString = Papa.unparse(csvData);
        const filename = `transactions_${new Date()
          .toISOString()
          .replace(/[:.]/g, "-")}.csv`;

        const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },

      importTransactionsFromCSV: (file, notify) => {
        const reader = new FileReader();

        reader.onload = (event) => {
          const csvText = event.target?.result;
          if (typeof csvText !== "string") {
            notify("Invalid file format.", "error");
            return;
          }

          Papa.parse<CSVTransactionRow>(csvText, {
            header: true,
            skipEmptyLines: true,
            complete: (result) => {
              if (result.errors.length > 0) {
                notify(
                  "Error parsing CSV file. Please check the file format.",
                  "error"
                );
                return;
              }

              const parsedTransactions: Transaction[] = result.data
                .map((row, index) => {
                  if (
                    !row.Date ||
                    !row.Amount ||
                    !row.Description ||
                    !row.Type
                  ) {
                    notify(
                      `Row ${index + 1} is missing required fields.`,
                      "error"
                    );
                    return null;
                  }

                  const amount = parseFloat(row.Amount);
                  if (isNaN(amount)) {
                    notify(
                      `Row ${index + 1} has an invalid amount value.`,
                      "error"
                    );
                    return null;
                  }

                  return {
                    id: crypto.randomUUID(),
                    date: new Date(row.Date).toISOString(),
                    amount:
                      row.Type.toLowerCase() === "withdrawal"
                        ? -Math.abs(amount)
                        : Math.abs(amount),
                    description: row.Description.trim(),
                    type: row.Type.toLowerCase() as TransactionType,
                    createdAt: Date.now(),
                  };
                })
                .filter(Boolean) as Transaction[];

              if (parsedTransactions.length === 0) {
                notify("No valid transactions found in the CSV file.", "error");
                return;
              }

              set((state) => ({
                transactions: [...state.transactions, ...parsedTransactions],
              }));

              notify("Transactions imported successfully!", "success");
            },
          });
        };

        reader.onerror = () => {
          notify("Error reading the file.", "error");
        };

        reader.readAsText(file);
      },
    }),
    { name: "transactions" }
  )
);
