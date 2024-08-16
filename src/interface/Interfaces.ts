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
export interface ILayoutProps {
  children?: React.ReactNode;
  title?: string;
}
export interface Summary {
  id?: string;
  income?: number;
  expense?: number;
  balance?: number;
}

export interface DataContextType {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  summary: Summary;
  setSummary: React.Dispatch<React.SetStateAction<Summary>>;
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
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

export interface ITotalSummary {
  totalIncome?: any;
  totalExpense?: any;
  balance?: any;
}
