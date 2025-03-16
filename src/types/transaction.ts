import { NotificationType } from "./notification";

/* ==========================
 * Notify(addNotification) Params Types
 * ========================== */
export type NotifyParamsType = (
  message: string,
  type: NotificationType
) => void;

/* ==========================
 * Transaction Types
 * ========================== */
export type TransactionType = "deposit" | "withdrawal";

export interface Transaction {
  id: `${string}-${string}-${string}-${string}-${string}`;
  amount: number;
  description: string;
  date: string;
  type: TransactionType;
  createdAt: number;
}

/* ==========================
 * CSV Structure
 * ========================== */
export interface CSVTransactionRow {
  Date: string;
  Amount: string;
  Description: string;
  Type: string;
}

/* ==========================
 * Store State & Methods
 * ========================== */
export interface TransactionStore {
  /* ===== Transactions Management ===== */
  transactions: Transaction[];
  lastAddedTransaction: Transaction | null;
  addTransaction: (transaction: Transaction, notify: NotifyParamsType) => void;
  removeTransaction: (id: string, notify: NotifyParamsType) => void;
  updateTransaction: (transaction: Transaction, notify: NotifyParamsType) => void;
  resetTransactions: () => void;
  undoLastTransaction: (notify: NotifyParamsType) => void;
  clearLastAddedTransaction: () => void;

  /* ===== Editing & Duplicating ===== */
  editingTransactionId:
    | `${string}-${string}-${string}-${string}-${string}`
    | null;
  duplicatingTransaction: Transaction | null;
  setEditingTransactionId: (
    id: `${string}-${string}-${string}-${string}-${string}` | null
  ) => void;
  setDuplicatingTransaction: (transaction: Transaction | null) => void;

  /* ===== Filtering & Pagination ===== */
  currentPage: number;
  transactionsPerPage: number;
  setTransactionPerPage: (perPage: number) => void;
  setCurrentPage: (page: number) => void;
  isFilterActive: () => boolean;

  filters: {
    type: "all" | TransactionType;
    startDate: string;
    endDate: string;
    description: string;
  };
  setFilters: (filters: Partial<TransactionStore["filters"]>) => void;
  getFilteredTransactions: () => Transaction[];
  getTotalFilteredTransactions: () => number;

  /* ===== Computed Values ===== */
  getTotalBalance: () => number;

  /* ===== CSV Import & Export ===== */
  exportTransactionsAsCSV: (notify: NotifyParamsType) => void;
  importTransactionsFromCSV: (file: File, notify: NotifyParamsType) => void;
}
