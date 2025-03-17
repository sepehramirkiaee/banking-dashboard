import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Dashboard from "@/pages/Dashboard";
import { useTransactionStore } from "@/store/useTransactionStore";

describe("Undo Transaction", () => {
  it("should delete the last added transaction", () => {
    useTransactionStore.setState({
      transactions: [{ id: "000-000-000-000-001", description: "Test Transaction", amount: 100, date: "2025-03-17", type: "deposit", createdAt: Date.now() }],
      lastAddedTransaction: { id: "000-000-000-000-001", description: "Test Transaction", amount: 100, date: "2025-03-17", type: "deposit", createdAt: Date.now() },
    });

    render(<Dashboard />);
    fireEvent.click(screen.getByRole("button", { name: /Undo/i }));

    expect(screen.queryByText("Test Transaction")).not.toBeInTheDocument();
  });
});