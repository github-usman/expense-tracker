import { useMemo, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { useDataContext } from "../../containers/DataProvider";
import { Transaction } from "../add-form/Interfaces";
import TransactionForm from "./TransactionForm";
const TransactionsTable = () => {
  const { transactions, setTransactions } = useDataContext();
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
  };

  // Memoize date formatting
  const formatDate = useMemo(
    () =>
      (date: string | number): string =>
        new Date(date).toLocaleDateString("en-GB").replace(/\//g, " - "),
    []
  );

  const handleDelete = (id: string | undefined) => {
    if (!id) return;
    const updatedTransactions = transactions.filter((item) => item.id !== id);
    setTransactions(updatedTransactions);
  };

  return (
    <>
      {editingTransaction && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#00000080] overflow-y-auto bg-opacity-10 backdrop-blur-[2px] h-100 z-10">
          <TransactionForm
            editingTransaction={editingTransaction}
            setEditingTransaction={setEditingTransaction}
          />
        </div>
      )}

      <div className="overflow-auto overflow-items">
        <div className="bg-conetentBg p-[16px] min-w-[990px] rounded-lg all__side__shadow  overflow-visible">
          <h2 className="text-lg font-semibold mb-4">List of Transactions</h2>
          <div className="grid grid-cols-[2fr_2fr_2fr_2fr_3fr_0.5fr] text-[18px] font-semibold border-b-[1px] border-solid border-[#434040f3]">
            <h3>Type</h3>
            <h3>Amount($)</h3>
            <h3>Category</h3>
            <h3>Date</h3>
            <h3>Description</h3>
            <div className="flex text-[28px] items-center gap-[16px] opacity-0">
              <FaEdit />
              <MdDeleteForever />
            </div>
          </div>
          {transactions.map((item) => (
            <div
              className="grid grid-cols-[2fr_2fr_2fr_2fr_3fr_0.5fr] mt-[25px] border-b-[1px] border-solid border-[#434040f3]"
              key={item.id}
            >
              <p
                className={`flex items-center gap-1 ${item.type === "income" ? "text-success" : "text-danger"}`}
              >
                {item.type === "income" ? <FaArrowUpLong /> : <FaArrowDownLong />}
                {item.type}
              </p>
              <p>💰{item.amount}</p>
              <p>{item.category}</p>
              <p className="">{formatDate(item.date || "")}</p>
              <p className="">{item.description}</p>
              <div className="flex text-[28px] items-center gap-[16px]">
                <FaEdit
                  className="text-dblue cursor-pointer"
                  onClick={() => handleEdit(item)}
                />
                <MdDeleteForever
                  className="text-danger cursor-pointer"
                  onClick={() => handleDelete(item.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TransactionsTable;
