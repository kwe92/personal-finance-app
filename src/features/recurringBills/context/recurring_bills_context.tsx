import { createContext, useContext, useState } from "react";
import { useTransactionData } from "../../shared/context/transaction_context";
import {
  billsByCategory,
  getDaysDifference,
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
}>({
  recurringBills: [],
  paidBills: [],
  upcomingBills: [],
  dueSoonBills: [],
  sortBy: "Latest",
  setSortBy: () => {},
  queryString: "",
  setQueryString: () => {},
});

const RecurringBillsViewProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const { transactions } = useTransactionData();

  const [sortBy, setSortBy] = useState<SortCategory>("Latest");

  const [queryString, setQueryString] = useState<string>("");

  var recurringBills: TransactionData[] = [];

  if (transactions !== null) {
    recurringBills = transactions!.filter((trnasaction) => {
      return trnasaction.recurring === true;
    });
  }

  recurringBills = queriedBills(recurringBills, queryString);

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
  billQuery: string
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
