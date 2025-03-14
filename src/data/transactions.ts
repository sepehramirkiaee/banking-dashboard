import { Transaction } from "../types";

export const dummyData: Transaction[] = [
  {
    id: "1",
    amount: 1000,
    description: "Salary",
    date: "2024-03-01",
    type: "deposit",
  },
  {
    id: "2",
    amount: -50,
    description: "Grocery",
    date: "2024-03-02",
    type: "withdrawal",
  },
  {
    id: "3",
    amount: -20,
    description: "Transport",
    date: "2024-03-03",
    type: "withdrawal",
  },
  {
    id: "4",
    amount: 500,
    description: "Freelance Payment",
    date: "2024-03-05",
    type: "deposit",
  },
  {
    id: "5",
    amount: -100,
    description: "Electricity Bill",
    date: "2024-03-06",
    type: "withdrawal",
  },
];
