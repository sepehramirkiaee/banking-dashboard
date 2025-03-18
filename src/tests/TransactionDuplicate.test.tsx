import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Transaction } from "@/types";
import NotificationContainer from "@/components/common/ui/NotificationContainer";
import Dashboard from "@/pages/Dashboard";
import { useTransactionStore } from "@/store/useTransactionStore";
import { clickOnActionButton, openTransactionMenu } from "./helpers";

describe("TransactionEdit", () => {
  let transaction: Transaction;

  beforeEach(() => {
    cleanup();

    transaction = {
      id: "000-000-000-000-001",
      description: "Test Transaction",
      amount: 100,
      date: "2025-03-17",
      type: "deposit",
      createdAt: Date.now(),
    };

    useTransactionStore.setState({
      transactions: [transaction],
    });

    render(<Dashboard />);
    render(<NotificationContainer />);
  });

  it("should open the action menu when clicking the ellipsis button", () => {
    openTransactionMenu()
    expect(screen.getByTestId("duplicateButton")).toBeInTheDocument();
  });

  it("should open transaction form clicking duplicate", () => {
    openTransactionMenu()
    clickOnActionButton("duplicateButton");
    expect(screen.getByRole('button', { name: "Add Transaction" })).toBeInTheDocument();
  });

  it("should pre-fill the form when duplicating a transaction", () => {
    openTransactionMenu()
    clickOnActionButton("duplicateButton");

    expect(screen.getByDisplayValue("100")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test Transaction")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2025-03-17")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveValue("deposit")
  });

  it("should call setDuplicatingTransaction when clicking duplicate", () => {
    openTransactionMenu()
    clickOnActionButton("duplicateButton");

    waitFor(() => {
      expect(useTransactionStore.getState().duplicatingTransaction).toEqual(transaction);
    });
  });

  it("should add new transaction when submitting the form", () => {
    openTransactionMenu()
    clickOnActionButton("duplicateButton");

    fireEvent.change(screen.getByLabelText("Amount"), { target: { value: "200" } });
    fireEvent.change(screen.getByLabelText("Description"), { target: { value: "Duplicated Test Transaction" }});

    const submitButton = screen.getByRole('button', { name: "Add Transaction" });
    fireEvent.click(submitButton);

    waitFor(() => {
      expect(screen.getByText("Transaction added successfully!")).toBeInTheDocument();
      expect(screen.getByText("Duplicated Test Transaction")).toBeInTheDocument();
    });
  });

});