import { describe, it, beforeEach, vi, MockedFunction, expect } from "vitest";
import { useTransactionStore } from "@/store/useTransactionStore";
import { Transaction } from "@/types";

describe("useTransactionStore", () => {
  let notifyMock: MockedFunction<(message: string, type: string) => void>;

  beforeEach(() => {
    useTransactionStore.setState({
      transactions: [],
      lastAddedTransaction: null,
      editingTransactionId: null,
      duplicatingTransaction: null,
    });
    notifyMock = vi.fn();
  });

  // Add a new transaction
  it("should add a new transaction to the list", () => {
    const { addTransaction, getFilteredTransactions } =
      useTransactionStore.getState();

    const newTransaction: Transaction = {
      id: "000-000-000-000-000",
      amount: 100,
      description: "Test Transaction",
      date: new Date().toISOString(),
      type: "deposit",
      createdAt: Date.now(),
    };

    addTransaction(newTransaction, notifyMock);

    const transactions = getFilteredTransactions();
    expect(transactions.length).toBe(1);
    expect(transactions[0]).toEqual(newTransaction);
    expect(notifyMock).toHaveBeenCalledWith(
      "Transaction added successfully!",
      "success"
    );
  });

  // Remove a transaction
  it("should remove the specified transaction from the list", () => {
    const { addTransaction, removeTransaction, getFilteredTransactions } =
      useTransactionStore.getState();

    const transaction1: Transaction = {
      id: "000-000-000-000-000",
      amount: 100,
      description: "Test Transaction",
      date: new Date().toISOString(),
      type: "deposit",
      createdAt: Date.now(),
    };

    addTransaction(transaction1, notifyMock);
    expect(getFilteredTransactions().length).toBe(1);

    removeTransaction("000-000-000-000-000", notifyMock);
    expect(getFilteredTransactions().length).toBe(0);
    expect(notifyMock).toHaveBeenCalledWith(
      "Transaction removed successfully!",
      "success"
    );
  });

  // Calculate the total balance
  it("should correctly calculate the total balance", () => {
    const { addTransaction, getTotalBalance } = useTransactionStore.getState();

    // Add a deposit transaction
    addTransaction(
      {
        id: "000-000-000-000-000",
        amount: 200,
        description: "Salary",
        date: new Date().toISOString(),
        type: "deposit",
        createdAt: Date.now(),
      },
      notifyMock
    );

    // Add a withdrawal transaction
    addTransaction(
      {
        id: "000-000-000-000-001",
        amount: 50,
        description: "Groceries",
        date: new Date().toISOString(),
        type: "withdrawal",
        createdAt: Date.now(),
      },
      notifyMock
    );

    // Add another deposit transaction
    addTransaction(
      {
        id: "000-000-000-000-002",
        amount: 150,
        description: "Freelance Payment",
        date: new Date().toISOString(),
        type: "deposit",
        createdAt: Date.now(),
      },
      notifyMock
    );

    // Expected balance: 200 + 150 - 50 = 300
    expect(getTotalBalance()).toBe(300);
  });

  // Test filtering transactions
  it("should filter transactions correctly based on type, date range, and description", () => {
    const { addTransaction, getFilteredTransactions, setFilters } =
      useTransactionStore.getState();

    // Add test transactions
    addTransaction(
      {
        id: "000-000-000-000-000",
        amount: 200,
        description: "Salary",
        date: "2024-04-01T00:00:00.000Z",
        type: "deposit",
        createdAt: Date.now(),
      },
      notifyMock
    );

    addTransaction(
      {
        id: "000-000-000-000-001",
        amount: 50,
        description: "Groceries",
        date: "2024-04-03T00:00:00.000Z",
        type: "withdrawal",
        createdAt: Date.now(),
      },
      notifyMock
    );

    addTransaction(
      {
        id: "000-000-000-000-002",
        amount: 150,
        description: "Freelance Payment",
        date: "2024-04-05T00:00:00.000Z",
        type: "deposit",
        createdAt: Date.now(),
      },
      notifyMock
    );

    // Test filtering by type: Only deposits should be returned
    setFilters({ type: "deposit" });
    expect(getFilteredTransactions().length).toBe(2);

    // Test filtering by date range: Only transactions between 2024-04-02 and 2024-04-04 should be returned
    setFilters({ type: "all", startDate: "2024-04-02", endDate: "2024-04-04" });
    expect(getFilteredTransactions().length).toBe(1);
    expect(getFilteredTransactions()[0]!.description).toBe("Groceries");

    // Test filtering by description: Should match partial text case-insensitively
    setFilters({
      type: "all",
      startDate: "",
      endDate: "",
      description: "free",
    });
    expect(getFilteredTransactions().length).toBe(1);
    expect(getFilteredTransactions()[0]!.description).toBe("Freelance Payment");
  });

  it("should correctly paginate transactions", async () => {
    const { addTransaction, getFilteredTransactions, setCurrentPage, setTransactionPerPage, setFilters } =
      useTransactionStore.getState();
    
    setFilters({ type: "all", startDate: "", endDate: "", description: "" });
  
    for (let i = 1; i <= 10; i++) {
      addTransaction(
        {
          id: `000-000-000-000-00${i}`,
          amount: i * 10,
          description: `Transaction ${i}`,
          date: `2024-04-${i < 10 ? `0${i}` : i}`,
          type: i % 2 === 0 ? "deposit" : "withdrawal",
          createdAt: Date.now() + i, // Ensure unique timestamps
        },
        notifyMock
      );
    }
  
    setTransactionPerPage(5);
    setCurrentPage(1);
  
    const transactionsPage1 = getFilteredTransactions();
  
    expect(transactionsPage1.length).toBe(5);
    expect(transactionsPage1[0]!.description).toBe("Transaction 10");

    setCurrentPage(2);
    const transactionsPage2 = getFilteredTransactions();

    expect(transactionsPage2.length).toBe(5);
    expect(transactionsPage2[0]!.description).toBe("Transaction 5");
  });
});
