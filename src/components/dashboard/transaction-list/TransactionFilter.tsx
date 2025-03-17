import Card from "@/components/common/ui/Card";
import Overlay from "@/components/common/ui/Overlay";
import { useState } from "react";
import { useTransactionStore } from "@/store/useTransactionStore";
import { TransactionStore, TransactionType } from "@/types";
import { XMarkIcon } from "@heroicons/react/24/outline";

const TransactionFilter = ({ setIsFilterOpen }: { setIsFilterOpen: (value: boolean) => void }) => {
  const { filters, setFilters } = useTransactionStore();
  const [localFilters, setLocalFilters] = useState({ ...filters });
  const defaultFilters: TransactionStore['filters'] = { type: "all", startDate: "", endDate: "", description: "" };

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
                  value={localFilters.type}
                  onChange={(e) => setLocalFilters({ ...localFilters, type: e.target.value as 'all' | TransactionType })}
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
                  value={localFilters.startDate}
                  onChange={(e) => setLocalFilters({ ...localFilters, startDate: e.target.value })}
                  className="w-full p-2 border rounded border-gray-300 text-sm"
                />
              </div>

              {/* Filter by End Date */}
              <div className="flex flex-col gap-1">
                <label className="block text-gray-800 text-sm font-medium">Date To</label>
                <input
                  type="date"
                  value={localFilters.endDate}
                  onChange={(e) => setLocalFilters({ ...localFilters, endDate: e.target.value })}
                  className="w-full p-2 border rounded border-gray-300 text-sm"
                />
              </div>

              {/* Filter by Description */}
              <div className="flex flex-col gap-1">
                <label className="block text-gray-800 text-sm font-medium">Description</label>
                <input
                  type="text"
                  placeholder="Search description..."
                  value={localFilters.description}
                  onChange={(e) => setLocalFilters({ ...localFilters, description: e.target.value })}
                  className="w-full p-2 border rounded border-gray-300 text-sm"
                />
              </div>

              <div className="flex flex-col gap-2">
                {/* Submit Button */}
                <button
                  onClick={() => {
                    setFilters(localFilters);
                    setIsFilterOpen(false);
                  }}
                  className="w-full text-sm font-medium bg-indigo-700 text-white p-2 rounded hover:bg-ingido-700 cursor-pointer hover:bg-indigo-800"
                >
                  Apply Filters
                </button>

                {/* Reset Filters Button */}
                <button
                  onClick={() => {
                    setLocalFilters(defaultFilters);
                    setFilters(defaultFilters);
                    setIsFilterOpen(false);
                  }}
                  className="w-full text-sm bg-gray-100 p-2 rounded border border-gray-200 hover:bg-gray-200 cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Overlay>
  );
};

export default TransactionFilter;