import { AccountOverview, TransactionForm, TransactionList } from "@/components/dashboard";
import UndoTransaction from "@/components/dashboard/UndoTransaction";
import { useTransactionStore } from "@/store/useTransactionStore";
import { CloudIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import useNotification from "@/hooks/useNotification";
import NotificationContainer from "@/components/common/ui/NotificationContainer";


const Dashboard = () => {
  const { notifications, addNotification, removeNotification } = useNotification();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const { editingTransactionId, duplicatingTransaction, importTransactionsFromCSV } = useTransactionStore();
  const uploaderRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingTransactionId || duplicatingTransaction) {
      setIsFormOpen(true);
    }
  }, [editingTransactionId, duplicatingTransaction]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      importTransactionsFromCSV(file);
    } else {
      alert("No file selected.");
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

      <div>
        <button onClick={() => addNotification("Transaction added successfully!", "success")} className="p-2 bg-green-500 text-white rounded">
          Show Success
        </button>
        <button onClick={() => addNotification("Something went wrong!", "error")} className="p-2 bg-red-500 text-white rounded ml-2">
          Show Error
        </button>
        <button onClick={() => addNotification("This is a warning.", "warning")} className="p-2 bg-yellow-500 text-white rounded ml-2">
          Show Warning
        </button>

        {/* Notification Container */}
        <NotificationContainer notifications={notifications} removeNotification={removeNotification} />
      </div>
    </div>
  );
};

export default Dashboard;