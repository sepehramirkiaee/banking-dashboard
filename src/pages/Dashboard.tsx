import { AccountOverview, TransactionForm, TransactionList } from "@/components/dashboard";
import UndoTransaction from "@/components/dashboard/UndoTransaction";
import { useTransactionStore } from "@/store/useTransactionStore";
import { CloudIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { useNotification } from "@/hooks/useNotification";

const Dashboard = () => {

  const [isFormOpen, setIsFormOpen] = useState(false);
  const { editingTransactionId, duplicatingTransaction, importTransactionsFromCSV } = useTransactionStore();
  const uploaderRef = useRef<HTMLInputElement>(null);
  const { addNotification } = useNotification();

  useEffect(() => {
    if (editingTransactionId || duplicatingTransaction) {
      setIsFormOpen(true);
    }
  }, [editingTransactionId, duplicatingTransaction]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      importTransactionsFromCSV(file, addNotification);
    } else {
      addNotification("No file selected.", "error");
    }
  };

  return (
    <div className="flex flex-col gap-12">

      <div className="flex flex-col gap-2 items-center md:flex-row md:gap-4">
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-indigo-700 self-stretch flex gap-2 justify-center items-center font-medium text-white text-sm px-4 py-2 rounded  hover:bg-indigo-800 cursor-pointer">
          <PlusIcon className="size-4" />
          <span>Add New Transaction</span>
        </button>

        <span>or</span>

        <button
          onClick={() => uploaderRef.current?.click()}
          className="bg-indigo-50 cursor-pointer flex gap-1 items-center border border-indigo-600 text-indigo-600 px-4 py-0.5 text-sm font-medium rounded-full hover:bg-indigo-100"
        >
          <CloudIcon className="size-4" />
          <span>Upload CSV to Import</span>
        </button>

        <input
          ref={uploaderRef}
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      <AccountOverview />
      {isFormOpen && <TransactionForm setIsFormOpen={setIsFormOpen} />}
      <TransactionList />
      <UndoTransaction />
    </div>
  );
};

export default Dashboard;