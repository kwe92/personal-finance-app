export class BudgetViewModel {
  static filterTransactionByBudgetCategory(
    transactions: TransactionData[],
    budget: BudgetData,
  ): TransactionData[] {
    if (!transactions || !budget) return [];

    return transactions.filter((transaction) => {
      const matchesCategory = transaction.category === budget.category;

      // Direct string comparison works safely for YYYY-MM-DD dates
      const isWithinDateRange =
        (!budget.startDate || transaction.date >= budget.startDate) &&
        (!budget.endDate || transaction.date <= budget.endDate);

      return matchesCategory && isWithinDateRange;
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
