import { createContext, useContext, useEffect, useState } from "react";
import { getRecurringBills } from "../../shared/services/backend_service";
import {
  billsByCategory,
  sortTransactions,
} from "../../shared/utility/functions";

const RecurringBillsViewContext = createContext<{
  recurringBills: TransactionData[];
  paidBills: TransactionData[];
  upcomingBills: TransactionData[];
  dueSoonBills: TransactionData[];
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

        setRecurringBillsData(response.recurringBills ?? []);
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

  let recurringBills = queriedBills(recurringBillsData, queryString);

  const paidBills = billsByCategory(recurringBills, "paid");

  const upcomingBills = billsByCategory(recurringBills, "upcoming");

  const dueSoonBills = billsByCategory(recurringBills, "due");

  // sorted bills based on the sortBy value

  sortTransactions(recurringBills, sortBy);

  return (
    <RecurringBillsViewContext.Provider
      value={{
        recurringBills: recurringBills,
        paidBills: paidBills,
        upcomingBills: upcomingBills,
        dueSoonBills: dueSoonBills,
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
    console.log(e.currentTarget.value);
    setQueryString(e.target.value);
  }
};

function queriedBills(
  bills: TransactionData[],
  billQuery: string,
): TransactionData[] {
  return bills?.filter((bill) => {
    const queriedBills = bill.name
      .toLowerCase()
      .includes(billQuery.toLowerCase());

    return queriedBills;
  });
}

const useRecurringBillsViewData = () => useContext(RecurringBillsViewContext);

export { RecurringBillsViewProvider, useRecurringBillsViewData };
