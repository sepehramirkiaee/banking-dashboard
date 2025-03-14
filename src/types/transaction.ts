export type TransactionType = "deposit" | "withdrawal";

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  type: TransactionType;
}

export interface TransactionStore {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  removeTransaction: (id: string) => void;
  resetTransactions: () => void;
  getTotalBalance: () => number;
}