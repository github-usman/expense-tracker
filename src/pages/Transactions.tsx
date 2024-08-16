import React from "react";
import TransactionForm from "../components/transactions/TransactionForm";
import TransactionsTable from "../components/transactions/TransactionsTable";
import DataProvider from "../containers/DataProvider";

const Transactions = () => {
  return (
    <div className="max-w-screen-xxlg mx-auto px-[16px] flex flex-col gap-[16px] my-[32px]">
      <DataProvider storageKey="total-transaction">
        <TransactionForm />
        <TransactionsTable />
      </DataProvider>
    </div>
  );
};

export default Transactions;
