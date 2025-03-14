export type TransactionType = "deposit" | "withdrawal";

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  type: TransactionType;
  createdAt: number;
}

export interface TransactionStore {
  transactions: Transaction[];
  lastAddedTransaction: Transaction | null;
  editingTransactionId: string | null;
  duplicatingTransaction: Transaction | null;
  currentPage: number;
  transactionsPerPage: number;
  setTransactionPerPage: (perPage: number) => void;
  setCurrentPage: (page: number) => void;
  getTotalFilteredTransactions: () => number;
  setEditingTransactionId: (id: string | null) => void;
  addTransaction: (transaction: Transaction) => void;
  removeTransaction: (id: string) => void;
  resetTransactions: () => void;
  getTotalBalance: () => number;
  undoLastTransaction: () => void;
  setDuplicatingTransaction: (transaction: Transaction | null) => void;
  filters: {
    type: "all" | TransactionType;
    startDate: string;
    endDate: string;
    description: string;
  };
  setFilters: (filters: Partial<TransactionStore["filters"]>) => void;
  getFilteredTransactions: () => Transaction[];
  exportTransactionsAsCSV: () => void;
}