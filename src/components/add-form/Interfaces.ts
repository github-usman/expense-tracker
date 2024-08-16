export interface Transaction {
  id?: string;
  income?: number;
  expense?: number;
  type?: string;
  amount?: number;
  category?: string;
  date?: string;
  description?: string;
}

// src/components/add-form/Interfaces.ts

export interface Summary {
  id?: string;
  income?: number; // Change from string to number
  expense?: number; // Change from string to number
  balance?: number; // Change from string to number
}

export interface DataContextType {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

export interface OptionType {
  value: string;
  label: string;
}

export interface InputProps {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
  error?: string;
  options?: OptionType[];
}
