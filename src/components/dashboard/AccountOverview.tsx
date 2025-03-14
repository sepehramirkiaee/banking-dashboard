import { useTransactionStore } from "@/store/useTransactionStore";
import AccountStatCard from "./account-overview/AccountStatCard";

const AccountOverview = () => {
  const { transactions, getTotalBalance } = useTransactionStore();


  // Calculate Total Income
  const totalIncome = transactions
    .filter((t) => t.type === 'deposit')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  // Calculate Total Expenses
  const totalExpenses = transactions
    .filter((t) => t.type === 'withdrawal')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  // Balance Calculation
  const totalBalance = getTotalBalance();

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">💰 Account Overview</h2>
      <div className="flex flex-col gap-2">
        <AccountStatCard title="Balance" value={Number(totalBalance.toFixed(2))} />
        <AccountStatCard title="Income" value={Number(totalIncome.toFixed(2))} />
        <AccountStatCard title="Expenses" value={Number(Math.abs(totalExpenses).toFixed(2))} />

      </div>
    </div>
  );
};

export default AccountOverview;