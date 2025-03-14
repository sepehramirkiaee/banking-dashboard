import { useTransactionStore } from "@/store/useTransactionStore";
import { Transaction } from "@/types";

export default function TransactionItem({ transaction }: { transaction: Transaction }) {
  const { removeTransaction, setEditingTransactionId, editingTransactionId, setDuplicatingTransaction } = useTransactionStore();

  const handleRemove = (id: string) => {
    const confirmed = window.confirm("Are you sure you want to remove this transaction?");
    if (confirmed) {
      if (editingTransactionId === id) {
        setEditingTransactionId(null);
      }
      removeTransaction(id);
    }
  };

  return (
    <li key={transaction.id} className="flex justify-between items-center py-2">
      <div>
        <p className="text-gray-700">{transaction.description}</p>
        <p className={`text-sm ${transaction.type === "deposit" ? "text-green-500" : "text-red-500"}`}>
          {transaction.type === "deposit" ? "+" : "-"}€{Math.abs(transaction.amount).toFixed(2)}
        </p>
        <p className="text-xs text-gray-400">{new Date(transaction.date).toLocaleDateString()}</p>
      </div>
      <div>
        <button
          onClick={() => handleRemove(transaction.id)}
          className="text-red-500 hover:text-red-700"
        >
          ✖
        </button>
        <button
          onClick={() => setEditingTransactionId(transaction.id)}
          className="text-blue-500 hover:text-blue-700"
        >
          ✏
        </button>
        <button
          onClick={() => setDuplicatingTransaction(transaction)}
          className="text-green-500 hover:text-green-700"
        >
          📋
        </button>
      </div>
    </li>
  )
}
