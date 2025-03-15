import { useTransactionStore } from "@/store/useTransactionStore";
import AccountStatCard from "./account-overview/AccountStatCard";
import Card from "../common/ui/Card";

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
    <div>
      <h2 className="font-semibold  mb-3">Account Overview</h2>
      <Card>
        <div className="flex flex-col divide-y divide-gray-200 md:flex-row md:divide-y-0 md:divide-x md:gap-4">
          <AccountStatCard title="Balance" value={Number(totalBalance.toFixed(2))} />
          <AccountStatCard title="Income" value={Number(totalIncome.toFixed(2))} />
          <AccountStatCard title="Expenses" value={Number(Math.abs(totalExpenses).toFixed(2))} />
        </div>
      </Card>
    </div>
  );
};

export default AccountOverview;