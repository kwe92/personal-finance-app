import { createContext, useContext, useEffect, useState } from "react";
import { useTransactionData } from "../../shared/context/transaction_context";
import Transaction from "../../shared/models/transaction";

// inital TransactionViewContext shape and values
const TransactionViewContext = createContext<{
  transactionQuery: string;
  filteredTransactions: TransactionData[];
  sortBy: string;
  category: string;
  setSortBy: Function;
  setCategory: Function;
  setTransactionQuery: React.ChangeEventHandler<HTMLInputElement>;
}>({
  transactionQuery: "",
  filteredTransactions: [],
  sortBy: "",
  category: "",
  setSortBy: () => {},
  setCategory: () => {},
  setTransactionQuery: () => {},
});

// used to wrap any part of your app to provide the TransactionViewContext
const TransactionViewProvider = ({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element => {
  const { transactions } = useTransactionData();

  // console.log(`transactions: ${transactions}`);

  // mutable observable state
  const [transactionQuery, setTransactionQuery] = useState<string>("");

  const [sortBy, setSortBy] = useState<string>("");

  const [category, setCategory] = useState<string>("");

  // initally empty filtered transactions
  var filteredTransactions: TransactionData[] = [];

  // queried and categorized transactions based on the transactionQuery and category mutable variables
  filteredTransactions =
    queriedCategorizedTransactions(
      transactions ?? [],
      transactionQuery,
      category
    ) ?? [];

  // sorted transactions based on the sortBy value
  sortTransactions(filteredTransactions, sortBy);

  // set the inital values of sortBy and category when view loads or reloads
  useEffect(() => {
    setSortBy("Latest");
    setCategory("All Transactions");
  }, []);

  const handleQueryChange = (e: any) => {
    console.log(e.currentTarget.value);
    setTransactionQuery(e.target.value);
  };

  return (
    <TransactionViewContext.Provider
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
    </TransactionViewContext.Provider>
  );
};

function queriedCategorizedTransactions(
  transactions: Transaction[] | undefined,
  transactionQuery: string,
  category: string
): TransactionData[] | undefined {
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

function sortTransactions(filteredTransactions: Transaction[], sortBy: string) {
  switch (sortBy) {
    case "Latest":
      return filteredTransactions.sort((a, b) => {
        const aDate = new Date(a.date);

        const bDate = new Date(b.date);

        if (aDate > bDate) {
          return -1;
        }
        return 1;
      });

    case "Oldest":
      return filteredTransactions.sort((a, b) => {
        const aDate = new Date(a.date);

        const bDate = new Date(b.date);

        if (aDate < bDate) {
          return -1;
        }
        return 1;
      });

    case "A to Z":
      return filteredTransactions?.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

    case "Z to A":
      return filteredTransactions?.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });

    case "Highest":
      return filteredTransactions?.sort((a, b) => {
        if (a.amount > b.amount) {
          return -1;
        }
        return 1;
      });

    case "Lowest":
      return filteredTransactions?.sort((a, b) => {
        if (a.amount < b.amount) {
          return -1;
        }
        return 1;
      });

    default:
      return filteredTransactions ?? [];
  }
}

const useTransactionViewData = () => useContext(TransactionViewContext);

export { TransactionViewProvider, useTransactionViewData };
