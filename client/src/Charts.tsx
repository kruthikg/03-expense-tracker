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

// soft pastel fills with a matching solid border for each bar / slice
const fillColors = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(255, 159, 64, 0.2)",
  "rgba(255, 205, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(201, 203, 207, 0.2)",
];

const borderColors = [
  "rgb(255, 99, 132)",
  "rgb(255, 159, 64)",
  "rgb(255, 205, 86)",
  "rgb(75, 192, 192)",
  "rgb(54, 162, 235)",
  "rgb(153, 102, 255)",
  "rgb(201, 203, 207)",
];

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
        backgroundColor: fillColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: months,
    datasets: [
      {
        label: "Spent",
        data: months.map((m) => byMonth[m]),
        backgroundColor: fillColors,
        borderColor: borderColors,
        borderWidth: 1,
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
