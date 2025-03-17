import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import TransactionList from "@/components/dashboard/TransactionList";
import { useTransactionStore } from "@/store/useTransactionStore";
import "@testing-library/jest-dom";
import { openFilterForm } from "./helpers";

describe("TransactionList", () => {
  beforeEach(() => {
    cleanup();
    // useTransactionStore.setState({
    //   getFilteredTransactions: () => [{ id: "000-000-000-000-001", description: "Test Transaction", amount: 100, date: new Date().toISOString(), type: "deposit", createdAt: Date.now() }],
    //   isFilterActive: () => false,
    // });
    render(<TransactionList />);
    // openFilterForm();
  });

  it("should NOT render the Filter button when there are no transactions and no active filter", () => {
    useTransactionStore.setState({ getFilteredTransactions: () => [], isFilterActive: () => false });
    expect(screen.queryByTestId("filter-button")).not.toBeInTheDocument();
  });

  it("should render the Filter button when transactions exist", () => {
    useTransactionStore.setState({
      transactions: [
        { id: "000-000-000-000-001", description: "Salary", amount: 1000, date: "2025-03-15", type: "deposit", createdAt: Date.now() },
        { id: "000-000-000-000-002", description: "Groceries", amount: 50, date: "2025-03-16", type: "withdrawal", createdAt: Date.now() },
      ],
    });

    waitFor(() => {
      expect(screen.getByTestId("filter-button")).toBeInTheDocument();
    });
  });

  it("should render the Filter button when a filter is active, even if no transactions exist", () => {
    useTransactionStore.setState({ isFilterActive: () => true });

    waitFor(() => {
      expect(screen.getByTestId("filter-button")).toBeInTheDocument();
    });
  });

  it("should open the TransactionFilter form when clicking the Filter button", () => {
    useTransactionStore.setState({
      transactions: [
        { id: "000-000-000-000-001", description: "Salary", amount: 1000, date: "2025-03-15", type: "deposit", createdAt: Date.now() },
        { id: "000-000-000-000-002", description: "Groceries", amount: 50, date: "2025-03-16", type: "withdrawal", createdAt: Date.now() },
      ],
    });

    openFilterForm();

    expect(screen.getByText("Apply Filters")).toBeInTheDocument();
  });

  it("should list be filtered by chosen type", () => {
    useTransactionStore.setState({
      transactions: [
        { id: "000-000-000-000-001", description: "Salary", amount: 1000, date: "2025-03-15", type: "deposit", createdAt: Date.now() },
        { id: "000-000-000-000-002", description: "Groceries", amount: 50, date: "2025-03-16", type: "withdrawal", createdAt: Date.now() },
      ],
    });

    openFilterForm();

    fireEvent.change(screen.getByLabelText("Type"), { target: { value: "deposit" } });

    waitFor(() => {
      expect(screen.getByText("Salary")).toBeInTheDocument();
      expect(screen.queryByText("Groceries")).not.toBeInTheDocument();
    });
  });

  it("should list be filtered by chosen date range", () => {
    useTransactionStore.setState({
      transactions: [
        { id: "000-000-000-000-001", description: "Salary", amount: 1000, date: "2025-03-15", type: "deposit", createdAt: Date.now() },
        { id: "000-000-000-000-002", description: "Groceries", amount: 50, date: "2025-03-16", type: "withdrawal", createdAt: Date.now() },
      ],
    });

    openFilterForm();

    fireEvent.change(screen.getByLabelText("Date From"), { target: { value: "2025-03-15" } });
    fireEvent.change(screen.getByLabelText("Date To"), { target: { value: "2025-03-15" } });

    waitFor(() => {
      expect(screen.getByText("Salary")).toBeInTheDocument();
      expect(screen.queryByText("Groceries")).not.toBeInTheDocument();
    });
  });

  it("should list be filtered by chosen description", () => {
    useTransactionStore.setState({
      transactions: [
        { id: "000-000-000-000-001", description: "Salary", amount: 1000, date: "2025-03-15", type: "deposit", createdAt: Date.now() },
        { id: "000-000-000-000-002", description: "Groceries", amount: 50, date: "2025-03-16", type: "withdrawal", createdAt: Date.now() },
      ],
    });

    openFilterForm();

    fireEvent.change(screen.getByLabelText("Description"), { target: { value: "Salary" } });

    waitFor(() => {
      expect(screen.getByText("Salary")).toBeInTheDocument();
      expect(screen.queryByText("Groceries")).not.toBeInTheDocument();
    });
  });

  it("should list be filtered by chosen type, date range, and description", () => {
    useTransactionStore.setState({
      transactions: [
        { id: "000-000-000-000-001", description: "Salary", amount: 1000, date: "2025-03-15", type: "deposit", createdAt: Date.now() },
        { id: "000-000-000-000-002", description: "Groceries", amount: 50, date: "2025-03-16", type: "withdrawal", createdAt: Date.now() },
      ],
    });

    openFilterForm();

    fireEvent.change(screen.getByLabelText("Type"), { target: { value: "deposit" } });
    fireEvent.change(screen.getByLabelText("Date From"), { target: { value: "2025-03-15" } });
    fireEvent.change(screen.getByLabelText("Date To"), { target: { value: "2025-03-15" } });
    fireEvent.change(screen.getByLabelText("Description"), { target: { value: "Salary" } });

    waitFor(() => {
      expect(screen.getByText("Salary")).toBeInTheDocument();
      expect(screen.queryByText("Groceries")).not.toBeInTheDocument();
    });
  });

  it("should clear the filter when clicking the Clear button", () => {
    useTransactionStore.setState({
      transactions: [
        { id: "000-000-000-000-001", description: "Salary", amount: 1000, date: "2025-03-15", type: "deposit", createdAt: Date.now() },
        { id: "000-000-000-000-002", description: "Groceries", amount: 50, date: "2025-03-16", type: "withdrawal", createdAt: Date.now() },
      ],
    });

    openFilterForm();

    fireEvent.change(screen.getByLabelText("Type"), { target: { value: "deposit" } });
    fireEvent.change(screen.getByLabelText("Date From"), { target: { value: "2025-03-15" } });
    fireEvent.change(screen.getByLabelText("Date To"), { target: { value: "2025-03-15" } });
    fireEvent.change(screen.getByLabelText("Description"), { target: { value: "Salary" } });

    fireEvent.click(screen.getByText("Reset Filters"));

    waitFor(() => {
      expect(screen.getByText("Salary")).toBeInTheDocument();
      expect(screen.getByText("Groceries")).toBeInTheDocument();
    });
  });

});