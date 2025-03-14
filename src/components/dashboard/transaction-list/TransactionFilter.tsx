import { useTransactionStore } from "@/store/useTransactionStore";
import { TransactionType } from "@/types";

const TransactionFilter = () => {
  const { filters, setFilters } = useTransactionStore();

  const resetFilter = () => {
    setFilters({
      type: "all",
      startDate: "",
      endDate: "",
    });
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg mb-4">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">🔍 Filter Transactions</h3>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Filter by Type */}
        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value as 'all' | TransactionType })}
          className="p-2 border rounded"
        >
          <option value="all">All Transactions</option>
          <option value="deposit">Deposits</option>
          <option value="withdrawal">Withdrawals</option>
        </select>

        {/* Filter by Start Date */}
        <input
          type="date"
          value={filters.startDate}
          onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
          className="p-2 border rounded"
        />

        {/* Filter by End Date */}
        <input
          type="date"
          value={filters.endDate}
          onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
          className="p-2 border rounded"
        />

        {/* Filter by Description */}
        <input
          type="text"
          placeholder="Search description..."
          value={filters.description}
          onChange={(e) => setFilters({ ...filters, description: e.target.value })}
          className="p-2 border rounded"
        />

        <button onClick={resetFilter} className="p-2 bg-red-500 text-white rounded">
          Reset Filter
        </button>
      </div>
    </div>
  );
};

export default TransactionFilter;