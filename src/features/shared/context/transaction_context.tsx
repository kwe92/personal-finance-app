import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { getTransactions } from "../services/backend_service";
import { useAuth } from "../../auth/context/auth_context";

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

  const { user } = useAuth();

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
  }, [user]);

  return (
    <TransactionContext.Provider value={{ transactions, isLoading, error }}>
      {children}
    </TransactionContext.Provider>
  );
};

const useTransactionData = () => useContext(TransactionContext);

export { TransactionProvider, useTransactionData };
