import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Transaction, Summary } from "../components/add-form/Interfaces";
import { getFromLocalStorage, saveToLocalStorage } from "../services/storage";

interface DataContextType {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  summary: Summary;
  setSummary: React.Dispatch<React.SetStateAction<Summary>>;
  storageKey: string;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const DataProvider: React.FC<{ children: ReactNode; storageKey: string }> = ({
  children,
  storageKey,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    return getFromLocalStorage<Transaction[]>("total-transaction") || [];
  });

  const [summary, setSummary] = useState<Summary>(() => {
    return getFromLocalStorage<Summary>("total-summary") || {};
  });

  useEffect(() => {
    saveToLocalStorage("total-transaction", transactions);
    saveToLocalStorage("total-summary", summary);
  }, [transactions, summary, storageKey]);

  return (
    <DataContext.Provider
      value={{ transactions, setTransactions, summary, setSummary, storageKey }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};
