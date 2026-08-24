import { createContext, useContext, useState, useMemo } from "react";
import { useTransactionData } from "./transaction_context";
import { sortTransactions } from "../utility/functions";

interface TransactionFilterContextType {
  transactionQuery: string;
  filteredTransactions: TransactionData[];
  sortBy: SortCategory;
  category: string;
  dateRange: DateRangeOption;
  customRange: { start: Date | null; end: Date | null };
  isCalendarOpen: boolean;
  setSortBy: (val: SortCategory) => void;
  setCategory: (val: string) => void;
  setDateRange: (val: DateRangeOption) => void;
  setCustomRange: (range: { start: Date | null; end: Date | null }) => void;
  setIsCalendarOpen: (val: boolean) => void;
  setTransactionQuery: React.ChangeEventHandler<HTMLInputElement>;
}

const TransactionFilterContext = createContext<TransactionFilterContextType>({
  transactionQuery: "",
  filteredTransactions: [],
  sortBy: "Latest",
  category: "All Transactions",
  dateRange: "30 Days",
  customRange: { start: null, end: null },
  isCalendarOpen: false,
  setSortBy: () => {},
  setCategory: () => {},
  setDateRange: () => {},
  setCustomRange: () => {},
  setIsCalendarOpen: () => {},
  setTransactionQuery: () => {},
});

export const TransactionFilterProvider = ({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element => {
  const { transactions } = useTransactionData();
  const [transactionQuery, setTransactionQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortCategory>("Latest");
  const [category, setCategory] = useState("All Transactions");

  // Date States
  const [dateRange, setDateRange] = useState<DateRangeOption>("30 Days");
  const [customRange, setCustomRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({ start: null, end: null });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleQueryChange = (e: any) => setTransactionQuery(e.target.value);

  const value = useMemo(() => {
    // 1. Filter by Date first
    const dateFiltered =
      transactions?.filter((t) => {
        const tDate = new Date(t.date);
        const now = new Date();
        now.setHours(23, 59, 59, 999);

        if (dateRange === "Custom") {
          if (!customRange.start || !customRange.end) return true;
          return tDate >= customRange.start && tDate <= customRange.end;
        }

        let startDate = new Date();
        if (dateRange === "7 days") startDate.setDate(now.getDate() - 7);
        else if (dateRange === "14 days") startDate.setDate(now.getDate() - 14);
        else if (dateRange === "30 Days") startDate.setDate(now.getDate() - 30);
        else if (dateRange === "Current Month")
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);

        startDate.setHours(0, 0, 0, 0);
        return tDate >= startDate && tDate <= now;
      }) ?? [];

    // 2. Filter by Category and Search
    const finalFiltered = dateFiltered.filter((t) => {
      const matchesSearch = t.name
        .toLowerCase()
        .includes(transactionQuery.toLowerCase());
      const matchesCat =
        category === "All Transactions" ||
        t.category.toLowerCase() === category.toLowerCase();
      return matchesSearch && matchesCat;
    });

    // 3. Sort
    const sorted = [...finalFiltered];
    sortTransactions(sorted, sortBy);

    return {
      transactionQuery,
      filteredTransactions: sorted,
      sortBy,
      category,
      dateRange,
      customRange,
      isCalendarOpen,
      setSortBy,
      setCategory,
      setDateRange: (val: DateRangeOption) => {
        setDateRange(val);
        if (val === "Custom") setIsCalendarOpen(true);
      },
      setCustomRange,
      setIsCalendarOpen,
      setTransactionQuery: handleQueryChange,
    };
  }, [
    transactions,
    transactionQuery,
    category,
    sortBy,
    dateRange,
    customRange,
    isCalendarOpen,
  ]);

  return (
    <TransactionFilterContext.Provider value={value}>
      {children}
    </TransactionFilterContext.Provider>
  );
};

export const useTransactionFilterData = () =>
  useContext(TransactionFilterContext);
