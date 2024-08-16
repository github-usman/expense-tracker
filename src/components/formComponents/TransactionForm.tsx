import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { useDataContext } from "../../containers/DataProvider";
import { RxCross2 } from "react-icons/rx";
import Input from "./Input";
import {  expenseList, incomeList, optionsType } from "../../assets/contants";

const TransactionForm: React.FC<{
  editingTransaction?: any;
  setEditingTransaction?: any;
}> = ({ editingTransaction, setEditingTransaction }) => {
  const { transactions, setTransactions } = useDataContext();
  const [isEditing, setIsEditing] = useState(false);
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const formik = useFormik({
    initialValues: {
      type: "",
      amount: 0,
      category: "",
      date: "",
      description: "",
    },
    validationSchema: Yup.object({
      type: Yup.string()
        .oneOf(["income", "expense"])
        .required("Transaction type is required"),
      amount: Yup.number()
        .typeError("Amount must be a number")
        .required("Amount is required")
        .positive("Amount must be positive"),
      category: Yup.string().required("Category is required"),
      date: Yup.date()
        .required("Date is required")
        .min(startOfMonth, `Date must be after ${startOfMonth.toLocaleDateString()}`)
        .max(endOfMonth, `Date must be before ${endOfMonth.toLocaleDateString()}`),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values) => {
      if (isEditing && editingTransaction) {
        // Update the existing transaction
        const updatedTransactions = transactions.map((transaction) =>
          transaction.id === editingTransaction.id
            ? { ...transaction, ...values }
            : transaction
        );
        setTransactions(updatedTransactions);
        setEditingTransaction(null);
      } else {
        // Create a new transaction
        const newTransaction = {
          id: uuidv4(),
          ...values,
        };
        setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
      }
      formik.resetForm();
      setIsEditing(false);
    },
  });

  // update after edit side effect
  useEffect(() => {
    if (editingTransaction) {
      formik.setValues(editingTransaction);
      setIsEditing(true);
    }
    // eslint-disable-next-line
  }, [editingTransaction]);

  const handleCloseModal = () => {
    if (setEditingTransaction) {
      setEditingTransaction(null);
    }
  };

  const categoryOptions =
  formik.values.type === 'income'
    ? incomeList
    : formik.values.type === 'expense'
    ? expenseList
    : [];
  return (
    <div className="relative">
      <div
        className={`${!editingTransaction && "hidden"} absolute right-[8px] top-[8px]  cursor-pointer border-[2px] rounded-sm bg-white text-black text-[26px] border-solid w-fit`}
        onClick={handleCloseModal}
      >
        <RxCross2 />
      </div>
      <div className="bg-LconetentBg dark:bg-conetentBg p-[16px] rounded-lg all__side__shadow dark:shadow-dark_all__side__shadow">
        <h2 className="text-lg font-semibold mb-4">
          {(editingTransaction && "Update Transaction") ||
            (!editingTransaction && "Add Transaction")}
        </h2>
        <form
          onSubmit={formik.handleSubmit}
          className="grid md:grid-cols-2 items-center gap-[16px]"
        >
          <Input
            label="Type"
            type="select"
            name="type"
            value={formik.values.type}
            placeholder="Select transaction type"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            options={optionsType}
            error={formik.touched.type ? formik.errors.type : undefined}
          />
          <Input
            label="Amount"
            type="number"
            name="amount"
            value={formik.values.amount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.amount ? formik.errors.amount : undefined}
          />
          <Input
            label="Category"
            type="select"
            name="category"
            value={formik.values.category}
            placeholder="Select category"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            options={categoryOptions}
            error={formik.touched.category ? formik.errors.category : undefined}
          />
          <Input
            label="Date"
            type="date"
            name="date"
            value={formik.values.date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.date ? formik.errors.date : undefined}
          />
          <Input
            label="Description"
            type="textarea"
            name="description"
            placeholder="Enter Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description ? formik.errors.description : undefined}
          />
          <div className="items-end">
          <button type="submit" className="bg-dblue text-white rounded-sm px-5 py-2 shadow-lg hover:bg-hdblue">
              {(editingTransaction && "Update Transaction") ||
                (!editingTransaction && "Add New Transaction")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
