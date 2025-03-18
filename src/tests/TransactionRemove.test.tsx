import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import TransactionItem from "@/components/dashboard/transaction-list/TransactionItem";
import "@testing-library/jest-dom";
import { Transaction } from "@/types";
import NotificationContainer from "@/components/common/ui/NotificationContainer";

describe("TransactionItem", () => {
  let transaction: Transaction;

  beforeEach(() => {
    cleanup();

    const root = document.createElement("div");
    root.setAttribute("id", "root");
    document.body.appendChild(root);

    transaction = {
      id: "000-000-000-000-001",
      description: "Test Transaction",
      amount: 100,
      date: "2025-03-17",
      type: "deposit",
      createdAt: Date.now(),
    };

    render(<TransactionItem transaction={transaction} />);
    render(<NotificationContainer />);
  });

  it("should open the action menu when clicking the ellipsis button", () => {
    const menuButton = screen.getByTestId("itemActions");
    fireEvent.click(menuButton);

    expect(screen.getByTestId("removeButton")).toBeInTheDocument();
  });

  it("should open confirmation dialog when clicking remove", () => {

    const menuButton = screen.getByTestId("itemActions");
    fireEvent.click(menuButton);

    const removeButton = screen.getByTestId("removeButton");
    fireEvent.click(removeButton);

    expect(screen.getByText("Are you sure you want to remove this transaction?")).toBeInTheDocument();
  });

  it("should call removeTransaction and show notification when confirming deletion", () => {

    const menuButton = screen.getByTestId("itemActions");
    fireEvent.click(menuButton);

    const removeButton = screen.getByTestId("removeButton");
    fireEvent.click(removeButton);

    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);

    waitFor(() => {
      expect(screen.getByText("Transaction removed successfully!")).toBeInTheDocument();
      expect(screen.queryByText("Test Transaction")).not.toBeInTheDocument();
    });
  });

  it("should not remove transaction when clicking cancel", () => {
    const menuButton = screen.getByTestId("itemActions");
    fireEvent.click(menuButton);

    const removeButton = screen.getByTestId("removeButton");
    fireEvent.click(removeButton);

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(screen.getByText("Test Transaction")).toBeInTheDocument();
  });
});