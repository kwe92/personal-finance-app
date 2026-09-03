export interface NarrativeData {
  primaryMetric: string;
  secondaryMetric: string;
  status: "good" | "bad" | "neutral";
  description: string;
  trendLabel: string;
}

export const getTemporalNarrative = (
  expenses: TransactionData[],
  dateRange: string,
  typicalAvg: number,
  daysInPeriod: number,
  monthlyTarget: number,
): NarrativeData => {
  const total = expenses.reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const now = new Date();

  const daysInMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
  ).getDate();

  if (dateRange !== "Current Month") {
    const dailyAvg = total / (daysInPeriod || 1);

    const targetDailyAvg = monthlyTarget / daysInMonth;
    const isOverTargetPace = dailyAvg > targetDailyAvg;

    const diff =
      typicalAvg > 0 ? ((dailyAvg - typicalAvg) / typicalAvg) * 100 : 0;

    return {
      primaryMetric: `$${dailyAvg.toFixed(0)}`,
      secondaryMetric:
        typicalAvg > 0
          ? `${Math.abs(diff).toFixed(0)}% ${diff > 0 ? "higher" : "lower"}`
          : "First time",
      // Status is determined by the spending target pace
      status: isOverTargetPace ? "bad" : "good",
      description: "Average daily spend",
      trendLabel: `vs. Typical ($${typicalAvg.toFixed(0)})`,
    };
  }

  if (dateRange === "Current Month") {
    const dayOfMonth = now.getDate();

    const projected =
      dayOfMonth === 1 ? total : (total / dayOfMonth) * daysInMonth;

    const isOver = projected > monthlyTarget;

    return {
      primaryMetric: `$${projected.toFixed(0)}`,
      secondaryMetric: isOver ? "Over Budget" : "On Track",
      status: isOver ? "bad" : "good",
      description: "Projected month-end total",
      trendLabel: `Target: $${monthlyTarget.toFixed(0)}`,
    };
  }

  return {
    primaryMetric: `$${total.toFixed(0)}`,
    secondaryMetric: `${expenses.length} Trans.`,
    status: "neutral",
    description: "Total outflow for period",
    trendLabel: "Custom Range",
  };
};

export const getPeakInsight = (expenses: any[]) => {
  if (expenses.length === 0) return null;

  const dailyMap: Record<string, number> = {};
  expenses.forEach((t) => {
    const d = new Date(t.date).toLocaleDateString("en-US", { weekday: "long" });
    dailyMap[d] = (dailyMap[d] || 0) + Math.abs(t.amount);
  });

  const peakDay = Object.entries(dailyMap).sort((a, b) => b[1] - a[1])[0];

  return {
    day: peakDay[0],
    amount: peakDay[1],
  };
};
