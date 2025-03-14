import { useState } from "react";
import { useTransactionStore } from "@/store/useTransactionStore";

const TransactionForm = () => {
  const { addTransaction, getTotalBalance } = useTransactionStore();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"deposit" | "withdrawal">("deposit");

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

    // Create Transaction (Amount is always positive, system decides deposit/withdrawal)
    const newTransaction = {
      id: crypto.randomUUID(),
      amount: numericAmount,
      description: trimmedDescription,
      date: new Date().toISOString(),
      type,
    };

    addTransaction(newTransaction);

    // Reset Form Inputs After Submission
    setAmount("");
    setDescription("");
    setType("deposit");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded-lg">
      <h3 className="text-lg font-semibold mb-3">➕ Add Transaction</h3>

      <div className="mb-2">
        <label className="block text-gray-700">Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => {
            // Prevent negative input from being typed
            const value = e.target.value;
            if (value === "" || Number(value) > 0) setAmount(value);
          }}
          className="w-full p-2 border rounded"
          placeholder="Enter amount"
        />
      </div>

      <div className="mb-2">
        <label className="block text-gray-700">Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter description"
        />
      </div>

      <div className="mb-2">
        <label className="block text-gray-700">Type:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as "deposit" | "withdrawal")}
          className="w-full p-2 border rounded"
        >
          <option value="deposit">Deposit</option>
          <option value="withdrawal">Withdrawal</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Add Transaction
      </button>
    </form>
  );
};

export default TransactionForm;