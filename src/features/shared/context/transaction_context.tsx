import { useContext, useEffect, useState, createContext, useMemo } from "react";
import { getTransactions } from "../services/backend_service";
import { useAuth } from "../../auth/context/auth_context";
import { cleanName } from "../utility/functions";

interface TransactionContextType {
  transactions: TransactionData[];
  isLoading: boolean;
  error: string | null;
  fetchTransactions: () => Promise<void>;
}

const TransactionContext = createContext<TransactionContextType>({
  transactions: [],
  isLoading: true,
  error: null,
  fetchTransactions: async () => {},
});

const TransactionProvider = ({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element => {
  const { user, isPlaidLinked } = useAuth();
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async () => {
    if (!user || !isPlaidLinked) {
      setTransactions([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await getTransactions();
      setTransactions(
        response.transactions.map((transaction) => ({
          ...transaction,
          name: cleanName(transaction.name),
        })) ?? [],
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch transactions",
      );
      setTransactions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [user, isPlaidLinked]);

  const value = useMemo(
    () => ({
      transactions,
      isLoading,
      error,
      fetchTransactions,
    }),
    [transactions, isLoading, error],
  );

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

const useTransactionData = () => useContext(TransactionContext);

export { TransactionProvider, useTransactionData };
