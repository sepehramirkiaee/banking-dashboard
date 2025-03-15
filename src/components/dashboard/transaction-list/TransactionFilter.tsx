import Card from "@/components/common/ui/Card";
import Overlay from "@/components/common/ui/Overlay";
import { useTransactionStore } from "@/store/useTransactionStore";
import { TransactionType } from "@/types";
import { XMarkIcon } from "@heroicons/react/24/outline";

const TransactionFilter = ({ setIsFilterOpen }: { setIsFilterOpen: (value: boolean) => void }) => {
  const { filters, setFilters } = useTransactionStore();

  return (
    <Overlay className="flex items-center justify-center">
      <div className="w-full m-4 md:w-1/2">
        <Card>
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Filter Transactions</h3>
              <XMarkIcon onClick={() => setIsFilterOpen(false)} className="size-5 cursor-pointer" />
            </div>

            <div className="flex flex-col gap-4">

              {/* Filter by Type */}
              <div className="flex flex-col gap-1">
                <label className="block text-gray-800 text-sm font-medium">Type</label>

                <select
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value as 'all' | TransactionType })}
                  className="w-full p-2 border rounded border-gray-300 text-sm"
                >
                  <option value="all">All Transactions</option>
                  <option value="deposit">Deposits</option>
                  <option value="withdrawal">Withdrawals</option>
                </select>
              </div>

              {/* Filter by Start Date */}
              <div className="flex flex-col gap-1">
                <label className="block text-gray-800 text-sm font-medium">Date From</label>
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                  className="w-full p-2 border rounded border-gray-300 text-sm"
                />
              </div>

              {/* Filter by End Date */}
              <div className="flex flex-col gap-1">
                <label className="block text-gray-800 text-sm font-medium">Date To</label>
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                  className="w-full p-2 border rounded border-gray-300 text-sm"
                />
              </div>

              {/* Filter by Description */}
              <div className="flex flex-col gap-1">
                <label className="block text-gray-800 text-sm font-medium">Description</label>
                <input
                  type="text"
                  placeholder="Search description..."
                  value={filters.description}
                  onChange={(e) => setFilters({ ...filters, description: e.target.value })}
                  className="w-full p-2 border rounded border-gray-300 text-sm"
                />
              </div>

            </div>
          </div>
        </Card>
      </div>
    </Overlay>
  );
};

export default TransactionFilter;