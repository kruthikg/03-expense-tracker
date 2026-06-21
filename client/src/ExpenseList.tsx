import type { Expense } from "./types.ts";

type Props = {
  expenses: Expense[];
  onDelete: (id: string) => void;
  onEdit: (expense: Expense) => void;
};

function ExpenseList({ expenses, onDelete, onEdit }: Props) {
  if (expenses.length === 0) {
    return <p className="empty">No expenses yet. Add your first one above.</p>;
  }

  // add up all the amounts for the total
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="expense-list">
      <div className="list-top">
        <h2>Your Expenses</h2>
        <p className="total">Total: ₹{total}</p>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Note</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td>{expense.date.slice(0, 10)}</td>
              <td>{expense.category}</td>
              <td>{expense.note}</td>
              <td>₹{expense.amount}</td>
              <td className="actions">
                <button onClick={() => onEdit(expense)}>Edit</button>
                <button className="delete" onClick={() => onDelete(expense._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;
