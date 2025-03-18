import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import TransactionList from "@/components/dashboard/TransactionList";
import { useTransactionStore } from "@/store/useTransactionStore";
import "@testing-library/jest-dom";
import { fillDateFromFilter, fillDateToFilter, fillDescriptionFilter, fillTypeFilter, generateTransactions, openFilterForm } from "./helpers";

describe("TransactionFilter", () => {
  beforeEach(() => {
    cleanup();
    render(<TransactionList />);
  });

  it("should NOT render the Filter button when there are no transactions and no active filter", () => {
    useTransactionStore.setState({ getFilteredTransactions: () => [], isFilterActive: () => false });
    expect(screen.queryByTestId("filter-button")).not.toBeInTheDocument();
  });

  it("should render the Filter button when transactions exist", () => {
    useTransactionStore.setState({
      transactions: generateTransactions(),
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
      transactions: generateTransactions(),
    });

    openFilterForm();

    expect(screen.getByText("Apply Filters")).toBeInTheDocument();
  });

  it("should list be filtered by chosen type", () => {
    useTransactionStore.setState({
      transactions: generateTransactions(),
    });

    openFilterForm();

    fillTypeFilter("deposit");

    waitFor(() => {
      expect(screen.getByText("Salary")).toBeInTheDocument();
      expect(screen.queryByText("Groceries")).not.toBeInTheDocument();
    });
  });

  it("should list be filtered by chosen date range", () => {
    useTransactionStore.setState({
      transactions: generateTransactions(),
    });

    openFilterForm();

    fillDateFromFilter("2025-03-15");
    fillDateToFilter("2025-03-15");

    waitFor(() => {
      expect(screen.getByText("Salary")).toBeInTheDocument();
      expect(screen.queryByText("Groceries")).not.toBeInTheDocument();
    });
  });

  it("should list be filtered by chosen description", () => {
    useTransactionStore.setState({
      transactions: generateTransactions(),
    });

    openFilterForm();

    fillDescriptionFilter("Salary");

    waitFor(() => {
      expect(screen.getByText("Salary")).toBeInTheDocument();
      expect(screen.queryByText("Groceries")).not.toBeInTheDocument();
    });
  });

  it("should list be filtered by chosen type, date range, and description", () => {
    useTransactionStore.setState({
      transactions: generateTransactions(),
    });

    openFilterForm();

    fillTypeFilter("deposit");
    fillDateFromFilter("2025-03-15");
    fillDateToFilter("2025-03-15");
    fillDescriptionFilter("Salary");

    waitFor(() => {
      expect(screen.getByText("Salary")).toBeInTheDocument();
      expect(screen.queryByText("Groceries")).not.toBeInTheDocument();
    });
  });

  it("should clear the filter when clicking the Clear button", () => {
    useTransactionStore.setState({
      transactions: generateTransactions(),
    });

    openFilterForm();

    fillTypeFilter("deposit");
    fillDateFromFilter("2025-03-15");
    fillDateToFilter("2025-03-15");
    fillDescriptionFilter("Salary");

    fireEvent.click(screen.getByText("Reset Filters"));

    waitFor(() => {
      expect(screen.getByText("Salary")).toBeInTheDocument();
      expect(screen.getByText("Groceries")).toBeInTheDocument();
    });
  });

});