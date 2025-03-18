import Card from "@/components/common/ui/Card";
import Overlay from "@/components/common/ui/Overlay";
import { useState } from "react";
import { useTransactionStore } from "@/store/useTransactionStore";
import { TransactionStore, TransactionType } from "@/types";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Label from "@/components/common/form/Label";
import Button from "@/components/common/form/Button";
import Select from "@/components/common/form/Select";
import Input from "@/components/common/form/Input";

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
                <Label htmlFor="type">Type</Label>
                <Select
                  value={localFilters.type}
                  id="type"
                  onChange={(e) => setLocalFilters({ ...localFilters, type: e.target.value as 'all' | TransactionType })}
                >
                  <option value="all">All Transactions</option>
                  <option value="deposit">Deposits</option>
                  <option value="withdrawal">Withdrawals</option>
                </Select>
              </div>

              {/* Filter by Start Date */}
              <div className="flex flex-col gap-1">
                {/* <Label htmlFor="start-date">Date From</Label> */}
                <Label htmlFor="start-date">Date From</Label>
                <Input type="date" id="start-date" value={localFilters.startDate} onChange={(e) => setLocalFilters({ ...localFilters, startDate: e.target.value })} />

              </div>

              {/* Filter by End Date */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="end-date">Date To</Label>
                <Input type="date" id="end-date" value={localFilters.endDate} onChange={(e) => setLocalFilters({ ...localFilters, endDate: e.target.value })} />
              </div>

              {/* Filter by Description */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="description">Description</Label>
                <Input type="text" id="description" value={localFilters.description} onChange={(e) => setLocalFilters({ ...localFilters, description: e.target.value })} placeholder="Search description..." />
              </div>

              <div className="flex flex-col gap-2">
                {/* Submit Button */}
                <Button type="submit"
                  onClick={() => {
                    setFilters(localFilters);
                    setIsFilterOpen(false);
                  }}
                  typeVariant="primary">
                  Apply Filters
                </Button>

                {/* Reset Filters Button */}
                <Button type="button"
                  onClick={() => {
                    setLocalFilters(defaultFilters);
                    setFilters(defaultFilters);
                    setIsFilterOpen(false);
                  }}
                  typeVariant="secondary">
                  Reset Filters
                </Button>
                
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Overlay>
  );
};

export default TransactionFilter;