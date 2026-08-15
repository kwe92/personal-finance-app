import { createContext, useContext, useMemo, useState } from "react";
import { useTransactionFilterData } from "../../shared/context/transaction_filter_context";

interface ExpenseTrackerContextInterface {
  isTrackerOpen: boolean;
  setIsTrackerOpen: (isOpen: boolean) => void;
  categoryTotals: Record<string, number>;
  topMerchants: { name: string; value: number }[];
  spendingSplit: { needs: number; wants: number };
}

const ExpenseTrackerContext = createContext<ExpenseTrackerContextInterface>({
  isTrackerOpen: false,
  setIsTrackerOpen: () => {},
  categoryTotals: {},
  topMerchants: [],
  spendingSplit: { needs: 0, wants: 0 },
});

const ExpenseTrackerProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const { filteredTransactions } = useTransactionFilterData();
  const [isTrackerOpen, setIsTrackerOpen] = useState<boolean>(false);

  const value = useMemo(() => {
    // 1. Filter for actual expenses
    const expenses = filteredTransactions.filter(
      (t) => t.type === "expense" && t.category.toLowerCase() !== "transfer",
    );

    // 2. Calculate Category Totals
    const categoryTotals = expenses.reduce((acc: Record<string, number>, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

    // 3. Calculate Top Merchants
    const merchants = expenses.reduce((acc: Record<string, number>, t) => {
      acc[t.name] = (acc[t.name] || 0) + t.amount;
      return acc;
    }, {});

    const topMerchants = Object.entries(merchants)
      .map(([name, value]) => ({ name, value: value as number }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    // 4. Needs vs Wants Split logic
    const needsCategories = ["payment", "bills", "rent", "transport"];
    const spendingSplit = expenses.reduce(
      (acc, t) => {
        const isNeed = needsCategories.includes(t.category.toLowerCase());
        if (isNeed) acc.needs += t.amount;
        else acc.wants += t.amount;
        return acc;
      },
      { needs: 0, wants: 0 },
    );

    return {
      isTrackerOpen,
      setIsTrackerOpen,
      categoryTotals,
      topMerchants,
      spendingSplit,
    };
  }, [isTrackerOpen, filteredTransactions]);

  return (
    <ExpenseTrackerContext.Provider value={value}>
      {children}
    </ExpenseTrackerContext.Provider>
  );
};

const useExpenseTrackerData = () => useContext(ExpenseTrackerContext);

export { ExpenseTrackerProvider, useExpenseTrackerData };
