import { useEffect, useState } from "react";
import api from "./api.ts";
import type { Expense, User } from "./types.ts";
import ExpenseForm from "./ExpenseForm.tsx";
import ExpenseList from "./ExpenseList.tsx";
import Filters from "./Filters.tsx";
import Charts from "./Charts.tsx";

type Props = {
  user: User;
  onLogout: () => void;
};

function Dashboard({ user, onLogout }: Props) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editing, setEditing] = useState<Expense | null>(null);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterMonth, setFilterMonth] = useState("All");

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

  // the dropdown options, built from the expenses we have
  const categories = Array.from(new Set(expenses.map((e) => e.category)));
  const months = Array.from(new Set(expenses.map((e) => e.date.slice(0, 7)))).sort();

  // apply the chosen filters
  const filtered = expenses.filter((e) => {
    const categoryOk = filterCategory === "All" || e.category === filterCategory;
    const monthOk = filterMonth === "All" || e.date.slice(0, 7) === filterMonth;
    return categoryOk && monthOk;
  });

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

      <Filters
        category={filterCategory}
        month={filterMonth}
        categories={categories}
        months={months}
        onCategoryChange={setFilterCategory}
        onMonthChange={setFilterMonth}
      />

      {filtered.length > 0 && <Charts expenses={filtered} />}

      <ExpenseList
        expenses={filtered}
        onDelete={handleDelete}
        onEdit={(expense) => setEditing(expense)}
      />
    </div>
  );
}

export default Dashboard;
