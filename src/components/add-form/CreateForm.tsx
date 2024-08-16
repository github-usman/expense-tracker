import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import Input from "../common/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDataContext } from "../../containers/DataProvider";
import { Summary } from "./Interfaces";
import profit from "../../assets/profit.png";
import loss from "../../assets/loss.png";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CreateForm: React.FC = () => {
  const { summary, transactions, setSummary } = useDataContext();

  const formik = useFormik({
    initialValues: {
      income: "",
      expense: "",
    },
    validationSchema: Yup.object({
      income: Yup.number()
        .typeError("Income must be a number")
        .required("Income is required")
        .min(0, "Expense cannot be negative")
        .nullable(),
      expense: Yup.number()
        .typeError("Expense must be a number")
        .required("Expense is required")
        .min(0, "Expense cannot be negative")
        .nullable(),
    }),
    onSubmit: (values) => {
      const newSummary: Summary = {
        income: Number(values.income),
        expense: Number(values.expense),
      };
      setSummary(newSummary);
      formik.resetForm();
    },
  });

  const totalIncome = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "income") {
        return acc + Number(transaction.amount);
      }
      return acc;
    },
    Number(summary?.income) || 0
  );

  const totalExpense = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "expense") {
        return acc + Number(transaction.amount);
      }
      return acc;
    },
    Number(summary?.expense) || 0
  );
  const balance = Number(totalIncome - totalExpense);

  // Prepare chart data
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
    <>
      <h2 className="text-xl font-bold ">Financial Overview</h2>
      <div className="flex justify-between gap-[16px] flex-col lg:flex-row">
        <div className="flex-1 w-full lg:w-1/2">
          <form
            onSubmit={formik.handleSubmit}
            className="bg-conetentBg p-[16px] flex flex-col justify-between rounded-lg all__side__shadow h-[258px]"
          >
            <div>
              <Input
                label="Total Income"
                type="number"
                name="income"
                value={formik.values.income}
                placeholder="Enter total income"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.income ? formik.errors.income : undefined}
              />
              <Input
                label="Total Expenses"
                type="number"
                name="expense"
                value={formik.values.expense}
                placeholder="Enter total expenses"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.expense ? formik.errors.expense : undefined}
              />
            </div>
            <div className="self-center md:self-start">
              <button type="submit" className="bg-dblue rounded-sm px-5 py-2">
                Submit Total
              </button>
            </div>
          </form>
        </div>
        <div className="bg-conetentBg rounded-lg max-h-[258px] flex-1 w-full lg:w-1/2 p-[16px] all__side__shadow">
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
      </div>
      <div className="bg-conetentBg p-[16px] gap-[16px] flex flex-col items-center justify-center rounded-lg all__side__shadow">
        <h2 className="text-xl font-bold text-center">Summary</h2>
        <div className="flex  gap-[16px] flex-col md:flex-row self-start md:self-center">
          <p className="text-[#fff]">Total Income: ${totalIncome}</p>
          <p className="text-[#f8fb56]">Total Expenses: ${totalExpense}</p>
          <p
            className={`flex items-center  gap-2 text-${balance > 0 ? "success" : "danger"}`}
          >
            <img
              src={balance > 0 ? profit : loss}
              className="h-[18px] w-[18px]"
              alt="grow"
            />
            Final Balance: ${balance.toFixed(2)}
          </p>
        </div>
      </div>
    </>
  );
};

export default CreateForm;
