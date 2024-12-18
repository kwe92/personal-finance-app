import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import appData from "../../../app/data.json";

const TransactionContext = createContext<{
  transactions: TransactionData[] | null;
  isLoading: boolean;
  error: string | null;
}>({
  transactions: [],
  isLoading: true,
  error: null,
});

const TransactionProvider = ({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element => {
  const [transactions, setTransactions] = useState<TransactionData[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchTransactions = async () => {
    setIsLoading(true);

    try {
      // comment to simulate a delay
      setTransactions(appData.transactions);
      setIsLoading(false);

      // uncomment to simulate a delay

      // await new Promise((_) =>
      //   setTimeout(() => {
      //     console.log("fetchTransactions 1");
      //     setTransactions(appData.transactions);
      //     setIsLoading(false);
      //     console.log("fetchTransactions 2");
      //   }, 2000)
      // );
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionContext.Provider value={{ transactions, isLoading, error }}>
      {children}
    </TransactionContext.Provider>
  );
};

const useTransactionData = () => useContext(TransactionContext);

export { TransactionProvider, useTransactionData };
