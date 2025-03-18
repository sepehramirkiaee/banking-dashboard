import { Transaction } from "@/types";
import { fireEvent, screen } from "@testing-library/react";

export const openTransactionForm = () => {
  fireEvent.click(screen.getByText("Add New Transaction"));
};

export const fillAmount = (value: number) => {
  fireEvent.change(screen.getByLabelText("Amount"), { target: { value } });
};

export const fillDescription = (value: string) => {
  fireEvent.change(screen.getByLabelText("Description"), { target: { value } });
};

export const fillDate = (value: string) => {
  fireEvent.change(screen.getByLabelText("Transaction Date"), {
    target: { value },
  });
};

export const fillType = (value: string) => {
  const select = screen.getByLabelText("Type") as HTMLSelectElement; // Ensure it's a select element
  fireEvent.change(select, { target: { value } });
};

export const submitTransactionForm = () => {
  fireEvent.click(screen.getByRole("button", { name: /Add Transaction/i }));
};

//
export const openFilterForm = () => {
  fireEvent.click(screen.getByTestId("filter-button"));
};

export const generateTransactions = (): Transaction[] => {
  return [
    {
      id: "000-000-000-000-001",
      description: "Salary",
      amount: 1000,
      date: "2025-03-15",
      type: "deposit",
      createdAt: Date.now(),
    },
    {
      id: "000-000-000-000-002",
      description: "Groceries",
      amount: 50,
      date: "2025-03-16",
      type: "withdrawal",
      createdAt: Date.now(),
    },
  ];
};

export const fillTypeFilter = (value: string) => {
  const select = screen.getByLabelText("Type") as HTMLSelectElement;
  fireEvent.change(select, { target: { value } });
}

export const fillDateFromFilter = (value: string) => {
  fireEvent.change(screen.getByLabelText("Date From"), { target: { value } });
}

export const fillDateToFilter = (value: string) => {
  fireEvent.change(screen.getByLabelText("Date To"), { target: { value } });
}

export const fillDescriptionFilter = (value: string) => {
  fireEvent.change(screen.getByLabelText("Description"), { target: { value } });
}

//
export const openTransactionMenu = () => {
  fireEvent.click(screen.getByTestId("itemActions"));
};

export const clickOnActionButton = (action: string) => {
  fireEvent.click(screen.getByTestId(action));
}
