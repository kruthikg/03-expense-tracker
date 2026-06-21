type Props = {
  category: string;
  month: string;
  categories: string[];
  months: string[];
  onCategoryChange: (value: string) => void;
  onMonthChange: (value: string) => void;
};

function Filters({
  category,
  month,
  categories,
  months,
  onCategoryChange,
  onMonthChange,
}: Props) {
  return (
    <div className="filters">
      <label>
        Category:
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="All">All</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label>
        Month:
        <select value={month} onChange={(e) => onMonthChange(e.target.value)}>
          <option value="All">All</option>
          {months.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default Filters;
