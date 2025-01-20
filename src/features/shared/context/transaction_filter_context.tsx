import { createContext, useContext, useEffect, useState } from "react";
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

  // console.log(`transactions: ${transactions}`);

  // mutable observable state
  const [transactionQuery, setTransactionQuery] = useState<string>("");

  const [sortBy, setSortBy] = useState<SortCategory>("Latest");

  const [category, setCategory] = useState<string>("All Transactions");

  // queried and categorized transactions based on the transactionQuery and category mutable variables
  const filteredTransactions =
    queriedCategorizedTransactions(
      transactions ?? [],
      transactionQuery,
      category
    ) ?? [];

  // sorted transactions based on the sortBy value
  sortTransactions(filteredTransactions, sortBy);

  const handleQueryChange = (e: any) => {
    console.log(e.currentTarget.value);
    setTransactionQuery(e.target.value);
  };

  return (
    <TransactionFilterContext.Provider
      value={{
        transactionQuery,
        filteredTransactions: filteredTransactions ?? [],
        sortBy,
        category,
        setSortBy,
        setCategory,
        setTransactionQuery: handleQueryChange,
      }}
    >
      {children}
    </TransactionFilterContext.Provider>
  );
};

function queriedCategorizedTransactions(
  transactions: Transaction[],
  transactionQuery: string,
  category: string
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
