//! TODO: Why do we have this? Should this code be in a context?

export class BudgetViewModel {
  static filterTransactionByBudgetCategory(
    transactions: TransactionData[],
    budget: BudgetData,
  ): TransactionData[] {
    if (!transactions || !budget) return [];

    // Helper to parse date string and add 1 day
    const getAdjustedDate = (dateStr?: string): Date | null => {
      if (!dateStr) return null;
      const date = new Date(dateStr);
      date.setDate(date.getDate() + 1); // Safely handles month/year roll-overs
      return date;
    };

    // Add +1 day to start and end dates
    const budgetStartDate = getAdjustedDate(budget.startDate);
    const budgetEndDate = getAdjustedDate(budget.endDate);

    return transactions.filter((transaction) => {
      const matchesCategory = transaction.category === budget.category;
      if (!matchesCategory) return false;

      const txnDate = new Date(transaction.date);

      const isAfterOrOnStart = !budgetStartDate || txnDate >= budgetStartDate;
      const isBeforeOrOnEnd = !budgetEndDate || txnDate <= budgetEndDate;

      return isAfterOrOnStart && isBeforeOrOnEnd;
    });
  }

  static budgetCategoryExpendedAmount(
    filteredTransactions: TransactionData[],
  ): number {
    return (filteredTransactions ?? []).reduce(
      (acc, txn) => acc + txn.amount,
      0,
    );
  }
}
