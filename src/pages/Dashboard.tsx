import { AccountOverview, TransactionForm} from "@/components/dashboard";

const Dashboard = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">🏠 Dashboard</h1>
      <p>Welcome to the Banking Dashboard</p>
      <AccountOverview />
      <TransactionForm />
    </div>
  );
};

export default Dashboard;