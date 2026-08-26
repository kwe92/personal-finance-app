import { createContext, useContext, useState, useMemo } from "react";
import { useTransactionFilterData } from "../../shared/context/transaction_filter_context";
import {
  getTemporalNarrative,
  getPeakInsight,
  type NarrativeData,
} from "../../shared/utility/analysis_logic";

interface ExpenseTrackerContextInterface {
  isTrackerOpen: boolean;
  setIsTrackerOpen: (isOpen: boolean) => void;
  categoryTotals: Record<string, number>;
  topMerchants: { name: string; value: number }[];
  spendingSplit: { needs: number; wants: number };
  narrative: NarrativeData;
  peakDay: { day: string; amount: number } | null;
}

const ExpenseTrackerContext = createContext<ExpenseTrackerContextInterface>({
  isTrackerOpen: false,
  setIsTrackerOpen: () => {},
  categoryTotals: {},
  topMerchants: [],
  spendingSplit: { needs: 0, wants: 0 },
  narrative: {
    primaryMetric: "",
    secondaryMetric: "",
    status: "neutral",
    description: "",
    trendLabel: "",
  },
  peakDay: null,
});

export const ExpenseTrackerProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const { filteredTransactions, dateRange } = useTransactionFilterData();
  const [isTrackerOpen, setIsTrackerOpen] = useState<boolean>(false);

  const value = useMemo(() => {
    const expenses = filteredTransactions.filter(
      (t) => t.type === "expense" && t.category.toLowerCase() !== "transfer",
    );

    const categoryTotals = expenses.reduce((acc: Record<string, number>, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

    const merchants = expenses.reduce((acc: Record<string, number>, t) => {
      acc[t.name] = (acc[t.name] || 0) + t.amount;
      return acc;
    }, {});
    const topMerchants = Object.entries(merchants)
      .map(([name, value]) => ({ name, value: value as number }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    // Needs vs Wants
    const needsCategories = [
      "payment",
      "bills",
      "rent",
      "transport",
      "food & drink",
    ];
    const spendingSplit = expenses.reduce(
      (acc, t) => {
        if (needsCategories.includes(t.category.toLowerCase()))
          acc.needs += t.amount;
        else acc.wants += t.amount;
        return acc;
      },
      { needs: 0, wants: 0 },
    );

    const narrative = getTemporalNarrative(expenses, dateRange);
    const peakDay = getPeakInsight(expenses);

    return {
      isTrackerOpen,
      setIsTrackerOpen,
      categoryTotals,
      topMerchants,
      spendingSplit,
      narrative,
      peakDay,
    };
  }, [isTrackerOpen, filteredTransactions, dateRange]);

  return (
    <ExpenseTrackerContext.Provider value={value}>
      {children}
    </ExpenseTrackerContext.Provider>
  );
};

export const useExpenseTrackerData = () => useContext(ExpenseTrackerContext);
