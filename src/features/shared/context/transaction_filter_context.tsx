import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useTransactionData } from "./transaction_context";
import Transaction from "../models/transaction";
import { sortByDate, sortTransactions } from "../utility/functions";

// inital TransactionFilterContext shape and values
const TransactionFilterContext = createContext<{
  transactionQuery: string;
  filteredTransactions: TransactionData[];
  sortBy: SortCategory;
  category: string;
  setSortBy: Function;
  setCategory: Function;
  setTransactionQuery: React.ChangeEventHandler<HTMLInputElement>;
}>({
  transactionQuery: "",
  filteredTransactions: [],
  sortBy: "Latest",
  category: "",
  setSortBy: () => {},
  setCategory: () => {},
  setTransactionQuery: () => {},
});

// used to wrap any part of your app to provide the TransactionFilterContext
const TransactionFilterProvider = ({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element => {
  const { transactions } = useTransactionData();

  // mutable observable state
  const [transactionQuery, setTransactionQuery] = useState<string>("");

  const [sortBy, setSortBy] = useState<SortCategory>("Latest");

  const [category, setCategory] = useState<string>("All Transactions");

  const handleQueryChange = (e: any) => {
    console.log(e.currentTarget.value);
    setTransactionQuery(e.target.value);
  };

  const value = useMemo(() => {
    const filtered =
      queriedCategorizedTransactions(
        transactions ?? [],
        transactionQuery,
        category,
      ) ?? [];

    const sorted = [...filtered];
    sortTransactions(sorted, sortBy);

    return {
      transactionQuery,
      filteredTransactions: sorted,
      sortBy,
      category,
      setSortBy,
      setCategory,
      setTransactionQuery: handleQueryChange,
    };
  }, [transactions, transactionQuery, category, sortBy]);

  return (
    <TransactionFilterContext.Provider value={value}>
      {children}
    </TransactionFilterContext.Provider>
  );
};

function queriedCategorizedTransactions(
  transactions: TransactionData[],
  transactionQuery: string,
  category: string,
): TransactionData[] {
  return transactions?.filter((transaction) => {
    const queriedTranactions = transaction.name
      .toLowerCase()
      .includes(transactionQuery.toLowerCase());

    if (category.toLowerCase() === "all transactions") {
      return queriedTranactions;
    }

    return (
      transaction.name.toLowerCase().includes(transactionQuery.toLowerCase()) &&
      transaction.category.toLowerCase().includes(category.toLowerCase())
    );
  });
}

const useTransactionFilterData = () => useContext(TransactionFilterContext);

export { TransactionFilterProvider, useTransactionFilterData };
