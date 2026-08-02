import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { getTransactions } from "../services/backend_service";

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
    null,
  );

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<any>(null);

  const fetchTransactions = async () => {
    setIsLoading(true);

    try {
      const response = await getTransactions();
      setTransactions(response.transactions ?? []);
    } catch (error) {
      setError(error);
      setTransactions([]);
    } finally {
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
