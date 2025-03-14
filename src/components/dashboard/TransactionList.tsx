import { useTransactionStore } from "@/store/useTransactionStore";
import TransactionItem from "./transaction-list/TransactionItem";

const TransactionList = () => {
  const { transactions } = useTransactionStore();

  if (transactions.length === 0) {
    return <p className="text-gray-500 text-center mt-4">No transactions recorded yet.</p>;
  }

  const sortedTransactions = [...transactions].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
  
    // If dates are the same, compare by `createdAt` timestamp
    if (dateA === dateB) {
      return b.createdAt - a.createdAt; // Ensures newer transactions appear first
    }
  
    return dateB - dateA;
  });

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mt-4">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">📜 Transaction History</h3>
      <ul className="divide-y divide-gray-200">
        {sortedTransactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;