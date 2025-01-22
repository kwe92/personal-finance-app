import { sortByDate } from "../shared/utility/functions";

export class BudgetViewModel {
  private constructor() {}

  static budgetCategoryExpendedAmount(transactions: TransactionData[]): number {
    const expendedAmount = transactions.reduce((accumulator, transaction) => {
      return accumulator + transaction.amount;
    }, 0);

    return expendedAmount;
  }

  static filterTransactionByBudgetCategory(
    transactions: TransactionData[],
    budget: BudgetData
  ): TransactionData[] {
    const filteredTransactionsByCategory = transactions?.filter(
      (transaction) => {
        return transaction.category === budget?.category;
      }
    );

    filteredTransactionsByCategory?.sort((a, b) => sortByDate(a, b));

    return filteredTransactionsByCategory ?? [];
  }
}
