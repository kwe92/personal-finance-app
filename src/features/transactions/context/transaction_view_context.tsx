import { createContext, useContext, useState } from "react";
import { useTransactionData } from "../../shared/context/transactionContext";

const TransactionViewContext = createContext<{
  filteredTransactions: TransactionData[];
  transactionQuery: string;
  setTransactionQuery: Function;
}>({
  transactionQuery: "",
  setTransactionQuery: () => {},
  filteredTransactions: [],
});

const TransactionViewProvider = ({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element => {
  const { transactions } = useTransactionData();

  const [transactionQuery, setTransactionQuery] = useState<string>("");

  var filteredTransactions: TransactionData[] = [];

  console.log(`transactions: ${transactions}`);

  if (transactions !== null) {
    filteredTransactions = transactions.filter((transaction) => {
      return transaction.name
        .toLowerCase()
        .includes(transactionQuery.toLowerCase());
    });
  }

  return (
    <TransactionViewContext.Provider
      value={{
        transactionQuery,
        setTransactionQuery,
        filteredTransactions: filteredTransactions ?? [],
      }}
    >
      {children}
    </TransactionViewContext.Provider>
  );
};

const useTransactionViewData = () => useContext(TransactionViewContext);

export { TransactionViewProvider, useTransactionViewData };
