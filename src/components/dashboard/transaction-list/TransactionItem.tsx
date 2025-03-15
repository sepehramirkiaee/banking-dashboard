import { useState, useRef, useEffect } from "react";
import { useTransactionStore } from "@/store/useTransactionStore";
import { Transaction } from "@/types";
import { DocumentDuplicateIcon, EllipsisVerticalIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import ActionButton from "./transaction-item/ActionButton";

export default function TransactionItem({ transaction }: { transaction: Transaction }) {
  const { removeTransaction, setEditingTransactionId, editingTransactionId, setDuplicatingTransaction } = useTransactionStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleRemove = (id: string) => {
    const confirmed = window.confirm("Are you sure you want to remove this transaction?");
    if (confirmed) {
      if (editingTransactionId === id) {
        setEditingTransactionId(null);
      }
      removeTransaction(id);
    }
  };

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <li key={transaction.id} className="flex gap-2 justify-between items-center py-3 px-5 relative">
      <div className="grow flex flex-col gap-1">
        <p className="text-gray-800 font-semibold">{transaction.description}</p>
        <p className="text-xs text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
      </div>
      <p className={` font-bold tabular-nums ${transaction.type === "deposit" ? "text-green-500" : "text-red-500"}`}>
        {transaction.type === "deposit" ? "+" : "-"}€{Math.abs(transaction.amount).toFixed(2)}
      </p>

      {/* Ellipsis Button */}
      <div className="-mr-2 relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center hover:bg-gray-100 p-1 rounded cursor-pointer"
        >
          <EllipsisVerticalIcon className="h-5 w-5 text-gray-500" />
        </button>

        {/* Floating Popup Menu */}
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="absolute right-0 mt-2 w-36 bg-white shadow-xl rounded-lg border border-gray-200 z-50 overflow-hidden"
          >

            <ActionButton onClick={() => {
              setEditingTransactionId(transaction.id);
              setIsMenuOpen(false);
            }}>
              <PencilSquareIcon className="size-4" />
              <span>Edit</span>
            </ActionButton>

            <ActionButton onClick={() => {
              setDuplicatingTransaction(transaction);
              setIsMenuOpen(false);
            }}>
              <DocumentDuplicateIcon className="size-4" />
              <span>Duplicate</span>
            </ActionButton>

            <ActionButton onClick={() => {
              handleRemove(transaction.id);
              setIsMenuOpen(false);
            }}>
              <TrashIcon className="size-4" />
              <span>Remove</span>
            </ActionButton>

          </div>
        )}
      </div>
    </li>
  );
}
