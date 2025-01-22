import { useTransactionData } from "../../shared/context/transaction_context";
import { sortByDate } from "../../shared/utility/functions";
import { BudgetViewModel } from "../budget_view_model";
import "./css/spending_summary_list_tile.css";

export const SpendingSummaryListTile = ({
  budget,
}: {
  budget: BudgetData;
}): JSX.Element => {
  const { transactions } = useTransactionData();

  const filteredTransactionsByCategory =
    BudgetViewModel.filterTransactionByBudgetCategory(
      transactions ?? [],
      budget
    );

  const expendedAmount = BudgetViewModel.budgetCategoryExpendedAmount(
    filteredTransactionsByCategory
  );

  return (
    <div className="spending-summary-list-tile-main">
      {/*  vertical line and label section*/}
      <div className="spending-summary-left-section">
        <div
          style={{
            backgroundColor: budget.theme,
          }}
        />
        <p>{budget.category}</p>
      </div>

      <div className="spending-summary-right-section">
        <p>${Math.abs(expendedAmount).toFixed(2)}</p>
        <p>of ${budget.maximum.toFixed(2)}</p>
      </div>
    </div>
  );
};
