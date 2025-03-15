import { useEffect, useState } from "react";
import { useTransactionStore } from "@/store/useTransactionStore";
import Overlay from "../common/ui/Overlay";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Card from "../common/ui/Card";

interface TransactionFormProps {
  setIsFormOpen: (value: boolean) => void;
}

const TransactionForm = ({ setIsFormOpen }: TransactionFormProps) => {
  const { addTransaction, duplicatingTransaction, setDuplicatingTransaction, removeTransaction, getTotalBalance, editingTransactionId, setEditingTransactionId, transactions } = useTransactionStore();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"deposit" | "withdrawal">("deposit");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Default to today

  // Pre-fill form when duplicating a transaction
  useEffect(() => {
    if (duplicatingTransaction) {
      setAmount(duplicatingTransaction.amount.toString());
      setDescription(duplicatingTransaction.description);
      setDate(duplicatingTransaction.date.split("T")[0]);
      setType(duplicatingTransaction.type);
      setDuplicatingTransaction(null); // Reset after filling
    }
  }, [duplicatingTransaction, setDuplicatingTransaction]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const numericAmount = Number(amount);

    // Prevent negative values and zero
    if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
      alert("Please enter a valid positive amount.");
      return;
    }

    // Trim description to remove unnecessary spaces
    const trimmedDescription = description.trim();
    if (!trimmedDescription || trimmedDescription.length < 3 || trimmedDescription.length > 50) {
      alert("Description must be between 3 and 50 characters.");
      return;
    }

    // Ensure Transaction Type is Selected
    if (!type) {
      alert("Please select a transaction type.");
      return;
    }

    // Ensure Withdrawal Does Not Exceed Available Balance
    if (type === "withdrawal") {
      const totalBalance = getTotalBalance();
      if (numericAmount > totalBalance) {
        alert("Insufficient balance! You cannot withdraw more than your available balance.");
        return;
      }
    }

    if (editingTransactionId) {
      removeTransaction(editingTransactionId);
      addTransaction({
        id: editingTransactionId,
        amount: numericAmount,
        description: trimmedDescription,
        date: new Date(date).toISOString(),
        type,
        createdAt: new Date().getTime(),
      });

      setEditingTransactionId(null);
    } else {
      addTransaction({
        id: crypto.randomUUID(),
        amount: numericAmount,
        description: trimmedDescription,
        date: new Date(date).toISOString(),
        type,
        createdAt: new Date().getTime(),
      });
    }

    // Reset Form Inputs After Submission
    handleResetForm();
  };

  const handleResetForm = () => {
    setAmount("");
    setDescription("");
    setType("deposit");
    setDate(new Date().toISOString().split("T")[0]);
    setEditingTransactionId(null);
    setDuplicatingTransaction(null);
    setIsFormOpen(false)
  }

  useEffect(() => {
    if (editingTransactionId) {
      const transaction = transactions.find(
        (t) => t.id === editingTransactionId
      );

      if (transaction) {
        setAmount(transaction.amount.toString());
        setDescription(transaction.description);
        setType(transaction.type);
        setDate(transaction.date.split("T")[0]);
      }
    }
  }, [editingTransactionId]);

  return (
    <Overlay className="flex items-center justify-center">
      <div className="w-full m-4 md:w-1/2">
        <Card>
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Add Transaction</h3>
                <XMarkIcon onClick={handleResetForm} className="size-5 cursor-pointer" />
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="block text-gray-800 text-sm font-medium">Amount</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => {
                      // Prevent negative input from being typed
                      const value = e.target.value;
                      if (value === "" || Number(value) > 0) setAmount(value);
                    }}
                    className="w-full p-2 border rounded border-gray-300 text-sm"
                    placeholder="Enter amount"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="block text-gray-800 text-sm font-medium">Description</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border rounded border-gray-300 text-sm"
                    placeholder="Enter description"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="block text-gray-800 text-sm font-medium">Transaction Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2 border rounded border-gray-300 text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="block text-gray-800 text-sm font-medium">Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as "deposit" | "withdrawal")}
                    className="w-full p-2 border rounded border-gray-300 text-sm"
                  >
                    <option value="deposit">Deposit</option>
                    <option value="withdrawal">Withdrawal</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    type="submit"
                    className="w-full text-sm font-medium bg-indigo-700 text-white p-2 rounded hover:bg-ingido-700 cursor-pointer hover:bg-indigo-800"
                  >
                    {editingTransactionId ? "Update Transaction" : "Add Transaction"}
                  </button>
                  {editingTransactionId && (
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="w-full text-sm bg-gray-100 p-2 rounded border border-gray-200 hover:bg-gray-200 cursor-pointer">
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </Overlay>
  );
};

export default TransactionForm;