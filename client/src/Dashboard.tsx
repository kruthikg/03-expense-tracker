import { useEffect, useState } from "react";
import api from "./api.ts";
import type { Expense, User } from "./types.ts";
import ExpenseForm from "./ExpenseForm.tsx";
import ExpenseList from "./ExpenseList.tsx";

type Props = {
  user: User;
  onLogout: () => void;
};

function Dashboard({ user, onLogout }: Props) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editing, setEditing] = useState<Expense | null>(null);

  async function loadExpenses() {
    try {
      const res = await api.get("/api/expenses");
      setExpenses(res.data);
    } catch (err) {
      console.log("Could not load expenses");
    }
  }

  useEffect(() => {
    loadExpenses();
  }, []);

  async function handleDelete(id: string) {
    await api.delete("/api/expenses/" + id);
    loadExpenses();
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Expense Tracker</h1>
        <div className="header-right">
          <span>Hi, {user.name || user.email}</span>
          <button onClick={onLogout}>Logout</button>
        </div>
      </div>

      <ExpenseForm
        editing={editing}
        onSaved={() => {
          setEditing(null);
          loadExpenses();
        }}
        onCancel={() => setEditing(null)}
      />

      <ExpenseList
        expenses={expenses}
        onDelete={handleDelete}
        onEdit={(expense) => setEditing(expense)}
      />
    </div>
  );
}

export default Dashboard;
