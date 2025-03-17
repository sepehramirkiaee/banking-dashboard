import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "@/pages/Dashboard";
import "@testing-library/jest-dom";
import NotificationContainer from "@/components/common/ui/NotificationContainer";
import { fillAmount,fillDescription, submitTransactionForm,openTransactionForm, fillType,fillDate } from "./helpers";

describe("TransactionForm", () => {
  
  render(<Dashboard />);
  render(<NotificationContainer />);
  
  it("should display the transaction form when clicking 'Add New Transaction' button", () => {
    openTransactionForm();
    expect(screen.getByRole("button", { name: /Add Transaction/i })).toBeInTheDocument();
  });

  it("should show validation error when submitting the form with empty amount", () => {
    submitTransactionForm();
    expect(screen.getByText("please enter a valid positive amount")).toBeInTheDocument();
  });

  it("should show validation error when submitting the form with amount greater than 1,000,000,000", () => {
    fillAmount(1000000001);
    submitTransactionForm();
    expect(screen.getByText("Amount must be less than 1,000,000,000")).toBeInTheDocument();
  });

  it("should show validation error when submitting the form with amount less than 0.01", () => {
    fillAmount(0);
    submitTransactionForm();
    expect(screen.getByText("Amount must be greater than 0.01")).toBeInTheDocument()
  });

  it("should show validation error when submitting the form with empty description", () => {
    fillAmount(100);
    submitTransactionForm();
    expect(screen.getByText("Description cannot be empty.")).toBeInTheDocument();
  });

  it("should show validation error when submitting the form with description less than 3 characters", () => {
    fillDescription("Te");
    submitTransactionForm();
    expect(screen.getByText("Description must be more than 3 characters.")).toBeInTheDocument();
  });

  it("should show validation error when submitting the form with description more than 50 characters", () => {
    fillDescription("abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz");
    submitTransactionForm();
    expect(screen.getByText("Description must be less than 50 characters.")).toBeInTheDocument();
  });

  it("should show validation error when submitting the form with invalid date", () => {
    fillDescription("Test Transaction Income");
    fillDate("invalid date");
    submitTransactionForm();
    expect(screen.getByText("Please select a valid date.")).toBeInTheDocument();
  });

  it("should show validation error when submitting the form with empty type", () => {
    fillDate("2025-03-17");
    fillType("");
    submitTransactionForm();
    expect(screen.getByText("Please select a transaction type.")).toBeInTheDocument(); 
  });

  it("should submit successfully when require fields are filled with income type", () => {
    fillType("deposit");
    submitTransactionForm();
    expect(screen.getByText("Transaction added successfully!")).toBeInTheDocument();
    expect(screen.getByTestId("balance").textContent).toBe("100.00");
    expect(screen.getByTestId("income").textContent).toBe("100.00");
    expect(screen.getByTestId("expense").textContent).toBe("0.00");
    expect(screen.getByText("+€100.00")).toBeInTheDocument();
  });

  it("should close the form after submitting", () => {
    expect(screen.queryByRole("button", { name: /Add Transaction/i })).not.toBeInTheDocument();
  });

  it("should submit successfully when require fields are filled with withdrawal type", () => {
    openTransactionForm();
    fillAmount(50);
    fillDescription("Test Transaction Withdrawal");
    fillType("withdrawal");
    submitTransactionForm();
    expect(screen.getAllByText("Transaction added successfully!")).toHaveLength(2);
    expect(screen.getByTestId("balance").textContent).toBe("50.00");
    expect(screen.getByTestId("income").textContent).toBe("100.00");
    expect(screen.getByTestId("expense").textContent).toBe("50.00");
    expect(screen.getByText("-€50.00")).toBeInTheDocument();
  });

  it("should close the form after clicking cancel button", () => {
    fireEvent.click(screen.getByRole("button", { name: /Add New Transaction/i }));
    fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));
    expect(screen.queryByRole("button", { name: /Add Transaction/i })).not.toBeInTheDocument();
  });

});