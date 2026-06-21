import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import type { Expense } from "./types.ts";

// chart.js needs us to register the parts we use
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

type Props = {
  expenses: Expense[];
};

const colors = ["#2da44e", "#0366d6", "#e36209", "#6f42c1", "#d73a49", "#586069"];

function Charts({ expenses }: Props) {
  // total spent in each category
  const byCategory: Record<string, number> = {};
  expenses.forEach((e) => {
    byCategory[e.category] = (byCategory[e.category] || 0) + e.amount;
  });

  // total spent in each month (date looks like 2026-06-21, so first 7 chars = month)
  const byMonth: Record<string, number> = {};
  expenses.forEach((e) => {
    const month = e.date.slice(0, 7);
    byMonth[month] = (byMonth[month] || 0) + e.amount;
  });
  const months = Object.keys(byMonth).sort();

  const pieData = {
    labels: Object.keys(byCategory),
    datasets: [
      {
        data: Object.values(byCategory),
        backgroundColor: colors,
      },
    ],
  };

  const barData = {
    labels: months,
    datasets: [
      {
        label: "Spent",
        data: months.map((m) => byMonth[m]),
        backgroundColor: "#0366d6",
      },
    ],
  };

  return (
    <div className="charts">
      <div className="chart-box">
        <h3>By Category</h3>
        <Pie data={pieData} />
      </div>
      <div className="chart-box">
        <h3>By Month</h3>
        <Bar data={barData} />
      </div>
    </div>
  );
}

export default Charts;
