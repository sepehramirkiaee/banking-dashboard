import { fireEvent, screen } from "@testing-library/react";

export const openTransactionForm = () => {
  fireEvent.click(screen.getByText("Add New Transaction"));
};

export const fillAmount = (value:number) => {
  fireEvent.change(screen.getByLabelText("Amount"), { target: { value } });
};

export const fillDescription = (value:string) => {
  fireEvent.change(screen.getByLabelText("Description"), { target: { value } });
}

export const fillDate = (value: string) => {
  fireEvent.change(screen.getByLabelText("Transaction Date"), { target: { value } });
}

export const fillType = (value: string) => {
  const select = screen.getByLabelText("Type") as HTMLSelectElement; // Ensure it's a select element
  fireEvent.change(select, { target: { value } });
};

export const submitTransactionForm = () => {
  fireEvent.click(screen.getByRole("button", { name: /Add Transaction/i }));
};


