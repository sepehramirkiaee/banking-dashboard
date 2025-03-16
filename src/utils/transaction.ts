import { Transaction } from "@/types";

export const sortTransactions = (transactions: Transaction[]) => {
  return [...transactions].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    if (dateA === dateB) {
      return b.createdAt - a.createdAt;
    }
    return dateB - dateA;
  });
};