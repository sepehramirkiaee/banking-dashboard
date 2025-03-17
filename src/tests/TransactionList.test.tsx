import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TransactionList from "@/components/dashboard/TransactionList";
import { useTransactionStore } from "@/store/useTransactionStore";

describe("TransactionList", () => {
  it("should display transactions correctly", () => {
    useTransactionStore.setState({
      transactions: [
        { id: "000-000-000-000-001", description: "Salary", amount: 1000, date: "2025-03-15", type: "deposit", createdAt: Date.now() },
        { id: "000-000-000-000-002", description: "Groceries", amount: 50, date: "2025-03-16", type: "withdrawal", createdAt: Date.now() },
      ],
    });

    render(<TransactionList />);

    expect(screen.getByText("Salary")).toBeInTheDocument();
    expect(screen.getByText("+€1,000.00")).toBeInTheDocument();
    expect(screen.getByText("Groceries")).toBeInTheDocument();
    expect(screen.getByText("-€50.00")).toBeInTheDocument();
  });
});