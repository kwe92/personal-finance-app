import { createContext, useContext, useState, useMemo } from "react";
import { useTransactionFilterData } from "../../shared/context/transaction_filter_context";
import { useTransactionData } from "../../shared/context/transaction_context";
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
  const { transactions } = useTransactionData();
  const {
    filteredTransactions,
    dateRange,
    customRange,
    category,
    transactionQuery,
  } = useTransactionFilterData();
  const [isTrackerOpen, setIsTrackerOpen] = useState<boolean>(false);

  const value = useMemo(() => {
    // Calculate CONTEXT-AWARE Historical Baseline
    // We filter the entire history by the CURRENT Category and Search Query
    const baselineExpenses = (transactions ?? []).filter((t) => {
      const isExpense =
        t.type === "expense" && t.category.toLowerCase() !== "transfer";
      const matchesSearch = t.name
        .toLowerCase()
        .includes(transactionQuery.toLowerCase());
      const matchesCat =
        category === "All Transactions" ||
        t.category.toLowerCase() === category.toLowerCase();
      return isExpense && matchesSearch && matchesCat;
    });

    let typicalDailyAvg = 0;
    if (baselineExpenses.length > 0) {
      const dates = baselineExpenses.map((t) => new Date(t.date).getTime());
      const minDate = Math.min(...dates);
      const maxDate = Math.max(...dates);
      const totalDaysSpan =
        Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24)) || 1;
      const totalHistoricalSpend = baselineExpenses.reduce(
        (sum, t) => sum + Math.abs(t.amount),
        0,
      );
      typicalDailyAvg = totalHistoricalSpend / totalDaysSpan;
    }

    // Current Selection Analysis (already filtered by Category, Search, AND Date)
    const expenses = filteredTransactions.filter(
      (t) => t.type === "expense" && t.category.toLowerCase() !== "transfer",
    );

    // Determine Days in Period for current avg calculation
    let daysInPeriod = 30;
    if (dateRange === "7 days") daysInPeriod = 7;
    else if (dateRange === "14 days") daysInPeriod = 14;
    else if (dateRange === "Custom" && customRange.start && customRange.end) {
      daysInPeriod =
        Math.ceil(
          (customRange.end.getTime() - customRange.start.getTime()) /
            (1000 * 60 * 60 * 24),
        ) || 1;
    }

    // Layer A: Category Breakdown
    const categoryTotals = expenses.reduce((acc: Record<string, number>, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

    // Layer C: Top Merchants
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

    const narrative = getTemporalNarrative(
      expenses,
      dateRange,
      typicalDailyAvg,
      daysInPeriod,
    );
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
  }, [
    isTrackerOpen,
    filteredTransactions,
    dateRange,
    transactions,
    customRange,
    category,
    transactionQuery,
  ]);

  return (
    <ExpenseTrackerContext.Provider value={value}>
      {children}
    </ExpenseTrackerContext.Provider>
  );
};

export const useExpenseTrackerData = () => useContext(ExpenseTrackerContext);
