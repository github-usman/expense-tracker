import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { useDataContext } from "../../containers/DataProvider";
import TotalSummary from "../../containers/TotalSummary";
import { Summary } from "../../interface/Interfaces";
import SummaryChart from "../charts/SummaryChart";
import Input from "./Input";

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
        <SummaryChart
          totalIncome={totalIncome}
          totalExpense={totalExpense}
          balance={balance}
        />
      </div>

      <TotalSummary
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        balance={balance}
      />
    </>
  );
};

export default CreateForm;
