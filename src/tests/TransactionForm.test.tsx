import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "@/pages/Dashboard";
import "@testing-library/jest-dom";
import NotificationContainer from "@/components/common/ui/NotificationContainer";
import { fillAmount, fillDescription, submitTransactionForm, openTransactionForm, fillType, fillDate } from "./helpers";
import { cleanup } from "@testing-library/react";
import { useNotification } from "@/hooks/useNotification";
import { useTransactionStore } from "@/store/useTransactionStore";

describe("TransactionForm", () => {

  beforeEach(() => {
    cleanup();

    render(<Dashboard />);
    render(<NotificationContainer />);

    openTransactionForm();
  });

  it("should display the transaction form when clicking 'Add New Transaction' button", () => {
    expect(screen.getByRole("button", { name: /Add Transaction/i })).toBeInTheDocument();
  });

  it("should show validation error when submitting the form with empty amount", () => {
    submitTransactionForm();
    expect(screen.getByText("please enter a valid positive amount")).toBeInTheDocument();
  });

  it("should show validation error when amount is greater than 1,000,000,000", () => {
    fillAmount(1000000001);
    submitTransactionForm();
    expect(screen.getByText("Amount must be less than 1,000,000,000")).toBeInTheDocument();
  });

  it("should show validation error when amount is less than 0.01", () => {
    fillAmount(0);
    submitTransactionForm();
    expect(screen.getByText("Amount must be greater than 0.01")).toBeInTheDocument();
  });

  it("should show validation error when description is empty", () => {
    fillAmount(100);
    submitTransactionForm();
    expect(screen.getByText("Description cannot be empty.")).toBeInTheDocument();
  });

  it("should show validation error when description is less than 3 characters", () => {
    fillAmount(100);
    fillDescription("Te");
    submitTransactionForm();
    expect(screen.getByText("Description must be more than 3 characters.")).toBeInTheDocument();
  });

  it("should show validation error when description exceeds 50 characters", () => {
    fillAmount(100);
    fillDescription("a".repeat(51));
    submitTransactionForm();
    expect(screen.getByText("Description must be less than 50 characters.")).toBeInTheDocument();
  });

  it("should show validation error when submitting with an invalid date", () => {
    fillAmount(100);
    fillDescription("Test Transaction");
    fillDate("invalid date");
    submitTransactionForm();
    expect(screen.getByText("Please select a valid date.")).toBeInTheDocument();
  });

  it("should show validation error when transaction type is empty", async () => {
    fillAmount(100);
    fillDescription("Test Transaction");
    fillDate("2025-03-17");
    fillType("");
    submitTransactionForm();

    expect(screen.getByText("Please select a transaction type.")).toBeInTheDocument();
  });

  it("should submit an income transaction successfully", async () => {
    fillAmount(100);
    fillDescription("Test Income");
    fillType("deposit");
    submitTransactionForm();

    expect(screen.getByText("Transaction added successfully!")).toBeInTheDocument();

    expect(screen.getByTestId("balance").textContent).toBe("100.00");
    expect(screen.getByTestId("income").textContent).toBe("100.00");
    expect(screen.getByTestId("expense").textContent).toBe("0.00");
    expect(screen.getByText("+€100.00")).toBeInTheDocument();
  });

  it("should close the form after submitting", async () => {
    fillAmount(100);
    fillDescription("Test Income");
    submitTransactionForm();

    expect(screen.queryByRole("button", { name: /Add Transaction/i })).not.toBeInTheDocument();

  });

  it("should submit a withdrawal transaction successfully", async () => {

    useTransactionStore.setState({
      transactions:
        [
          { id: "000-000-000-000-001", description: "Salary", amount: 100, date: "2025-03-15", type: "deposit", createdAt: Date.now() },
        ]
    });

    useNotification.setState({ notifications: [] });

    fillAmount(50);
    fillDescription("Test Withdrawal");
    fillType("withdrawal");
    submitTransactionForm();

    expect(screen.getByText("Transaction added successfully!")).toBeInTheDocument();

    expect(screen.getByTestId("balance").textContent).toBe("50.00");
    expect(screen.getByTestId("income").textContent).toBe("100.00");
    expect(screen.getByTestId("expense").textContent).toBe("50.00");
    expect(screen.getByText("-€50.00")).toBeInTheDocument();
  });

  it("should close the form after clicking cancel", () => {
    fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));
    expect(screen.queryByRole("button", { name: /Add Transaction/i })).not.toBeInTheDocument();
  });

});