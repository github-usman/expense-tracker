import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { ITotalSummary } from "../../interface/Interfaces";

const SummaryChart: React.FC<ITotalSummary> = ({
  totalIncome,
  totalExpense,
  balance,
}) => {
  const chartData = useMemo(
    () => ({
      labels: ["Income", "Expense", "Balance"],
      datasets: [
        {
          label: "Financial Summary",
          data: [totalIncome, totalExpense, balance],
          backgroundColor: ["#4CAF50", "#F44336", balance < 0 ? "#f21a1a" : "#2196F3"],
        },
      ],
    }),
    [totalIncome, totalExpense, balance]
  );
  return (
    <div className="bg-LconetentBg dark:bg-conetentBg rounded-lg max-h-[258px] flex-1 w-full lg:w-1/2 p-[16px] all__side__shadow dark:shadow-dark_all__side__shadow">
      <Bar
        data={chartData}
        options={{
          indexAxis: "y",
          responsive: true,
          maintainAspectRatio: false,
        }}
        className="w-full"
      />
    </div>
  );
};

export default SummaryChart;
