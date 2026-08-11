import { createContext, useContext, useEffect, useState } from "react";
import { getRecurringBills } from "../../shared/services/backend_service";
import { cleanName, sortTransactions } from "../../shared/utility/functions";
import { useAuth } from "../../auth/context/auth_context";

const RecurringBillsContext = createContext<{
  recurringBills: TransactionData[];
  paidBills: TransactionData[];
  upcomingBills: TransactionData[];
  dueSoonBills: TransactionData[];
  pastDueBills: TransactionData[];
  sortBy: SortCategory;
  setSortBy: (sortCategory: SortCategory) => void;
  queryString: string;
  setQueryString: React.ChangeEventHandler<HTMLInputElement>;
  isLoading: boolean;
  error: string | null;
}>({
  recurringBills: [],
  paidBills: [],
  upcomingBills: [],
  dueSoonBills: [],
  pastDueBills: [],
  sortBy: "Latest",
  setSortBy: () => {},
  queryString: "",
  setQueryString: () => {},
  isLoading: true,
  error: null,
});

export const RecurringBillsProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const { user, isPlaidLinked } = useAuth();
  const [recurringBillsData, setRecurringBillsData] = useState<
    TransactionData[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortCategory>("Latest");
  const [queryString, setQueryString] = useState<string>("");

  const fetchRecurringBills = async () => {
    if (!user || !isPlaidLinked) {
      setRecurringBillsData([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await getRecurringBills();
      setRecurringBillsData(
        response.recurringBills.map((recurringBill) => ({
          ...recurringBill,
          name: cleanName(recurringBill.name),
        })) ?? [],
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch recurring bills",
      );
      setRecurringBillsData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecurringBills();
  }, [user, isPlaidLinked]);

  const recurringBills = queriedBills(recurringBillsData, queryString);

  const paidBills = recurringBills.filter((bill) => bill.status === "paid");
  const upcomingBills = recurringBills.filter(
    (bill) => bill.status === "upcoming",
  );
  const dueSoonBills = recurringBills.filter(
    (bill) => bill.status === "due_soon",
  );
  const pastDueBills = recurringBills.filter(
    (bill) => bill.status === "past_due",
  );

  sortTransactions(recurringBills, sortBy);

  return (
    <RecurringBillsContext.Provider
      value={{
        recurringBills,
        paidBills,
        upcomingBills,
        dueSoonBills,
        pastDueBills,
        sortBy,
        setSortBy,
        queryString,
        setQueryString: handleQueryChange,
        isLoading,
        error,
      }}
    >
      {children}
    </RecurringBillsContext.Provider>
  );

  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQueryString(e.target.value);
  }
};

function queriedBills(
  bills: TransactionData[],
  billQuery: string,
): TransactionData[] {
  return bills?.filter((bill) =>
    bill.name.toLowerCase().includes(billQuery.toLowerCase()),
  );
}

export const useRecurringBills = () => useContext(RecurringBillsContext);
export const useRecurringBillsViewData = useRecurringBills;
