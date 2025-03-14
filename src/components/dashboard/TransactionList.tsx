import { useTransactionStore } from "@/store/useTransactionStore";
import TransactionItem from "./transaction-list/TransactionItem";
import TransactionFilter from "./transaction-list/TransactionFilter";

const TransactionList = () => {
  const { getFilteredTransactions, getTotalFilteredTransactions,setTransactionPerPage, currentPage, setCurrentPage, transactionsPerPage } = useTransactionStore();
  const transactions = getFilteredTransactions();
  const totalTransactions = getTotalFilteredTransactions();
  const totalPages = Math.ceil(totalTransactions / transactionsPerPage);

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
      <TransactionFilter />
      {sortedTransactions.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {sortedTransactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center mt-4">No transactions recorded yet.</p>
      )}

      {/* ✅ Pagination Controls */}
      {totalPages > 0 && (
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
          >
            Previous
          </button>

          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
          >
            Next
          </button>
          <input
            type="number"
            value={transactionsPerPage}
            onChange={(e) => setTransactionPerPage(Number(e.target.value))}
            className="p-2 border rounded text-center w-20"/>
        </div>
      )}
    </div>
  );
};

export default TransactionList;