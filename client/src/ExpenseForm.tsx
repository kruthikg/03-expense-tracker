import { useEffect, useState } from "react";
import api from "./api.ts";
import type { Expense } from "./types.ts";

type Props = {
  editing: Expense | null;
  onSaved: () => void;
  onCancel: () => void;
};

const categories = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Entertainment",
  "Other",
];

function ExpenseForm({ editing, onSaved, onCancel }: Props) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");

  // when an expense is picked for editing, fill the form with its values
  useEffect(() => {
    if (editing) {
      setAmount(String(editing.amount));
      setCategory(editing.category);
      setNote(editing.note || "");
      setDate(editing.date.slice(0, 10));
    }
  }, [editing]);

  function resetForm() {
    setAmount("");
    setCategory("Food");
    setNote("");
    setDate("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const data = {
      amount: Number(amount),
      category,
      note,
      date: date || undefined,
    };

    if (editing) {
      await api.put("/api/expenses/" + editing._id, data);
    } else {
      await api.post("/api/expenses", data);
    }

    resetForm();
    onSaved();
  }

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Note (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button type="submit">{editing ? "Update" : "Add"}</button>
      {editing && (
        <button
          type="button"
          className="cancel"
          onClick={() => {
            resetForm();
            onCancel();
          }}
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default ExpenseForm;
