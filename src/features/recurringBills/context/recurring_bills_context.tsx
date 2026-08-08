import { createContext, useContext, useEffect, useState } from "react";
import { getRecurringBills } from "../../shared/services/backend_service";
import { cleanName, sortTransactions } from "../../shared/utility/functions";

const RecurringBillsViewContext = createContext<{
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
});

const RecurringBillsViewProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [recurringBillsData, setRecurringBillsData] = useState<
    TransactionData[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<SortCategory>("Latest");

  const [queryString, setQueryString] = useState<string>("");

  useEffect(() => {
    let isMounted = true;

    const fetchRecurringBills = async () => {
      setIsLoading(true);

      try {
        const response = await getRecurringBills();

        if (!isMounted) {
          return;
        }
        setRecurringBillsData(
          response.recurringBills.map((recurringBill) => ({
            ...recurringBill,
            name: cleanName(recurringBill.name),
          })) ?? [],
        );
      } catch (error) {
        if (isMounted) {
          setRecurringBillsData([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchRecurringBills();

    return () => {
      isMounted = false;
    };
  }, []);

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
    <RecurringBillsViewContext.Provider
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
      }}
    >
      {children}
    </RecurringBillsViewContext.Provider>
  );

  function handleQueryChange(e: any) {
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

const useRecurringBillsViewData = () => useContext(RecurringBillsViewContext);

export { RecurringBillsViewProvider, useRecurringBillsViewData };
