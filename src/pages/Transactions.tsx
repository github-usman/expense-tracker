import TransactionForm from "../components/formComponents/TransactionForm";
import TransactionsTable from "../components/formComponents/TransactionsTable";

const Transactions = () => {
  return (
    <div className="max-w-screen-xxlg mx-auto px-[16px] flex flex-col gap-[16px] my-[32px]">
      <TransactionForm />
      <TransactionsTable />
    </div>
  );
};

export default Transactions;
