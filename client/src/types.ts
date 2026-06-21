export type User = {
  name: string;
  email: string;
};

export type Expense = {
  _id: string;
  amount: number;
  category: string;
  note?: string;
  date: string;
};
