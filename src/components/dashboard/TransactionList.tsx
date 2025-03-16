import { useTransactionStore } from "@/store/useTransactionStore";
import TransactionItem from "./transaction-list/TransactionItem";
import TransactionFilter from "./transaction-list/TransactionFilter";
import Card from "../common/ui/Card";
import { useState } from "react";
import { ArrowDownOnSquareIcon, ArrowLeftCircleIcon, ArrowRightCircleIcon, ExclamationTriangleIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { classNames } from "@/utils/classNames";
import { useNotification } from "@/hooks/useNotification";

const TransactionList = () => {
  const { getFilteredTransactions, getTotalFilteredTransactions, isFilterActive, currentPage, setCurrentPage, transactionsPerPage, exportTransactionsAsCSV } = useTransactionStore();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const transactions = getFilteredTransactions();
  const totalTransactions = getTotalFilteredTransactions();
  const totalPages = Math.ceil(totalTransactions / transactionsPerPage);
  const { addNotification } = useNotification();
  const handleExportClick = () => {
    exportTransactionsAsCSV(addNotification);
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold">Transaction History</h2>

      </div>
      {isFilterOpen && <TransactionFilter setIsFilterOpen={setIsFilterOpen} />}

      <div className="flex items-center gap-2 mb-4">
        {(transactions.length > 0 || isFilterActive()) && (
          <button
            onClick={() => setIsFilterOpen(true)}
            // className="bg-indigo-50 cursor-pointer flex gap-1 items-center border border-indigo-600 text-indigo-600 px-4 py-0.5 text-sm font-medium rounded-full hover:bg-indigo-100"
            className={classNames("bg-indigo-50 relative cursor-pointer flex gap-1 items-center border border-indigo-600 text-indigo-600 px-4 py-0.5 text-sm font-medium rounded-full hover:bg-indigo-100", {
              "bg-indigo-600 text-white hover:bg-indigo-700": isFilterActive(),
            })}
          >
            {isFilterActive() && (
              <div className="absolute  flex items-center justify-center right-0 top-4">
                <span className="w-2 h-2 rounded-full border border-indigo-600 bg-white" />
                <span className="w-2 h-2 rounded-full  animate-ping bg-white absolute" />
              </div>
            )}
            <FunnelIcon className="size-4" />
            <span>Filter</span>
          </button>
        )}

        {transactions.length > 0 && (
          <button
            onClick={handleExportClick}
            className="bg-indigo-50 cursor-pointer flex gap-1 items-center border border-indigo-600 text-indigo-600 px-4 py-0.5 text-sm font-medium rounded-full hover:bg-indigo-100"
          >
            <ArrowDownOnSquareIcon className="size-4" />
            <span>Export as CSV</span>
          </button>
        )}

      </div>

      <Card>
        {transactions.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </ul>
        ) : (
          <div className="text-gray-500 text-center text-sm p-2 flex items-center justify-center gap-1">
            <ExclamationTriangleIcon className="size-5" />
            <p>No transactions recorded yet.</p>
          </div>
        )}
      </Card>


      {/* ✅ Pagination Controls */}
      {totalPages > 0 && (
        <div className="flex justify-center items-center gap-4 mt-4 text-sm text-gray-700">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={` ${currentPage === 1 ? "opacity-30" : "cursor-pointer"}`}
          >
            <ArrowLeftCircleIcon className="size-6" />

          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`${currentPage === totalPages ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
          >
            <ArrowRightCircleIcon className="size-6" />
          </button>
          {/* <input
            type="number"
            value={transactionsPerPage}
            onChange={(e) => setTransactionPerPage(Number(e.target.value))}
            className="p-2 border rounded text-center w-20" /> */}
        </div>
      )}
    </div>
  );
};

export default TransactionList;