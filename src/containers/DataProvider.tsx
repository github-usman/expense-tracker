import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/storage";
import { DataContextType, Summary, Transaction } from "../interface/Interfaces";

const DataContext = createContext<DataContextType | undefined>(undefined);

const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return getFromLocalStorage<boolean>("isDarkMode") ?? true;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    return getFromLocalStorage<Transaction[]>("total-transaction") || [];
  });

  const [summary, setSummary] = useState<Summary>(() => {
    return getFromLocalStorage<Summary>("total-summary") || {};
  });

  useEffect(() => {
    saveToLocalStorage("total-transaction", transactions);
    saveToLocalStorage("total-summary", summary);
  }, [transactions, summary]);

  return (
    <DataContext.Provider
      value={{
        transactions,
        setTransactions,
        summary,
        setSummary,
        isDarkMode,
        setIsDarkMode,
      }}
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
