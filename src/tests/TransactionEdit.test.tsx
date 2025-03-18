import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
// import TransactionItem from "@/components/dashboard/transaction-list/TransactionItem";
import "@testing-library/jest-dom";
import { Transaction } from "@/types";
import NotificationContainer from "@/components/common/ui/NotificationContainer";
// import { TransactionForm } from "@/components/dashboard";
import Dashboard from "@/pages/Dashboard";
import { useTransactionStore } from "@/store/useTransactionStore";

describe("TransactionEdit", () => {
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

    useTransactionStore.setState({
      transactions: [transaction],
    });

    render(<Dashboard />);
    // render(<TransactionItem transaction={transaction} />);
    // render(<TransactionForm />);
    render(<NotificationContainer />);
  });

  it("should open the action menu when clicking the ellipsis button", () => {
    const menuButton = screen.getByTestId("itemActions");
    fireEvent.click(menuButton);

    expect(screen.getByTestId("editButton")).toBeInTheDocument();
  });

  it("should open the TransactionForm when clicking edit", () => {
    const menuButton = screen.getByTestId("itemActions");
    fireEvent.click(menuButton);

    const editButton = screen.getByTestId("editButton");
    fireEvent.click(editButton);

    expect(screen.getByText("Update Transaction")).toBeInTheDocument();
  });

  it("should pre-fill the form when editing a transaction", () => {
    const menuButton = screen.getByTestId("itemActions");
    fireEvent.click(menuButton);

    const editButton = screen.getByTestId("editButton");
    fireEvent.click(editButton);

    expect(screen.getByDisplayValue("100")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test Transaction")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2025-03-17")).toBeInTheDocument();
  });

  it("should update the transaction when submitting the form", () => {
    const menuButton = screen.getByTestId("itemActions");
    fireEvent.click(menuButton);

    const editButton = screen.getByTestId("editButton");
    fireEvent.click(editButton);

    fireEvent.change(screen.getByLabelText("Amount"), { target: { value: "200" } });
    fireEvent.change(screen.getByLabelText("Description"), { target: { value: "Updated Test Transaction" } });

    const submitButton = screen.getByText("Update Transaction");
    fireEvent.click(submitButton);

    waitFor(() => {
      expect(screen.getByText("Transaction updated successfully!")).toBeInTheDocument();
      expect(screen.getByText("Updated Test Transaction")).toBeInTheDocument();
    });
  });

  it("should not update the transaction when submitting with an invalid amount", () => {
    const menuButton = screen.getByTestId("itemActions");
    fireEvent.click(menuButton);

    const editButton = screen.getByTestId("editButton");
    fireEvent.click(editButton);

    fireEvent.change(screen.getByLabelText("Amount"), { target: { value: "0" } });

    const submitButton = screen.getByText("Update Transaction");
    fireEvent.click(submitButton);

    waitFor(() => {
      expect(screen.getByText("Amount must be greater than 0.01")).toBeInTheDocument();
    });
  });

  it("should not update the transaction when submitting with an invalid description", () => {
    const menuButton = screen.getByTestId("itemActions");
    fireEvent.click(menuButton);

    const editButton = screen.getByTestId("editButton");
    fireEvent.click(editButton);

    fireEvent.change(screen.getByLabelText("Description"), { target: { value: "" } });

    const submitButton = screen.getByText("Update Transaction");
    fireEvent.click(submitButton);

    waitFor(() => {
      expect(screen.getByText("Description cannot be empty.")).toBeInTheDocument();
    });
  });

  it("should not update the transaction when submitting with an invalid date", () => {
    const menuButton = screen.getByTestId("itemActions");
    fireEvent.click(menuButton);

    const editButton = screen.getByTestId("editButton");
    fireEvent.click(editButton);

    fireEvent.change(screen.getByLabelText("Transaction Date"), { target: { value: "" } });

    const submitButton = screen.getByText("Update Transaction");
    fireEvent.click(submitButton);

    waitFor(() => {
      expect(screen.getByText("Please select a valid date.")).toBeInTheDocument();
    });
  });

  it("should not update the transaction when submitting with an invalid type", () => {
    const menuButton = screen.getByTestId("itemActions");
    fireEvent.click(menuButton);

    const editButton = screen.getByTestId("editButton");
    fireEvent.click(editButton);

    fireEvent.change(screen.getByLabelText("Type"), { target: { value: "" } });

    const submitButton = screen.getByText("Update Transaction");
    fireEvent.click(submitButton);

    waitFor(() => {
      expect(screen.getByText("Please select a transaction type.")).toBeInTheDocument();
    });
  });

});