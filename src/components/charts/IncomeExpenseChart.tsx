import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  ChartOptions,
} from "chart.js";
import { useDataContext } from "../../containers/DataProvider";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

const IncomeExpenseChart = () => {
  // Sample data provided
  const { transactions } = useDataContext();

  const incomeData = [];
  const expenseData = [];
  const labels: number[] = [];

  // Process the transactions
  transactions.forEach((transaction) => {
    if (transaction.date) {
      const day = new Date(transaction.date).getDate();
      const amount = Number(transaction.amount);

      // If the day is not already in the labels array, add it
      if (!labels.includes(day)) {
        labels.push(day);
      }

      // Populate income and expense data based on the transaction type
      if (transaction.type === "income") {
        incomeData[day - 1] = amount;
      } else if (transaction.type === "expense") {
        expenseData[day - 1] = amount;
      }
    }
  });

  // Fill missing days with 0
  const maxDay = Math.max(...labels);
  for (let i = 1; i <= maxDay; i++) {
    if (!labels.includes(i)) {
      labels.push(i);
    }
    if (incomeData[i - 1] === undefined) incomeData[i - 1] = 0;
    if (expenseData[i - 1] === undefined) expenseData[i - 1] = 0;
  }

  labels.sort((a, b) => a - b); // Sort labels in ascending order

  const data = {
    labels,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.3,
        pointBorderColor: "rgba(0, 0, 0, 0)",
        pointBackgroundColor: "rgba(0, 0, 0, 0)",
        pointHoverBackgroundColor: "rgba(75, 192, 192, 1)",
        pointHoverBorderColor: "rgb(255, 99, 132)",
        pointRadius: 1,
        pointHoverRadius: 10,
        hitRadius: 300,
      },
      {
        label: "Expense",
        data: expenseData,
        fill: false,
        borderColor: "rgba(255, 99, 132, 1)",
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 10,
        pointBorderColor: "rgba(0, 0, 0, 0)",
        pointBackgroundColor: "rgba(0, 0, 0, 0)",
        pointHoverBackgroundColor: "rgba(255, 99, 132, 1)",
        hitRadius: 300,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "nearest",
        intersect: false,
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: $${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "Days of August",
        },
      },
      y: {
        grid: {
          color: "rgba(200, 200, 200, 0.2)",
        },
        title: {
          display: true,
          text: "Amount ($)",
        },
      },
    },
  };

  return (
    <div className="h-[393px]">
      <Line
        data={data}
        options={options}
        className="bg-conetentBg w-full rounded-lg all__side__shadow"
      />
    </div>
  );
};

export default IncomeExpenseChart;
