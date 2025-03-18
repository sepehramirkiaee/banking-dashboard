import { useEffect, useState } from "react";
import { useTransactionStore } from "@/store/useTransactionStore";
import Overlay from "../common/ui/Overlay";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Card from "../common/ui/Card";
import { useNotification } from "@/hooks/useNotification";
import BigNumber from "bignumber.js";
import Input from "../common/form/Input";
import Label from "../common/form/Label";
import Select from "../common/form/Select";
import Button from "../common/form/Button";

interface TransactionFormProps {
  setIsFormOpen: (value: boolean) => void;
}

const TransactionForm = ({ setIsFormOpen }: TransactionFormProps) => {
  const { addTransaction, updateTransaction, duplicatingTransaction, setDuplicatingTransaction, getTotalBalance, editingTransactionId, setEditingTransactionId, transactions } = useTransactionStore();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"deposit" | "withdrawal">("deposit");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Default to today
  const { addNotification } = useNotification()

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

  // Pre-fill form when editing a transaction
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const numericAmount = Number(new BigNumber(amount).toFixed(2));

    // Prevent negative values and zero
    if (!amount || isNaN(numericAmount)) {
      addNotification('please enter a valid positive amount', 'error');
      return;
    }

    if (numericAmount > 1000000000) {
      addNotification('Amount must be less than 1,000,000,000', 'error');
      return;
    }

    if (numericAmount < 0.01) {
      addNotification('Amount must be greater than 0.01', 'error');
      return;
    }

    // Trim description to remove unnecessary spaces
    const trimmedDescription = description.trim();
    if (!trimmedDescription) {
      addNotification('Description cannot be empty.', 'error');
      return;
    }

    if (trimmedDescription.length < 3) {
      addNotification('Description must be more than 3 characters.', 'error');
      return;
    }

    if (trimmedDescription.length > 50) {
      addNotification('Description must be less than 50 characters.', 'error');
      return;
    }

    if (!date || isNaN(new Date(date).getTime())) {
      addNotification('Please select a valid date.', 'error');
      return;
    }

    // Ensure Transaction Type is Selected
    if (!type) {
      addNotification('Please select a transaction type.', 'error');
      return;
    }

    // Ensure Withdrawal Does Not Exceed Available Balance
    if (type === "withdrawal") {
      const totalBalance = getTotalBalance();
      if (numericAmount > totalBalance) {
        addNotification('Insufficient balance! You cannot withdraw more than your available balance.', 'error');
        return;
      }
    }

    // Add or Update Transaction. Check if editing or adding
    if (editingTransactionId) {
      const transaction = transactions.find(
        (t) => t.id === editingTransactionId
      );
      updateTransaction({
        id: editingTransactionId,
        amount: numericAmount,
        description: trimmedDescription,
        date: new Date(date).toISOString(),
        type,
        createdAt: transaction?.createdAt || new Date().getTime(),
      },
        addNotification
      );

      setEditingTransactionId(null);
    } else {
      addTransaction({
        id: crypto.randomUUID(),
        amount: numericAmount,
        description: trimmedDescription,
        date: new Date(date).toISOString(),
        type,
        createdAt: new Date().getTime(),
      }, addNotification);
    }

    // Reset Form Inputs After Submission
    handleResetForm();
  };

  // Reset Form Inputs
  const handleResetForm = () => {
    setAmount("");
    setDescription("");
    setType("deposit");
    setDate(new Date().toISOString().split("T")[0]);
    setEditingTransactionId(null);
    setDuplicatingTransaction(null);
    setIsFormOpen(false)
  }

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
                  <Label htmlFor="amount">Amount</Label>
                  <Input type="number" id="amount" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" />
                </div>

                <div className="flex flex-col gap-1">
                  <Label htmlFor="description">Description</Label>
                  <Input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description" />
                </div>

                <div className="flex flex-col gap-1">
                  <Label htmlFor="date">Transaction Date</Label>
                  <Input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>

                <div className="flex flex-col gap-1">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={type}
                    id="type"
                    onChange={(e) => setType(e.target.value as "deposit" | "withdrawal")}
                  >
                    <option value="deposit">Deposit</option>
                    <option value="withdrawal">Withdrawal</option>
                  </Select>
                  
                </div>

                <div className="flex flex-col gap-2">
                  <Button type="submit" typeVariant="primary">
                    {editingTransactionId ? "Update Transaction" : "Add Transaction"}
                  </Button>

                  <Button type="button" typeVariant="secondary" onClick={handleResetForm}>
                    Cancel
                  </Button>

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