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
): NarrativeData => {
  const total = expenses.reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const now = new Date();

  // Logic for Short Ranges (7 or 14 Days)
  if (dateRange.includes("7") || dateRange.includes("14")) {
    const days = dateRange.includes("7") ? 7 : 14;
    const dailyAvg = total / days;

    const typicalAvg = 50; // mock average
    const diff = ((dailyAvg - typicalAvg) / typicalAvg) * 100;

    return {
      primaryMetric: `$${dailyAvg.toFixed(0)}`,
      secondaryMetric: `${Math.abs(diff).toFixed(0)}% ${diff > 0 ? "higher" : "lower"}`,
      status: diff > 0 ? "bad" : "good",
      description: "Average daily spend",
      trendLabel: "vs. Typical Average",
    };
  }

  // Logic for Monthly Ranges (30 Days / Current Month)
  if (dateRange.includes("30") || dateRange.includes("Month")) {
    const dayOfMonth = now.getDate();
    const daysInMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
    ).getDate();
    const projected = (total / dayOfMonth) * daysInMonth;

    const budget = 2000; // Mock budget
    const isOver = projected > budget;

    return {
      primaryMetric: `$${projected.toFixed(0)}`,
      secondaryMetric: isOver ? "Over Budget" : "On Track",
      status: isOver ? "bad" : "good",
      description: "Projected month-end total",
      trendLabel: `Target: $${budget}`,
    };
  }

  // 3. Fallback for Custom/Default
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
