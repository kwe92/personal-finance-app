import React from "react";
import "./css/budget_summary.css";
import { Doughnut } from "react-chartjs-2";
import { SpendingSummaryListTile } from "./spending_summary_list_tile";
import { Divider } from "../../shared/components/divider";
import { useBudgetData } from "../../shared/context/budget_context";
import { useTransactionData } from "../../shared/context/transaction_context";
import { useDoughnutChartData } from "../../shared/context/doughnut_chart_context";

export const BudgetSummary = (): JSX.Element => {
  const { budgets } = useBudgetData();
  const { transactions } = useTransactionData();
  const { doughnutChartOptions, doughnutChartData } = useDoughnutChartData();

  const maximumBudgetAmount = budgets?.reduce(
    (accumulator, budget) => accumulator + budget.maximum,
    0,
  );

  const budgetCategories = new Set(
    budgets?.map((budget) => budget.category) ?? [],
  );

  const expendedAmount = (transactions ?? []).reduce((acc, transaction) => {
    if (budgetCategories.has(transaction.category)) {
      return acc + transaction.amount;
    }
    return acc;
  }, 0);

  const latestBudgets = budgets?.slice(0, 4) ?? [];

  const spendingSummaryListTiles = latestBudgets.map((budget, i) => (
    <React.Fragment key={budget.id || budget.category || i}>
      <SpendingSummaryListTile budget={budget} />
      {latestBudgets.length - 1 !== i && <Divider />}
    </React.Fragment>
  ));

  return (
    <div className="budget-summary-main">
      <div className="budget-summary-chart-container">
        <Doughnut
          options={doughnutChartOptions}
          data={doughnutChartData}
          style={{ padding: "0px", marginBottom: "10px" }}
        />
      </div>

      <div className="budget-summary-total-spending">
        <p className="budget-summary-bold-text">Total Spending</p>
        <div>
          <p>${Math.abs(expendedAmount).toFixed(2)}</p>
          <p>of ${maximumBudgetAmount?.toFixed(2)} limit</p>
        </div>
      </div>

      <div className="budget-spending-summary">
        <p className="budget-summary-bold-text">Spending Summary</p>
        {spendingSummaryListTiles}
      </div>
    </div>
  );
};
