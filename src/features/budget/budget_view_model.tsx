import { sortByDate } from "../shared/utility/functions";

export class BudgetViewModel {
  private constructor() {}

  static budgetCategoryExpendedAmount(transactions: TransactionData[]): number {
    if (!transactions || transactions.length === 0) return 0;
    return transactions.reduce(
      (accumulator, transaction) => accumulator + transaction.amount,
      0,
    );
  }

  static filterTransactionByBudgetCategory(
    transactions: TransactionData[],
    budget: BudgetData,
  ): TransactionData[] {
    if (!transactions || !budget) return [];

    const filteredTransactionsByCategory = transactions.filter(
      (transaction) => transaction.category === budget.category,
    );

    return filteredTransactionsByCategory.sort((a, b) => sortByDate(a, b));
  }
}
